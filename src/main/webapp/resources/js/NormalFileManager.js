$(document).ready(function () {

    // 定义分页所需变量
    var currentPage = 0;//当前页面
    var num = 7;//每页7条数据
    var totalData;//全部公告数量
    var totalPage;// 计算需要的页数，逢小数进1
    var tbody = document.getElementById("FileBody");
    //提交表单
    var json = [];
    //初始化
    init();

    var index = -1;

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
        var fileName = document.createElement("td");                                                                     //
        fileName.innerHTML = rawData.FileName;//

        var uploadTime = document.createElement("td");
        uploadTime.innerHTML = getTime(rawData.Time);

        var downloadTimes = document.createElement("td");                                                               //
        var DownloadsSpan = document.createElement("span")
        DownloadsSpan.setAttribute("class", "label label-warning");
        DownloadsSpan.innerHTML = rawData.Downloads;
        downloadTimes.appendChild(DownloadsSpan);                                                                        //

        var downloadBtnTd = document.createElement("td");
        var downloadBtn = document.createElement("button");
        downloadBtn.innerHTML = "下载";
        downloadBtn.className = "btn btn-success download";
        downloadBtn.id = i;
        downloadBtnTd.appendChild(downloadBtn);

        tr.appendChild(fileName);//
        tr.appendChild(uploadTime);//
        tr.appendChild(downloadTimes);//
        tr.appendChild(downloadBtnTd);
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
        $.getJSON("/api/file/filelist", function (data) {//
            if (data != null) {
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

    //显示公告总数
    function showNoticeNum(noticeId) {
        $("#fileNum").text(noticeId);
    }
    //显示当前页数
    function show_current_page_num(currentPageNum) {
        $("#file-currentRecordPage").text(currentPageNum);
    }
    //显示总页数
    function show_total_page_num(totalPageNum) {
        $("#file-totalRecordPage").text(totalPageNum);
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
    $("#file-lnkBtnFirst").click(function () {
        alert("首页");
        first();
    });
    // 点击最后一页按钮
    $("#file-lnkBtnLast").click(function () {
        last();
    })
    // 点击下一页按钮
    $("#file-lnkBtnNext").click(function () {
        next();
    });
    // 点击上一页按钮
    $("#file-lnkBtnPrevious").click(function () {
        pre();
    });

    // 给下载按钮添加事件
    $("#FileBody").delegate(".download", "click", function () {
        var fileId = $(this).parents('tr').children('td').eq(0).text();                                                   //
        var downloadTimes = $(this).parents('tr').children('td').eq(2).text();                                            //
        var newdownloads = parseInt(downloadTimes);                                                                       //
        newdownloads++;
        $(this).parents('tr').children('td').eq(2).children("span").text(newdownloads.toString());
        window.location.href = "/api/file/download?fileId=" + fileId;                                                    //
    });
});