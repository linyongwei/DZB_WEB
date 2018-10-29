$(document).ready(function(){

    // 定义分页所需变量
    var currentPage = 1;//当前页面
    var num = 7;//每页7条数据
    var totalData;//全部公告数量
    var totalPage;// 计算需要的页数，逢小数进1
    //提交表单
    var json = [];
    //初始化
    init();

    //对内容输出进行编码，拿到正确的表情图片等
    function htmldecode(str) {
        str = str.replace(/&amp;/gi, '&');
        str = str.replace(/&nbsp;/gi, ' ');
        str = str.replace(/&quot;/gi, '"');
        str = str.replace(/&#39;/g, "'");
        str = str.replace(/&lt;/gi, '<');
        str = str.replace(/&gt;/gi, '>');
        str = str.replace(/<br[^>]*>(?:(rn)|r|n)?/gi, '\n');
        return str;
    }

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

    //创建一行公告数据
    function createRaw(rawData,i) {
        var tbody = document.getElementById("userManageTable");
        var tr = document.createElement("tr");

        var name = document.createElement("td");
        name.innerHTML = rawData.Name;

        var studentNum = document.createElement("td");                                                                      //
        studentNum.innerHTML  = rawData.StudentNum;                                                                        //

        var joinPartyTime = document.createElement("td");                                                                / /
         joinPartyTime.innerHTML = getTime(rawData.JoinPartyTime);//

        var identity = document.createElement("td");
        identity.innerHTML = rawData.Identity;//

        var tdModify = document.createElement("td");
        var btnModify  = document.createElement("button");
        btnModify.setAttribute("class","btn btn-warning modify");
        btnModify.innerHTML = "修改";
        tdModify.appendChild(btnModify);

        var tdDelete = document.createElement("td");
        var btnDelete  = document.createElement("button");
        btnDelete.setAttribute("class","btn btn-danger remove");
        btnDelete.innerHTML = "删除";
        tdDelete.appendChild(btnDelete);

        tr.appendChild(name);
        tr.appendChild(studentNum);//
        tr.appendChild(joinPartyTime);//
        tr.appendChild(identity);
        tr.appendChild(tdModify);
        tr.appendChild(tdDelete);
        tbody.appendChild(tr);
        $("td").css("text-align", "center");
    }

    //重置显示的内容
    function reset() {
        var tbody = document.getElementById("userManageTable");
        while (tbody.hasChildNodes()) {
            tbody.removeChild(tbody.lastChild);
        }
    }
    //从后台得到数据
    function init() {
        $.getJSON("/api/person/info", function (data) {//
            if (data != "no") {
                json = data;
                hasDataInit();
            }
            else {
                alert("数据获取失败！");
                noDataInit();
            }
        });
    }

    //计算页面所需数值
    function countValue() {
        totalData = json.length;
        totalPage = Math.ceil(totalData / num);
    }

    //显示
    function show_current() {
        reset();
        countValue();
        show();
        show_current_page_num(currentPage);
        show_total_page_num(totalPage);
        showNoticeNum(json.length);
    }

    //有数据的页面初始化
    function hasDataInit() {
        reset();
        currentPage = 1;
        countValue();
        show();
        show_current_page_num(currentPage);
        show_total_page_num(totalPage);
        showNoticeNum(json.length);
    }

    //无数据的页面初始化
    function noDataInit() {
        reset();
        currentPage = 0;
        totalPage = 0;
        show_current_page_num(currentPage);
        show_total_page_num(totalPage);
        showNoticeNum(0);
    }

    //删除后页面重置函数
    function afterDelete() {

    }

    //修改后页面重置函数
    function afterModify() {

    }

    //显示公告总数
    function showNoticeNum(noticeNum) {
        $("#userNum").text(noticeNum);
    }
    //显示当前页数
    function show_current_page_num(currentPageNum) {
        $("#user-currentRecordPage").text(currentPageNum);
    }
    //显示总页数
    function show_total_page_num(totalPageNum) {
        $("#user-totalRecordPage").text(totalPageNum);
    }

    //计算并显示内容
    function show() {
        var start = (currentPage - 1) * num;
        var end = currentPage * num;
        for (var i = start; i < end; i++) {
            if (i >= totalData) {
                return;
            }
            createRaw(json[i],i);
        }
    }

    // 显示下一页
    function next() {
        if (show_last_page_alert())
            return;
        currentPage++;
        show_current();
    }

    //显示前一页
    function pre() {
        if (show_first_page_alert())
            return;
        currentPage--;
        show_current();
    }

    //显示第一页
    function first() {
        if (show_first_page_alert())
            return;
        currentPage = 1;
        show_current();
    }

    //显示最后一页
    function last() {
        if (show_last_page_alert())
            return;
        currentPage = totalPage;
        show_current();
    }

    //判断是否已经是第一页
    function show_first_page_alert() {
        if (totalPage == 0) {
            alert("没有数据");
            return true;
        }
        if (currentPage == 1) {
            alert("当前已是首页");
            return true;
        }
        return false;
    }

    //判断是否已经是最后一页
    function show_last_page_alert() {
        if (totalPage == 0) {
            alert("没有数据");
            return true;
        }
        if (currentPage == totalPage) {
            alert("当前已是尾页");
            return true;
        }
        return false;
    }

    // 点击首页按钮
    $("#user-lnkBtnFirst").click(function () {
        first();
    });
    // 点击最后一页按钮
    $("#user-lnkBtnLast").click(function () {
        last();
    })
    // 点击下一页按钮
    $("#user-lnkBtnNext").click(function () {
        next();
    });
    // 点击上一页按钮
    $("#user-lnkBtnPrevious").click(function () {
        pre();
    });

    // 给删除按钮添加事件
    $("#userManageTable").delegate(".remove","click",function () {
        var studentNum = $(this).parents("tr").children()[1].innerHTML;//
        $.ajax({
            type: "post",
            url: "/api/usermanage/delete",//删除用户
            dataType: "json",
            data: {
                studentNum: studentNum                                                                                   //
            },
            success: function (data) {
                if (data != "no") {
                    json = data;
                    //删除一条数据后，显示的仍是当前页码
                    show_current();
                }
                else {
                    alert("删除失败，请重新删除！");
                }
            }
        });
    });

    // 给修改按钮添加事件
    $("#userManageTable").delegate(".modify","click",function () {
        var userId = $(this).parents("tr").children()[1].innerHTML;
        const target =  $(this);
        const dataName ="modifyPersonInfo";
        const section = $(`.content-wrapper>section[data-name='${dataName}']`);
        section.show().siblings("section").hide();
        target.addClass("active").siblings("li").removeClass("active");

        $.ajax({
            url: "/api/person/save",                                                                                     //保存用户信息接口
            type: "POST",
            datatype: "json",
            data: {
                "userId": userId,
            },
            error: function (err) { alert(err) },
            success: function (result1) {
                var result = $.parseJSON(result1);
                $("#username1").val(result["Name"]);
                $("#usernumber1").val(result["studentNum"]);                                                              //
                $("#password1").val(result["Password"]);
                $("#email1").val(result["Email"]);
                $("#dzbConnect1").val(result["Phone"]);
                $("#userGrade1").val(result["Grade"]);
                $("#userMajor1").val(result["Major"]);
                $("#userClass1").val(result["Class"]);
                var time = result["JoinPartyTime"];//
                var date = getTime(time);
                $("#dzbTime1").val(date);
                $("#dzbName1").val(result["PartyBranchName"]);//
                $("#dzbIdentify1").val(result["Identity"]);//
                $("#dzbRole1").val(result["Role"]);
                $("#dzbFriend1").val(result["JoinPartyContact"]);//
               
            }
        });
    });

});