# Make your own simple, public, searchable Twitter archive

This is a Node app that takes in your Twitter archive zip file, in the format that it is provided circa December 2022, and generates a zip file with another website in it.

It is based on [Darius Kazemi's browser-based Twitter website generator](https://tinysubversions.com/twitter-archive/make-your-own/), with the primary difference being it can handle archives of larger than 4 gigabytes. These modifications were performed by Andi McClure, and do not have a license associated with them yet. This is a work-in-progress commit.

## Usage

This app requires a relatively new Node. I am using 18.16.1.

The following commands work:

    npm run exec -- path/to/input.zip path/to/output.zip -b http://site-youll-install-on.com/

Runs the site generator from the command line. The -- is significant.

    npm run exec -- --help

Prints site generator command line flags.
