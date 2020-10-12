var blogList = new Vue({
    el: "#blog_list",
    data: {
        blogList: []
    },
    computed: {

    },
    created() {
        axios({
            method: 'get',
            url: '/queryAllBlog'
        }).then(function (resp) {
            for (let i = 0; i < resp.data.data.length; i++) {
                var date = new Date(resp.data.data[i].ctime * 1000),
                    Y = date.getFullYear() + '-',
                    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
                    D = date.getDate() + '';
                resp.data.data[i].link = '/blog_detail.html?bid=' + resp.data.data[i].id
                resp.data.data[i].ctime = (Y + M + D)
            }
            blogList.blogList = resp.data.data
        }).catch(function (resp) {
            console.log(resp)
        });
    }
})