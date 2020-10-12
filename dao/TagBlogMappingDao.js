var dbutil = require('./DButil');


function insertTagBlogMapping(tagId, blogId, ctime, utime, success) {
    var inserSql = 'insert into tag_blog_mapping(`tag_id`,`blog_id`,`ctime`,`utime`) values(?,?,?,?)';
    var params = [tagId, blogId, ctime, utime];

    var connection = dbutil.createConnection();
    connection.connect()
    connection.query(inserSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error)
        }
    });
    connection.end()
}

function queryByTag(tagId, page, pageSize, success) {
    var inserSql = 'select * from tag_blog_mapping where tag_id = ? limit ?, ?;';
    var params = [tagId, page, pageSize];

    var connection = dbutil.createConnection();
    connection.connect()
    connection.query(inserSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error)
        }
    });
    connection.end()
}

function queryByTagCount(tagId,success) {
    var inserSql = 'select count(1) as count from tag_blog_mapping where tag_id = ?;';
    var params = [tagId];

    var connection = dbutil.createConnection();
    connection.connect()
    connection.query(inserSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error)
        }
    });
    connection.end()
}

module.exports.insertTagBlogMapping = insertTagBlogMapping;
module.exports.queryByTag = queryByTag;
module.exports.queryByTagCount = queryByTagCount;