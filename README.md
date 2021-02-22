# Che4z

Che4z is an all-in-one mainframe extension package for developers working with z/OS applications, suitable for all levels of mainframe experience, even beginners.

Che4z offers mainframe application developers a modern, familiar and seamless experience, which helps to overcome some developers' reservations or concerns about the traditional mainframe user experience.

Che4z is powered by the open-source projects [Eclipse Che](https://www.eclipse.org/che/docs/che-7) and [Zowe](https://www.zowe.org/). Many of these extensions, and other mainframe-oriented innovations, are also available as part of the Code4z package of extensions for Visual Studio Code. 

## Getting Started

Before you start using Che4z, ensure you have access to an instance of Eclipse Che. 

### Launch the Basic Stack

The Che4z basic stack is included with Eclipse Che version 7.6.0 and above, so no installation is necessary. To get started, **follow these steps:** 

1. Log in to Eclipse Che.

2. In **Workspaces**, click **Add Workspace**.

3. Under **Select Stack**, select the **Mainframe Basic Stack**.

4. Click **Create & Open** and wait for the workspace to initialize.  
A workspace is created with Eclipse Che4z extensions available.

### Launch the Premium Stack

The Che4z [premium stack](https://techdocs.broadcom.com/content/broadcom/techdocs/us/en/ca-mainframe-software/devops/ca-brightside/3-0/eclipse-che4z.html) is distributed as part of CA Brightside. To install the Che4z premium stack, **follow these steps**: 

1. Log in to Eclipse Che.

2. In **Workspaces**, click **Add Workspace**.

3. Select the **Import Devfile** tab.

4. Next to **Source**, select **URL**.

5. In the **URL** field, paste the Eclipse Che4z premium stack URL, which is specified in the CA Brightside PDF installation guide available from [Broadcom Support](https://casupport.broadcom.com/download-center/download-center.html). For more information, see the **Getting Started** section in the [CA Brightside documentation](https://techdocs.broadcom.com/content/broadcom/techdocs/us/en/ca-mainframe-software/devops/ca-brightside/3-0/getting-started.html).
    
6. Click **Create & Open** and wait for the workspace to initialize.  
A workspace is created with Eclipse Che4z extensions available.

### Check Extension Requirements

After you launch your stack, ensure you meet the prerequisites of the individual extensions that you want to use. Explorer for Endevor requires access to CA Endevor® SCM, and Debugger for Mainframe requires access to CA InterTest™ for CICS. To find out more about each extension's requirements, click the headers below to navigate to their user documentation spaces.

## Extensions

The Che4z basic stack contains the COBOL Language Support, HLASM Language Support, Zowe Explorer, Explorer for Endevor and Debugger for Mainframe extensions. 

### [COBOL Language Support](https://github.com/eclipse/che-che4z-lsp-for-cobol)
[![GitHub issues](https://img.shields.io/github/issues-raw/eclipse/che-che4z-lsp-for-cobol?style=flat-square)](https://github.com/eclipse/che-che4z-lsp-for-cobol/issues)
[![slack](https://img.shields.io/badge/chat-on%20Slack-blue?style=flat-square)](https://communityinviter.com/apps/che4z/code4z)

COBOL Language Support provides autocomplete, highlighting and diagnostic features for COBOL code and copybooks.

> How can we improve COBOL Language Support? [Let us know on our Git repository](https://github.com/eclipse/che-che4z-lsp-for-cobol/issues)

#### Features
* Edit COBOL code with syntax highlighting, real time syntax validation, content assist and other advanced features.
* Automatic retrieval of copybooks from the mainframe.

#### Blogs
* [Beginner’s Guide: COBOL Made Easy](https://medium.com/modern-mainframe/beginners-guide-cobol-made-easy-introduction-ecf2f611ac76)

### [HLASM Language Support](https://github.com/eclipse/che-che4z-lsp-for-hlasm) 
[![GitHub issues](https://img.shields.io/github/issues-raw/eclipse/che-che4z-lsp-for-hlasm?style=flat-square)](https://github.com/eclipse/che-che4z-lsp-for-hlasm/issues)
[![slack](https://img.shields.io/badge/chat-on%20Slack-blue?style=flat-square)](https://communityinviter.com/apps/che4z/code4z)

Code completion, highlighting, browsing and validation for High Level Assembler language.

> How can we improve HLASM Language Support? [Let us know on our Git repository](https://github.com/eclipse/che-che4z-lsp-for-hlasm/issues)

#### Features
* Edit HLASM code with syntax highlighting, real time syntax validation, content assist and other advanced features.
* Trace HLASM macros.

### [Zowe Explorer](https://marketplace.visualstudio.com/items?itemName=Zowe.vscode-extension-for-zowe) 
[![GitHub issues](https://img.shields.io/github/issues-raw/zowe/vscode-extension-for-zowe?style=flat-square)](https://github.com/zowe/vscode-extension-for-zowe/issues)
[![slack](https://img.shields.io/badge/chat-on%20Slack-blue?style=flat-square)](https://openmainframeproject.slack.com/)

Zowe Explorer is an extension powered by Zowe CLI that streamlines interaction with mainframe data sets, USS files, and jobs. The extension is designed to function along with other extensions and plug-ins to deliver a richer experience.

You can learn more about the Zowe Explorer by watching the [Getting Started](https://www.youtube.com/embed/G_WCsFZIWt4) and [Work with Data Sets](https://www.youtube.com/embed/X4oSHrI4oN4) tutorial videos.

> How can we improve Zowe Explorer? [Let us know on our Git repository](https://github.com/zowe/vscode-extension-for-zowe/issues)

#### Features
* Access z/OS Datasets and z/OS Unix file systems, and submit JCLs.
* Create, edit, and work with z/OSMF compatible profiles.
* Store your credentials securely with Secure Credentials Store plug-in.
* View and download job output.
* Issue TSO commands.
* Install additional extensions.

#### Blogs
* [Beginner’s Guide: How to access mainframe via Zowe in 10 easy steps](https://medium.com/zowe/beginners-guide-how-to-access-mainframe-via-zowe-in-10-easy-steps-fbec14ed6ed2)
* [Zowe blog](https://medium.com/zowe)

### [Explorer for Endevor](https://github.com/eclipse/che-che4z-explorer-for-endevor)
[![GitHub issues](https://img.shields.io/github/issues-raw/eclipse/che-che4z-explorer-for-endevor?style=flat-square)](https://github.com/eclipse/che-che4z-explorer-for-endevor/issues)
[![slack](https://img.shields.io/badge/chat-on%20Slack-blue?style=flat-square)](https://communityinviter.com/apps/che4z/code4z)

Explorer for Endevor gives you the ability to Browse and Retrieve [CA Endevor® SCM](https://www.broadcom.com/products/mainframe/devops-app-development/app/endevor-software-change-manager) elements using a user-friendly, intuitive interface.

It offers the best developer experience in synergy with [Bridge for Git](https://youtu.be/sjnZuQpUVM4), a solution which enables you to concurrently work in Git and mainframe.

> How can we improve Explorer for Endevor? [Let us know on our Git repository](https://github.com/eclipse/che-che4z-explorer-for-endevor/issues)

#### Features
* Retrieve, browse and search CA Endevor® elements.

### [Debugger for Mainframe](https://github.com/BroadcomMFD/debugger-for-mainframe)
[![GitHub issues](https://img.shields.io/github/issues-raw/broadcomMFD/debugger-for-mainframe?style=flat-square)](https://github.com/BroadcomMFD/debugger-for-mainframe/issues)
[![slack](https://img.shields.io/badge/chat-on%20Slack-blue?style=flat-square)](https://communityinviter.com/apps/che4z/code4z)

Debugger for Mainframe provides the debugging interface to [CA InterTest™ for CICS](https://www.broadcom.com/products/mainframe/devops-app-development/testing-quality/intertest-cics) and [CA InterTest™ Batch](https://www.broadcom.com/products/mainframe/testing-and-quality/intertest-batch). This extension provides a modern debug experience for CICS and Batch applications written in COBOL.

> How can we improve Debugger for Mainframe? [Let us know on our Git repository](https://github.com/BroadcomMFD/debugger-for-mainframe/issues)

#### Features

* Debug COBOL code for applications running in a CICS region.
* Debug COBOL code for Batch applications.
