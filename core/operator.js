const path = require('path');
const fs = require('fs-extra');
const log = require('../util/log');
const operator = {
    // 把一个文件的内容写到另一个文件，可以传入handler来处理文件内容
    createFile(from, dest, force = false, handler) {
        let func = (data) => {return data}
        handler = handler || func;
        if(fs.existsSync(dest) && !force) {
            log('yellowBright',`file already exist: ${dest}`);
            return false;
        }
        let content = fs.readFileSync(from).toString();
        fs.outputFile(dest, handler(content));
        log('greenBright', `output file to ${dest}`);
    },
    // 添加路由规则
    addProxyRule(currentPath, config, url, proxyFtlPath) {
        let proxyRulePath = path.join(currentPath, config.basePath, config.proxyRule);
        if(!fs.existsSync(proxyRulePath)) {
            log('redBright', 'proxyRules.js not exist');
        }

        // proxyRules对象
        let proxyRules = require(proxyRulePath);
        let existRules = Object.keys(proxyRules).some((key) => {
            if(key.includes(url)) {
                log('yellowBright', `rule already exist in proxyRules.js: ${url}`);
                return true;
            }
            return false;
        })
        // 路由规则已经存在
        if(existRules) return;

        // 要写入的路由规则
        let rule = `"GET /${url}": "${proxyFtlPath}"`;
        let content = fs.readFileSync(proxyRulePath).toString();
        let arr = content.split('// rule target');
        content = arr[0] + '// rule target' + '\n' + '  ' + rule + ','+ arr[1];
        fs.outputFile(proxyRulePath, content);
    },
    // 添加页面mock假数据
    createPageMockFile(poptTemplates, mockDataPath, force, mockHandler) {
        let from = path.join(poptTemplates, 'page.mock.json');
        let dest = `${mockDataPath}.json`;
        this.createFile(from, dest, force, mockHandler);
    },
    // 添加页面ftl
    createFtl(poptTemplates, ftlPath, force, ftlHandler) {
        let from = path.join(poptTemplates, 'page.ftl');
        let dest = `${ftlPath}.ftl`;
        this.createFile(from, dest, force, ftlHandler);
    },
    // 添加nej入口文件
    createEntry(poptTemplates, pageDataPath, force) {
        let from = path.join(poptTemplates, 'entry.js');
        let dest = path.join(pageDataPath, 'entry.js');
        operator.createFile(from, dest, force);
    },
    // 添加基础组件page.js
    createPageJs(poptTemplates, pageDataPath, force) {
        let from = path.join(poptTemplates, 'page.js');
        let dest = path.join(pageDataPath, 'modules/page.js');
        operator.createFile(from, dest, force);
    },
    // 添加基础组件模板page.html
    createPageHtml(poptTemplates, pageDataPath, force) {
        let from = path.join(poptTemplates, 'page.html');
        let dest = path.join(pageDataPath, 'modules/page.html');
        operator.createFile(from, dest, force);
    }
}

module.exports = operator;