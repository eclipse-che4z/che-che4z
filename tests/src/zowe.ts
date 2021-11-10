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
import { Theia, ZOWE } from './selectors';

declare global {
  /**
   * A workaround that has allowed me to add import and export
   * statements to my *.ts files is to explicitly declare
   * Cypress on the global namespace.
   */
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Open ZOWE panel.
       *
       * @example cy.openZowePanel()
       */
      openZowePanel(): Chainable<any>;
    }
  }
}
Cypress.Commands.add('openZowePanel', () => {
  cy.get(Theia.leftRightPanel).then(($theia) => {
    if ($theia.find(Theia.elementCollapsed).length || $theia.find(ZOWE.zoweHidden).length) {
      cy.get(ZOWE.zoweView).click({ force: true });
    }
  });
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Add Zowe Profile.
       *
       * @example cy.addZoweProfile('TEST')
       */
      addZoweProfile(profile: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('addZoweProfile', (profile: string) => {
  cy.get(ZOWE.zowePluginView).trigger('mousedown').click();
  cy.get(ZOWE.addSession).click();
  cy.get(Theia.inputF1).as('quickOpen').type('{enter}').type(`${profile}{enter}`);
  cy.get('@quickOpen').type(Cypress.env('zowe'), { delay: 100 }).type('{enter}');
  cy.get('@quickOpen').type(Cypress.env('username')).type('{enter}');
  cy.get('@quickOpen')
    .type(Cypress.env('password'), { log: false, delay: 200 })
    .then(($input) => {
      if ($input.val() !== Cypress.env('password')) {
        throw new Error('Different value of typed password');
      }
    })
    .type('{enter}')
    .type('{downarrow}')
    .type('{enter}')
    .type('{enter}')
    .type('{enter}')
    .type('{enter}');
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Delete Zowe Profile.
       *
       * @example cy.deleteZoweProfile('TEST')
       */
      deleteZoweProfile(profile: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('deleteZoweProfile', (profile: string) => {
  cy.openZowePanel();
  cy.get(ZOWE.zoweTreeContainer).contains(profile).rightclick();
  cy.get(ZOWE.deleteProfile).click();
  cy.get(Theia.inputF1).type('{enter}');
  cy.get(Theia.notificationMessage).contains(`Profile ${profile} was deleted.`);
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Search Data Set.
       *
       * @example cy.searchDataSet('TEST','as12345.TEST')
       */
      searchDataSet(profile: string, dataset: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('searchDataSet', (profile: string, dataset: string) => {
  cy.get(ZOWE.zoweTreeContainer).contains(profile).trigger('mousedown').click();
  cy.get(`.theia-TreeNodeContent [data-node-id*="/1:${profile}"]`).get('[title="Search Data Sets"]').click();

  cy.get(Theia.inputF1).type(`${dataset}{enter}`, { delay: 100 }).type('{enter}');
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Open Data Set under a Zowe profile
       *
       * @example cy.openDataSet('as12345.TEST')
       */
      openDataSet(dataset: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('openDataSet', (dataset: string) => {
  cy.get(`[data-node-id*="/0:${dataset}"]`).click().wait(3000);
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Open JCL
       *
       * @example cy.openJCL('JCLEXAMPLE','TEST', 'as12345.TEST')
       */
      openJCL(jcl: string, profile: string, dataset: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('openJCL', (jcl: string, profile: string, dataset: string) => {
  cy.get(`[id*="/1:${profile} /0:${dataset}/2:${jcl}"]`).click().click();
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Open Jobs Sections
       *
       * @example cy.openJobs('TEST', '(TSU01772) - ABEND S222', 'JES2:JESJCL(3)');
       */
      openJobs(profile: string, folder: string, jobName: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('openJobs', (profile: string, folder: string, jobName: string) => {
  //@ts-ignore
  cy.openZowePanel();
  cy.get(ZOWE.zoweJobs).click().contains(profile).click();
  cy.get(`[id*="/1:${profile}/0:${folder}"]`).click();
  cy.get(`[id*="/1:${profile}/0:${folder}/1:${jobName}"]`).click();
});
