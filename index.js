var express = require('express');
var path = require('path')
var globalConfig = require('./config');

var loader = require('./loader.js')

var app = new express();

app.use(express.static(path.resolve(__dirname,"./page/")));

app.post('/editEveryDay',loader.get('/editEveryDay'));
app.get('/queryEveryDay',loader.get('/queryEveryDay'));

app.post('/editBlog',loader.get('/editBlog'));
app.get('/queryBlogByPage',loader.get('/queryBlogByPage'));

app.get('/queryBlogCount',loader.get('/queryBlogCount'));
app.get('/queryBlogById',loader.get('/queryBlogById'));

app.get('/addComment',loader.get('/addComment'));

app.get('/queryRandomCode',loader.get('/queryRandomCode'));
app.get('/queryCommentsByBlogId',loader.get('/queryCommentsByBlogId'));
app.get('/queryCommentsCountByBlogId',loader.get('/queryCommentsCountByBlogId'));

app.get('/queryAllBlog',loader.get('/queryAllBlog'));
app.get('/queryRandomTags',loader.get('/queryRandomTags'));
app.get('/queryHotBlog',loader.get('/queryHotBlog'));
app.get('/queryNewComments',loader.get('/queryNewComments'));

app.get('/queryByTag',loader.get('/queryByTag'));
app.get('/queryByTagCount',loader.get('/queryByTagCount'));

app.get('/blog/search',loader.get('/blog/search'))


app.listen(globalConfig,function() {
    console.log('server start in 9527')
})