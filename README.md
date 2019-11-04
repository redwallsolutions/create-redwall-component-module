
## CRCM (Create (Redwall|React) Component Module)

  

This command line tool generates a basic structure to develop a new typescript react component.

  

## How to use it?

  

Clone this repo to some awesome place you're used to dev

    git clone https://github.com/redwallsolutions/create-redwall-component-module <<component-name>>

Navigate to component folder

    cd <<component-name>>
  
 Start the setup 

    yarn setup
  
That's it.  

Now you can develop your component from "lib" folder.

## Serving and Building

This structure has 2 built-in scripts to help you develop your awesome component:

**start** and **build**.

The `start`script starts a local development server using parcel bundler. It helps you to visualize your component while you're developing it.

Just type `yarn start` and see your default browser opening a new tab at **http://localhost:1234**.

The `build` script transpiles your code to a distribution folder called **dist**. In this folder, you'll notice 2 files for each TSX file you created. Theses files are, respectively:

 - transpiled JS file based on your TSX file.
 - declaration type file (d.ts) based on your TSX file.

This folder is the root folder to publish your component in registries (github, npm, etc...)

Just type `yarn build` and see a dist folder being generated and containing all above described files.

**ENJOY IT**.
