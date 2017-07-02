const chalk = require('chalk');

const _util = {
    extend(o1, o2 ,override) {
        for (var i in o2)
            if (o1[i] == undefined || override) {
                o1[i] = o2[i]
            }
        return o1;
    },
    normalizeUrl(url) {
        if(url[0] !== '/') {
            url = '/' + url;
        }
        return url;
    },
    getConfig(poptConfig, project) {
        let common = poptConfig.common;
        let projectConfig = poptConfig[project];
        return this.extend(common, projectConfig, true);
    },
    analysisUrl(url) {
        if(!url) throw 'url can not be empty'
        if(url[0] === '/') {
            url = url.slice(1);
        }
        let res = url.split('/');
        if(res.length > 3 || res.length < 1) {
            throw 'url format not correct';
        }
        return res;
    }
}

module.exports = _util;