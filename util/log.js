const chalk = require('chalk');
module.exports = (color, text) => {
    console.log(chalk[color](text));
}