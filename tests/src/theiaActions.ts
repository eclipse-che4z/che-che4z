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
import { Theia } from './selectorsTheia';

const theiaMod = Theia.collapsed;
const theiaModwoDot = theiaMod.replace(/^./, '');

declare global {
  /**
   * A workaround that has allowed me to add import and export
   * statements to my *.ts files is to explicitly declare
   * Cypress on the global namespace.
   */
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Wait for application to be fully loaded.
       *
       * @example cy.waitForAppStart()
       */
      waitForAppStart(): Chainable<any>;
    }
  }
}

Cypress.Commands.add('waitForAppStart', () => {
  cy.get(Theia.mainContentPanel, {
    timeout: Cypress.env('appStarTimeout'),
  });
  cy.get(Theia.preLoad).should('not.exist', {
    timeout: Cypress.env('appStartTimeout'),
  });
  cy.get(Theia.loadSpinner).should('not.exist', {
    timeout: Cypress.env('appStartTimeout'),
  });
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Refresh the page.
       *
       * @example cy.refreshPage()
       */
      refreshPage(): Chainable<any>;
    }
  }
}
Cypress.Commands.add('refreshPage', () => {
  cy.location('href', { log: false }).then((url) => {
    cy.visit(url, {
      onBeforeLoad: (win) => (win.fetch = null as any),
    });
  });
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Open File Explorer panel if it is closed.
       *
       * @example cy.openFileExplorer()
       */
      openFileExplorer(): Chainable<any>;
    }
  }
}
Cypress.Commands.add('openFileExplorer', () => {
  cy.get(Theia.leftRightPanel).then(($theia) => {
    if ($theia.find(Theia.elementCollapsed).length || $theia.find(Theia.explorerId).length) {
      cy.get(Theia.explorerIcon).click();
    }
    cy.hideSourceView();
  });
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Find node (file or folder) in File Explorer tree.
       *
       * @example cy.findExplorerTreeNode('SOURCE.cbl')
       * @example cy.findExplorerTreeNode('.copybooks')
       */
      findExplorerTreeNode(nodeName: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('findExplorerTreeNode', (nodeName: string) => {
  cy.openFileExplorer();
  cy.get(Theia.explorerView).contains(nodeName);
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Reveal folder content if it is collapsed in File Explorer tree.
       *
       * @example cy.openFolder('.copybooks')
       * @example cy.openFolder('.copybooks/zowe-profile')
       */
      openFolder(path: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('openFolder', (path: string) => {
  cy.wrap(path.split('/')).each((folderName: string) => {
    cy.findExplorerTreeNode(folderName)
      .as('folder')
      .then(($folder: { siblings: (arg0: string) => { (): any; new (): any; length: any } }) => {
        if ($folder.siblings(Theia.collapsed).length) {
          cy.wrap($folder).click({ force: true });

          cy.get('@folder').siblings().should('not.have.class', theiaModwoDot);
        }
      });
  });
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Close folder content.
       *
       * @example cy.closeFolder('.copybooks')
       * @example cy.closeFolder('.copybooks/zowe-profile')
       */
      closeFolder(path: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('closeFolder', (path: string) => {
  cy.wrap(path.split('/')).each((folderName: string) => {
    cy.findExplorerTreeNode(folderName)
      .as('folder')
      .then(($folder) => {
        cy.wrap($folder).click({ force: true });
        cy.get('@folder').siblings().should('have.class', theiaModwoDot);
      });
  });
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Create new file in given path.
       *
       * @example cy.createNewFile('.copybooks/profile', 'COPYBOOK.cpy')
       */
      createNewFile(path: string, fileName: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('createNewFile', (path: string, fileName: string) => {
  cy.openFolder(path);
  //@ts-ignore
  cy.findExplorerTreeNode(path.split('/').pop()).type('{alt}{n}');
  cy.get(Theia.dialogInput).type(`${fileName}{enter}`);
  cy.findExplorerTreeNode(fileName);
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Open file with a give name in File Explorer tree. Tree must be expanded first.
       * Editor tab disappeares on opening another file.
       *
       * @example cy.openFolder('.copybooks/profile').openFile('COPYBOOK.cpy')
       */
      openFile(fileName: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('openFile', (fileName: string) => {
  cy.findExplorerTreeNode(fileName).click({ force: true });
  cy.get(`[id^="shell-tab"][title*="${fileName}"]`);
  cy.get(Theia.loadSpinner).should('not.exist');
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Open file with a give name in File Explorer tree. Tree must be expanded first.
       * Editor tab remains on opening another file.
       *
       * @example cy.openFolder('.copybooks/profile').openFilePermanent('COPYBOOK.cpy')
       */
      openFilePermanent(fileName: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('openFilePermanent', (fileName: string) => {
  cy.findExplorerTreeNode(fileName).click({ force: true }).dblclick({ force: true });
  cy.get(Theia.tabOpened + `[id*="${fileName}"]`);
  cy.get(Theia.loadSpinner).should('not.exist');
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Delete file with a given name from File Explorer tree. Tree must be expaned first.
       *
       * @example cy.openFolder('.copybooks/profile').deleteFile('COPYBOOK.cpy')
       */
      deleteFile(fileName: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('deleteFile', (fileName: string) => {
  cy.findExplorerTreeNode(fileName).type('{del}');
  cy.get(Theia.dialogTitle)
    .contains('Delete File')
    .parent()
    .siblings(Theia.dialogContent)
    .contains(fileName)
    .parent()
    .siblings(Theia.dialogControl)
    .find('button' + Theia.theiaButtonOK)
    .contains('OK')
    .click({ force: true });
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Get currently open editor tab.
       */
      getCurrentTab(): Chainable<any>;
    }
  }
}
Cypress.Commands.add('getCurrentTab', () => {
  cy.get(Theia.currentTab);
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Close currently open editor tab.
       */
      closeCurrentTab(): Chainable<any>;
    }
  }
}
Cypress.Commands.add('closeCurrentTab', () => {
  cy.getCurrentTab().find(Theia.tabCloseButton).click({ force: true });
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Go to specified line inside open editor.
       *
       * @example cy.goToLine(42)
       */
      goToLine(lineNumber: number): Chainable<any>;
    }
  }
}
Cypress.Commands.add('goToLine', (lineNumber: number) => {
  cy.get('#theia-main-content-panel .theia-editor').not(Theia.modHidden).not(Theia.bottomContentPanel).type('{ctrl}g');
  cy.get(Theia.typeALineNumber).type(`${lineNumber}{enter}`, {
    delay: 100,
  });
  cy.getCurrentLineNumber().should('eq', lineNumber);
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Find Language Mode
       *
       * @example cy.selectLangMode()
       */
      selectLangMode(): Chainable<any>;
    }
  }
}
Cypress.Commands.add('selectLangMode', () => {
  cy.get(Theia.languageMode);
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Change Language Mode
       *
       * @example cy.changeLangMode('COBOL Copybook')
       */
      changeLangMode(mode: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('changeLangMode', (mode: string) => {
  cy.selectLangMode().click().wait(500).type(`${mode}{enter}`).should('contain.text', mode);
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Get line content by its number.
       *
       * @example cy.getLineByNumber(42).contains('This is answer')
       */
      getLineByNumber(lineNumber: number): Chainable<any>;
    }
  }
}
Cypress.Commands.add('getLineByNumber', (lineNumber: number) => {
  cy.goToLine(lineNumber);
  cy.get(Theia.lineNumber)
    .contains(RegExp(`^${lineNumber}$`))
    .parent()
    .should('have.css', 'top')
    .then((top) => {
      cy.get('.view-line').then(($lines) => {
        //@ts-ignore
        return $lines.filter((i, line) => {
          //@ts-ignore
          if (RegExp(`top:\\s*${top}`).test(Cypress.$(line).attr('style'))) {
            return line;
          }
        });
      });
    });
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Get main editor element in Theia
       *
       * @example cy.getMainEditor()
       */
      getMainEditor(): Chainable<any>;
    }
  }
}
Cypress.Commands.add('getMainEditor', () => {
  cy.get(Theia.mainContentPanel + ' ' + Theia.editor).not(Theia.modHidden);
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Get preview editor element in Theia (e.g. in "Go to References")
       *
       * @example cy.getPreviewEditor()
       */
      getPreviewEditor(): Chainable<any>;
    }
  }
}
Cypress.Commands.add('getPreviewEditor', () => {
  cy.get(Theia.peekViewWidget);
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Find current line overlay div, containing additional line info, e.g. errors.
       *
       * @example cy.getMainEditor().findCurrentLineOverlay()
       */
      findCurrentLineOverlay(editor: Chainable<Element>): Chainable<any>;
    }
  }
}
Cypress.Commands.add('findCurrentLineOverlay', { prevSubject: true }, (editor) => {
  cy.wrap(editor).find(Theia.currentLine).parent();
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Find current line overlay position by top attribute.
       *
       * @example cy.getMainEditor().findCurrentLineTop()
       */
      findCurrentLineTop(editor: any): Chainable<any>;
    }
  }
}
Cypress.Commands.add('findCurrentLineTop', { prevSubject: true }, (editor) => {
  //@ts-ignore
  cy.wrap(editor).findCurrentLineOverlay().should('have.css', 'top');
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Get current line (i.e. where cursor stands) content.
       *
       * @example cy.getCurrentLine().contains('This is answer')
       */
      getCurrentLine(): Chainable<any>;
    }
  }
}
Cypress.Commands.add('getCurrentLine', () => {
  cy.getMainEditor()
    .as('editor')
    //@ts-ignore
    .findCurrentLineTop()
    .then((top: any) => {
      cy.get('@editor').find(`.view-line[style*="top:${top}"]`);
    });
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Get current line (i.e. where cursor stands) number.
       *
       * @example cy.getCurrentLineNumber().should('eq', 42)
       */
      getCurrentLineNumber(): Chainable<any>;
    }
  }
}
Cypress.Commands.add('getCurrentLineNumber', () => {
  cy.getMainEditor()
    .as('editor')
    //@ts-ignore
    .findCurrentLineTop()
    .then((top: any) => {
      //cy.get('@editor').find('.line-numbers').parent(`[style*="top:${top}"]`).invoke('text').then(parseFloat);
      cy.get('@editor')
        .find(Theia.lineNumber)
        .then(($lineNumbers) => {
          //@ts-ignore
          const $number = $lineNumbers.filter((i, number) => {
            //@ts-ignore
            if (RegExp(`top:\\s*${top}`).test(Cypress.$(number.parentElement).attr('style'))) {
              return number;
            }
          });
          return parseFloat($number[0].innerText);
        });
    });
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Get current line number in preview.
       *
       * @example cy.getPreviewCurrentLineNumber().should('eq', 42)
       */
      getPreviewCurrentLineNumber(): Chainable<any>;
    }
  }
}
Cypress.Commands.add('getPreviewCurrentLineNumber', () => {
  cy.getPreviewEditor()
    .as('previewEditor')
    //@ts-ignore
    .findCurrentLineTop()
    .then((top) => {
      cy.get('@previewEditor').find(Theia.lineNumber).parent(`[style*="top:${top}"]`).invoke('text').then(parseFloat);
    });
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Get current line overlay.
       *
       * @example cy.getMainEditor().findCurrentLineOverlay()
       */
      getCurrentLineOverlay(): Chainable<any>;
    }
  }
}
Cypress.Commands.add('getCurrentLineOverlay', () => {
  //@ts-ignore
  cy.getMainEditor().findCurrentLineOverlay();
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Get current line errors. by default error type is 'error'.
       *
       * @example cy.getCurrentLineErrors({ expectedLine: 41, errorType: "warning" })
       */
      getCurrentLineErrors(): Chainable<any>;
    }
  }
}
Cypress.Commands.add(
  'getCurrentLineErrors',
  ({ expectedLine, errorType = 'error' }: { expectedLine: number; errorType: string }) => {
    const errorTypes = {
      info: Theia.editorInfo,
      warning: Theia.editorWarn,
      error: Theia.editorError,
    };
    // Wait until any errors parsed at all
    //@ts-ignore
    cy.getMainEditor().find(errorTypes[errorType]);
    // After that find errors in specific line
    cy.getCurrentLineOverlay()
      //@ts-ignore
      .find(errorTypes[errorType])
      //@ts-ignore
      .then(($error: Element) => {
        //@ts-ignore
        cy.wrap($error).getElementLineNumber().should('eq', expectedLine);
        // Yield errors element instead of its line number
        cy.wrap($error);
      });
  },
);

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
     * Get hover error message, e.g. on missing copybooks, semantic errors and so on.
     *
     * @example cy.getHoverErrorMessage()
                .contains("ABC: Copybook not foundCOBOL Language Support - E(MISSING_COPYBOOK)");
    */
      getHoverErrorMessage($error: Element): Chainable<any>;
    }
  }
}
Cypress.Commands.add('getHoverErrorMessage', { prevSubject: true }, ($error: Element) => {
  //@ts-ignore
  cy.getCurrentLine().trigger('mousemove', $error[0].offsetLeft, $error[0].offsetTop);
  cy.get(Theia.hoverOverContent);
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Get given editor element line number.
       *
       * @example cy.getSyntaxErrors().getElementLineNumber().should('eq', 42)
       */
      getElementLineNumber(prevSubject: any, subject: any): Chainable<any>;
    }
  }
}
Cypress.Commands.add('getElementLineNumber', { prevSubject: true }, (subject: Cypress.Chainable<Element>) => {
  cy.wrap(subject)
    .parent()
    .should('have.css', 'top')
    .then((top) => {
      cy.get(Theia.lineNumber).parent(`[style*="top:${top}"]`).invoke('text').then(parseFloat);
    });
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Get element with specified text in given editor line.
       * Must be chained of editor line element.
       *
       * @example cy.getCurrentLine().findText("100-Print-User.")
       */
      findText(prevSubject: any, subject: any, text: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('findText', { prevSubject: true }, (subject: Cypress.Chainable<Element>, text: string) => {
  cy.wrap(subject).find('span').contains(text).click();
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Go to definition of given syntax construction.
       * Must be chained of text element.
       *
       * @example cy.getCurrentLine().findText("100-Print-User.").goToDefinition()
       */
      goToDefinition(prevSubject: any, $subject: any): Chainable<any>;
    }
  }
}
Cypress.Commands.add('goToDefinition', { prevSubject: true }, ($subject: Cypress.Chainable<Element>) => {
  cy.wrap($subject).wait(1000).rightclick().wait(2000); // wait for onClickListeneres to be set
  cy.get('.p-Widget.p-Menu').find(Theia.goToDefinition).click({ force: true }).wait(500);
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Go to references of given syntax construction.
       * Must be chained of text element.
       *
       * @example cy.getCurrentLine().findText("100-Print-User.").goToReferences()
       */
      goToReferences(prevSubject: any, $subject: any): Chainable<any>;
    }
  }
}
Cypress.Commands.add('goToReferences', { prevSubject: true }, ($subject: Cypress.Chainable<Element>) => {
  cy.wrap($subject).wait(1000).rightclick({ force: true }).wait(2000); // wait for onClickListeneres to be set
  cy.get('.p-Widget.p-Menu').find(Theia.goToReference).click();
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Go to definition of given syntax construction.
       * Must be chained of text element.
       *
       * @example cy.formatDocument()
       */
      formatDocument(): Chainable<any>;
    }
  }
}
Cypress.Commands.add('formatDocument', () => {
  cy.get(Theia.mainContentPanel + ' ' + Theia.editor)
    .wait(1000)
    .rightclick()
    .wait(2000); // wait for onClickListeneres to be set
  cy.get('.p-Widget.p-Menu').find(Theia.formatDocument).click();
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Hide Source View to have all files open in the Workspace
       * @example cy.hideSourceView()
       */
      hideSourceView(): Chainable<any>;
    }
  }
}
Cypress.Commands.add('hideSourceView', () => {
  cy.get(Theia.slidePanelTitile).contains('Explorer').rightclick({ force: true });
  cy.get(Theia.menuContent).then(($menu) => {
    if ($menu.find('.p-mod-toggled:contains(Source View)').length) {
      cy.get(Theia.modToggled).contains('Source View').click();
    } else {
      cy.get('body').type('{esc}', { delay: 100 });
    }
  });
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Opens Outline view. And do nothing if the view is already opened.
       * @example cy.openOutlineView()
       */
      openOutlineView(): void;
    }
  }
}
Cypress.Commands.add('openOutlineView', () => {
  cy.get(Theia.outlineViewTab).then(($btn) => {
    if (!$btn.hasClass(Theia.modCurrent)) {
      cy.get(Theia.outlineViewTab).click();
    }
  });
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Expands the element in Outline view.
       * @example cy.expandOutlineElement('DATA DIVISION')
       */
      expandOutlineElement(elementName: string): void;
    }
  }
}
Cypress.Commands.add('expandOutlineElement', (elementName: string) => {
  cy.getOutlineViewTreeContainer()
    .get(Theia.treeNodeSegment)
    .contains(elementName)
    .as('element')
    .then(($element) => {
      if ($element.siblings(Theia.collapsed).length) {
        cy.wrap($element).click({ force: true });
        cy.get('@element').siblings().should('not.have.class', Theia.collapsed);
      }
    });
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Returns the tree container from Outline view.
       * @example cy.getOutlineViewTreeContainer()
       */
      getOutlineViewTreeContainer(): Chainable<any>;
    }
  }
}
Cypress.Commands.add('getOutlineViewTreeContainer', (): any => cy.get(Theia.outlineView).get(Theia.treeContainer));

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Read and write JSON file
       * Copy from test_files/project/settings/ specific settings json file
       * and paste to .theia/settings.json and .vscode/settings.json
       * @example cy.updateConfigs('basic')
       */
      updateConfigs(expression: string): Chainable<any>;
    }
  }
}
Cypress.Commands.add('updateConfigs', (expression: string) => {
  cy.readFile(`test_files/project/settings/${expression}.json`).then((content) => {
    cy.writeFile('test_files/project/.theia/settings.json', content);
    cy.writeFile('test_files/project/.vscode/settings.json', content);
  });
});
