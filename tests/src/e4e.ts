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

import { USER, PASS } from './cypressEnv';
import { Theia, E4E } from './selectorsTheia';

declare global {
  /**
   * A workaround that has allowed me to add import and export
   * statements to my *.ts files is to explicitly declare
   * Cypress on the global namespace.
   */
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Click on the E4E icon
       *
       * @example cy.openEndevorPanel();
       */
      openEndevorPanel(): Chainable<any>;
    }
  }
}
Cypress.Commands.add('openEndevorPanel', () => {
  cy.get(E4E.explorerContainer).eq(0).click();
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Add a new connection (profile)
       *
       * @example cy.createNewConnection();
       */
      createNewConnection(): Chainable<any>;
    }
  }
}
Cypress.Commands.add('createNewConnection', () => {
  cy.get(E4E.elmTreeView).contains('Add a New Profile').click();
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Unock the report
       *
       * @example cy.deleteProfile(ASTRO);
       */
      deleteProfile(profileName: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('deleteProfile', (profileName) => {
  cy.openEndevorPanel().wait(1500);
  cy.get(E4E.pluginView).then(($connection) => {
    if ($connection.find(`[id="/1:${profileName}"]`).length) {
      cy.get(`[title="${profileName}"]`).rightclick();
      cy.get(E4E.hideServise).click();
      cy.wait(2000);
    } else {
      console.log('Nothing to delete');
    }
  });
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Adds a new connection
       *
       * @example cy.E4EAddNewConnection(ASTRO);
       */
      E4EAddNewConnection(profileName: string, host: string): Chainable<any>;
    }
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

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Get the connection(profile name)
       *
       * @example cy.connectionNameE4E(Chodov);
       */
      connectionNameE4E(profileName: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('connectionNameE4E', (profileName) => {
  cy.get(`[id="/0:${profileName}"]`);
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Click on the connection name(profile)
       *
       * @example cy.clickOnConnectionNameE4E(TEST.REPORT.EXAMPLE);
       */
      clickOnConnectionNameE4E(profileName: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('clickOnConnectionNameE4E', (profileName) => {
  cy.connectionNameE4E(profileName).trigger('mousedown').click();
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Delete E4E connection
       *
       * @example cy.deleteE4EConnection(TEST.REPORT.EXAMPLE);
       */
      deleteE4EConnection(profileName: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('deleteE4EConnection', (profileName) => {
  cy.openEndevorPanel();
  cy.get(E4E.endevorExplorer);
  cy.get(E4E.endevorExplorer);
  cy.clickOnConnectionNameE4E(profileName);
  cy.get('[title*="Remove Profile"]').click();
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Add a new configuration
       *
       * @example cy.addNewConfig(TEST.REPORT.EXAMPLE);
       */
      addNewConfig(config: string, profileName: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('addNewConfig', (config, profileName) => {
  cy.get(`[id="/1:${profileName}"]`).trigger('mousedown').click();
  cy.get('[title*="Add a New Location Profile"]').click();
  cy.get(Theia.openTree).contains(config).click();
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Browse the element within the tree
       *
       * @example cy.browseElement(PROFILE, FOLDER, SUBFODLER, SUB-SUBFOLDER, PROGRAM);
       */
      browseElement(config: string, lvl1: string, lvl2: string, lvl3: string, program: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('browseElement', (config, lvl1, lvl2, lvl3, program) => {
  cy.get(`[title="${config}"]`).click();
  cy.get(`[title="${lvl1}"]`).click();
  cy.get(`[title="${lvl2}"]`).click();
  cy.get(`[title="${lvl3}"]`).click();
  cy.get(`[title="/${config}/SMPLPROD/2/${lvl1}/${lvl2}/${lvl3}"]`).contains(program);
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Click on the element(e.g., COBOL program)
       *
       * @example cy.openElement(PROFILE, FOLDER, SUBFODLER, SUB-SUBFOLDER, PROGRAM);
       */
      openElement(config: string, lvl1: string, lvl2: string, lvl3: string, program: string): Chainable<any>;
    }
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

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Click on Edit the element
       *
       * @example cy.editElement(PROFILE, FOLDER, SUBFODLER, SUB-SUBFOLDER, PROGRAM);
       */
      editElement(config: string, lvl1: string, lvl2: string, lvl3: string, program: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('editElement', (config, lvl1, lvl2, lvl3, program) => {
  cy.get(`[title="/${config}/SMPLPROD/2/${lvl1}/${lvl2}/${lvl3}"]`).contains(program).rightclick();
  cy.get(E4E.editElement).click();
});

declare global {
  namespace Cypress {
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
}
Cypress.Commands.add('retrieveElementWithDependencies', (config, lvl1, lvl2, lvl3, program) => {
  cy.get(`[title="/${config}/SMPLPROD/2/${lvl1}/${lvl2}/${lvl3}"]`).contains(program).rightclick();
  cy.get(E4E.retrieveElementWithDependencies).click();
});
