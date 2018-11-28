//主页新闻页面
$(document).ready(function () {
     
    var news_all;
    var news_outSchool = new Array();
    var news_inSchool = new Array();
    var news_SJD = new Array();
    var news_inSchoolUL = document.getElementById("news-school-ul");
    var news_outSchoolUL = document.getElementById("news-unschool-ul");
    var news_SJDUL = document.getElementById("study-meeting-ul");

    init();
    
    //从后台得到数据
    function init() {
        $.getJSON("/api/news/newslist", function (result) {

            if (result != "no") {
                news_all = result.data.newslist;
                partNews();
                hasDataInit();
            }
            else {
                alert("数据获取失败！");
                noDataInit();
            }


        });
    }
    //分开校内校外新闻
    function partNews() {
        for (var i = 0 ; i < news_all.length; i++) {

            if (news_all[i].newsType == "校内新闻") {
                news_inSchool.push(news_all[i]);
            }
            else if (news_all[i].newsType == "校外新闻") {
                news_outSchool.push(news_all[i]);
            }
            else {
                news_SJD.push(news_all[i]);
            }
        }
    }

    //把新闻写进首页
    function hasDataInit() {
        //写校外新闻的
        for (var i = 0; i < news_outSchool.length; i++) {
            news_outSchoolUL.appendChild(creatRaw(news_outSchool[i]));
        }
        //写校内新闻的
        for (var i = 0; i < news_inSchool.length; i++) {
            news_inSchoolUL.appendChild(creatRaw(news_inSchool[i]));
        }
        //写学习十九大的
        for (var i = 0; i < news_SJD.length; i++) {
            news_SJDUL.appendChild(creatRaw(news_SJD[i]));
        }
    }

    //每行的数据构造
    function creatRaw(rawData) {
        var li = document.createElement("li");
        li.setAttribute("class", "content-main-li");
        var span = document.createElement("span");
        span.setAttribute("class", "circle");
        var newsLink = document.createElement("a");
        if(rawData.newsType == "改革开放"){
            // newsLink.href = "/views/Home/News.html?"+"newsTitle="+rawData.newsTitle+"&newsContent="+rawData.newsContent+"&pubTime="+rawData.putTime;
            newsLink.href = "/views/Home/News.html?"+rawData.id;
        }
        else{
            newsLink.href = rawData.newsContent;
        }
        newsLink.setAttribute("target", "_blank");
        newsLink.innerHTML = rawData.newsTitle;

        var pubTime = document.createElement("span")
        pubTime.setAttribute("class", "time");
        pubTime.innerHTML = rawData.putTime;

        li.appendChild(span);
        li.appendChild(newsLink);
        li.appendChild(pubTime);
        return li;
    }


});