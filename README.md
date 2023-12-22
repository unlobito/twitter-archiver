# Make your own simple, public, searchable Twitter archive

This is a Node app that takes in your Twitter archive zip file, in the format that it is provided circa December 2022, and generates a zip file with another website in it.

It is based on [Darius Kazemi's browser-based Twitter website generator](https://tinysubversions.com/twitter-archive/make-your-own/), as modified by Andi McClure, with the primary difference being it runs at the Node command line. (A primitive mixed-mode commandline/web version is also in this repo under tag `cmdline`.) This version also contains many minor look-and-feel improvements, and two new features:

* Several elements of the generated site can be customized using a config file; see [sample/sample.toml](sample/sample.toml).
* The Node version, like the browser version, cannot read or write zip files larger than 2 GB. However, this version can use a directory rather than a zip file for both input and output. The largest Twitter archive which the tool has successfully archived in this way was 20 GB. Note when writing large archives to disk, it is a good idea to use the `--batch` argument, for example `--batch 100`.

Both the Darius and Andi contributions are available under the [MIT license](LICENSE.md).

Included in this repo is a distribution of [Flexsearch](https://github.com/nextapps-de/flexsearch), fetched from `https://cdn.jsdelivr.net/gh/nextapps-de/flexsearch@0.7.31/dist/flexsearch.bundle.js` on Dec. 20, 2023. You may choose between redistributing this file yourself or directly linking `jsdelivr.net`.

Be advised that this app calls eval() on the Twitter zip input, which in the Node context is kind of dangerous.

## Usage

This app requires a relatively new Node. I am using 18.16.1.

After checkout, run:

    npm install && npm run build

After building, the following commands work:

    npm run exec -- path/to/input.zip path/to/output.zip -b http://site-youll-install-on.com/

Runs the site generator from the command line. The -- is significant. You may also specify a directory instead of a zip file.

    npm run exec -- --help

Prints site generator command line flags.
