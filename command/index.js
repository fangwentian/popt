#!/usr/bin/env node

const yargs = require('yargs');
const main = require('../core/main')
const argv = yargs
    .usage('Usage: pt -p pop -u marketing/coupon, you must hava a popt.config folder to store the config files.')
    .option('url', {
        alias: 'u',
        describe: 'page url, such as "marketing/coupon"'
    })
    .option('project', {
        alias: 'p',
        describe: 'project name, such as "pop"、"cms"'
    })
    .alias('force', 'f')
    .boolean('f')
    .describe('f', 'force to override files if exist')
    .alias('help', 'h')
    .demandOption(['url', 'project'], 'Please provide both url and project arguments to work with this tool')
    .help('h')
    .argv;

let {url, project, force} = argv;
main(url, project, force);

