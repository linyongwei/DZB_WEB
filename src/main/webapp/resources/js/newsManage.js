//新闻管理页面
$(document).ready(function () {

    // 定义分页所需变量
    var currentPage = 0;//当前页面
    var num = 7;//每页7条数据
    var totalData;//全部公告数量
    var totalPage;// 计算需要的页数，逢小数进1
    var tbody = document.getElementById("newsTable");

    //提交表单
    var json = [];
    //初始化
    init();

    var newsDiv = document.getElementById('newsDiv');
    var inputDiv = document.getElementById('inputNewsDiv');
    var news_pageTurn = document.getElementById('news_pageTurn'); 
    var newText = document.getElementById('newText');//

    //右上角的发布新闻按钮的点击事件
    $("#btn-newsRelease").click(function () {
        document.getElementById('newsName').value = "";
        newsDiv.style.display = 'none';
        newsPageTurn.style.display = 'none';//11
        inputDiv.style.display = 'block';
    });
    //右下角的发布新闻按钮的点击事件（即真正发布新闻的按钮）
    $("#btn-newsReallyRelease").click(function () {
        newsDiv.style.display = 'block';
        newsPageTurn.style.display = 'block';//11
        inputDiv.style.display = 'none';
    });

    var index = -1;

    $(":radio").click(function () {
        var newsType = $('input[name="newsType"]:checked').val();
        if (newsType == "学习十九大") {
            newsLink.style.display = 'none';//
            newsText.style.display = 'block';//
        }
        else {
            newsLink.style.display = 'block';//
            newsText.style.display = 'none';//
        }
    });
    
    //返回列表响应事件
    $("#btn-return").click(function () {
        newsDiv.style.display = 'block';
        newsPageTurn.style.display = 'block';//11
        inputNewsDiv.style.display = 'none';
        return false;
    });

    //发布按钮响应事件
    $("#btn-newsReallyRelease").click(function () {
        var newsName = $("#newsName").val().trim();
        if (newsName == "") {
            alert("请输入新闻标题！");
            return false;
        }       

        var newsType1 = $('input[name="newsType"]:checked').val();
        var content = $("#editor_new").val().trim();
        if (newsType1 == "学习十九大") {          
            if (content == "") {
                alert("请输入新闻内容！");
                return false;
            }
            else
            {
                content = content.replace(/\n/gi, "<br>");
                content = content.replace(/<br>/gi, "");
                content = content.replace(/</gi, "&lt;");
                content = content.replace(/>/gi, "&gt;");
                content = content.replace(/ /gi, "&nbsp;");
                content = content.replace(/&/gi, "&amp;");
                content = content.replace(/'/gi, "&#39;");
                content = content.replace(/"/gi, "&quot;");
            }          
        }
        else {
            if (content == "") {
                alert("请输入新闻内容！");
                return false;
            }
        }

        $.ajax({
            type: "post",
            url:  "/api/news/create",                                                                                    //发布新闻
            dataType: "json",
            data: {
                newsName: newsName,
                newsLink: content,
                newsType: newsType1
            },
            error: function (err) { alert("出错了") },
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

    //删除新闻
    function deleteNews() {
        index = parseInt(this.id);
        var newsId = json[index].newsId;                                                                                 //
        $.ajax({
            type: "post",
            url: "/api/news/delete",                                                                                    //删除新闻
            dataType: "json",
            data: {
                newsId: newsId                                                                                          //
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
    }

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

    //时间转换函数
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

        var tr = document.createElement("tr");
        var studentName = document.createElement("td");                                                                 //
        studentName.innerHTML = rawData.StudentName;//

        var newsName = document.createElement("td");
        newsName.innerHTML = rawData.NewsName;

        var newsType = document.createElement("td");
        newsType.innerHTML = rawData.NewsType;
       
        var pubTime = document.createElement("td");
        pubTime.innerHTML = getTime(rawData.Time);                                                                      //
        
        var deleteTd = document.createElement("td");
        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "删除";
        deleteBtn.className = "btn btn-danger remove";
        deleteBtn.id = i;
        deleteBtn.onclick = deleteNews;
        deleteTd.appendChild(deleteBtn);

        tr.appendChild(studentName);
        tr.appendChild(newsName);
        tr.appendChild(newsType);
        tr.appendChild(pubTime);
        tr.appendChild(deleteTd);

        tbody.appendChild(tr);
        $("td").css("text-align", "center");
    }

    //重置显示的内容
    function reset() {
        
        while (tbody.hasChildNodes()) {
            tbody.removeChild(tbody.lastChild);
        }
    }
    //从后台得到数据
    function init() {
        $.getJSON("/api/news/newslist", function (data) {//
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
    function showNoticeNum(noticeId) {
        $("#news-recordNum").text(noticeId);                                                                            //

    }
    //显示当前页数
    function show_current_page_num(currentPageNum) {
        $("#news-currentRecordPage").text(currentPageNum);
    }
    //显示总页数
    function show_total_page_num(totalPageNum) {
        $("#news-totalRecordPage").text(totalPageNum);
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
    $("#news-lnkBtnFirst").click(function () {
        first();
    });
    // 点击最后一页按钮
    $("#news-lnkBtnLast").click(function () {
        last();
    })
    // 点击下一页按钮
    $("#news-lnkBtnNext").click(function () {
        next();
    });
    // 点击上一页按钮
    $("#news-lnkBtnPrevious").click(function () {
        pre();
    });

});