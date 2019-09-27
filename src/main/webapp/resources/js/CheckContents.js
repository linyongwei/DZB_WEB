 $(document).ready(function () {
    var json = [];
    //var data = new Object();
    //data.content = "为了防止文档在完全加载（就绪）之前运行 jQuery 代码";
    //data.name = "史蒂芬";
    //data.time = "2015-06-23";
    //for (var i = 0; i < 13; i++) {
    //    json[i] = data;
    //}
    //var data1 = new Object();
    //data1.content = "55555555555555555555555555555555555";
    //data1.name = "6666";
    //data1.time = "2016-06-23";
    //for (var i = 13; i < 23; i++) {
    //    json[i] = data1;
    //}
    //var data2 = new Object();
    //data2.content = "非常好";
    //data2.name = "科比";
    //data2.time = "2019-06-23";
    //for (var i = 23; i < 68; i++) {
    //    json[i] = data2;
    //}


    var recordBody = document.getElementById("recordBody");

    var currentPage = 1;
    var num = 10;//每页10条数据
    var totalData = json.length;
    var totalPage = Math.ceil(totalData / num);
    ; // 计算需要的页数，逢小数进1
    // 显示下一页
    /*$("#btnCheck").click(function () {
    alert("666");
    show_current();
});*/
    $("#lnkBtnFirst").click(function () {
        first();
    });
    $("#lnkBtnLast").click(function () {
        last();
    })
    $("#lnkBtnNext").click(function () {
        //              alert("下一页");
        next();
    });
    $("#lnkBtnPrevious").click(function () {
        //              alert("上一页");
        pre();
    });

    $("tbody").delegate(".btn-danger", "click", function () {
        //                  var c = $(this).parent().prev().attr("class");
        var content = $(this).parents("tr").children()[1].innerHTML;
        var name = $(this).parents("tr").children()[2].innerHTML;
        var time = $(this).parents("tr").children()[3].innerHTML;

        //alert(content + name + time);

    });

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
                /*for(var t = totalData;t<end;t++){
                    creatBlankRaw();
                }*/
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

        var tdContent = document.createElement("td");
        tdContent.setAttribute("class", "text-info");

        var tdName = document.createElement("td");
        tdName.setAttribute("class", "text-success");

        var tdTime = document.createElement("td");
        tdTime.setAttribute("class", "text-muted");

        var tdDel = document.createElement("td");

        var delBtn = document.createElement("button");
        delBtn.setAttribute("class", "btn-danger btn");


        //                    alert(delBtn.className);
        tdDel.appendChild(delBtn);
        tr.appendChild(tdNumber);
        tr.appendChild(tdContent);
        tr.appendChild(tdName);
        tr.appendChild(tdTime);
        tr.appendChild(tdDel);

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
    
        //tdTime.innerHTML = rawdata.time;
        delBtn.innerHTML = "删除";

        recordBody.appendChild(tr);
        $("td").css("text-align", "center");
        tdContent.style.width = "50%";
        tdName.style.width = "15%";
        tdTime.style.width = "15%";
        tdDel.style.width = "20%";

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
    function creatBlankRaw() {
        var tr = document.createElement("tr");
        var tdContent = document.createElement("td");
        var tdName = document.createElement("td");
        var tdTime = document.createElement("td");
        var tdDel = document.createElement("td");

        tr.appendChild(tdContent);
        tr.appendChild(tdName);
        tr.appendChild(tdTime);
        tr.appendChild(tdDel);
        recordBody.appendChild(tr);
    }

    //重置显示的内容
    function reset() {
        while (recordBody.hasChildNodes()) {
            recordBody.removeChild(recordBody.lastChild);
        }
    }

    //判断是否已经是第一页
    function show_first_page_alert() {
        if (currentPage == 1) {
            alert("当前已是首页");
            return true;
        }
        return false;
    }

    //判断是否已经是最后一页
    function show_last_page_alert() {
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
        //              alert("显示当前页数" + currentPage);
        $("#currentRecordPage").text(currentPage);
    }

    function show_total_page_num() {
        //              alert("显示总页数" + totalPage);
        $("#totalRecordPage").text(totalPage);
    }

    //显示
    function show_current() {
        reset();
        show();
        show_current_page_num();
        showRecordNum();
    }

    /*$(function() {initial
    //初始化
    initial();*/

    //查看按钮点击事件
    $("#btnCheck").click(function () {
        var meetingName = $("#select").val().trim();
        var searchContent = $("#searchContent").val().trim();
        $.getJSON("/Home/GetContents", { searchContent:searchContent,meetingName: meetingName }, function (data) {
            if (data != null) {
                json = data;
                currentPage = 1;
                totalData = json.length;
                totalPage = Math.ceil(totalData / num); // 计算需要的页数，逢小数进1
                //初始化
                show_current();
            } else {
                alert("检查出现错误！请重新确认。");
            }
            //currentPage = 1;
            //totalData = json.length;
            //totalPage = Math.ceil(totalData / num); // 计算需要的页数，逢小数进1
            ////初始化
            //show_current();
            //show_total_page_num();
        });
        //initial();
        return false;
    });

    //初始化
    /*function initial() {
    var meetingName = $("#select").val();
    $.getJSON("/Meeting/GetContents", { meetingName: meetingName }, function(data) {
        if (data != null) {
            json = data;
        } else {
            alert("检查出现错误！请重新确认。");
        }
        currentPage = 1;
        totalData = json.length;
        totalPage = Math.ceil(totalData / num); // 计算需要的页数，逢小数进1
        //初始化
        show_current();
        show_total_page_num();
    });
}*/


    show_current();
    show_total_page_num();

});