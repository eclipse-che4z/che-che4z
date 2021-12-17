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

import { Theia, COBOLLS } from './selectors';

declare global {
  /**
   * A workaround that has allowed me to add import and export
   * statements to my *.ts files is to explicitly declare
   * Cypress on the global namespace.
   */
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Open Output window, select LSP extension and return its output.
       *
       *  @example cy.getLSPOutput().should('have.text', loaded)
       */
      getLSPOutput(): Chainable<any>;
    }
  }
}
Cypress.Commands.add('getLSPOutput', () => {
  cy.get(Theia.bottomSplitPanel).then(($theia) => {
    if (!$theia.find(Theia.outlineView).length) {
      cy.get('.editor-scrollable').type('{shift}{ctrl}u');
      cy.get(Theia.loadSpinner).should('not.exist', { timeout: 40000 });
    }
    cy.get(Theia.outputChannelList).select('LSP extension for COBOL language', { timeout: 40000 });
    cy.get(Theia.outputContents);
  });
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Click on 'Change Settings'
       *
       *  @example cy.clickOnChangeSettings(A.cpy).
       */
      clickOnChangeSettings(copybookName: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('clickOnChangeSettings', (copybookName: string) => {
  cy.get(Theia.notificationsContainer)
    .filter('.open')
    .find(Theia.notificationMessage)
    .should('contain.text', `Missing copybooks: ${copybookName}`)
    .then(($message) => {
      cy.wrap($message).parentsUntil(Theia.notification).find(Theia.changeSettingsButton).click();
    });
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Click on 'Add Local Copybboks'
       *
       *  @example cy.addCopybookLocal(A.cpy).
       */
      addCopybookLocal(copybookName: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('addCopybookLocal', (copybookName: string) => {
  cy.get(COBOLLS.inputCopybookNameInSettingsLocal).type(copybookName);
  cy.get(COBOLLS.addCopybookInSettingsLocal).click();
  cy.get(COBOLLS.checkCopybookInSettingsLocal).contains(copybookName);
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Click on 'Add Copybook DSN'
       *
       *  @example cy.addCopybookDSN(TEST).
       */
      addCopybookDSN(DSN: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('addCopybookDSN', (DSN: string) => {
  cy.get(COBOLLS.inputCopybookNameInSettingsDSN).type(DSN);
  cy.get(COBOLLS.addCopybookInSettingsDNS).click();
  cy.get(COBOLLS.checkCopybookInSettingsDSN).contains(DSN);
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Click on 'Add Copybook PROFILE'
       *
       *  @example cy.addCopybookProfile(TEST).
       */
      addCopybookProfile(ProfileName: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('addCopybookProfile', (ProfileName: string) => {
  cy.get(COBOLLS.inputProfileInSettings).type(ProfileName).type('{enter}');
  cy.get(COBOLLS.inputProfileInSettings).should('have.value', ProfileName);
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Click on 'Workspace Tab'
       *
       *  @example cy.clickWorkspaceTab().
       */
      clickWorkspaceTab(): Chainable<any>;
    }
  }
}
Cypress.Commands.add('clickWorkspaceTab', () => {
  cy.get(Theia.workspaceTabInSettings).contains('Workspace').click();
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Delete Local Copybook in UI
       *
       *  @example cy.deleteCopybookLocal('A.cpy').
       */
      deleteCopybookLocal(copybookName: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('deleteCopybookLocal', (copybookName: string) => {
  cy.get(COBOLLS.pathsLocalEditor).find(Theia.clearItem).click({ multiple: true });
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Delete DSN in UI
       *
       *  @example cy.deleteCopybookDSN('TEST').
       */
      deleteCopybookDSN(DSN: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('deleteCopybookDSN', (DSN: string) => {
  cy.get(COBOLLS.pathsDsnEditor).find(Theia.clearItem).click();
});
