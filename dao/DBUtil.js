var mysql = require('mysql')

function createConnection() {
    var connection = mysql.createConnection({
        host:'112.74.185.33',
        port:'3306',
        user:'devwin_lemonotes',
        password:'TbaC2Ref5rbTY8eD',
        database:'devwin_lemonotes'
    })
    return connection;
}

module.exports.createConnection = createConnection;

//         host:'112.74.185.33',
//         port:'3306',
//         user:'devwin_lemonotes',
//         password:'TbaC2Ref5rbTY8eD',
//         database:'devwin_lemonotes'

        // host:'127.0.0.1',
        // port:'3306',
        // user:'root',
        // password:'123456',
        // database:'my_blog'