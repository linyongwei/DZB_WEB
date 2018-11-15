$(document).ready(function () {

    var stuMessage;
    $("#id_personInfo").click(function () {
        $.getJSON("/api/person/info", function (data) {                                                                 //??
            if (data != null) {
                stuMessage = data.data;
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
        $("#name").val(stuMessage.name);
        $("#studentNum").val(stuMessage.studentNum);
        $("#password").val(stuMessage.password);
        $("#email").val(stuMessage.email);
        $("#phone").val(stuMessage.phone);
        $("#grade").val(stuMessage.grade);
        $("#major").val(stuMessage.major);
        $("#className").val(stuMessage.className);
        $("#joinPartyTime").val(stuMessage.joinPartyTime);
        $("#partyBranchName").val(stuMessage.partyBranchName);
        $("#identity").val(stuMessage.identity);
        $("#role").val(stuMessage.role);
        $("#joinPartyContact").val(stuMessage.joinPartyContact);
    };

    function noDataInit() {

    };

    //时间转换函数

});