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
const {
  SYMDUMPHOST,
  SYMDUMPPASSWD,
  SYMDUMPPORT,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('./cypressEnv');

const { hostname } = new URL(SYMDUMPHOST);

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Add new connection
     *
     * @example cy.newConnection()
     */
    newConnection(): Chainable<any>;
  }
}
Cypress.Commands.add('newConnection', () => {
  cy.get('[id="__plugin-view-container:symdumpView_title:__plugin.view.title.action.symdump.newConnection"]').click();
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Find the input field
     *
     * @example cy.entryField()
     */
    entryField(): Chainable<any>;
  }
}
Cypress.Commands.add('entryField', () => {
  cy.get('.quick-open-input input');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Check the message in the popup
     *
     * @example cy.validationMsg('Enter a valid Symdump URL');
     */
    validationMsg(message: string): Chainable<any>;
  }
}
Cypress.Commands.add('validationMsg', (message) => {
  cy.get('.quick-open-tree').contains(message);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on SymDump icon to open it
     *
     * @example cy.openSymDump();
     */
    openSymDump(): Chainable<any>;
  }
}
Cypress.Commands.add('openSymDump', () => {
  cy.get('ul.p-TabBar-content li[id="shell-tab-plugin-view-container:symdumpView"]').click();
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Find SymDump panel
     *
     * @example cy.symDumpPanel();
     */
    symDumpPanel(): Chainable<any>;
  }
}
Cypress.Commands.add('symDumpPanel', () => {
  cy.get('[id="plugin-view-container:symdumpView"]');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Add new connection (putting host, port and password)
     *
     * @example cy.symDumpAddNewConnection();
     */
    symDumpAddNewConnection(): Chainable<any>;
  }
}
Cypress.Commands.add('symDumpAddNewConnection', () => {
  cy.newConnection();
  cy.entryField().as('quickOpen').type(SYMDUMPHOST).type('{enter}');
  cy.get('@quickOpen').type(SYMDUMPPORT).type('{enter}');
  cy.get('@quickOpen')
    .type(SYMDUMPPASSWD, { log: false, delay: 200 })
    .then(($input) => {
      if ($input.val() !== SYMDUMPPASSWD) {
        throw new Error('Different value of typed password');
      }
    })
    .type('{enter}')
    .type('{enter}');
  cy.connectionName();
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Get the connection name
     *
     * @example cy.connectionName();
     */
    connectionName(): Chainable<any>;
  }
}
Cypress.Commands.add('connectionName', () => {
  cy.get(`[id="/0:${hostname}:${SYMDUMPPORT}"]`);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on the connection name
     *
     * @example cy.clickOnConnectionName();
     */
    clickOnConnectionName(): Chainable<any>;
  }
}
Cypress.Commands.add('clickOnConnectionName', () => {
  cy.connectionName().trigger('mousedown').click();
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Delete the connection
     *
     * @example cy.deleteSymDumpConnection();
     */
    deleteSymDumpConnection(): Chainable<any>;
  }
}
Cypress.Commands.add('deleteSymDumpConnection', () => {
  cy.openSymDump();
  cy.symDumpPanel()
    .find('.theia-TreeNode')
    .then(($connection) => {
      if ($connection.find('[id="/0:No Connection"]').length) {
        console.log('Nothing to delete');
      } else {
        cy.symDumpPanel().type('{pageup}').type('{pageup}');
        cy.clickOnConnectionName();
        cy.get('[title*="Delete connection"]').click();
      }
    });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Add a Data Set
     *
     * @example cy.addDataSet('CDE.PROD.CAWORLD.PRTLIB');
     */
    addDataSet(DSNAME: string): Chainable<any>;
  }
}
Cypress.Commands.add('addDataSet', (DSNAME) => {
  cy.clickOnConnectionName();
  cy.get('[title*="Add dataset"]').click();
  cy.entryField().type(DSNAME).type('{enter}');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Get the Data Set ID
     *
     * @example cy.dataSet('CDE.PROD.CAWORLD.PRTLIB').click();
     */
    dataSet(DSNAME: string): Chainable<any>;
  }
}
Cypress.Commands.add('dataSet', (DSNAME) => {
  cy.get(`[id*="/0:${hostname}:${SYMDUMPPORT}/0:${DSNAME}"]`);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Load jobs
     *
     * @example cy.jobDump(dataSet, jobName).click().get('[title*="Load dump"]').click();
     */
    jobDump(DSNAME: string, jobName: string): Chainable<any>;
  }
}
Cypress.Commands.add('jobDump', (DSNAME, jobName) => {
  cy.get(`[id*="/0:${hostname}:${SYMDUMPPORT}/0:${DSNAME}/1:Job=${jobName}"]`);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on Load Dumps
     *
     * @example cy.loadDumps(dataSet);
     */
    loadDumps(DSNAME: string): Chainable<any>;
  }
}
Cypress.Commands.add('loadDumps', (DSNAME) => {
  cy.dataSet(DSNAME).trigger('mousedown').click();
  cy.get('[title*="Load dumps"]').click();
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on Load Dump
     *
     * @example cy.loadDump(dataSet);
     */
    loadDump(DSNAME: string): Chainable<any>;
  }
}
Cypress.Commands.add('loadDump', (DSNAME) => {
  cy.dataSet(DSNAME).trigger('mousedown').click();
  cy.get('[title*="Load dump"]').click();
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on Load Dump and check missing pop-up message
     *
     * @example cy.missingDumpMessage(dataSet);
     */
    missingDumpMessage(message: string): Chainable<any>;
  }
}
Cypress.Commands.add('missingDumpMessage', (message) => {
  cy.get('.theia-notification-list-item-content').should('contain', message);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Get Job's id
     *
     * @example cy.jobInTree();
     */
    jobInTree(dataSet: string, jobName: string): Chainable<any>;
  }
}
Cypress.Commands.add('jobInTree', (dataSet, jobName) => {
  cy.get(`[id="/0:${hostname}:${SYMDUMPPORT}/0:${dataSet}/1:Job=${jobName}"]`);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on Job
     *
     * @example cy.clickOnJob('CDE.PROD.CAWORLD.PRTLIB', "DAVSC01A CA32:S=0C7 2018/10/04 15.37");
     */
    clickOnJob(dataSet: string, jobName: string): Chainable<any>;
  }
}
Cypress.Commands.add('clickOnJob', (dataSet, jobName) => {
  cy.jobInTree(dataSet, jobName).click({ force: true });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Get Job's id
     *
     * @example cy.findDump(jobName, param);
     */
    findDump(dataSet: string, jobName: string, param: string): Chainable<any>;
  }
}
Cypress.Commands.add('findDump', (dataSet, jobName, param) => {
  cy.window().then(() => {
    cy.get(`[id="/0:${hostname}:${SYMDUMPPORT}/0:${dataSet}/1:Job=${jobName}${param}"]`);
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on found Dump
     *
     * @example cy.clickOnDump(dataSet, jobName, param);
     */
    clickOnDump(dataSet: string, jobName: string, param: string): Chainable<any>;
  }
}
Cypress.Commands.add('clickOnDump', (dataSet, jobName, param) => {
  cy.window().then(() => {
    cy.findDump(dataSet, jobName, param).click({ force: true });
  });
});
