# Che4z

This guide will help you understand more about Che4z, and learn more on how to contribute and provide feedback.

## Eclipse Che4z
  
Eclipse Che is an open-source, next-generation development platform, leveraging container technology which offers a more streamlined on-boarding process for new developers to ensure they have the tools they need. Using stacks, Eclipse Che creates a workspace which brings the necessary technology to the task at hand. More information about Che can be found here.

Eclipse Che4z’s primary goal is to bring the modern developer experience to mainframe software development. Achieving this makes on-boarding new developers in the world of mainframe simpler and easier. Che4z is extending Che capabilities to be used also for mainframe application developers working with mainframe applications.

Further information can be found [here](http://www.eclipse.org/che/docs/che-7/che4z-release-information).

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
