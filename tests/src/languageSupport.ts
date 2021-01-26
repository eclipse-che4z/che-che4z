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

/// <reference types="cypress" />

/* eslint-disable @typescript-eslint/no-namespace */

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Open Output window, select LSP extension and return its output.
     *
     *  @example cy.getLSPOutput().should('have.text', loaded)
     */
    getLSPOutput(): Chainable<any>;
  }
}
Cypress.Commands.add('getLSPOutput', () => {
  cy.get('#theia-bottom-split-panel').then(($theia) => {
    if (!$theia.find('#outputView').length) {
      cy.get('.editor-scrollable').type('{shift}{ctrl}u');
      cy.get('.left.area .element .fa-spin').should('not.exist', { timeout: 40000 });
    }
    cy.get('#outputChannelList').select('LSP extension for COBOL language', { timeout: 40000 });
    cy.get('#outputContents');
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on 'Change Settings'
     *
     *  @example cy.clickOnChangeSettings(A.cpy).
     */
    clickOnChangeSettings(copybookName: string): Chainable<any>;
  }
}
Cypress.Commands.add('clickOnChangeSettings', (copybookName: string) => {
  cy.get('.theia-notifications-container')
    .filter('.open')
    .find('.theia-notification-message')
    .should('contain.text', 'Missing copybooks: ${copybookName}')
    .then(($message) => {
      cy.wrap($message)
        .parentsUntil('.theia-notification-list-item')
        .find('.theia-button[data-action="Change settings"]')
        .click();
    });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on 'Add Local Copybboks'
     *
     *  @example cy.addCopybookLocal(A.cpy).
     */
    addCopybookLocal(copybookName: string): Chainable<any>;
  }
}
Cypress.Commands.add('addCopybookLocal', (copybookName: string) => {
  cy.get('#broadcom-cobol-lsp\\.cpy-manager\\.paths-local-editor .preference-array-input').type(copybookName);
  cy.get('#broadcom-cobol-lsp\\.cpy-manager\\.paths-local-editor .preference-array-element-btn.add-btn').click();
  cy.get('#broadcom-cobol-lsp\\.cpy-manager\\.paths-local-editor .pref-input').contains(copybookName);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on 'Add Copybook DSN'
     *
     *  @example cy.addCopybookDSN(TEST).
     */
    addCopybookDSN(DSN: string): Chainable<any>;
  }
}
Cypress.Commands.add('addCopybookDSN', (DSN: string) => {
  cy.get('#broadcom-cobol-lsp\\.cpy-manager\\.paths-dsn-editor .preference-array-input').type(DSN);
  cy.get('#broadcom-cobol-lsp\\.cpy-manager\\.paths-dsn-editor .preference-array-element-btn.add-btn').click();
  cy.get('#broadcom-cobol-lsp\\.cpy-manager\\.paths-dsn-editor .preference-array-element-val').contains(DSN);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on 'Add Copybook PROFILE'
     *
     *  @example cy.addCopybookProfile(TEST).
     */
    addCopybookProfile(ProfileName: string): Chainable<any>;
  }
}
Cypress.Commands.add('addCopybookProfile', (ProfileName: string) => {
  cy.get('input[data-preference-id="broadcom-cobol-lsp.cpy-manager.profiles"]').type(ProfileName).type('{enter}');
  cy.get('input[data-preference-id="broadcom-cobol-lsp.cpy-manager.profiles"]').should('have.value', ProfileName);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click on 'Workspace Tab'
     *
     *  @example cy.clickWorkspaceTab().
     */
    clickWorkspaceTab(): Chainable<any>;
  }
}
Cypress.Commands.add('clickWorkspaceTab', () => {
  cy.get('.p-TabBar-tab.preferences-scope-tab').contains('Workspace').click();
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Delete Local Copybook in UI
     *
     *  @example cy.deleteCopybookLocal('A.cpy').
     */
    deleteCopybookLocal(copybookName: string): Chainable<any>;
  }
}
Cypress.Commands.add('deleteCopybookLocal', (copybookName: string) => {
  cy.get('#broadcom-cobol-lsp\\.cpy-manager\\.paths-local-editor')
    .find('.preference-array-clear-item')
    .click({ multiple: true });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Delete DSN in UI
     *
     *  @example cy.deleteCopybookDSN('TEST').
     */
    deleteCopybookDSN(DSN: string): Chainable<any>;
  }
}
Cypress.Commands.add('deleteCopybookDSN', (DSN: string) => {
  cy.get('#broadcom-cobol-lsp\\.cpy-manager\\.paths-dsn-editor').find('.preference-array-clear-item').click();
});
