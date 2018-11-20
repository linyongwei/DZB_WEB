//主页新闻页面
$(document).ready(function () {

    var notices_all;
    var notice_ul = document.getElementById("notices");
    init();
    //从后台得到数据
    function init() {
        $.getJSON("/api/notice/noticelist",function (result) {

            if ( result != "no") {
                notices_all = result.data.NoticeList;
                hasDataInit();
            }
            else {
                alert("数据获取失败！");
                noDataInit();
            }
        });
    }



    //把公告写进首页
    function hasDataInit() {
        //写校外新闻的
        for (var i = 0; i < notices_all.length; i++) {
            notice_ul.appendChild(creatRaw(notices_all[i]));
        }
        //写校内新闻的

    }

    //每行的数据构造
    function creatRaw(rawData) {
        var li = document.createElement("li");
        li.setAttribute("class", "content-main-li");
        var span = document.createElement("span");
        span.setAttribute("class", "circle");
        var linkHtml = document.createElement("a");
        linkHtml.href = "/views/Home/Notice.html?" + "noticeTitle=" + rawData.noticeTitle + "&noticeContent=" + rawData.noticeContent + "&pubTime=" + rawData.pubTime;
        linkHtml.target = "_blank";
        linkHtml.innerHTML = rawData.noticeTitle;
        noticeTitle.appendChild(linkHtml);
        var pubTime = document.createElement("span");
        pubTime.innerHTML = rawData.pubTime;
        li.appendChild(span);
        li.appendChild(linkHtml);
        li.appendChild(pubTime);
        return li;

    }
});