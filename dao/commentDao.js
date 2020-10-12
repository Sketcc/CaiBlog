var dbutil = require('./DButil');


function insertComment(blogId, parent, parentName, userName, email, comments, ctime, utime, success) {
    var inserSql = 'insert into comments (`blog_id`,`parent`,`parent_name`,`user_name`,`email`,`comments`,`ctime`,`utime`) values(?,?,?,?,?,?,?,?)';
    var params = [blogId, parent, parentName, userName, email, comments, ctime, utime];

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

function queryCommentByBlogId(blogId, success) {
    var querySql = 'select * from comments where blog_id = ?;';
    var params = [blogId];

    var connection = dbutil.createConnection();
    connection.connect()
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error)
        }
    });
    connection.end()
}


function queryCommentsCountByBlogId(blogId,success) {
    var querySql = 'select count(1) as count from comments where blog_id = ?;';
    var params = [blogId];

    var connection = dbutil.createConnection();
    connection.connect()
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error)
        }
    });
    connection.end()
}

function queryNewComments(size,success) {
    var querySql = 'select * from comments order by id desc limit ?;';
    var params = [size];

    var connection = dbutil.createConnection();
    connection.connect()
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error)
        }
    });
    connection.end()
}

module.exports.insertComment = insertComment;
module.exports.queryCommentByBlogId = queryCommentByBlogId;
module.exports.queryCommentsCountByBlogId = queryCommentsCountByBlogId;
module.exports.queryNewComments = queryNewComments;