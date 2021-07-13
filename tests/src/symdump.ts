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
  //@ts-ignore
  PASS,
  //@ts-ignore
  USER,
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
  cy.get('@quickOpen').type(USER).type('{enter}');
  cy.get('@quickOpen')
    .type(SYMDUMPPASSWD, { log: false, delay: 200 })
    .then(($input) => {
      if ($input.val() !== SYMDUMPPASSWD) {
        throw new Error('Different value of typed password');
      }
    })
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
  cy.get(`[title="http://${hostname}:${SYMDUMPPORT}"]`);
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
     * Delete the connection, data (host and port) are taken from your as-a file
     *
     * @example cy.deleteSymDumpConnectionDefault();
     */
    deleteSymDumpConnectionDefault(): Chainable<any>;
  }
}
Cypress.Commands.add('deleteSymDumpConnectionDefault', () => {
  cy.openSymDump();
  cy.get('[id="symdump"]').then(($connection) => {
    if ($connection.find('.theia-TreeContainer.empty').length) {
      console.log('Nothing to delete');
    } else {
      cy.symDumpPanel().type('{pageup}').type('{pageup}');
      cy.clickOnConnectionName();
      cy.get('[title*="Delete connection"]').click();
      cy.get('.dialogControl').find('button.theia-button.main').contains('OK').click({ force: true });
    }
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Delete the connection by adding custom hostname and port
     *
     * @example cy.deleteSymDumpConnectionCustom();
     */
    deleteSymDumpConnectionCustom(host: string, port: number): Chainable<any>;
  }
}
Cypress.Commands.add('deleteSymDumpConnectionCustom', (host, port) => {
  cy.openSymDump();
  cy.get('[id="symdump"]').then(($connection) => {
    if ($connection.find('.theia-TreeContainer.empty').length) {
      console.log('Nothing to delete');
    } else {
      cy.symDumpPanel().type('{pageup}').type('{pageup}');
      cy.get(`[title*= "${host}:${port}"]`).trigger('mousedown').click();
      cy.get('[title*="Delete connection"]').click();
      cy.get('.dialogControl').find('button.theia-button.main').contains('OK').click({ force: true });
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
  cy.get(`.theia-TreeNodeSegment[title*="${DSNAME}"]`);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Load jobs
     *
     * @example cy.jobDump(jobName).click().get('[title*="Load dump"]').click();
     */
    jobDump(jobName: string): Chainable<any>;
  }
}
Cypress.Commands.add('jobDump', (jobName) => {
  cy.get(`[title*="Job=${jobName}"]`);
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
    jobInTree(jobName: string): Chainable<any>;
  }
}
Cypress.Commands.add('jobInTree', (jobName) => {
  cy.get(`[title*="Job=${jobName}"]`);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on Job
     *
     * @example cy.clickOnJob('CDE.PROD.CAWORLD.PRTLIB', "DAVSC01A CA32:S=0C7 2018/10/04 15.37");
     */
    clickOnJob(jobName: string): Chainable<any>;
  }
}
Cypress.Commands.add('clickOnJob', (jobName) => {
  cy.jobInTree(jobName).click({ force: true });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Get Job's id
     *
     * @example cy.findDump(jobName, param);
     */
    findDump(jobName: string, param: string): Chainable<any>;
  }
}
Cypress.Commands.add('findDump', (jobName, param) => {
  cy.window().then(() => {
    cy.get(`[id$="Job=${jobName}${param}"]`);
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on found Dump
     *
     * @example cy.clickOnDump(dataSet, jobName, param);
     */
    clickOnDump(jobName: string, param: string): Chainable<any>;
  }
}
Cypress.Commands.add('clickOnDump', (jobName, param) => {
  cy.window().then(() => {
    cy.findDump(jobName, param).click({ force: true });
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on icon 'Edit connection'
     *
     * @example cy.editConnection();
     */
    editConnection(): Chainable<any>;
  }
}
Cypress.Commands.add('editConnection', () => {
  cy.clickOnConnectionName();
  cy.get('[title*="Edit connection"]').click();
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Edit a SymDump hostname
     *
     * @example cy.editConnection('http://1.2.3.4.');
     */
    editConnection(host: string): Chainable<any>;
  }
}
Cypress.Commands.add('editConnectionHost', (host) => {
  cy.editConnection();
  cy.entryField()
    .type('{selectall}{backspace}')
    .type(host)
    .type('{enter}', { delay: 200 })
    .type('{enter}', { delay: 200 })
    .type('{enter}', { delay: 200 })
    .type(PASS, { log: false, delay: 200 })
    .type('{enter}');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Edit a SymDump port
     *
     * @example cy.editConnectionPort('12345');
     */
    editConnectionPort(port: string): Chainable<any>;
  }
}
Cypress.Commands.add('editConnectionPort', (port) => {
  cy.editConnection();
  cy.entryField()
    .type('{enter}')
    .type('{selectall}{backspace}')
    .type(port)
    .type('{enter}', { delay: 200 })
    .type('{enter}', { delay: 200 })
    .type(PASS, { log: false, delay: 200 })
    .type('{enter}');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Edit a SymDump username
     *
     * @example cy.editConnectionUsername('username1');
     */
    editConnectionUsername(user: string): Chainable<any>;
  }
}
Cypress.Commands.add('editConnectionUsername', (user) => {
  cy.editConnection();
  cy.entryField()
    .type('{enter}')
    .type('{enter}')
    .type('{selectall}{backspace}')
    .type(user)
    .type('{enter}', { delay: 200 })
    .type(PASS, { log: false, delay: 200 })
    .type('{enter}');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * While edititng in fact no data has been changed
     *
     * @example cy.editConnectionNothing();
     */
    editConnectionNothing(): Chainable<any>;
  }
}
Cypress.Commands.add('editConnectionNothing', () => {
  cy.editConnection();
  cy.entryField().type('{enter}').type('{enter}').type('{enter}');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Sort dumps by ascending
     *
     * @example cy.sortDumpsAscending();
     */
    sortDumpsAscending(): Chainable<any>;
  }
}
Cypress.Commands.add('sortDumpsAscending', () => {
  cy.get('[data-command="__plugin.menu.action.symdump.sortDumpsAscending"]').click().wait(500);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Sort dumps by descending
     *
     * @example cy.sortDumpsDescending();
     */
    sortDumpsDescending(): Chainable<any>;
  }
}
Cypress.Commands.add('sortDumpsDescending', () => {
  cy.get('[data-command="__plugin.menu.action.symdump.sortDumpsDescending"]').click().wait(500);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Open SymDump settings
     *
     * @example cy.openSettingsSymDump();
     */
    openSettingsSymDump(): Chainable<any>;
  }
}
Cypress.Commands.add('openSettingsSymDump', () => {
  cy.get('[id="theia:menubar"]').get('.p-MenuBar-content').contains('File').click();
  cy.get('[data-type="submenu"]').click();
  cy.get('.p-Menu-itemLabel').contains('Open Preferences').click();
  cy.get('input.settings-search-input.theia-input').type('symdump');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Get the PROTSYM element
     *
     * @example cy.PROTSYM();
     */
    PROTSYM(): Chainable<any>;
  }
}
Cypress.Commands.add('PROTSYM', () => {
  cy.get('[title*="PROTSYMS"]');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Add a PROTSYM
     *
     * @example cy.addProtsym('TEST1');
     */
    addProtsym(protsym: string): Chainable<any>;
  }
}
Cypress.Commands.add('addProtsym', (protsym) => {
  cy.PROTSYM().trigger('mousedown').click();
  cy.get('[title*="Add PROTSYM"]').click();
  cy.entryField().type(`${protsym}{enter}`);
  cy.get(`[title*="${protsym}"]`);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Add a PROTSYM
     *
     * @example cy.addProtsymRightClick('TEST2');
     */
    addProtsymRightClick(protsym: string): Chainable<any>;
  }
}
Cypress.Commands.add('addProtsymRightClick', (protsym) => {
  cy.PROTSYM().rightclick();
  cy.get('[data-command="__plugin.menu.action.symdump.addProtsym:0"]').contains('Add PROTSYM').click();
  cy.entryField().type(`${protsym}{enter}`);
  cy.get(`[title*="${protsym}"]`);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Load dumps with right-click on a DS
     *
     * @example cy.loadDumpsRightClick('QWERTY.UIO.LOAD);
     */
    loadDumpsRightClick(dataSet: string): Chainable<any>;
  }
}
Cypress.Commands.add('loadDumpsRightClick', (dataSet) => {
  cy.dataSet(dataSet).rightclick();
  cy.get('[data-command="__plugin.menu.action.symdump.loadDumps:0"]').click();
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Delete DS right-click on a DS
     *
     * @example cy.deleteDSRightClick('QWERTY.UIO.LOAD);
     */
    deleteDSRightClick(dataSet: string): Chainable<any>;
  }
}
Cypress.Commands.add('deleteDSRightClick', (dataSet) => {
  cy.dataSet(dataSet).rightclick();
  cy.get('[data-command="__plugin.menu.action.symdump.deleteDataset:0"]').click();
  cy.get('.dialogControl').find('button.theia-button.main').contains('OK').click({ force: true });
});
