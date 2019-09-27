$(document).ready(function () {

    // 定义分页所需变量
    var currentPage = 0;//当前页面
    var num = 10;//每页7条数据
    var totalData;//全部数量
    var totalPage;// 计算需要的页数，逢小数进1
    var tbody = document.getElementById("attendenceInfoTable_tbody");
    //提交表单
    var json = [];
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

        var studentNum = document.createElement("td");
        studentNum.innerHTML = rawData.StudentNum;

        var Name = document.createElement("td");
        Name.innerHTML = rawData.Name;

        var onTime = document.createElement("td");
        //onTime.innerHTML = getTime(rawData.OnTime);
        onTime.innerHTML = rawData.OnTime;

        var offTime = document.createElement("td");
        //offTime.innerHTML = getTime(rawData.OffTime);
        offTime.innerHTML = rawData.OffTime;

        var operate = document.createElement("td");
        operate.innerHTML = rawData.Operate; 

        

        tr.appendChild(studentNum);
        tr.appendChild(Name);
        tr.appendChild(onTime);
        tr.appendChild(offTime);
        tr.appendChild(operate);

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



    //    });
    //}

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
        $("#checkAttendenceNum").text(noticeNum);

    }
    //显示当前页数
    function show_current_page_num(currentPageNum) {
        //              alert("显示当前页数" + currentPage);
        $("#checkAttendence-currentRecordPage").text(currentPageNum);
    }
    //显示总页数
    function show_total_page_num(totalPageNum) {
        //              alert("显示总页数" + totalPage);
        $("#checkAttendence-totalRecordPage").text(totalPageNum); 
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
    $("#checkAttendence-lnkBtnFirst").click(function () {
        // alert("首页");
        first();
    });
    // 点击最后一页按钮
    $("#checkAttendence-lnkBtnLast").click(function () {
        // alert("最后一页");
        last();
    })
    // 点击下一页按钮
    $("#checkAttendence-lnkBtnNext").click(function () {
        // alert("下一页");
        next();
    });
    // 点击上一页按钮
    $("#checkAttendence-lnkBtnPrevious").click(function () {
        // alert("上一页");
        pre();
    });

    $("#query").click(function () {
        //alert("333");
            query();
    });

    function query() {
        var checkTime = document.getElementById("CheckTime").value;
        var meetingInput = document.getElementById("CheckMeeting");
        var checkMeetingName = meetingInput.value.trim();
        $.ajax({
            url: "CheckAttendence",
            type: "POST",
            datatype: "json",
            data: { 'checkTime': checkTime, 'checkMeetingName': checkMeetingName },
            error: function (err) { alert(err) },
            success: function (result) {
                var attendenceInfo_table = document.getElementById("attendenceInfoTable_tbody");
                attendenceInfo_table.innerHTML = "";
                if (result == "null") {
                    alert("无考勤记录");
                    noDataInit();
                } else {
                    
                    json = result;
                    //alert("json的长度：" + json.length);
                    
                    //alert("json0：" + json[0].StudentNum + json[0].Name + json[0].OnTime + json[0].OffTime + json[0].Operate);
                    
                    hasDataInit();
                }
            }
        });
    }
});