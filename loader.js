var fs = require("fs");
var globalConfig = require("./config");
var path = require("path")

var controllerSet = [];
var pathMap = new Map();

var files = fs.readdirSync((path.resolve(__dirname) +'/'+ globalConfig['web_path']) );  //读取该目录所有文件

for (var i = 0; i < files.length; i++) {
    var temp = require("./" + globalConfig['web_path'] + "/" + files[i])
    if (temp.path) {
        for (var [key, value] of temp.path) {
            if (pathMap.get(key) == null) {
                pathMap.set(key, value);
            } else {
                throw new Error("url path 异常，url:" + key);
            }
        }
        controllerSet.push(temp)
    }
}
// console.log(pathMap)
module.exports = pathMap;