var dbutil = require("./DButil");

function insertEveryDay(conntent, ctime, success) {
    var inserSql = 'insert into every_day (`conntent`,`ctime`) values(?,?)';
    var params = [conntent,ctime];

    var connection = dbutil.createConnection();
    connection.connect()
    connection.query(inserSql,params,function(error,result){
        if(error == null) {
            success(result);
        }else {
            console.log(error)
        }
    });
    connection.end()
}

function queryEveryDay(success) {
    var querySql = "select * from every_day order by id desc limit 1;";
    var params = [];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;



