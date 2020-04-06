# Che4z

Che4z is an all-in-one mainframe extension package for developers working with z/OS applications, suitable for all levels of mainframe experience, even beginners.

Che4z offers mainframe application developers a modern, familiar and seamless experience, which helps to overcome some developers' reservations or concerns about the traditional mainframe user experience.

Che4z is powered by the open-source projects [Eclipse Che](https://www.eclipse.org/che/docs/che-7) and [Zowe](https://www.zowe.org/). Many of these extensions, and other mainframe-oriented innovations, are also available as part of the Code4z package of extensions for Visual Studio Code. 

## Installing Che4z


### Basic Stack

The Che4z basic stack is included with Eclipse Che version 7.6.0 and above, so no installation is necessary. To get started, create a new workspace and select the **Mainframe Basic Stack**.

### Premium Stack

To install the Che4z [premium stack](https://techdocs.broadcom.com/content/broadcom/techdocs/us/en/ca-mainframe-software/devops/ca-brightside/3-0/eclipse-che4z.html), **follow these steps**: 

1. Log in to Eclipse Che.

2. In **Workspaces**, click **Import Devfile** 

3. Next to **Source**, select **URL**

4. In the **URL** field, paste the Eclipse Che4z premium stack URL, which is specified in the CA Brightside PDF installation guide available from [Broadcom Support](https://casupport.broadcom.com/download-center/download-center.html). For more information, see the **Getting Started** section in the [CA Brightside documentation](https://techdocs.broadcom.com/content/broadcom/techdocs/us/en/ca-mainframe-software/devops/ca-brightside/3-0/getting-started.html).
    
5. Press **Create & Open** and wait for the workspace to initialize.  
A workspace is created with Eclipse Che4z extensions available.

## Extensions

The Che4z basic stack contains the COBOL Language Support, HLASM Language Support, Zowe Explorer, Explorer for Endevor and Debugger for Mainframe extensions. 

### [COBOL Language Support](https://github.com/eclipse/che-che4z-lsp-for-cobol)
[![GitHub issues](https://img.shields.io/github/issues-raw/eclipse/che-che4z-lsp-for-cobol?style=flat-square)](https://github.com/eclipse/che-che4z-lsp-for-cobol/issues)
[![slack](https://img.shields.io/badge/chat-on%20Slack-blue?style=flat-square)](https://join.slack.com/t/che4z/shared_invite/enQtNzk0MzA4NDMzOTIwLWIzMjEwMjJlOGMxNmMyNzQ1NWZlMzkxNmQ3M2VkYWNjMmE0MGQ0MjIyZmY3MTdhZThkZDg3NGNhY2FmZTEwNzQ)

COBOL Language Support standardizes the communication between language tooling and your code editor using the Language Server Protocol (LSP).

> How can we improve COBOL Language Support? [Let us know on our Git repository](https://github.com/eclipse/che-che4z-lsp-for-cobol/issues)

#### Features
* Edit COBOL code with syntax highlighting, real time syntax validation, content assist and other advanced features.

#### Blogs
* [Beginner’s Guide: COBOL Made Easy](https://medium.com/modern-mainframe/beginners-guide-cobol-made-easy-introduction-ecf2f611ac76)

### [HLASM Language Support](https://github.com/eclipse/che-che4z-lsp-for-hlasm) 
[![GitHub issues](https://img.shields.io/github/issues-raw/eclipse/che-che4z-lsp-for-hlasm?style=flat-square)](https://github.com/eclipse/che-che4z-lsp-for-hlasm/issues)
[![slack](https://img.shields.io/badge/chat-on%20Slack-blue?style=flat-square)](https://join.slack.com/t/che4z/shared_invite/enQtNzk0MzA4NDMzOTIwLWIzMjEwMjJlOGMxNmMyNzQ1NWZlMzkxNmQ3M2VkYWNjMmE0MGQ0MjIyZmY3MTdhZThkZDg3NGNhY2FmZTEwNzQ)

Code completion, highlighting, browsing and validation for High Level Assembler language.

> How can we improve HLASM Language Support? [Let us know on our Git repository](https://github.com/eclipse/che-che4z-lsp-for-hlasm/issues)

#### Features
* Edit HLASM code with syntax highlighting, real time syntax validation, content assist and other advanced features.
* Trace HLASM macros.

### [Zowe Explorer](https://marketplace.visualstudio.com/items?itemName=Zowe.vscode-extension-for-zowe) 
[![GitHub issues](https://img.shields.io/github/issues-raw/zowe/vscode-extension-for-zowe?style=flat-square)](https://github.com/zowe/vscode-extension-for-zowe/issues)
[![slack](https://img.shields.io/badge/chat-on%20Slack-blue?style=flat-square)](https://openmainframeproject.slack.com/)

Zowe Explorer is an Eclipse Che extension powered by Zowe CLI that streamlines interaction with mainframe data sets, USS files, and jobs.

> How can we improve Zowe Explorer? [Let us know on our Git repository](https://github.com/zowe/vscode-extension-for-zowe/issues)

#### Features
* Access z/OS Datasets and z/OS Unix file systems and submit JCLs.
* View and download job output.
* Issue TSO commands.

#### Blogs
* [Beginner’s Guide: How to access mainframe via Zowe in 10 easy steps](https://marketplace.visualstudio.com/items?itemName=Zowe.vscode-extension-for-zowe)
* [Zowe blog](https://marketplace.visualstudio.com/items?itemName=Zowe.vscode-extension-for-zowe)

### [Explorer for Endevor](https://github.com/eclipse/che-che4z-explorer-for-endevor)
[![GitHub issues](https://img.shields.io/github/issues-raw/eclipse/che-che4z-explorer-for-endevor?style=flat-square)](https://github.com/eclipse/che-che4z-explorer-for-endevor/issues)
[![slack](https://img.shields.io/badge/chat-on%20Slack-blue?style=flat-square)](https://join.slack.com/t/che4z/shared_invite/enQtNzk0MzA4NDMzOTIwLWIzMjEwMjJlOGMxNmMyNzQ1NWZlMzkxNmQ3M2VkYWNjMmE0MGQ0MjIyZmY3MTdhZThkZDg3NGNhY2FmZTEwNzQ)

Explorer for Endevor gives you the ability to Browse and Retrieve [CA Endevor® SCM](https://www.broadcom.com/products/mainframe/devops-app-development/app/endevor-software-change-manager) elements using a user-friendly, intuitive interface.

It offers the best developer experience in synergy with [Bridge for Git](https://youtu.be/sjnZuQpUVM4), a solution which enables you to concurrently work in Git and mainframe.

> How can we improve Explorer for Endevor? [Let us know on our Git repository](https://github.com/eclipse/che-che4z-explorer-for-endevor/issues)

#### Features
* Retrieve, browse and search CA Endevor® elements.

### [Debugger for Mainframe](http://techdocs.broadcom.com/content/broadcom/techdocs/us/en/ca-mainframe-software/devops/ca-intertest-and-ca-symdump/11-0/DAP-For-Intertest-Debugger.html)
[![GitHub issues](https://img.shields.io/github/issues-raw/broadcomMFD/debugger-for-mainframe?style=flat-square)](https://github.com/BroadcomMFD/debugger-for-mainframe/issues)
[![slack](https://img.shields.io/badge/chat-on%20Slack-blue?style=flat-square)](https://join.slack.com/t/che4z/shared_invite/enQtNzk0MzA4NDMzOTIwLWIzMjEwMjJlOGMxNmMyNzQ1NWZlMzkxNmQ3M2VkYWNjMmE0MGQ0MjIyZmY3MTdhZThkZDg3NGNhY2FmZTEwNzQ)

Debugger for Mainframe provides the debugging interface to [CA InterTest™ for CICS](https://www.broadcom.com/products/mainframe/devops-app-development/testing-quality/intertest-cics). This extension provides a modern debug experience for COBOL applications running in a CICS region.

> How can we improve Debugger for Mainframe? [Let us know on our Git repository](https://github.com/BroadcomMFD/debugger-for-mainframe/issues)

#### Features

* Debug COBOL code for applications running in a CICS region.
