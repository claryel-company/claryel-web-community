#!/usr/bin/env python3
"""Normalize and validate English-only CLARYEL documentation."""
from __future__ import annotations
import argparse
import pathlib
import re
import unicodedata

SUFFIXES = {".md", ".mdx", ".rst", ".adoc", ".txt"}
EXCLUDED = {".git", ".venv", "venv", "node_modules", "vendor", "dist", "build", "coverage"}
CYRILLIC = re.compile(r"[\u0400-\u04ff]")
RU_START = re.compile(r"<!--\s*RU:BEGIN\s*-->", re.I)
RU_END = re.compile(r"<!--\s*RU:END\s*-->", re.I)
RU_COMMENT = re.compile(r"^\s*(?:#|//|;|--)?\s*\[RU\]", re.I)
TRANSLATION = re.compile(r"\s+/\s+")
SEPARATOR = re.compile(r"^\s*:?-{3,}:?\s*$")


def forbidden(text: str) -> bool:
    return any(unicodedata.category(c).startswith("L") and not c.isascii() for c in text)


def clean_cell(text: str) -> str:
    if not forbidden(text):
        return text.strip()
    match = TRANSLATION.search(text)
    if match:
        left, right = text[:match.start()], text[match.end():]
        if not forbidden(left) and forbidden(right):
            return left.rstrip()
    letters = [c for c in text if c.isalpha()]
    if letters and sum(not c.isascii() for c in letters) / len(letters) >= 0.15:
        return ""
    return " ".join(token for token in text.split() if not forbidden(token)).strip()


def clean_line(line: str, fenced: bool) -> str:
    if not forbidden(line):
        return line.rstrip()
    if not fenced and line.lstrip().startswith("|") and line.rstrip().endswith("|"):
        cells = line.strip().strip("|").split("|")
        cells = [cell.strip() if SEPARATOR.fullmatch(cell) else clean_cell(cell) for cell in cells]
        return "| " + " | ".join(cells) + " |"
    if fenced:
        line = re.sub(r"\[([^\[\]]*)\]", lambda m: "[" + clean_cell(m.group(1)) + "]", line)
        line = re.sub(r"\{([^{}]*)\}", lambda m: "{" + clean_cell(m.group(1)) + "}", line)
        if not forbidden(line):
            return line.rstrip()
    return clean_cell(line)


def normalize(text: str) -> str:
    output: list[str] = []
    ru_block = False
    fenced = False
    for raw in text.splitlines():
        stripped = raw.strip()
        if RU_START.search(raw):
            ru_block = True
            continue
        if RU_END.search(raw):
            ru_block = False
            continue
        if ru_block or RU_COMMENT.search(raw):
            continue
        if stripped.startswith("```") or stripped.startswith("~~~"):
            output.append(raw.rstrip())
            fenced = not fenced
            continue
        output.append(clean_line(raw, fenced))
    compact: list[str] = []
    blank = False
    for line in output:
        if line:
            compact.append(line)
            blank = False
        elif not blank:
            compact.append("")
            blank = True
    return "\n".join(compact).strip() + "\n"


def validate(path: str, text: str) -> list[str]:
    problems: list[str] = []
    fenced = False
    language = ""
    table_width: int | None = None
    for number, line in enumerate(text.splitlines(), 1):
        stripped = line.strip()
        if stripped.startswith("```") or stripped.startswith("~~~"):
            if not fenced:
                language = stripped[3:].strip().lower()
            fenced = not fenced
            if not fenced:
                language = ""
            continue
        if forbidden(line) or CYRILLIC.search(line):
            problems.append(f"{path}:{number}: non-English alphabetic text")
        if not fenced:
            if line.count("`") % 2:
                problems.append(f"{path}:{number}: unmatched inline backtick")
            if line.lstrip().startswith("|") and line.rstrip().endswith("|"):
                cells = line.strip().strip("|").split("|")
                width = len(cells)
                if all(SEPARATOR.fullmatch(cell) for cell in cells):
                    if table_width is not None and width != table_width:
                        problems.append(f"{path}:{number}: table width mismatch")
                elif table_width is None:
                    table_width = width
                elif width != table_width:
                    problems.append(f"{path}:{number}: table width mismatch")
            else:
                table_width = None
        elif language == "mermaid" and (line.count("[") != line.count("]") or line.count("{") != line.count("}")):
            problems.append(f"{path}:{number}: malformed Mermaid labels")
    if fenced:
        problems.append(f"{path}: unclosed fenced block")
    return problems


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("mode", choices=("check", "fix"))
    parser.add_argument("--root", type=pathlib.Path, default=pathlib.Path.cwd())
    args = parser.parse_args()
    root = args.root.resolve()
    changed = 0
    problems: list[str] = []
    for path in sorted(root.rglob("*")):
        if not path.is_file() or path.suffix.lower() not in SUFFIXES or any(part in EXCLUDED for part in path.parts):
            continue
        current = path.read_text(encoding="utf-8")
        result = normalize(current)
        if args.mode == "fix" and result != current:
            path.write_text(result, encoding="utf-8")
            changed += 1
        problems.extend(validate(path.relative_to(root).as_posix(), result if args.mode == "fix" else current))
    if args.mode == "fix":
        print(f"Normalized {changed} documentation files.")
    if problems:
        print("\n".join(problems))
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
