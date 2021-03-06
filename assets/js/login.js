$(function () {
    $("#link_reg").on('click', function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    $("#link_login").on('click', function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,16}$/,
            "密码须6-16位，且不能有空格"
        ],
        repwd: function (value) {
            var pwd = $(".reg-box input[name=password]").val()
            if (value !== pwd) {
                return "两次密码不一致"
            }
        }
    })
    var layer = layui.layer;
    $("#form_reg").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val()
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg("注册成功，请登录")
                $("#link_login").click()
                $("#form_reg")[0].reset()
            }
        })
    })
    $("#form_login").submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("登陆成功")
                localStorage.setItem("token", res.token)
                location.href = "/index.html"
            }
        })
    })
})