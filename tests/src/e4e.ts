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
const { USER, PASS } = require('./cypressEnv');

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on the E4E icon
     *
     * @example cy.openEndevorPanel();
     */
    openEndevorPanel(): Chainable<any>;
  }
}
Cypress.Commands.add('openEndevorPanel', () => {
  cy.get('.p-TabBar-tab[id="shell-tab-plugin-view-container:e4eExplorerContainer"]').eq(0).click();
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Add a new connection (profile)
     *
     * @example cy.createNewConnection();
     */
    createNewConnection(): Chainable<any>;
  }
}
Cypress.Commands.add('createNewConnection', () => {
  cy.get('[id="plugin-view:e4e.elmTreeView"]').contains('Add a New Profile').click();
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Unock the report
     *
     * @example cy.deleteProfile(ASTRO);
     */
    deleteProfile(profileName: string): Chainable<any>;
  }
}
Cypress.Commands.add('deleteProfile', (profileName) => {
  cy.openEndevorPanel().wait(1500);
  cy.get('[id="plugin-view-container:e4eExplorerContainer--plugin-view:e4e.elmTreeView"]').then(($connection) => {
    if ($connection.find(`[id="/1:${profileName}"]`).length) {
      cy.get(`[title="${profileName}"]`).rightclick();
      cy.get('[data-command="__plugin.menu.action.e4e.hideService"]').click();
      cy.wait(2000);
    } else {
      console.log('Nothing to delete');
    }
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Adds a new connection
     *
     * @example cy.E4EAddNewConnection(ASTRO);
     */
    E4EAddNewConnection(profileName: string, host: string): Chainable<any>;
  }
}
Cypress.Commands.add('E4EAddNewConnection', (profileName, host) => {
  cy.createNewConnection();
  cy.get('.monaco-quick-open-widget .quick-open-tree').then(($profilePallete) => {
    console.log($profilePallete);
    if ($profilePallete.find(`[aria-label="${profileName}, picker"]`).length) {
      cy.entryField().type(profileName).type('{enter}');
    } else {
      cy.entryField().as('quickOpen').type('{enter}').type(profileName).type('{enter}');
      cy.get('@quickOpen').type(host).type('{enter}').wait(500);
      cy.get('@quickOpen').type(USER).type('{enter}').wait(500);
      cy.get('@quickOpen').type(PASS, { log: false, delay: 200 }).type('{enter}');
      cy.get('@quickOpen').type('False{enter}');
      cy.wait(500).get(`[title="${profileName}"]`);
    }
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Get the connection(profile name)
     *
     * @example cy.connectionNameE4E(Chodov);
     */
    connectionNameE4E(profileName: string): Chainable<any>;
  }
}
Cypress.Commands.add('connectionNameE4E', (profileName) => {
  cy.get(`[id="/0:${profileName}"]`);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on the connection name(profile)
     *
     * @example cy.clickOnConnectionNameE4E(TEST.REPORT.EXAMPLE);
     */
    clickOnConnectionNameE4E(profileName: string): Chainable<any>;
  }
}
Cypress.Commands.add('clickOnConnectionNameE4E', (profileName) => {
  cy.connectionNameE4E(profileName).trigger('mousedown').click();
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Unock the report
     *
     * @example cy.deleteE4EConnection(TEST.REPORT.EXAMPLE);
     */
    deleteE4EConnection(profileName: string): Chainable<any>;
  }
}
Cypress.Commands.add('deleteE4EConnection', (profileName) => {
  cy.openEndevorPanel();
  cy.get('[id="plugin-view:endevorExplorer"]');
  cy.get('[id="plugin-view:endevorExplorer"]');
  cy.clickOnConnectionNameE4E(profileName);
  cy.get('[title*="Remove Profile"]').click();
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Add a new configuration
     *
     * @example cy.addNewConfig(TEST.REPORT.EXAMPLE);
     */
    addNewConfig(config: string, profileName: string): Chainable<any>;
  }
}
Cypress.Commands.add('addNewConfig', (config, profileName) => {
  cy.get(`[id="/1:${profileName}"]`).trigger('mousedown').click();
  cy.get('[title*="Add a New Location Profile"]').click();
  cy.get('.quick-open-tree').contains(config).click();
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Browse the element within the tree
     *
     * @example cy.browseElement(PROFILE, FOLDER, SUBFODLER, SUB-SUBFOLDER, PROGRAM);
     */
    browseElement(config: string, lvl1: string, lvl2: string, lvl3: string, program: string): Chainable<any>;
  }
}
Cypress.Commands.add('browseElement', (config, lvl1, lvl2, lvl3, program) => {
  cy.get(`[title="${config}"]`).click();
  cy.get(`[title="${lvl1}"]`).click();
  cy.get(`[title="${lvl2}"]`).click();
  cy.get(`[title="${lvl3}"]`).click();
  cy.get(`[title="/${config}/SMPLPROD/2/${lvl1}/${lvl2}/${lvl3}"]`).contains(program);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on the element(e.g., COBOL program)
     *
     * @example cy.openElement(PROFILE, FOLDER, SUBFODLER, SUB-SUBFOLDER, PROGRAM);
     */
    openElement(config: string, lvl1: string, lvl2: string, lvl3: string, program: string): Chainable<any>;
  }
}
Cypress.Commands.add('openElement', (config, lvl1, lvl2, lvl3, program) => {
  cy.get(`[title="${config}"]`).click();
  cy.get(`[title="${lvl1}"]`).click();
  cy.get(`[title="${lvl2}"]`).click();
  cy.get(`[title="${lvl3}"]`).click();
  cy.get(`[title="/${config}/SMPLPROD/2/${lvl1}/${lvl2}/${lvl3}"]`).contains(program).click();
  cy.getCurrentTab().contains(`${program}.cobol`);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on Edit the element
     *
     * @example cy.editElement(PROFILE, FOLDER, SUBFODLER, SUB-SUBFOLDER, PROGRAM);
     */
    editElement(config: string, lvl1: string, lvl2: string, lvl3: string, program: string): Chainable<any>;
  }
}
Cypress.Commands.add('editElement', (config, lvl1, lvl2, lvl3, program) => {
  cy.get(`[title="/${config}/SMPLPROD/2/${lvl1}/${lvl2}/${lvl3}"]`).contains(program).rightclick();
  cy.get('[data-command="__plugin.menu.action.e4e.editElement"]').click();
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on Retrieve Element With Dependencies
     *
     * @example cy.retrieveElementWithDependencies(PROFILE, FOLDER, SUBFODLER, SUB-SUBFOLDER, PROGRAM);;
     */
    retrieveElementWithDependencies(
      config: string,
      lvl1: string,
      lvl2: string,
      lvl3: string,
      program: string,
    ): Chainable<any>;
  }
}
Cypress.Commands.add('retrieveElementWithDependencies', (config, lvl1, lvl2, lvl3, program) => {
  cy.get(`[title="/${config}/SMPLPROD/2/${lvl1}/${lvl2}/${lvl3}"]`).contains(program).rightclick();
  cy.get('[data-command="__plugin.menu.action.e4e.retrieveElementWithDependencies"]').click();
});
