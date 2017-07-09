const fs = require('fs-extra');
const log = require('./log');
const _util = {
    require(path) {
        try {
            return require(path);
        } catch(e) {
            log('yellow', `${path} is not exist`);
            throw `${path} is not exist`;
        }
    },
    extend(o1, o2 ,override) {
        for (var i in o2)
            if (o1[i] == undefined || override) {
                o1[i] = o2[i]
            }
        return o1;
    },
    /*
    url只能是字母和/组成，至少一级，不超过三级
     */
    checkUrl(url) {
        let reg = /^\/?([a-zA-Z]+)(\/[a-zA-Z]+){0,2}\/?$/;
        return reg.test(url);
    },
    /*
    去掉url首尾的/
     */
    normalizeUrl(url) {
        return url.replace(/^\/?(.*?)\/?$/,"$1");
    },
    /*
    转换为标准三级url
     */
    transformToThreeLevel(url) {
        url = this.normalizeUrl(url);
        let paths = url.split('/');
        let res;
        if(paths.length == 1) {
            res = `${url}/index/index`
        } else if(paths.length == 2) {
            res = `${url}/index`
        } else {
            res = url;
        }
        return res;
    },
    checkProject(poptConfig, project) {
        if (!poptConfig || !project || !poptConfig[project]) {
            return false;
        }
        return true;
    },
    getConfig(poptConfig, project) {
        let common = poptConfig.common;
        let projectConfig = poptConfig[project] || {};
        return this.extend(common, projectConfig, true);
    }
}

module.exports = _util;