// http://ajax.frontend.itheima.net
$(function () {
    var baseURL = "http://ajax.frontend.itheima.net"
    $.ajaxPrefilter(function (params) {
        // console.log(111);
        params.url = baseURL + params.url
    })
})