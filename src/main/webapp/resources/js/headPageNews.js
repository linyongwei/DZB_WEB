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
        $.getJSON("api/news/newslist", function (result) {//
            if (result.data.newsList != null) {
                news_all = result.data.newsList;
                partNews();
                hasDataInit();
            }
            else {
                alert("数据获取失败！");
            }
        });
    }

    //分开校内校外新闻
    function partNews() {
        for (var i = 0 ; i < news_all.length; i++) {
            console.log(news_all[i].newsType);
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

        if (rawData.newsType == "学习十九大") {                                                                          //
            var link = document.createElement("a");
            var newsId = rawData.id;                                                                                 //
            /*link.setAttribute("href", "/api/news/create？id="+ newsId);*/                                                  //？？
        }
        else {
            var newsLink = document.createElement("a");//
            newsLink.setAttribute("href", rawData.newsTitle);//
        }
        
        newsLink.setAttribute("target", "_blank");//
        newsLink.innerHTML = rawData.newsTitle;//

        var pubTime = document.createElement("span");
        pubTime.setAttribute("class", "time");
        pubTime.innerHTML = getTime(rawData.pubTime);

        li.appendChild(span);
        li.appendChild(newsLink);                                                                                         //
        li.appendChild(pubTime);                                                                                          //
        return li;
    }
    //时间转换函数
    function getTime(time) {
        if (time != "") {
            var dt = new Date(parseInt(time.slice(6, 19)));
            var year = dt.getFullYear();
            var month = dt.getMonth() + 1 < 10 ? "0" + (dt.getMonth() + 1) : dt.getMonth() + 1;
            var date = dt.getDate() < 10 ? "0" + (dt.getDate()) : dt.getDate();
            return year + "-" + month + "-" + date ;
        }
        else {
            return time;
        }
    }
});