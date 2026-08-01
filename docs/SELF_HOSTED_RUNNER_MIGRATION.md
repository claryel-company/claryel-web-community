# GitHub Actions execution policy

Status: deployed and hardened.

`claryel-web-community` is a public repository. Every workflow in this repository remains on isolated GitHub-hosted runners so fork-controlled workflow changes cannot reach a persistent CLARYEL machine, the Ubuntu Station local network, or long-lived runner state.

Trusted production mutation is delegated to protected workflows in the private `claryel-space` repository. Public pull requests and public branch maintenance therefore retain reproducible validation without exposing CLARYEL self-hosted infrastructure.

A future `claryel-public-safe` runner may be introduced only as an ephemeral, one-job environment with no local-network access and no retained workspace. Until that isolation exists and is verified, persistent self-hosted runners are prohibited for this repository.
