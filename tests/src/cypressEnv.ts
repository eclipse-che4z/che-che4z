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
export const USER = Cypress.env('username').replace(/\r?\n|\r/g, '');
export const PASS = Cypress.env('password').replace(/\r?\n|\r/g, '');
export const CICSUSER1 = Cypress.env('cicsUser1').replace(/\r?\n|\r/g, '');
export const CICSPASS1 = Cypress.env('cicsPass1').replace(/\r?\n|\r/g, '');
export const CICSUSER2 = Cypress.env('cicsUser2').replace(/\r?\n|\r/g, '');
export const CICSPASS2 = Cypress.env('cicsPass2').replace(/\r?\n|\r/g, '');
export const ZOWE = Cypress.env('zowe') == true ? true : false;
export const CICSAPPLID = Cypress.env('cicsApplId') ? Cypress.env('cicsApplId').replace(/\r?\n|\r/g, '') : '';
export const INTERTESTPORT = Cypress.env('interTestPort')
  ? Number(Cypress.env('interTestPort').replace(/\r?\n|\r/g, ''))
  : undefined;
export const CONVJCL = Cypress.env('convertedJCL') ? Cypress.env('convertedJCL').replace(/\r?\n|\r/g, '') : undefined;
export const ORIGJCL = Cypress.env('originalJCL') ? Cypress.env('originalJCL').replace(/\r?\n|\r/g, '') : undefined;
