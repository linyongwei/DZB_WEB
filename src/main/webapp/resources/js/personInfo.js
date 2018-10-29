$(document).ready(function () {

    var stuMessage;
    $("#id_personInfo").click(function () {
        $.getJSON("/Home/BingMessage", function (data) {                                                                 //??
            if (data != null) {
                stuMessage = data;               
                hasDataInit();
            }
            else {
                alert("数据获取失败！");
                noDataInit();
            }
        });

    });

    //把拿到的学生信息赋给界面
    function hasDataInit() {
        $("#username").val(stuMessage.name);//
        $("#usernumber").val(stuMessage.studentNum);//
        $("#password").val(stuMessage.password);//
        $("#email").val(stuMessage.email);//
        $("#dzbConnect").val(stuMessage.phone);//
        $("#userGrade").val(stuMessage.grade);//
        $("#userMajor").val(stuMessage.major);//
        $("#userClass").val(stuMessage.class);//
        var dataTime = getTime(stuMessage.joinPartyTime);//
        $("#dzbTime").val(dataTime);
        $("#dzbName").val(stuMessage.partyBranchName);
        $("#dzbIdentify").val(stuMessage.identity);//
        $("#dzbRole").val(stuMessage.role);//
        $("#dzbFriend").val(stuMessage.joinPartyContact);//
    };

    function noDataInit() {

    };

    //时间转换函数
    function getTime(time) {
        if (time != "") {
            var dt = new Date(parseInt(time.slice(6, 19)));
            var year = dt.getFullYear();
            var month = dt.getMonth() + 1 < 10 ? "0" + (dt.getMonth() + 1) : dt.getMonth() + 1;
            var date = dt.getDate() < 10 ? "0" + (dt.getDate()) : dt.getDate();
            return year + "-" + month + "-" + date;
        }
        else {
            return time;
        }
    }
});