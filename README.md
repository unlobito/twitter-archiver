# Make your own simple, public, searchable Twitter archive

This is a Node app that takes in your Twitter archive zip file, in the format that it is provided circa December 2022, and generates a zip file with another website in it.

It is based on [Darius Kazemi's browser-based Twitter website generator](https://tinysubversions.com/twitter-archive/make-your-own/), as modified by Andi McClure, with the primary difference being it runs at the Node command line, and can\* handle archives of larger than 4 gigabytes. (A mixed-mode commandline/web version is also in this repo under tag `cmdline`.) Both the Darius and Andi contributions are available under the [MIT license](LICENSE.md).

Be advised that this app calls eval() on the Twitter zip input, which in the node context is kind of dangerous.

\* In theory; this has not yet been tried. I will remove this note when I have successfully processed a >4GB file.

## Usage

This app requires a relatively new Node. I am using 18.16.1.

After checkout, run:

    npm install && npm run build

After building, the following commands work:

    npm run exec -- path/to/input.zip path/to/output.zip -b http://site-youll-install-on.com/

Runs the site generator from the command line. The -- is significant. You may also specify a directory instead of a zip file.

    npm run exec -- --help

Prints site generator command line flags.
