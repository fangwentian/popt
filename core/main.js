const path = require('path');
const fs = require('fs-extra');
const log = require('../util/log');
const util = require('../util/index');
const operator = require('./operator');

const currentPath = process.cwd();
const poptPath = path.join(currentPath, '/popt.config');         // popt配置文件夹的路径
const poptConfigPath = path.join(poptPath, '/popt.config.js');   // popt.config.js文件的路径
const poptTemplates = path.join(poptPath, '/templates');         // templates文件夹的路径
const poptConfig = util.require(poptConfigPath);

module.exports = (url, project, force) => {
    if(!util.checkUrl(url)) {
        log('red', 'incorrect url format');
        return;
    }
    if(!util.checkProject(poptConfig, project)) {
        log('red', 'can not find project in config file');
        return;
    }
    url = util.normalizeUrl(url);                                                                        // 去掉首尾/的url
    let config = util.getConfig(poptConfig, project);                                                    // 配置的config
    let threeLevelUrl = util.transformToThreeLevel(url);                                                 // 标准三级url

    let mockDataPath = path.join(currentPath, config.basePath, config.mockPath, `get/${url}`);           // mockData要放置的路径
    let proxyFtlPath = `pages/${threeLevelUrl}`;                                                         // proxyRule ftl路径
    let ftlPath = path.join(currentPath, config.basePath, config.templatePath, proxyFtlPath);            // ftl要放置的路径
    let pageDataPath = path.join(currentPath, config.basePath, config.pageJsPath, threeLevelUrl);        // 页面entry.js等放置的目录

    let mockHandler = (fileData) => {
        let pathArr = url.split('/');
        return fileData.replace('$pageName', `${pathArr[0]}-${pathArr[1]}`);
    }

    let ftlHandler = (fileData) => {
        return fileData.replace('$url', threeLevelUrl);
    }

    operator.addProxyRule(currentPath, config, url, proxyFtlPath)
    operator.createPageMockFile(poptTemplates, mockDataPath, force, mockHandler);
    operator.createFtl(poptTemplates, ftlPath, force, ftlHandler);
    operator.createEntry(poptTemplates, pageDataPath, force);
    operator.createPageJs(poptTemplates, pageDataPath, force);
    operator.createPageHtml(poptTemplates, pageDataPath, force);
}