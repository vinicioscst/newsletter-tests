# Newsletter (Testes) &middot; ![Runtime: NodeJs](https://img.shields.io/badge/Node_JS-5FA04E?logo=nodedotjs&logoColor=ffffff) ![Ferramenta: Cypress](https://img.shields.io/badge/Cypress-007780?logo=cypress&logoColor=ffffff)

[**Read in English**](README.en.md)

## 🔗 Índice

1. [O estudo](#-o-estudo)
2. [Tecnologia](#-tecnologia)
3. [Estrutura do projeto](#%EF%B8%8F-estrutura-do-projeto)
4. [Primeiros passos](#-primeiros-passos)
5. [Os testes](#-os-testes)
6. [CI](#-ci)
7. [Licença](#%EF%B8%8F-licen%C3%A7a)

## 📙 O estudo

> Esses testes E2E foram criados para o [**projeto Newsletter**](https://github.com/vinicioscst/newsletter-front), com o intuito de iniciar os estudos na parte de testes das aplicações.

## 💻 Tecnologia

- **Ferramenta** - [Cypress](https://www.cypress.io/)

## 🗂️ Estrutura do projeto

```bash
📦 raiz-do-projeto
├── 📁 .github
│   ├── 📁 workflows        # Onde ficam a configuração de CI
├── 📁 cypress
│   ├── 📁 e2e              # Onde ficam os testes
│   ├── 📁 support          # Onde ficam os comandos de teste personalizados
```

## 🚀 Primeiros passos

```bash
# Clone o projeto

git clone https://github.com/vinicioscst/newsletter-tests.git

# Instale as dependências

npm install

# Crie o arquivo .env e preencha os dados corretamente

CYPRESS_BASE_URL=               # O endereço onde sua aplicação está rodando (normalmente http://localhost:8000)
CYPRESS_API_BASEURL=            # O endereço onde sua API está rodando (normalmente http://localhost:3000)
CYPRESS_LOGIN_EMAIL=            # Seu email de login no painel de administrador
CYPRESS_LOGIN_PASSWORD=         # Sua senha de login no painel de administrador
CYPRESS_ARTICLE_TITLE=          # Trecho ou título completo de uma matéria presente no seu banco de dados
                                # (se não existirem notícias, gere-as e atualize essa variável)

# Rode a aplicação

npm run cy:open
```

## ✅ Os testes

> [!IMPORTANT]
> Tenha certeza que tanto a aplicação front-end quanto a API estão rodando localmente para seguir com os próximos passos

Ao abrir a janela do Cypress, selecione a opção `E2E Testing`. Após isso, selecione o navegador que quer utilizar para os testes (ou Electron, caso prefira testar em uma janela a parte) e clique e, `Start E2E Testing in XXX`.

Se tudo estiver configurado corretamente, aparecerá a lista de testes disponíveis, sendo eles:

- dashboard.cy.js (Testes do painel de administrador)
- home.cy.js (Testes da página inicial)
- login.cy.js (Teste da página de login)

Basta escolher um deles para começar a rodar os testes.

## 🔁 CI

> [!NOTE]
> Funcionalidade temporariamente desabilitada pois faltam configurações e correções adicionais

## ©️ Licença

Esse projeto está sob a [licença MIT](LICENSE)
