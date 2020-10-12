var fs = require("fs");
var path = require('path')
var globalConfig = {};

var conf = fs.readFileSync(path.resolve(__dirname,"./server.conf"),'utf-8');

var configArr = conf.toString().split("\n");

for (var i = 0 ; i < configArr.length ; i ++) {
    globalConfig[configArr[i].split("=")[0].trim()] = configArr[i].split("=")[1].trim();
}

module.exports = globalConfig;