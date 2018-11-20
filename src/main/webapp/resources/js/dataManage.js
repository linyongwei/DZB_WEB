//文件管理页面
$(document).ready(function () {

    // 定义分页所需变量
    var currentPage = 0;//当前页面
    var num = 7;//每页7条数据
    var totalData;//全部公告数量
    var totalPage;// 计算需要的页数，逢小数进1
    var tbody = document.getElementById("dataTable");
    //提交表单
    var json = [];

    $("#inFile").change(function (e) {
        if (e.currentTarget.files.length > 0) {
            document.getElementById("fileForm").submit();
            alert("上传成功！");
        }
        setTimeout(function () {
            init();
        }, 1000);
    });
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

    function createRaw(rawData, i) {
        var tr = document.createElement("tr");
        var fileName = document.createElement("td");
        fileName.innerHTML = rawData.fileName;

        var createTime = document.createElement("td");
        createTime.innerHTML = rawData.createTime;

        // var downloadTimes = document.createElement("td");
        // var DownloadsSpan = document.createElement("span")
        // DownloadsSpan.setAttribute("class", "label label-warning");
        // DownloadsSpan.innerHTML = rawData.downloadTimes;
        // downloadTimes.appendChild(DownloadsSpan);

        var downloadBtnTd = document.createElement("td");
        var downloadBtn = document.createElement("button");
        downloadBtn.innerHTML = "下载";
        downloadBtn.onclick = downloadFile ;
        downloadBtn.className = "btn btn-success download";
        downloadBtn.id = i;
        downloadBtnTd.appendChild(downloadBtn);

        var deleteTd = document.createElement("td");
        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "删除";
        deleteBtn.onclick = deleteFile;
        deleteBtn.className = "btn btn-danger remove";
        deleteBtn.id = i;
        deleteTd.appendChild(deleteBtn);

        tr.appendChild(fileName);
        tr.appendChild(createTime);
       // tr.appendChild(downloadTimes);
        tr.appendChild(downloadBtnTd);
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
        $.getJSON("/api/file/filelist", function (result) {

            if (result != null) {
                json = result.data.fileList;
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
        $("#dataNum").text(noticeId);                                                                                    //
    }

    //显示当前页数
    function show_current_page_num(currentPageNum) {
        $("#data-currentRecordPage").text(currentPageNum);
    }

    //显示总页数
    function show_total_page_num(totalPageNum) {
        $("#data-totalRecordPage").text(totalPageNum);
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
    $("#data-lnkBtnFirst").click(function () {
        alert("首页");
        first();
    });
    // 点击最后一页按钮
    $("#data-lnkBtnLast").click(function () {
        last();
    })
    // 点击下一页按钮
    $("#data-lnkBtnNext").click(function () {
        next();
    });
    // 点击上一页按钮
    $("#data-lnkBtnPrevious").click(function () {
        pre();
    });


    // 给下载按钮添加事件，下载量加一
    function downloadFile() {

            index = parseInt(this.id);
            var webPath = json[index].webPath;
            var $eleForm = $("<form method='get'></form>");
            $eleForm.attr("action",webPath);
            $(document.body).append($eleForm);
            //提交表单，实现下载
            $eleForm.submit();



    }


    //删除按钮添加事件
    function deleteFile() {
        index = parseInt(this.id);
        var fileId = parseInt(json[index].id);
        $.ajax({
            url: "/api/file/delete?fileId="+ fileId,
            type: "DELETE",
            contentType: 'application/json',
            data: JSON.stringify(
                {
                    fileId: fileId
                }),
            error: function (err) {
                alert(JSON.stringify(err))
            },
            success: function (data) {
                if (data != null) {
                    alert("删除成功");
                    init();
                }
                else {
                    alert("数据获取失败！");
                    noDataInit();
                }
            }
        });
    }
});