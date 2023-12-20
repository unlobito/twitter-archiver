import * as app from "./app.js";

import {program} from 'commander';
import {dirname as pathDirname, isAbsolute as pathIsAbsolute, join as pathJoin} from 'node:path';
import {readFileSync as fsReadFileSync} from 'node:fs';
import {fileURLToPath as urlFileURLToPath} from 'node:url';

import * as toml from 'toml';

program
  .description('Split a string into substrings and display as an array')
  .argument('<input>', 'zip file to read')
  .argument('<output>', 'directory to write (or zip file if ending in .zip)')
  .option('-b, --base-url <char>')
  .option('-d, --disable-directories')
  .option('-c, --config <path>', 'toml file (see sample.toml for format)')
  .option('--jsdelivr', 'source flexsearch from jsdelivr.net instead of locally')
  ;

program.parse();
const options = program.opts();
const [input, output] = [program.args[0], program.args[1]];

//console.log(input, output, options.baseUrl, options.disableDirectories);

import * as fs from 'fs';

let config:any = {};
const configPath = options.config;
function relativizePath(path, base) {
  if (!path) return;
  if (pathIsAbsolute(path)) return path;
  return pathJoin(base, path);
}
try { // Included sample.toml as base config
  const __dirname = urlFileURLToPath(new URL('.', import.meta.url)); // __dirname not provided by default in ESM Node
  config = toml.parse(fsReadFileSync(pathJoin(__dirname, "sample.toml"), 'utf-8')).config;
  config.dir = __dirname;
  config.js_dir = __dirname;
  config.avatar = relativizePath(config.avatar, config.dir); // Postprocess
  config.robots = relativizePath(config.robots, config.dir); // NOOP
} catch (e) {
  console.log("Warning: file 'sample.toml' not found! Should have been distributed with exec.js. Program may crash because of this.", e);
}

if (configPath) { // User config overwrites only included files
  config.dir = pathDirname(configPath);
  const userConfig = toml.parse(fsReadFileSync(configPath, 'utf-8')).config;
  userConfig.avatar = relativizePath(userConfig.avatar, config.dir); // Postprocess
  userConfig.robots = relativizePath(userConfig.robots, config.dir); // Postprocess
  Object.assign(config, userConfig);
}
if (options.jsdelivr) {
  config.jsdelivr = true;
}

async function run() { // Must function wrap so we can use async at toplevel
  let fallback = (msg) => { console.log(msg); };
  let doneFailure = (e) => { console.log("Error!", e, e.stack); };
  let doneSuccess = (msg) => { console.log("Success. Here is a message from Darius that may not apply to you:\n", msg)};
  app.parseZip([input], {
    callback:{fallback, doneFailure, doneSuccess},
    baseUrl:options.baseUrl || '',
    directoriesDisabled:options.disableDirectories,
    saveAs:output,
    saveAsDirectory:!output.endsWith(".zip")
  }, config);
}
run();