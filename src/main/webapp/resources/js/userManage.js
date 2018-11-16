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



    //创建一行公告数据
    function createRaw(rawData,i) {
        var tbody = document.getElementById("userManageTable");
        var tr = document.createElement("tr");

        var num =document.createElement("td");
        num.innerHTML = i+1;

        var name = document.createElement("td");
         name.innerHTML = rawData.name;

        var studentNum = document.createElement("td");
         studentNum.innerHTML  = rawData.studentNum;

        var joinPartyTime = document.createElement("td");
          joinPartyTime.innerHTML = rawData.joinPartyTime;

         var identity = document.createElement("td");
        identity.innerHTML = rawData.identity;


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


        tr.appendChild(num);
        tr.appendChild(name);
        tr.appendChild(studentNum);
        tr.appendChild(joinPartyTime);
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
        $.getJSON("/api/usermanage/userlist", function (result) {

            if (result != "no") {
                json = result.data.userlist;
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
        var studentNum1 = $(this).parents("tr").children()[2].innerHTML;
        var studentNum = parseInt(studentNum1);

        $.ajax({
            type: "DELETE",
            url: "/api/usermanage/delete?studentNum=" + studentNum,
            dataType: "json",
            contentType : 'application/json',
            data: JSON.stringify( {
                studentNum:studentNum
            }),
            success: function (result) {

                if (result != "no") {
                  alert("删除成功");
                  init();
                    //删除一条数据后，显示的仍是当前页码
                }
                else {
                    alert("删除失败，请重新删除！");
                }
            }
        });
    });

    // 给修改按钮添加事件
    $("#userManageTable").delegate(".modify","click",function () {
        var studentNum1= $(this).parents("tr").children()[2].innerHTML;
        var studentNum = parseInt(studentNum1);
        const target =  $(this);
        const dataName ="modifyPersonInfo";
        const section = $(`.content-wrapper>section[data-name='${dataName}']`);
        section.show().siblings("section").hide();
        target.addClass("active").siblings("li").removeClass("active");
        var api1 = "/api/usermanage/detailinfo/";
        var api = api1+studentNum;

        $.ajax({
            url: api,
            type: "GET",
            datatype: "json",
            contentType : 'application/json',
            data: {
            },
            error: function (err) {
                alert(JSON.stringify(err)); },
            success: function (result) {
                var stuMessage = result.data.user;
                $("#name1").val(stuMessage.name);
                $("#studentNum1").val(stuMessage.studentNum);
                $("#password1").val(stuMessage.password);
                $("#email1").val(stuMessage.email);
                $("#phone1").val(stuMessage.phone);
                $("#grade1").val(stuMessage.grade);
                $("#major1").val(stuMessage.major);
                $("#className1").val(stuMessage.className);
                $("#joinPartyTime1").val(stuMessage.joinPartyTime);
                $("#partyBranchName1").val(stuMessage.partyBranchName);
                $("#identity1").val(stuMessage.identity);
                $("#role1").val(stuMessage.role);
                $("#joinPartyContact1").val(stuMessage.joinPartyContact);
               
            }
        });
    });

});