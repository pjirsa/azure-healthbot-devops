![build badge](https://github.com/pjirsa/azure-healthbot-devops/workflows/main/badge.svg)

# Azure Healthbot Scenario DevOps
Sample template repo using custom github action to push scenarios via Scenario Management API

## Contents
- [template.json](./template.json) file containing 2 example Healthbot scenario templates
- [.github/workflows/main.yml](./.github/workflows/main.yml) workflow demonstrating use of [healthbot-template-push](https://github.com/pjirsa/healthbot-template-push) github action to upload scenario templates to Azure Healthbot.

\* Use Github secrets to define `TENANT_NAME` and `API_KEY` for your specific Azure Healthbot instance

Update 1
