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
declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Open ZOWE panel.
     *
     * @example cy.openZowePanel()
     */
    openZowePanel(): Chainable<any>;
  }
}
Cypress.Commands.add('openZowePanel', () => {
  cy.get('#theia-left-right-split-panel').then(($theia) => {
    if (
      $theia.find('#theia-left-content-panel.theia-mod-collapsed').length ||
      $theia.find('#plugin-view-container\\:zowe.p-mod-hidden').length
    ) {
      cy.get('.p-TabBar-content #shell-tab-plugin-view-container\\:zowe').click({ force: true });
    }
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Add Zowe Profile.
     *
     * @example cy.addZoweProfile('TEST')
     */
    addZoweProfile(profile: string): Chainable<any>;
  }
}
Cypress.Commands.add('addZoweProfile', (profile: string) => {
  cy.get('[id*="plugin-view-container:zowe"][id*="plugin-view:zowe.explorer"]').trigger('mousedown').click();
  cy.get('#__plugin\\.view\\.title\\.action\\.zowe\\.addSession').click();
  cy.get('.quick-open-input input').as('quickOpen').type(`${profile}{enter}`).wait(3000);
  cy.get('@quickOpen').type(Cypress.env('zowe'), { delay: 100 }).type('{enter}').type('{enter}').wait(1000);
  cy.get('@quickOpen').type(Cypress.env('username')).type('{enter}').wait(1000);
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
    .type('{enter}');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Delete Zowe Profile.
     *
     * @example cy.deleteZoweProfile('TEST')
     */
    deleteZoweProfile(profile: string): Chainable<any>;
  }
}
Cypress.Commands.add('deleteZoweProfile', (profile: string) => {
  cy.openZowePanel();
  cy.get('[id*="plugin-view:zowe.explorer"] .theia-TreeContainer').contains(profile).rightclick();
  cy.get('[data-command*="__plugin.menu.action.zowe.deleteProfile"]').click();
  cy.get('.quick-open-input input').type('{enter}');
  cy.get('.theia-notification-message').contains(`Profile ${profile} was deleted.`);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Search Data Set.
     *
     * @example cy.searchDataSet('TEST','as12345.TEST')
     */
    searchDataSet(profile: string, dataset: string): Chainable<any>;
  }
}
Cypress.Commands.add('searchDataSet', (profile: string, dataset: string) => {
  cy.get('[id*="plugin-view:zowe.explorer"] .theia-TreeContainer').contains(profile).trigger('mousedown').click();
  cy.get(`.theia-TreeNodeContent [data-node-id*="/1:${profile}"]`).get('.plugin-icon-3').click();

  cy.get('.quick-open-input input').type(`${dataset}{enter}`, { delay: 100 });
  cy.wait(3000);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Open Data Set under a Zowe profile
     *
     * @example cy.openDataSet('as12345.TEST')
     */
    openDataSet(dataset: string): Chainable<any>;
  }
}
Cypress.Commands.add('openDataSet', (dataset: string) => {
  cy.get(`[data-node-id*="/0:${dataset}"]`).click().wait(3000);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Open JCL
     *
     * @example cy.openJCL('JCLEXAMPLE','TEST', 'as12345.TEST')
     */
    openJCL(jcl: string, profile: string, dataset: string): Chainable<any>;
  }
}
Cypress.Commands.add('openJCL', (jcl: string, profile: string, dataset: string) => {
  cy.get(`.ReactVirtualized__Grid__innerScrollContainer [id*="/1:${profile} /0:${dataset}/0:${jcl}"]`).click().click();
});
