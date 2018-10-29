$(document).ready(function () {

    var json = [];

    var recordBody = document.getElementById("normalRecordBody");

    var currentPage = 0;
    var num = 10;//每页10条数据
    var totalData = json.length;
    var totalPage = Math.ceil(totalData / num);
    // 计算需要的页数，逢小数进1
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

    //计算并显示内容
    function show() {
        var start = (currentPage - 1) * num;
        var end = currentPage * num;

        for (var i = start; i < end; i++) {
            if (i >= totalData) {
                return;
            }
            createRaw(json[i], i + 1);
        }
    }

    //创建要显示的html元素
    function createRaw(rawdata, index) {
        var tr = document.createElement("tr");
        var tdNumber = document.createElement("td");
        tdNumber.setAttribute("class", "text-danger");

        var tdName = document.createElement("td");
        tdName.setAttribute("class", "text-success");

        var tdContent = document.createElement("td");
        tdContent.setAttribute("class", "text-info");

        var tdTime = document.createElement("td");
        tdTime.setAttribute("class", "text-muted");
        tr.appendChild(tdNumber);
        tr.appendChild(tdName);
        tr.appendChild(tdContent);
        tr.appendChild(tdTime);
        tdNumber.innerHTML = index;
        tdContent.innerHTML = htmldecode(rawdata.Contents);
        tdName.innerHTML = rawdata.StudentName;

        var dt = new Date(parseInt(rawdata.Time.slice(6, 19)));
        var year = dt.getFullYear();
        var month = dt.getMonth() + 1 < 10 ? "0" + (dt.getMonth() + 1) : dt.getMonth() + 1;
        var date = dt.getDate() < 10 ? "0" + (dt.getDate()) : dt.getDate();
        var hour = dt.getHours() < 10 ? "0" + (dt.getHours()) : dt.getHours();
        var minute = dt.getMinutes() < 10 ? "0" + (dt.getMinutes()) : dt.getMinutes();
        var second = dt.getSeconds() < 10 ? "0" + (dt.getSeconds()) : dt.getSeconds();
        tdTime.innerHTML = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
        recordBody.appendChild(tr);
        $("td").css("text-align", "center");
    }

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

    //重置显示的内容
    function reset() {
        while (recordBody.hasChildNodes()) {
            recordBody.removeChild(recordBody.lastChild);
        }
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

    function showRecordNum() {
        $("#recordNum").text(json.length);

    }

    function show_current_page_num() {
        $("#currentRecordPage").text(currentPage);
    }

    function show_total_page_num() {
        $("#totalRecordPage").text(totalPage);
    }

    //显示
    function show_current() {
        reset();
        show();
        show_current_page_num();
        show_total_page_num();
        showRecordNum();
    }

    //初始化
    function initial() {
        var userName = $("#searchContent").val().trim();
        var meetingName = $("#select").val().trim();
        $.getJSON("/Home/GetContents", { userName: userName, meetingName: meetingName }, function (data) {
            if (data != null) {
                json = data;
                currentPage = 1;
                totalData = json.length;
                totalPage = Math.ceil(totalData / num); // 计算需要的页数，逢小数进1
            } else {
                currentPage = 0;
                totalData = 0;
                alert("检查出现错误！请重新确认。");
            }
            //初始化
            show_current();
        });
    }

    // 点击首页按钮
    $("#lnkBtnFirst").click(function () {
        first();
    });
    // 点击最后一页按钮
    $("#lnkBtnLast").click(function () {
        last();
    })
    // 点击下一页按钮
    $("#lnkBtnNext").click(function () {
        next();
    });
    // 点击上一页按钮
    $("#lnkBtnPrevious").click(function () {
        pre();
    });  

    //点击查看按钮事件
    $("#btnCheck").click(function () {
        var userName = $("#searchContent").val().trim();
        var meetingName = $("#select").val().trim();
        $.getJSON("/Home/GetContents", { userName: userName, meetingName: meetingName }, function (data) {
            if (data != null) {
                json = data;
                currentPage = 1;
                totalData = json.length;
                totalPage = Math.ceil(totalData / num); // 计算需要的页数，逢小数进1
            } else {
                totalData = 0;
                totalPage = 0;
                alert("检查出现错误！请重新确认。");
            }
            //更新界面
            show_current();
        });
    });
    // 页面加载后就初始化留言数据
    initial();
});
