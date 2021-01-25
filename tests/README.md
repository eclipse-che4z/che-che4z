# Custom Cypress commands for Theia IDE

These files (modules in `src` folder) can be used in Theia Automation (e.g., COBOL LS, Debugger for Mainframe, Control
Cobol Flow testing). You can easily import this library into your Cypress project. This library will add new functions
to your test suites for making Theia actions (such as `cy.openFile()`, `cy.goToLine()` etc.).

#### Prerequisite:

- Windows Environment
- Linux Environment

#### Install:

Inside your Cypress project (project with test suites) run

```
yarn add https://github.com/eclipse/che-che4z.git
```

Add the following line to your global configuration file:

```js
// usually cypress/support/index.js
import 'che-che4z/tests';
```
