$(document).ready(function () {

    // 定义分页所需变量
    var currentPage = 0;//当前页面
    var num = 7;//每页7条数据
    var totalData;//全部公告数量
    var totalPage;// 计算需要的页数，逢小数进1

    //提交表单
    var json = [];
    //初始化
    init();

    //公告管理
    var btnRelease = document.getElementById('btn-release');
    var releaseDiv = document.getElementById('releaseDiv');
    var inputDiv = document.getElementById('inputDiv');
    var btnInput = document.getElementById('btn-input');
    btnInput.onclick = function () {
        releaseDiv.style.display = 'block';
        notice_pageTurn.style.display = 'block';
        inputDiv.style.display = 'none';
    }
    btnRelease.onclick = function () {
        //打开发布公告页面时清空内容，以便再次输入。
        KindEditor.html("#editor_id", "");
        document.getElementById('noticeName').value = "";
        releaseDiv.style.display = 'none';
        notice_pageTurn.style.display = 'none';
        inputDiv.style.display = 'block';

    }
    //编辑器  由于提示KingEditor未定义，所以暂时注释掉
    var editor;
    KindEditor.ready(function (K) {
        editor = K.create('textarea', {
            //下面这行代码就是关键的所在，当失去焦点时执行 this.sync()，即可获取textarea的值
            afterBlur: function () { this.sync(); },
            allowImageUpload: true,
            newlineTag: "br",
        });
    });

    var index = -1;

    //返回列表响应事件
    $("#btn-cancel").click(function () {
        releaseDiv.style.display = 'block';
        notice_pageTurn.style.display = 'block';
        inputDiv.style.display = 'none';
        return false;
    });

    //发布按钮响应事件
    $("#btn-input").click(function () {
        var noticeName = $("#noticeName").val().trim();
        if (noticeName == "") {
            alert("请输入公告标题！");
            return false;
        }
        var content = $("#editor_id").val().trim();
        if (content == "") {
            alert("请输入公告内容！");
            return false;
        }
        content = content.replace(/\n/gi, "<br>");
        content = content.replace(/<br>/gi, "");
        content = content.replace(/</gi, "&lt;");
        content = content.replace(/>/gi, "&gt;");
        content = content.replace(/ /gi, "&nbsp;");
        content = content.replace(/&/gi, "&amp;");
        content = content.replace(/'/gi, "&#39;");
        content = content.replace(/"/gi, "&quot;");
        if (index != -1) {
            var noticeId = json[index].NoticeId;                                                                          //
            $.ajax({
                type: "post",
                url: "/api/notice/update",                                                                               //修改公告
                dataType: "json",
                data: {
                    noticeId: noticeId,                                                                                  //
                    noticeName: noticeName,
                    content: content,
                },
                success: function (data) {
                    if (data != "no") {
                        json = data;
                        currentPage = 1;
                        show_current();
                        index = -1;
                    }
                    else {
                        alert("修改失败，请重新修改！");
                    }
                }
            });
            return false;
        }
        $.ajax({
            type: "post",
            url: "/api/notice/create",                                                                                   //
            dataType: "json",
            data: {
                noticeName: noticeName,                                                                                 //?
                content: content,
            },
            success: function (data) {
                if (data != "no") {
                    json = data;
                    // 发布成功后显示最新公告
                    currentPage = 1;
                    show_current();
                }
                else {
                    alert("发布失败，请重新发布！");
                }
            }
        });
        return false;
    });

    //修改公告
    function updateNotice() {
        index = parseInt(this.id);
        var noticeName = json[index].NoticeName;
        var noticeContent = htmldecode(json[index].NoticeContent);
        KindEditor.html("#editor_id", noticeContent);
        document.getElementById("editor_id").value = noticeContent;
        document.getElementById('noticeName').value = noticeName;
        releaseDiv.style.display = 'none';
        notice_pageTurn.style.display = 'none';
        inputDiv.style.display = 'block';
    }
    //删除公告
    function deleteNotice() {
        index = parseInt(this.id);
        var noticeId = json[index].NoticeID;
        $.ajax({
            type: "post",
            url: "/api/notice/delete",                                                                                   //删除公告
            dataType: "json",
            data: {
                noticeId: noticeId                                                                                       //
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
        index = -1;
    }

    //对内容输出进行编码，拿到正确的表情图片等
    function htmldecode(str) {
        str = str.replace(/&amp;/gi, '&');
        str = str.replace(/&nbsp;/gi, ' ');
        str = str.replace(/&quot;/gi, '"');
        str = str.replace(/&#39;/g, "'");
        str = str.replace(/&lt;/gi, '<');
        str = str.replace(/&gt;/gi, '>');
        str = str.replace(/<br>/gi, '');
        str = str.split('  ').join('&nbsp;&nbsp;');
        return str;
    }

    function getTime(time) {
        if (time != "") {
            var dt = new Date(parseInt(time.slice(6, 19)));
            var year = dt.getFullYear();
            var month = dt.getMonth() + 1 < 10 ? "0" + (dt.getMonth() + 1) : dt.getMonth() + 1;
            var date = dt.getDate() < 10 ? "0" + (dt.getDate()) : dt.getDate();
            var hour = dt.getHours() < 10 ? "0" + (dt.getHours()) : dt.getHours();
            var minute = dt.getMinutes() < 10 ? "0" + (dt.getMinutes()) : dt.getMinutes();
            var second = dt.getSeconds() < 10 ? "0" + (dt.getSeconds()) : dt.getSeconds();
            return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
        }
        else {
            return time;
        }
    }

    //创建一行公告数据
    function createRaw(rawData, i) {
        var tbody = document.getElementById("noticeTable");
        var tr = document.createElement("tr");
        var studentName = document.createElement("td");                                                                  //
        studentName.innerHTML = rawData.StudentName;
        var noticeName = document.createElement("td");
        var linkHtml = document.createElement("a");
        linkHtml.href = "/Home/Notice?id=" + rawData.NoticeId;                                                           //?
        linkHtml.target = "_blank";
        linkHtml.innerHTML = rawData.NoticeName;
        noticeName.appendChild(linkHtml);
        var pubTime = document.createElement("td");                                                                      //
        pubTime.innerHTML = getTime(rawData.Time);
        var updateTd = document.createElement("td");
        var updateBtn = document.createElement("button");
        updateBtn.innerHTML = "修改";
        updateBtn.className = "btn btn-warning";
        updateBtn.id = i;
        updateBtn.onclick = updateNotice;
        updateTd.appendChild(updateBtn);
        var deleteTd = document.createElement("td");
        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "删除";
        deleteBtn.className = "btn btn-danger remove";
        deleteBtn.id = i;
        deleteBtn.onclick = deleteNotice;
        deleteTd.appendChild(deleteBtn);
        tr.appendChild(studentName);
        tr.appendChild(noticeName);
        tr.appendChild(pubTime);
        tr.appendChild(updateTd);
        tr.appendChild(deleteTd);
        tbody.appendChild(tr);
        $("td").css("text-align", "center");
    }

    //重置显示的内容
    function reset() {
        var tbody = document.getElementById("noticeTable");
        while (tbody.hasChildNodes()) {
            tbody.removeChild(tbody.lastChild);
        }
    }
    //从后台得到数据
    function init() {
        $.getJSON("/api/notice/noticelist", function (data) {//
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

    //新发布后页面重置函数
    function afterAdd() {

    }

    //显示公告总数
    function showNoticeNum(noticeNum) {
        $("#notice-recordNum").text(noticeNum);

    }
    //显示当前页数
    function show_current_page_num(currentPageNum) {
        $("#notice-currentRecordPage").text(currentPageNum);
    }
    //显示总页数
    function show_total_page_num(totalPageNum) {
        $("#notice-totalRecordPage").text(totalPageNum);
    }

    //计算并显示内容
    function show() {
        var start = (currentPage - 1) * num;
        var end = currentPage * num;
        for (var i = start; i < end; i++) {
            if (i >= totalData) {
                return;
            }
            createRaw(json[i], i);
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
    $("#notice-lnkBtnFirst").click(function () {
        first();
    });
    // 点击最后一页按钮
    $("#notice-lnkBtnLast").click(function () {
        last();
    })
    // 点击下一页按钮
    $("#notice-lnkBtnNext").click(function () {
        next();
    });
    // 点击上一页按钮
    $("#notice-lnkBtnPrevious").click(function () {
        pre();
    });

});