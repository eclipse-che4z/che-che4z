/**
 * Copyright (c) 2021 Broadcom.
 * The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.


 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/

 * SPDX-License-Identifier: EPL-2.0

 * Contributors:
 *  Broadcom, Inc. - initial API and implementation
 */

/* eslint-disable @typescript-eslint/no-namespace */

/// <reference types="cypress" />

//@ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { USER, PASS, CICSAPPLID, INTERTESTPORT, CONVJCL, ORIGJCL } = require('./cypressEnv');

const rawTypeString = (str: string) => str.replace(/{/g, '{{}'); // Types the literal { key

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Read and write JSON file
     * Copy from test_files/project/dap/ specific launch json file
     * and paste to .theia/launch.json
     * @example cy.readAndWriteJsonFile('TEST')
     */
    readAndWriteJsonFile(expression: string): Chainable<any>;
  }
}
Cypress.Commands.add('readAndWriteJsonFile', (expression: string) => {
  cy.readFile(`test_files/project/dap/${expression}.launch.json`).then((content) => {
    content.configurations[0].interTestUserName = USER;
    // @ts-ignore
    cy.updateParams(content);
    cy.writeFile('test_files/project/.theia/launch.json', content);
    cy.writeFile('test_files/project/.vscode/launch.json', content);
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    updateParams(content: any): Chainable<any>;
  }
}
Cypress.Commands.add('updateParams', (content: any) => {
  if (INTERTESTPORT) {
    content.configurations[0].interTestPort = INTERTESTPORT;
  }

  const type = content.configurations[0].type;
  switch (type) {
    case 'intertest-cics':
      if (CICSAPPLID) {
        content.configurations[0].cicsApplId = CICSAPPLID;
      }
      break;
    case 'intertest-batch':
      if (CONVJCL) {
        content.configurations[0].convertedJCL = CONVJCL;
      }
      if (ORIGJCL) {
        content.configurations[0].originalJCL.inDSN = ORIGJCL;
      }
      break;
  }
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Read and write JSON file with Multiuser
     * Copy from test_files/project/dap/ specific launch json file
     * and paste to .theia/launch.json
     * @example cy.readAndWriteJsonFile('MULTIUSER', USER1)
     */
    readAndWriteJsonFileMultiuser(expression: string, user: string): Chainable<any>;
  }
}
Cypress.Commands.add('readAndWriteJsonFileMultiuser', (expression: string, cicsUser: string) => {
  cy.readFile(`test_files/project/dap/${expression}.launch.json`).then((content) => {
    content.configurations[0].interTestUserName = USER;
    content.configurations[0].cicsUserId = cicsUser;
    // @ts-ignore
    cy.updateParams(content);
    cy.writeFile('test_files/project/.theia/launch.json', content);
    cy.writeFile('test_files/project/.vscode/launch.json', content);
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Press on F1 key
     *
     * @example cy.F1()
     */
    F1(): Chainable<any>;
  }
}
Cypress.Commands.add('F1', () => {
  cy.get('body').trigger('keydown', { key: 'F1', code: 'F1' });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Convert JCL with Batch
     *
     * @example cy.convertJCL()
     */
    convertJCL(): Chainable<any>;
  }
}
Cypress.Commands.add('convertJCL', () => {
  //@ts-ignore
  cy.F1();
  cy.get('.quick-open-input input').as('quickOpen').type('Batch: Convert JCL').type('{enter}').wait(500);
  cy.get('@quickOpen')
    .type(PASS, { log: false, delay: 200 })
    .then(($input) => {
      if ($input.val() !== PASS) {
        throw new Error('Different value of typed password');
      }
    })
    .type('{enter}');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Fetch Extended Sources, specify the PROGRAM name.
     *
     * @example cy.fetchExtendedSources('TEST.cbl')
     */
    fetchExtendedSources(programName: string): Chainable<any>;
  }
}
Cypress.Commands.add('fetchExtendedSources', (programName: string) => {
  cy.task('isFileExists', `test_files/project/.c4z/.extsrcs/${programName}`).then((exists) => {
    if (!exists) {
      //@ts-ignore
      cy.F1();
      cy.get('.quick-open-input input').as('quickOpen').type('Fetch Extended Sources').type('{enter}').wait(500);
      cy.get('@quickOpen')
        .type(PASS, { log: false, delay: 200 })
        .then(($input) => {
          if ($input.val() !== PASS) {
            throw new Error('Different value of typed password');
          }
        })
        .type('{enter}');
      cy.readFile(`test_files/project/.c4z/.extsrcs/${programName}`);
    } else {
      cy.openFolder('.c4z/.extsrcs').openFile(`${programName}`);
    }
    //@ts-ignore
    cy.openDapPanel();
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Press on F5
     *
     * @example cy.F5()
     */
    F5(): Chainable<any>;
  }
}
Cypress.Commands.add('F5', () => {
  cy.get('body').trigger('keydown', { key: 'F5', code: 'F5' });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Start a debug session without password
     * Add a program name to verify it in debug configuration
     *
     * @example cy.startDebugSession('TEST')
     */
    startDebugSession(expression: string): Chainable<any>;
  }
}
Cypress.Commands.add('startDebugSession', (expression: string) => {
  //@ts-ignore
  cy.readAndWriteJsonFile(expression);
  //@ts-ignore
  cy.F5();
  cy.get('.theia-select.debug-configuration').contains(expression);
  cy.get('body.theia-mod-debugging', { timeout: 50000 });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Start a debug session with password
     * Add a program name to verify it in debug configuration
     *
     * @example cy.startDebugSessionPassowrd('TEST')
     */
    startDebugSessionPassword(expression: string): Chainable<any>;
  }
}
Cypress.Commands.add('startDebugSessionPassword', (expression: string) => {
  //@ts-ignore
  cy.readAndWriteJsonFile(expression);
  //@ts-ignore
  cy.F5();
  cy.get('.quick-open-input input')
    .type(PASS, { log: false, delay: 200 })
    .then(($input) => {
      if ($input.val() !== PASS) {
        throw new Error('Different value of typed password');
      }
    })
    .type('{enter}');
  cy.get('.theia-select.debug-configuration').contains(expression);
  cy.get('body.theia-mod-debugging', { timeout: 50000 }).wait(500);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Start a debug session with password
     * Add a program name to verify it in debug configuration
     *
     * @example cy.startDebugSessionMultiuser('MULTIUSER1', CICSPASS1, CICSUSER1);
     */
    startDebugSessionMultiuser(expression: string, pass: string, user: string): Chainable<any>;
  }
}
Cypress.Commands.add('startDebugSessionMultiuser', (expression: string, cicspass: string, cicsuser: string) => {
  //@ts-ignore
  cy.readAndWriteJsonFileMultiuser(expression, cicsuser);
  //@ts-ignore
  cy.openDapPanel();
  //@ts-ignore
  cy.clickOnStartDebug();
  cy.get('.quick-open-input input')
    .type(PASS, { log: false, delay: 200 })
    .type('{enter}')
    .type(cicspass, { log: false, delay: 200 })
    .type('{enter}');
  cy.get('.theia-select.debug-configuration').contains(expression);
  cy.get('body.theia-mod-debugging', { timeout: 50000 }).wait(500);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Start a debug session with password
     * Add a program name to verify it in debug configuration
     *
     * @example cy.startDebugSessionMultiuser2('MULTIUSER2', CICSPASS2, CICSUSER2);
     */
    startDebugSessionMultiuser2(expression: string, pass: string, user: string): Chainable<any>;
  }
}
Cypress.Commands.add('startDebugSessionMultiuser2', (expression: string, pass: string, cicsuser: string) => {
  //@ts-ignore
  cy.readAndWriteJsonFileMultiuser(expression, cicsuser);
  //@ts-ignore
  cy.openDapPanel();
  //@ts-ignore
  cy.clickOnStartDebug();
  cy.get('.theia-select.debug-configuration').contains(expression);
  cy.get('body.theia-mod-debugging', { timeout: 50000 }).wait(500);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Get current line when debugging (i.e. where yellow line appears).
     *
     * @example cy.getCurrentDebugLineNumber().should('eq', 42)
     */
    getCurrentDebugLineNumber(): Chainable<any>;
  }
}
Cypress.Commands.add('getCurrentDebugLineNumber', () => {
  cy.get('.theia-editor')
    .not('.p-mod-hidden')
    .find('.theia-debug-top-stack-frame-line')
    .parent()
    .should('have.css', 'top')
    .then((top) => {
      cy.get('.theia-editor')
        .not('.p-mod-hidden')
        .find('.line-numbers')
        .parent(`[style*="top:${top}"]`)
        .invoke('text')
        .then(parseFloat);
    });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Put a breakpoint at specific line
     *
     * @example cy.putBreakpointAtLine(10)
     */
    putBreakpointAtLine(lineNumber: number): Chainable<any>;
  }
}
Cypress.Commands.add('putBreakpointAtLine', (lineNumber: number) => {
  const lineNumberRegex = RegExp(`^${lineNumber}$`);
  cy.goToLine(lineNumber);
  cy.get('.line-numbers').contains(lineNumberRegex).parent().click('left', { force: true });
  cy.get('.line-numbers').contains(lineNumberRegex).parent().find('.codicon.theia-debug-breakpoint');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Remove a breakpoint at specific line
     *
     * @example cy.removeBreakpoint(10)
     */
    removeBreakpoint(lineNumber: number): Chainable<any>;
  }
}
Cypress.Commands.add('removeBreakpoint', (lineNumber: number) => {
  const lineNumberRegex = RegExp(`^${lineNumber}$`);
  cy.get('.line-numbers').contains(lineNumberRegex).parent().find('.codicon.theia-debug-breakpoint').click();
  cy.get('.line-numbers')
    .contains(lineNumberRegex)
    .parent()
    .find('.codicon.theia-debug-breakpoint')
    .should('not.exist');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Edit a breakpoint at specific line
     *
     * @example cy.editBreakpointExpression(10, "NUMB = p'5'")
     */
    editBreakpointExpression(lineNumber: number, expression: string): Chainable<any>;
  }
}
Cypress.Commands.add('editBreakpointExpression', (lineNumber: number, expression: string) => {
  const lineNumberRegex = RegExp(`^${lineNumber}$`);
  cy.get('.line-numbers')
    .contains(lineNumberRegex)
    .parent()
    .rightclick('left', { force: true })
    .get('.p-Menu-itemLabel')
    .contains('Edit Breakpoint...')
    .click();
  cy.get('.zone-widget-container.theia-debug-breakpoint-widget')
    .find('.theia-debug-breakpoint-input')
    .type(`{selectall}{backspace}${expression}`)
    .type('{enter}');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Add aconditional breakpoint at specific line
     *
     * @example cy.addConditionalBreakpoint(10, "NUMB = p'5'")
     */
    addConditionalBreakpoint(lineNumber: number, expression: string): Chainable<any>;
  }
}
Cypress.Commands.add('addConditionalBreakpoint', (lineNumber: number, expression: string) => {
  const lineNumberRegex = RegExp(`^${lineNumber}$`);
  cy.get('.line-numbers')
    .contains(lineNumberRegex)
    .parent()
    .rightclick('left', { force: true })
    .get('.p-Menu-itemLabel')
    .contains('Add Conditional Breakpoint...')
    .click();
  cy.get('.zone-widget-container.theia-debug-breakpoint-widget')
    .find('.theia-debug-breakpoint-input')
    .type(expression)
    .type('{enter}');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Edit a breakpoint at specific line "Hit Count"
     *
     * @example cy.editBreakpointHitCount(10, "NUMB = p'5'")
     */
    editBreakpointHitCount(lineNumber: number, expression: string): Chainable<any>;
  }
}
Cypress.Commands.add('editBreakpointHitCount', (lineNumber: number, expression: string) => {
  const lineNumberRegex = RegExp(`^${lineNumber}$`);
  cy.get('.line-numbers')
    .contains(lineNumberRegex)
    .parent()
    .rightclick('left', { force: true })
    .get('.p-Menu-itemLabel')
    .contains('Edit Breakpoint...')
    .click();
  cy.get('.theia-debug-breakpoint-select select').select('Hit Count');
  cy.get('.zone-widget-container.theia-debug-breakpoint-widget')
    .find('.theia-debug-breakpoint-input')
    .type(expression)
    .type('{enter}');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Edit a breakpoint at specific line "Log Message"
     *
     * @example cy.editBreakpointLogMessage(10, "I am here with FACT: {FACT} and NUM: {NUM}")
     */
    editBreakpointLogMessage(lineNumber: number, expression: string): Chainable<any>;
  }
}
Cypress.Commands.add('editBreakpointLogMessage', (lineNumber: number, expression: string) => {
  const lineNumberRegex = RegExp(`^${lineNumber}$`);
  cy.get('.line-numbers')
    .contains(lineNumberRegex)
    .parent()
    .rightclick('left', { force: true })
    .get('.p-Menu-itemLabel')
    .contains('Edit Breakpoint...')
    .click();
  cy.get('.theia-debug-breakpoint-select select').select('Log Message');
  cy.get('.zone-widget-container.theia-debug-breakpoint-widget')
    .find('.theia-debug-breakpoint-input')
    .type(rawTypeString(expression), { delay: 100 })
    .type('{enter}');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on 'Continue'
     *
     * @example cy.clickOnContinue()
     */
    clickOnContinue(): Chainable<any>;
  }
}
Cypress.Commands.add('clickOnContinue', () => {
  cy.get(`[id^="debug:toolbar"] .debug-action.theia-debug-continue`)
    .should('not.have.class', 'theia-mod-disabled')
    .click()
    .click()
    .wait(2000);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on 'Start Debugging'
     *
     * @example cy.clickOnStartDebug()
     */
    clickOnStartDebug(): Chainable<any>;
  }
}
Cypress.Commands.add('clickOnStartDebug', () => {
  cy.get(`[id^="debug"] .debug-action.theia-debug-start`).should('not.have.class', 'theia-mod-disabled').click();
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on 'Step Over'
     *
     * @example cy.clickOnStepOver()
     */
    clickOnStepOver(): Chainable<any>;
  }
}
Cypress.Commands.add('clickOnStepOver', () => {
  cy.get('[id^="debug:toolbar"] .debug-action.theia-debug-step-over')
    .should('not.have.class', 'theia-mod-disabled')
    .click()
    .click()
    .wait(2000);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on 'Step Into'
     *
     * @example cy.clickOnStepInto()
     */
    clickOnStepInto(): Chainable<any>;
  }
}
Cypress.Commands.add('clickOnStepInto', () => {
  cy.get(`[id^="debug:toolbar"] .debug-action.theia-debug-step-into`)
    .should('not.have.class', 'theia-mod-disabled')
    .click()
    .click()
    .wait(2000);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on 'Step Out'
     *
     * @example cy.clickOnStepOut()
     */
    clickOnStepOut(): Chainable<any>;
  }
}
Cypress.Commands.add('clickOnStepOut', () => {
  cy.get(`[id^="debug:toolbar"] .debug-action.theia-debug-step-out`)
    .should('not.have.class', 'theia-mod-disabled')
    .click()
    .click()
    .wait(2000);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on 'Restart'
     *
     * @example cy.clickOnRestart()
     */
    clickOnRestart(): Chainable<any>;
  }
}
Cypress.Commands.add('clickOnRestart', () => {
  cy.get(`[id^="debug:toolbar"] .debug-action.theia-debug-restart`)
    .should('not.have.class', 'theia-mod-disabled')
    .click()
    .click()
    .wait(2000);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on 'Stop'
     *
     * @example cy.clickOnStop()
     */
    clickOnStop(): Chainable<any>;
  }
}
Cypress.Commands.add('clickOnStop', () => {
  cy.get(`[id^="debug:toolbar"] .debug-action.theia-debug-stop`).click({ force: true });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Open DAP panel.
     *
     * @example cy.openDapPanel()
     */
    openDapPanel(): Chainable<any>;
  }
}
Cypress.Commands.add('openDapPanel', () => {
  cy.get('#theia-left-right-split-panel').then(($theia) => {
    if (
      $theia.find('#theia-left-content-panel.theia-mod-collapsed').length ||
      $theia.find('#debug.theia-debug-container.p-mod-hidden').length
    ) {
      cy.get('#shell-tab-debug').click({ force: true });
    }
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Close DAP panel.
     *
     * @example cy.closeDapPanel()
     */
    openDapPanel(): Chainable<any>;
  }
}
Cypress.Commands.add('closeDapPanel', () => {
  cy.get('#shell-tab-debug').click({ force: true });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Invoke Debug Console.
     *
     * @example cy.debugConsole().contains('TEST')
     */
    debugConsole(): Chainable<any>;
  }
}
Cypress.Commands.add('debugConsole', () => {
  cy.get('.theia-console-ansi-console-item');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Clear Debug Console.
     *
     * @example cy.clearConsole()
     */
    clearConsole(): Chainable<any>;
  }
}
Cypress.Commands.add('clearConsole', () => {
  cy.get('#debug\\.console\\.clear').click({ force: true });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Remove all breakpoints
     *
     * @example cy.removeAllBreakpoints()
     */
    removeAllBreakpoints(): Chainable<any>;
  }
}
Cypress.Commands.add('removeAllBreakpoints', () => {
  cy.get('[id*="debug:view-container"][id*="debug:breakpoints"]').trigger('mousedown').click();
  cy.get('#debug\\.breakpoint\\.removeAll').click({ force: true });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Change variables value
     *
     * @example cy.changeVariableValue('NUMB', 5)
     */
    //@ts-ignore
    changeVariableValue(variable, numb): Chainable<any>;
  }
}
Cypress.Commands.add('changeVariableValue', (variable, numb) => {
  cy.get('[id*="debug:view-container"][id*="debug:variables"]').as('variablePanel');
  cy.get('@variablePanel').click();
  cy.get('@variablePanel').contains('Locals').click().wait(500);
  cy.get('@variablePanel').contains(variable).dblclick();
  cy.get('.dialogContent').find('.theia-input').type(numb).type('{enter}');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Change variables value
     *
     * @example cy.changeVariableValueSecondLevel('TASK-STRUCTURE', 'TASKNUM', '5');
     */
    //@ts-ignore
    changeVariableValue(folder, variable, numb): Chainable<any>;
  }
}
Cypress.Commands.add('changeVariableValueSecondLevel', (folder, variable, numb) => {
  cy.get('[id*="debug:view-container"][id*="debug:variables"]').as('variablePanel');
  cy.get('@variablePanel').click();
  cy.get('@variablePanel').contains('Locals').click().wait(500);
  cy.get('@variablePanel').contains(folder).click().wait(500);
  cy.get('@variablePanel').contains(variable).dblclick();
  cy.get('.dialogContent').find('.theia-input').type(numb).type('{enter}');
});
declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Check variables value
     *
     * @example cy.checkVariableValue('NUMB', 5)
     */
    //@ts-ignore
    checkVariableValue(variable, numb): Chainable<any>;
  }
}
Cypress.Commands.add('checkVariableValue', (variable, numb) => {
  cy.get('[id*="debug:view-container"][id*="debug:variables"]').as('variablePanel');
  cy.get('@variablePanel').click();
  cy.get('@variablePanel').contains('Locals').click().wait(500);
  cy.get(`.theia-debug-console-variable [title="${variable}"]`).siblings().contains(numb);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Check variables value
     *
     * @example cy.checkVariableValueSecondLevel('TEST-1', 'COMP-CODE', 5);
     */
    //@ts-ignore
    checkVariableValueSecondLevel(var1, var2, numb): Chainable<any>;
  }
}
Cypress.Commands.add('checkVariableValueSecondLevel', (var1, var2, numb) => {
  cy.get('[id*="debug:view-container"][id*="debug:variables"]').as('variablePanel');
  cy.get('@variablePanel').click();
  cy.get('@variablePanel').contains('Locals').wait(500);
  cy.get('@variablePanel').contains(var1).click().wait(500);
  cy.get(`.theia-debug-console-variable [title="${var2}"]`).siblings().should('contain', numb);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Run /trace command in debug console
     *
     * @example cy.theiaTrace()
     */
    theiaTrace(): Chainable<any>;
  }
}
Cypress.Commands.add('theiaTrace', () => {
  cy.get('.p-Widget .theia-console-input').type('/trace{enter}');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Gain output from debug comsole after running some debug command
     *
     * @example cy.debugExpressionOutput('foobar')
     */
    debugExpressionOutput(text: string): Chainable<any>;
  }
}
Cypress.Commands.add('debugExpressionOutput', (text) => {
  cy.get('.theia-debug-console-expression').contains(text);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Run /trace off command in debug console
     *
     * @example cy.traceOff()
     */
    traceOff(): Chainable<any>;
  }
}
Cypress.Commands.add('traceOff', () => {
  cy.get('.p-Widget .theia-console-input').type('/trace off{enter}');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Run /trace on command in debug console
     *
     * @example cy.traceOn()
     */
    traceOn(): Chainable<any>;
  }
}
Cypress.Commands.add('traceOn', () => {
  cy.get('.p-Widget .theia-console-input').type('/trace on{enter}');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Run /calltrace on command in debug console
     *
     * @example cy.callTraceOn()
     */
    callTraceOn(): Chainable<any>;
  }
}
Cypress.Commands.add('callTraceOn', () => {
  cy.get('.p-Widget .theia-console-input').type('/calltrace on{enter}');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Run /calltrace off command in debug console
     *
     * @example cy.callTraceOff()
     */
    callTraceOff(): Chainable<any>;
  }
}
Cypress.Commands.add('callTraceOff', () => {
  cy.get('.p-Widget .theia-console-input').type('/calltrace off{enter}');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Retrieve the call trace info
     *
     * @example cy.callTraceItem('SOME_PROGRAM:22')
     */
    callTraceItem(callTraceName: string): Chainable<any>;
  }
}
Cypress.Commands.add('callTraceItem', (callTraceName) => {
  cy.get('[id*="debug:view-container"][id*="debug:frames"]').as('variablePanel').contains(callTraceName);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Fetch multiple sources
     *
     * @example cy.fetchMultipleSources(
        'Extended source for PROGRAM1 was fetched successfully.',
        'Extended source for PROGRAM2 was fetched successfully.',
      );
     */
    //@ts-ignore
    fetchMultipleSources(message: string): Chainable<any>;
  }
}
Cypress.Commands.add('fetchMultipleSources', (popups) => {
  cy.F1();
  cy.get('.quick-open-input input').as('quickOpen').type('Fetch Extended Sources').type('{enter}').wait(500);
  cy.get('@quickOpen')
    .type(PASS, { log: false, delay: 200 })
    .then(($input) => {
      if ($input.val() !== PASS) {
        throw new Error('Different value of typed password');
      }
    })
    .type('{enter}');
  cy.get('.theia-notification-list').should(($content) => {
    [popups].forEach((message) => {
      expect($content).to.contain.text(message);
    });
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Expand View for statement trace data
     *
     * @example cy.expandStatementTrace();
     */
    //@ts-ignore
    expandStatementTrace(): Chainable<any>;
  }
}
Cypress.Commands.add('expandStatementTrace', () => {
  cy.get('[id*="debug:view-container"][id*="plugin-view:statementTrace"]').click();
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * View for statement trace data
     *
     * @example cy.statementTrace('DECUPGMB:23  IF NUMB = 0 DECUPGMB:22  MOVE NUMB TO NUM.');
     */
    //@ts-ignore
    statementTrace(statementTraceName: string): Chainable<any>;
  }
}
Cypress.Commands.add('statementTrace', (statementTraceName) => {
  cy.get('[id*="debug:view-container"][id*="plugin-view:statementTrace"]').contains(statementTraceName);
});
