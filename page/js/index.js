const everyDay = new Vue({
    el: '#every_day',
    data: {
        conntent: '早成者未必有成，晚达者未必不达。不可以年少而自恃，不可以年老而自弃。'
    },
    computed: {
        getContent: function () {
            return this.conntent;
        }
    },
    created() {
        //请求数据，给conntent赋值
        axios({
            method: "get",
            url: "/queryEveryDay"
        }).then(function (resp) {
            everyDay.conntent = resp.data.data[0].conntent

        }).catch(function (resp) {
            console.log('请求失败');
        })
    }
})

const articleList = new Vue({
    el: "#article_list",
    data: {
        page: 1,
        pageSize: 5,
        count: 100,
        pageNumList: [],
        articleList: [
            {
                title: "四联幽门螺杆菌",
                content: "以黑色为主色调，使用html5,css3,jquery等技术，实现页面适应手机以及电脑，平板等。手写的原生代码，布局合理，代码精简，页面再加上古典元素的点缀，现代与古典艺术的结合，使网站看起来更文艺。",
                date: "2018-11-08",
                views: "125",
                tags: "test1 test2",
                id: "1",
                link: ""
            }
        ]
    },
    methods: {
        generatePage: function (page) {
            
                var nowPage = page;
                var pageSize = this.pageSize;
                var totalCount = this.count;
                var result = [];
                result.push({ text: '<<<', page: 1 });
                if (nowPage > 2) {
                    result.push({ text: nowPage - 2, page: nowPage - 2 })
                }
                if (nowPage > 1) {
                    result.push({ text: nowPage - 1, page: nowPage - 1 })
                }
                result.push({ text: nowPage, page: nowPage });
                if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                    result.push({ text: nowPage + 1, page: nowPage + 1 })
                }
                if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                    result.push({ text: nowPage + 2, page: nowPage + 2 })
                }
                result.push({ text: '>>>', page: parseInt((totalCount + pageSize - 1) / pageSize) });
                this.pageNumList = result;
                return result          
        }
    },
    computed: {
        jumpTo: function () {
            return function (page) {
                this.getPage(page, this.pageSize)
            }
        },
        getPage: function () {
            return function (page, pageSize) {
                var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
                var tag = '';
                for (var i = 0; i < searchUrlParams.length; i++) {
                    if (searchUrlParams[i].split('=')[0] == 'tag') {
                        try {
                            tag = searchUrlParams[i].split('=')[1];
                        } catch (e) {
                            console.log(e)
                        }
                    }
                }
                if (tag == '') {  //不是查询
                    axios({
                        method: 'get',
                        url: '/queryBlogByPage?page=' + (page - 1) + '&pageSize=' + pageSize
                    }).then(function (resp) {
                        // console.log(resp)
                        var result = resp.data.data;
                        var list = []

                        for (let i = 0; i < result.length; i++) {
                            var date = new Date(result[i].ctime * 1000),
                                Y = date.getFullYear() + '-',
                                M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
                                D = date.getDate() + '';
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = (Y + M + D);
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = '/blog_detail.html?bid=' + result[i].id
                            list.push(temp)
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log('请求错误')
                    });
                    axios({
                        method: 'get',
                        url: '/queryBlogCount'
                    }).then(function (resp) {
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    })
                } else {
                    axios({
                        method: 'get',
                        url: '/queryByTag?page=' + (page - 1) + '&pageSize=' + pageSize + '&tag=' + tag
                    }).then(function (resp) {
                        var result = resp.data.data;
                        var list = []

                        for (let i = 0; i < result.length; i++) {
                            var date = new Date(result[i].ctime * 1000),
                                Y = date.getFullYear() + '-',
                                M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
                                D = date.getDate() + '';
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = (Y + M + D);
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = '/blog_detail.html?bid=' + result[i].id
                            list.push(temp)
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log('请求错误')
                    });

                    axios({
                        method: 'get',
                        url: '/queryByTagCount?tag=' + tag
                    }).then(function (resp) {
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    })
                }
            }
        },
        generatePageTool: function () {
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({ text: '<<<', page: 1 });
            if (nowPage > 2) {
                result.push({ text: nowPage - 2, page: nowPage - 2 })
            }
            if (nowPage > 1) {
                result.push({ text: nowPage - 1, page: nowPage - 1 })
            }
            result.push({ text: nowPage, page: nowPage });
            if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({ text: nowPage + 1, page: nowPage + 1 })
            }
            if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({ text: nowPage + 2, page: nowPage + 2 })
            }
            result.push({ text: '>>>', page: parseInt((totalCount + pageSize - 1) / pageSize) });
            this.pageNumList = result;
            return result
        }
    },
    created() {
        this.getPage(this.page, this.pageSize);
    }
})

const bannerBox = new Vue({
    el: '#banner-box',
    data: {
        bannerList: [
            { poster: '../img/active3.jpg', title: '图片' },
            { poster: '../img/active6.jpg', title: '图片' },
            { poster: '../img/active1.jpg', title: '图片' },
            { poster: '../img/active3.jpg', title: '图片' }
        ],
        bannerStyle: {
            left: 0,
            transition: 'left 1.6s',

        },
        bannerWidth: 100,
        bannerindex: 0
    },
    methods: {
        autoMove() {
            setTimeout(() => {
                if (this.bannerindex === 0) {
                    this.bannerStyle.transition = 'left 1.6s'
                }
                this.bannerindex++;
                this.bannerStyle.left = -this.bannerWidth * this.bannerindex + '%';
            }, 6000)
        },
        handle() {
            if (this.bannerindex === 3) {
                this.bannerindex = 0;
                this.bannerStyle.left = 0;
                this.bannerStyle.transition = 'none';
            }
            this.autoMove()
        },
    },
    mounted() {
        this.autoMove()
    },
})

var search = new Vue({
    el: "#search",
    data: {
        search: ""
    },
    methods: {
        sendSearch: function () {
            var searchKey = document.querySelector('.search_cont')
            this.search = searchKey.value
            axios({
                url: "/blog/search?search=" + this.search
            }).then(function (resp) {
                for (var i = 0; i < resp.data.list.length; i++) {
                    resp.data.list[i].link = '/blog_detail.html?bid=' +  resp.data.list[i].id  
                }
                articleList.count = resp.data.count;
                articleList.page = 1;
                articleList.generatePage(this.page);
                articleList.articleList = resp.data.list;
                alert('查询成功')
            });
        }
    },
    computed: {

    }
});