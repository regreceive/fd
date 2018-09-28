const path = require('path');
const fs = require('fs-extra');
const lessToJs = require('less-vars-to-js');

// 把theme.less转为js对象
module.exports = lessToJs(
  fs.readFileSync(path.join(__dirname, './theme.less'), 'utf8'),
);
