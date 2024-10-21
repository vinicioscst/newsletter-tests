# Newsletter (Tests) &middot; ![Runtime: NodeJs](https://img.shields.io/badge/Node_JS-5FA04E?logo=nodedotjs&logoColor=ffffff) ![Tool: Cypress](https://img.shields.io/badge/Cypress-007780?logo=cypress&logoColor=ffffff)

[**Leia em Português**](README.md)

## 🔗 Table of Contents

1. [The Study](#-the-study)
2. [Technology](#-technology)
3. [Project Structure](#%EF%B8%8F-project-structure)
4. [Getting Started](#-getting-started)
5. [The Tests](#-the-tests)
6. [CI](#-ci)
7. [License](#%EF%B8%8F-license)

## 📙 The Study

> These E2E tests were created for the [**Newsletter project**](https://github.com/vinicioscst/newsletter-front), aiming to begin studies in the testing area of applications.

## 💻 Technology

- **Tool** - [Cypress](https://www.cypress.io/)

## 🗂️ Project Structure

```bash
📦 project-root
├── 📁 .github
│   ├── 📁 workflows        # Where CI configuration is stored
├── 📁 cypress
│   ├── 📁 e2e              # Where the tests are stored
│   ├── 📁 support          # Where custom test commands are stored
```

## 🚀 Getting Started

```bash
# Clone the project

git clone https://github.com/vinicioscst/newsletter-tests.git

# Install the dependencies

npm install

# Create the .env file and fill in the details correctly

CYPRESS_BASE_URL=               # The address where your application is running (usually http://localhost:8000)
CYPRESS_API_BASEURL=            # The address where your API is running (usually http://localhost:3000)
CYPRESS_LOGIN_EMAIL=            # Your login email for the admin panel
CYPRESS_LOGIN_PASSWORD=         # Your login password for the admin panel
CYPRESS_ARTICLE_TITLE=          # A snippet or the full title of an article present in your database
                                # (if there are no articles, generate them and update this variable)

# Run the application

npm run cy:open
```

## ✅ The Tests

> [!IMPORTANT]
> Ensure that both the front-end application and the API are running locally before proceeding with the next steps

When the Cypress window opens, select the `E2E Testing` option. After that, choose the browser you want to use for the tests (or Electron, if you prefer to test in a separate window) and click `Start E2E Testing in XXX`.

If everything is set up correctly, a list of available tests will appear, including:

- dashboard.cy.js (Admin panel tests)
- home.cy.js (Home page tests)
- login.cy.js (Login page test)

Just choose one to start running the tests.

## 🔁 CI

> [!NOTE]
> Temporarily disabled due to missing configurations and additional fixes

## ©️ License

This project is under the [MIT license](LICENSE)
