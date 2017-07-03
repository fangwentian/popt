const yargs = require('yargs');
const main = require('../core/main')
const argv = yargs
    .usage('Usage: ./poptoolkit [options]')
    .alias('u', 'url')
    .describe('u', 'page url')
    .alias('p', 'project')
    .describe('p', 'project name')
    .alias('f', 'force')
    .boolean('f')
    .describe('f', 'force to override files if exist')
    .help('h')
    .alias('h', 'help')
    .argv;

let {url, project, force} = argv;
main(url, project, force);

