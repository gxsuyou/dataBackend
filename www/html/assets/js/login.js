$(function () {
    $(function () {
        $(".btn-block").click(function () {
            console.log(config.data)
            var username = $("#signin-email").val();
            var password = $("#signin-password").val();
            var url = config.data + "users/login"
            $.ajax({
                type: "POST",
                url: url,
                data: {
                    name: username,
                    psd: password
                },
                success: function (msg) {
                    console.log(msg);
                    return false;
                    // window.location.href = ""
                }
            })
        })
    })
})