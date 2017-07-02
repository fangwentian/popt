const fs = require('fs-extra');
const log = require('../util/log');
const core = {
    // 把一个文件的内容写到另一个文件，可以传入handler来处理文件内容
    createFile(from, dest, force = false, handler) {
        let func = (data) => {return data}
        handler = handler || func;
        if(fs.existsSync(dest) && !force) {
            log('redBright',`file ${dest} already exist!`);
            return false;
        }
        let content = fs.readFileSync(from).toString();
        fs.outputFile(dest, handler(content));
        log('redBright', `output file to ${dest}`);
    }
}
module.exports = core;