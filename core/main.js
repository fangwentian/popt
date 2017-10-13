const path = require('path');
const fs = require('fs-extra');
const log = require('../util/log');
const util = require('../util/index');
const operator = require('./operator');
const username = require('git-user-name')();
const moment = require('moment')

const now = moment().format("YYYY-MM-DD");
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
    let ftlPath = path.join(currentPath, config.basePath, config.templatePath, threeLevelUrl);           // ftl要放置的路径
    let mcssPath = path.join(currentPath, config.basePath, config.mcssPath, threeLevelUrl);              // mcss要放置的路径
    let pageDataPath = path.join(currentPath, config.basePath, config.pageJsPath, threeLevelUrl);        // 页面entry.js等放置的目录

    const renderConfig = [
        {   // mock文件
            from: path.join(poptTemplates, 'page.mock.json'),
            dest: `${mockDataPath}.json`,
            data: { pageName: `${url.split('/')[0]}-${url.split('/')[1]}` },
            force
        },
        {   // ftl
            from: path.join(poptTemplates, 'page.ftl'),
            dest: `${ftlPath}.ftl`,
            data: { url: threeLevelUrl },
            force
        },
        {   // mcss
            from: path.join(poptTemplates, 'demo.mcss'),
            dest: `${mcssPath}.mcss`,
            force
        },
        {   // entry.js
            from: path.join(poptTemplates, 'entry.js'),
            dest: path.join(pageDataPath, 'entry.js'),
            data: { username, date: now },
            force
        },
        {   // page.js
            from: path.join(poptTemplates, 'page.js'),
            dest: path.join(pageDataPath, 'modules/page.js'),
            data: { username, date: now },
            force
        },
        {   // page.html
            from: path.join(poptTemplates, 'page.html'),
            dest: path.join(pageDataPath, 'modules/page.html'),
            force
        }
    ];

    operator.addProxyRule(currentPath, config, url, `pages/${threeLevelUrl}`);
    operator.batchRenderFiles(renderConfig);

}