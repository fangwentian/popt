const yargs = require('yargs');
const argv = yargs
    .usage('Usage: ./poptoolkit [options]')
    .alias('u', 'url')
    .describe('u', 'page url')
    .alias('f', 'force')
    .boolean('f')
    .describe('f', 'force to override files if exist')
    .help('h')
    .alias('h', 'help')
    .argv;
