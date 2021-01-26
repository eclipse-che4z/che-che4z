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
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="cypress-iframe" />

import 'cypress-iframe';
import 'cypress-xpath';

/* eslint-disable @typescript-eslint/no-namespace */

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Custom iframe command. For some reason iframe() doesn't work.
     *
     *  @example cy.iframeCustom()
     */
    iframeCustom(): Chainable<any>;
  }
}
Cypress.Commands.add('iframeCustom', { prevSubject: 'element' }, ($iframe) => {
  return new Cypress.Promise((resolve) => {
    $iframe.ready(function () {
      resolve($iframe.contents().find('body'));
    });
  });
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Load nested iframes for Cobol Control Flow
     *
     *  @example cy.loadFlowIframe()
     */
    loadFlowIframe(): Chainable<any>;
  }
}
Cypress.Commands.add('loadFlowIframe', () => {
  //@ts-ignore
  cy.frameLoaded('iframe.webview').iframeCustom().find('iframe#active-frame').iframeCustom();
});
declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Generates Cobol Control Flow
     *
     *  @example cy.generateCobolControlFlow('s.cbl', '100-Print-User');
     */
    generateCobolControlFlow(): Chainable<any>;
  }
}
Cypress.Commands.add('generateCobolControlFlow', (filename: string, paragraph: string) => {
  const xpath_paragraph = `//*[name()="g"]//div[@class="node-foreign-object-div-nodeInfo-name selected"][text()="${paragraph}"]`;
  cy.get('#theia-main-content-panel .theia-editor').wait(500).rightclick().wait(1000); // wait for onClickListeneres to be set
  cy.get('.p-Widget.p-Menu').find('[data-command="__plugin.menu.action.extension.run_parser"]').click();
  cy.get('.theia-notification-list').contains(`Loading control flow of ${filename}`);
  //@ts-ignore
  cy.loadFlowIframe().xpath(xpath_paragraph);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Generates Cobol Control Flow and click on element
     *
     *  @example cy.generateAndClickCobolControlFlow('s.cbl', '100-Print-User');
     */
    generateAndClickCobolControlFlow(): Chainable<any>;
  }
}
Cypress.Commands.add('generateAndClickCobolControlFlow', (filename: string, paragraph: string) => {
  const xpath_paragraph = `//*[name()="g"]//div[@class="node-foreign-object-div-nodeInfo-name selected"][text()="${paragraph}"]`;
  cy.get('#theia-main-content-panel .theia-editor').wait(500).rightclick().wait(1000); // wait for onClickListeneres to be set
  cy.get('.p-Widget.p-Menu').find('[data-command="__plugin.menu.action.extension.run_parser"]').click();
  cy.get('.theia-notification-list').contains(`Loading control flow of ${filename}`);
  //@ts-ignore
  cy.loadFlowIframe()
    .xpath('//*[name()="svg"][@class="svg-chart-container"]')
    .click()
    .xpath(xpath_paragraph + '/../..')
    .click({ force: true });
});
