const path = require('path');
const fs = require('fs-extra');
const log = require('../util/log');
const MT = require('./miniTemplate');

const operator = {
    // 把一个文件的内容写到另一个文件
    renderFile({ from, dest, force = false, data = {} }) {
        if(fs.existsSync(dest) && !force) {
            log('yellowBright',`file already exist: ${dest}`);
            return false;
        }

        let mt = new MT(fs.readFileSync(from).toString(), data);

        fs.outputFile(dest, mt.render());
        log('greenBright', `output file to ${dest}`);
    },

    // 批量renderFile
    batchRenderFiles(config = []) {
        config.forEach((item) => {
            this.renderFile(item);
        })
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

        let rule = `'GET /${url}': '${proxyFtlPath}'`;
        let content = fs.readFileSync(proxyRulePath).toString();
        let index = content.lastIndexOf('}');
        content = `${content.slice(0, index)}    ${rule},\n${content.slice(index)}`;
        fs.outputFile(proxyRulePath, content);
    }
}

module.exports = operator;