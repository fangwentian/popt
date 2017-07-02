const path = require('path');
const fs = require('fs-extra');
const log = require('./util/log');
const util = require('./util/index');
const core = require('./core/index');

const currentPath = process.cwd();
const poptPath = path.join(currentPath, '/popt');                // popt配置文件夹的路径
const poptConfigPath = path.join(poptPath, '/popt.config.js');   // popt.config.js文件的路径
const poptTemplates = path.join(poptPath, '/templates');         // templates文件夹的路径
const poptConfig = require(poptConfigPath);

let project = 'pop';
let config = util.getConfig(poptConfig, project);
let url = util.normalizeUrl('hello/bike');
let paths = util.analysisUrl(url);
let threeLevelUrl = paths.length == 2 ? `${url}/index` : url;    // 以 / 开头的三级地址

let mockDataPath = path.join(currentPath, config.basePath, config.mockPath, `get/${paths[0]}/${paths[1]}`); // mockData要放置的路径
let proxyFtlPath = `pages${threeLevelUrl}`;                      // proxyRule ftl路径
let ftlPath = path.join(currentPath, config.basePath, config.templatePath, proxyFtlPath); // ftl要放置的路径
let pageDataPath = path.join(currentPath, config.basePath, config.pageJsPath, threeLevelUrl);


// 添加proxyRules.js路由规则
let addProxyRule = () => {
    let proxyRulePath = path.join(currentPath, config.basePath, config.proxyRule);
    if(!fs.existsSync(proxyRulePath)) {
        log('redBright', 'proxyRules.js not exist');
    }

    // proxyRules对象
    let proxyRules = require(proxyRulePath);
    let existRules = Object.keys(proxyRules).some((key) => {
        if(key.includes(url)) {
            log('redBright', `rule ${url} already exist in proxyRules.js`);
            return true;
        }
        return false;
    })
    // 路由规则已经存在
    if(existRules) return;

    // 要写入的路由规则
    let rule = `"GET ${url}": "${proxyFtlPath}"`;
    let content = fs.readFileSync(proxyRulePath).toString();
    let arr = content.split('// rule target');
    content = arr[0] + '// rule target' + '\n' + '  ' + rule + ','+ arr[1];
    fs.outputFile(proxyRulePath, content);
}

// 添加页面mock假数据
let createPageMockFile = () => {
    let from = path.join(poptTemplates, 'page.mock.json');
    let dest = `${mockDataPath}.json`;
    core.createFile(from, dest);
}

let ftlHandler = (fileData) => {
    return fileData.replace('_$1', threeLevelUrl.slice(1))
}

// 添加ftl
let createFtl = () => {
    let from = path.join(poptTemplates, 'page.ftl');
    let dest = `${ftlPath}.ftl`;
    core.createFile(from, dest, true, ftlHandler);
}

// 添加entry.js
let createEntry = () => {
    let from = path.join(poptTemplates, 'entry.js');
    let dest = path.join(pageDataPath, 'entry.js');
    core.createFile(from, dest, true);
}

// 添加page.js
let createPageJs = () => {
    let from = path.join(poptTemplates, 'page.js');
    let dest = path.join(pageDataPath, 'modules/page.js');
    core.createFile(from, dest, true);
}

// 添加page.html
let createPageHtml = () => {
    let from = path.join(poptTemplates, 'page.html');
    let dest = path.join(pageDataPath, 'modules/page.html');
    core.createFile(from, dest, true);
}

addProxyRule();
createPageMockFile();
createFtl();
createEntry();
createPageJs();
createPageHtml();