$(".btn-block").click(function () {
    var username = $("#signin-email").val();
    var password = $("#signin-password").val();
    if (!username || !password) {
        layer.msg('请输入用户名/密码');
        return false;
    }
    var url = config.data + "users/login"
    $.ajax({
        type: "POST",
        url: url,
        data: {
            name: username,
            psd: password
        },
        success: function (msg) {
            if (msg.state == 1) {
                var user = msg.user;
                setCookie("id", user.id, 7);
                setCookie("name", user.name, 7);
                setCookie("comment", user.comment, 7);

                window.location.href = "main.html"
            } else {
                layer.msg('用户名/密码不正确');
                return false;
            }
        }, error(msg) {
            layer.msg('网络错误');
            return false
        }
    })
})

