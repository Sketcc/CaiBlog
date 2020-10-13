var randomTags = new Vue({
    el: "#random_tags",
    data: {
        tags: []
    },
    computed: {
        randomColor: function () {
            return function () {
                var red = Math.random() * 255 + 50;
                var green = Math.random() * 255 + 50;
                var blue = Math.random() * 255 + 50;
                return "rgb(" + red + "," + green + "," + blue + ")"
            }
        },
        randomSize: function () {
            return function () {
                var size = (Math.random() * 20 + 8) + 'px'
                return size
            }
        }
    },
    created() {
        axios({
            method: 'get',
            url: '/queryRandomTags'
        }).then(function (resp) {
            var result = [];
            for (let i = 0; i < resp.data.data.length; i++) {
                result.push({text:resp.data.data[i].tag,link:'/?tag=' + resp.data.data[i].tag})
            }
            randomTags.tags = result;
        })
    }
})

var newHot = new Vue({
    el: "#new_hot",
    data: {
        hotList: []
    },
    created() {
        axios({
            method: 'get',
            url: '/queryHotBlog'
        }).then(function (resp) {
            var result = [];
            for (let i = 0; i < resp.data.data.length; i++) {
                var temp = {};
                temp.title = resp.data.data[i].title;
                temp.link = '/blog_detail.html?bid=' + resp.data.data[i].id;
                result.push(temp);
            }
            newHot.hotList = result;
        })
    }
})

var newComments = new Vue({
    el: "#new_comments",
    data: {
        commentList: [
            { name: "这里是用户名", date: "2020-8-31", comment: "这里是一大串评论，巴拉巴拉巴巴里" },
            { name: "这里是用户名", date: "2020-8-31", comment: "这里是一大串评论，巴拉巴拉巴巴里" },
            { name: "这里是用户名", date: "2020-8-31", comment: "这里是一大串评论，巴拉巴拉巴巴里" },
            { name: "这里是用户名", date: "2020-8-31", comment: "这里是一大串评论，巴拉巴拉巴巴里" },
            { name: "这里是用户名", date: "2020-8-31", comment: "这里是一大串评论，巴拉巴拉巴巴里" },
            { name: "这里是用户名", date: "2020-8-31", comment: "这里是一大串评论，巴拉巴拉巴巴里" },
            { name: "这里是用户名", date: "2020-8-31", comment: "这里是一大串评论，巴拉巴拉巴巴里" },
        ]
    },
    created() {
        axios({
            method: 'get',
            url: '/queryNewComments'
        }).then(function (resp) {
            // console.log(resp)
            var result = [];
            for (let i = 0; i < resp.data.data.length; i++) {
                var date = new Date(resp.data.data[i].ctime * 1000),
                    Y = date.getFullYear() + '-',
                    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
                    D = date.getDate() + '';
                var temp = {};
                temp.name = resp.data.data[i].user_name;
                temp.date = (Y + M + D)
                temp.comment = resp.data.data[i].comments;
                result.push(temp);
            }
            newComments.commentList = result
        })
    }
})