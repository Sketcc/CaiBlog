var dbutil = require("./DBUtil");

function insertBlog(title, content, tags, views, ctime, utime, success) {
    var inserSql = 'insert into blog (`title`,`content`,`tags`,`views`,`ctime`,`utime`) values(?,?,?,?,?,?)';
    var params = [title, content, tags, views, ctime, utime];

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

function queryBlogByPage(page, pageSize, success) {
    var inserSql = 'select * from blog order by id desc limit ?, ?;';
    var params = [page * pageSize, pageSize];

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

function queryBlogCount( success) {
    var querySql = 'select count(1) as count from blog;';
    var params = [];

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

function queryBlogById(id, success) {
    var querySql = 'select * from blog where id=?;';
    var params = [id];

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

function queryAllBlog(success) {
    var querySql = 'select * from blog order by id desc;';
    var params = [];

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

function addViews(id, success) {
    var querySql = 'update blog set views = views + 1 where id = ?;';
    var params = [id];

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

function queryHotBlog(size, success) {
    var querySql = 'select * from blog order by views desc limit ?;';
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

function queryBlogBySearch(search, success) {
    var sql = "select * from blog where title like concat(concat('%', ?), '%') or content like concat(concat('%', ?), '%');";
    var params = [search, search];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);

        }
    });
    connection.end();
}

function queryBlogBySearchCount(search, success) {
    var sql = "select count(1) from blog where title like \"%?%\" or content like \"%?%\";";
    var params = [search, search];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end();
}


module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllBlog = queryAllBlog;
module.exports.addViews = addViews;
module.exports.queryHotBlog = queryHotBlog;
module.exports.queryBlogBySearch = queryBlogBySearch;
module.exports.queryBlogBySearchCount = queryBlogBySearchCount;
