# Che4z

Che4z is an all-in-one mainframe extension package for developers working with z/OS applications, suitable for all levels of mainframe experience, even beginners.

Che4z offers mainframe application developers a modern, familiar and seamless experience, which helps to overcome some developers' reservations or concerns about the traditional mainframe user experience.

Eclipse Che4z is powered by the open-source projects [Eclipse Che](https://www.eclipse.org/che/docs/che-7) and [Zowe](https://www.zowe.org/). Many of these extensions, and other mainframe-oriented innovations, are also available as part of the Code4z package of extensions for Visual Studio Code. 

## Installing Che4z

The Eclipse Che4z basic stack is included with Che version 7.6 and above. Follow these instructions if you are using an older version. Eclipse Che4z is compatible with Che version 7.3 on Kubernetes.

1. Log in to Che.

2. In a web browser, load the following URL:  
`++https://++__<CHE_HOST>__/f?url=https://github.com/eclipse/che-che4z/raw/1.0.0/mainframe-basic-stack.yaml`  
Where:
    - `++https://++__<CHE_HOST>__` specifies the Che Server URL, for example: `++https://++my-che-server.com`.
    - `/f?url=` links the Che Server URL to the Eclipse Che4z basic stack URL.
    - `++https://++github.com/eclipse/che-che4z/raw/1.0.0/mainframe-basic-stack.yaml` is the Eclipse Che4z basic stack URL.
3. Press **Enter** and wait for the workspace to initialize.  
A workspace is created with Eclipse Che4z extensions available.

To install the Eclipse Che4z Premium stack, replace the basic stack URL with the Premium Stack URL specified in the CA Brightside PDF installation guide available from [Broadcom Support](https://casupport.broadcom.com/download-center/download-center.html). See the **Getting Started** section in the [CA Brightside documentation](http://techdocs.broadcom.com/content/broadcom/techdocs/us/en/ca-mainframe-software/devops/ca-brightside-enterprise/2-0/getting-started.html).

## Che4z Sub-projects

The Che4z community consists of several sub-projects that focus on specific areas of the codebase. Like any open source project, each sub-projects has it's own governance structure and release process that aligns with the primary framework guidelines.

### Sub-project Repositories
* https://github.com/eclipse/che-che4z-lsp-for-cobol - COBOL Language Support GitHub
* https://github.com/eclipse/che-che4z-explorer-for-endevor - Explorer for Endevor GitHub

### Documentation

* https://github.com/eclipse/che-docs - Che4z Documentation GitHub
* https://www.eclipse.org/che/docs/che-7/eclipse-che4z/ - Che4z documentation customer facing site
