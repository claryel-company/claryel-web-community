import{CHROME_LOCALES,CHROME_LOCALE_META,CHROME_SURFACES}from'../public/chrome-locales.js';

const LOCALES=Object.fromEntries(CHROME_LOCALE_META.map(item=>[item.code,item]));

export function normaliseChromeCode(value=''){
  const raw=String(value).trim();
  if(/^zh(?:[-_](?:cn|hans))?$/i.test(raw)||raw.toLowerCase()==='zh-cn')return'zh-CN';
  return raw.toLowerCase().split(/[-_]/)[0];
}

export function chromePath(code,surface){
  if(surface==='home')return code==='en'?'/':LOCALES[code].path;
  return code==='en'?`/${surface}/`:`${LOCALES[code].path}${surface}/`;
}

export function legalPolicyPath(code,kind){
  return code==='en'?`/legal/${kind}/`:`${LOCALES[code].path}legal/${kind}/`;
}

export function englishPrefixRedirect(pathname){
  if(!/^\/en(?:\/|$)/i.test(pathname))return null;
  const rest=pathname.replace(/^\/en/i,'')||'/';
  if(rest==='/'||rest==='')return'/';
  return rest.endsWith('/')?rest:`${rest}/`;
}

export function matchChromeRoute(pathname){
  const parts=pathname.split('/').filter(Boolean);
  if(!parts.length||parts.length>2)return null;
  let code='en';
  let surface=parts[0].toLowerCase();
  if(parts.length===2){
    code=normaliseChromeCode(parts[0]);
    surface=parts[1].toLowerCase();
    if(!LOCALES[code])return null;
  }
  if(!CHROME_SURFACES.includes(surface))return null;
  if(code==='en'&&parts.length===2&&parts[0].toLowerCase()==='en')return{redirect:`/${surface}/`};
  const canonical=chromePath(code,surface);
  return{code,surface,redirect:pathname===canonical?null:canonical};
}

function escapeHtml(value=''){return String(value).replace(/[&<>"']/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));}

export function renderChromeMain(code,surface){
  const copy=CHROME_LOCALES[code]||CHROME_LOCALES.en;
  if(surface==='support'){
    const s=copy.support;
    return `<p class="chrome-kicker">${escapeHtml(s.kicker)}</p><h1>${escapeHtml(s.title)}</h1><p class="chrome-lead">${escapeHtml(s.lead)}</p><section class="support-block"><h2>${escapeHtml(s.linesTitle)}</h2><p>${escapeHtml(s.lines)}</p></section><section class="support-block"><h2>${escapeHtml(s.companyTitle)}</h2><p>${escapeHtml(s.company)}</p></section><section class="support-block"><h2>${escapeHtml(s.founderTitle)}</h2><p>${escapeHtml(s.founder)}</p><p>${escapeHtml(s.channels)}</p><p>${escapeHtml(s.legal)}</p></section>`;
  }
  if(surface==='legal'){
    const l=copy.legal;
    return `<p class="chrome-kicker">${escapeHtml(l.kicker)}</p><h1>${escapeHtml(l.title)}</h1><p class="chrome-lead">${escapeHtml(l.lead)}</p><div class="legal-grid"><a href="${escapeHtml(legalPolicyPath(code,'privacy'))}"><h2>${escapeHtml(l.privacyTitle)}</h2><p>${escapeHtml(l.privacyText)}</p></a><a href="${escapeHtml(legalPolicyPath(code,'security'))}"><h2>${escapeHtml(l.securityTitle)}</h2><p>${escapeHtml(l.securityText)}</p></a><a href="${escapeHtml(legalPolicyPath(code,'cookies'))}"><h2>${escapeHtml(l.cookiesTitle)}</h2><p>${escapeHtml(l.cookiesText)}</p></a></div>`;
  }
  const n=copy.news;
  return `<p class="chrome-kicker">${escapeHtml(n.kicker)}</p><h1>${escapeHtml(n.title)}</h1><p class="chrome-lead">${escapeHtml(n.lead)}</p><article class="news-card"><time datetime="${escapeHtml(n.date)}">${escapeHtml(n.date)}</time><h2>${escapeHtml(n.itemTitle)}</h2><p>${escapeHtml(n.pause)}</p><p>${escapeHtml(n.snapshot)}</p><p>${escapeHtml(n.outages)}</p><p>${escapeHtml(n.models)}</p><p><a href="${escapeHtml(n.anchorHref)}">${escapeHtml(n.anchorLabel)}</a></p></article><article class="news-card"><time datetime="${escapeHtml(n.rebootDate)}">${escapeHtml(n.rebootDate)}</time><h2>${escapeHtml(n.rebootTitle)}</h2><p>${escapeHtml(n.reboot)}</p></article><article class="news-card news-grant"><h2>${escapeHtml(n.grantTitle)}</h2><p>${escapeHtml(n.grant)}</p></article><article class="news-card"><h2>${escapeHtml(n.productsTitle)}</h2><p>${escapeHtml(n.products)}</p></article>`;
}

export function chromeHreflangMarkup(origin,surface){
  const links=CHROME_LOCALE_META.map(meta=>`  <link rel="alternate" hreflang="${meta.locale}" href="${origin}${chromePath(meta.code,surface)}">`);
  links.push(`  <link rel="alternate" hreflang="x-default" href="${origin}${chromePath('en',surface)}">`);
  return links.join('\n');
}

export function replaceChromeDocument(html,{code,surface,origin}){
  const meta=LOCALES[code];
  const copy=CHROME_LOCALES[code]||CHROME_LOCALES.en;
  const page=copy[surface]||copy.news;
  const canonical=`${origin}${chromePath(code,surface)}`;
  const home=chromePath(code,'home');
  const news=chromePath(code,'news');
  const support=chromePath(code,'support');
  const legal=chromePath(code,'legal');
  return html
    .replace(/<html\b[^>]*>/i,`<html lang="${meta.locale}"${meta.dir==='rtl'?' dir="rtl"':''} data-site="community" data-locale="${code}" data-chrome-surface="${surface}">`)
    .replace(/<title>[^<]*<\/title>/,`<title>${escapeHtml(page.metaTitle)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(">)/,`$1${escapeHtml(page.metaDescription)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(">)/,`$1${escapeHtml(page.metaTitle)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(">)/,`$1${escapeHtml(page.metaDescription)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(">)/,`$1${canonical}$2`)
    .replace(/(<meta property="og:locale" content=")[^"]*(">)/,`$1${meta.locale.replace('-','_')}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(">)/,`$1${canonical}$2`)
    .replace('  <meta name="claryel-hreflang-placeholder" content="">',chromeHreflangMarkup(origin,surface))
    .replace(/data-chrome-home href="[^"]*"/,`data-chrome-home href="${home}"`)
    .replace(/<a data-nav="home" href="[^"]*">[^<]*<\/a>/,`<a data-nav="home" href="${home}">${escapeHtml(copy.nav.home)}</a>`)
    .replace(/<a data-nav="news" href="[^"]*">[^<]*<\/a>/,`<a data-nav="news" href="${news}"${surface==='news'?' aria-current="page"':''}>${escapeHtml(copy.nav.news)}</a>`)
    .replace(/<a data-nav="support" href="[^"]*">[^<]*<\/a>/,`<a data-nav="support" href="${support}"${surface==='support'?' aria-current="page"':''}>${escapeHtml(copy.nav.support)}</a>`)
    .replace(/<a data-nav="privacy" href="[^"]*">[^<]*<\/a>/,`<a data-nav="privacy" href="${legal}"${surface==='legal'?' aria-current="page"':''}>${escapeHtml(copy.nav.privacy)}</a>`)
    .replace('<main id="chromeMain" class="chrome-main"></main>',`<main id="chromeMain" class="chrome-main">${renderChromeMain(code,surface)}</main>`);
}

export function localizePresentationNav(html,code){
  const copy=CHROME_LOCALES[code]||CHROME_LOCALES.en;
  const home=chromePath(code,'home');
  const news=chromePath(code,'news');
  const support=chromePath(code,'support');
  const legal=chromePath(code,'legal');
  return html
    .replace(/<a class="compact-brand" href="[^"]*"/,`<a class="compact-brand" href="${home}"`)
    .replace(/<a data-nav="home" href="[^"]*">[^<]*<\/a>/,`<a data-nav="home" href="${home}" aria-current="page">${escapeHtml(copy.nav.home)}</a>`)
    .replace(/<a data-nav="news" href="[^"]*">[^<]*<\/a>/,`<a data-nav="news" href="${news}">${escapeHtml(copy.nav.news)}</a>`)
    .replace(/<a data-nav="support" href="[^"]*">[^<]*<\/a>/,`<a data-nav="support" href="${support}">${escapeHtml(copy.nav.support)}</a>`)
    .replace(/<a data-nav="privacy" href="[^"]*">[^<]*<\/a>/,`<a data-nav="privacy" href="${legal}">${escapeHtml(copy.nav.privacy)}</a>`);
}

export function chromeSitemapPaths(){
  return CHROME_SURFACES.flatMap(surface=>CHROME_LOCALE_META.map(meta=>chromePath(meta.code,surface)));
}
