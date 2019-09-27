
$(document).ready(function () {
    
    var Div1 = document.getElementById("Div1");
    var Div2 = document.getElementById("Div2");
    var Div3 = document.getElementById("Div3");
    var Next1 = document.getElementById("Next1");
    var Next2 = document.getElementById("Next2");
    var studentNum = document.getElementById("studentNum");
    var FinishPwd = document.getElementById("FinishPwd");

    Next1.onclick = function () {
        var studentNum = document.getElementById("studentNum"); 
        var code = document.getElementById("code");
        if (studentNum == "") {
            alert("请输入账号!");
        }         
        else if( code == "") {
            alert("请输入验证码!")
        }
        else {
            $.ajax({
                url: "/api/user/send_mail_code",                                                                        //用邮箱找回密码
                type: "POST",
                datatype: "json",
                contentType : 'application/json',
                data:  JSON.stringify({
                    studentNum: studentNum.value,
                    code: code.value
                }),
                error: function (err) { alert("出错了") },
                success: function (result) {
                    if (result.code == 10000) {
                        alert("验证码输入错误，请重新输入！");
                        code.value = "";
                    }
                    else if (result.message == "该用户未绑定邮箱") {
                        alert("该账号未绑定邮箱，请联系管理员！");
                        studentNum.value = "";
                        code.value = "";
                    }
                    else if (result.code == 200) {
                        Div1.style.display = 'none';
                        Div2.style.display = 'block';
                        Div3.style.display = 'none';
                    }
                    else {
                        alert("出错！");
                    }
                }
            });
        }       
    }

    Next2.onclick = function () {
        var mailCode = document.getElementById("mailCode");                                                             //
        if (mailCode.value == "") {
            alert("请输入验证码");
        }
        else {
            $.ajax({
                url: "/api/user/check_mail_code",                                                                       //
                type: "POST",
                datatype: "json",
                contentType : 'application/json',
                data:  JSON.stringify({
                    mailCode: mailCode.value
                }),
                error: function (err) { alert("出错了") },
                success: function (result) {
                    if (result.message == "验证码错误") {
                        alert("验证码输入错误，请重新输入！");
                        mailCode.value = "";
                    }
                    else if (result.code == 200) {
                        Div1.style.display = 'none';
                        Div2.style.display = 'none';
                        Div3.style.display = 'block';
                    }
                    else {
                        alert("出错！");
                    }
                }
            });
        }      
    }

    FinishPwd.onclick = function () {
        var password = document.getElementById("password");
        var rpassword = document.getElementById("rpassword");
        if (password.value == "") {
            alert("请输入新密码！");
        }
        else if (rpassword.value == "") {
            alert("请再次输入密码！");
        }
        else if (password.value != rpassword.value) {
            alert("密码不一致，请重新输入！");
            rpassword.value == ""
        }
        else {
            $.ajax({
                url: "/api/user/reset_password",
                type: "POST",
                datatype: "json",
                contentType : 'application/json',
                data: JSON.stringify({
                    "password": password.value ,
                    "rpassword":rpassword.value
                }),
                error: function (err) { alert("出错了") },
                success: function (result) {
                    if (result.code == 200) {
                        alert("新密码修改成功！");
                        window.location.href = "/views/Online/Login.html";
                    }
                    else {
                        alert("出错！");
                    }
                }
            });
        }
    }
});