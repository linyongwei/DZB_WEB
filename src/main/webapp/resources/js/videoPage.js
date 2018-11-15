$(document).ready(function () {
    var videoJson = [];
    var video = document.getElementsByClassName("Video1");
    var videoSrc = document.getElementsByTagName("source");
    var videoName = document.getElementsByClassName("video-name");
    var videoPageCur = document.getElementById("videoPageCur");
    var videoPageTol = document.getElementById("videoPageTol");
    var currentvideoPage = 1;
    var num = 3;
    var totalData ;
    var totalPage ; // 计算需要的页数，逢小数进1

    init();

    function init() {
        $.getJSON("/api/video/videolist", function (result) {

            if (result != null) {
                videoJson = result.data.videoList;
                hasDataInit();
            }
            else {
                alert("数据获取失败！");
                noDataInit();
            }
        });
    }

    //检查是否隐藏前进和后退键
    function displayPreOrNext() {
        if (currentvideoPage == totalPage) {
            if (totalPage == 1) {
                //说明只有一页，前进后退键都隐藏
                document.getElementById("videoPagePre").style.visibility = "hidden";
                document.getElementById("videoPageNext").style.visibility = "hidden";
            } else {
                //说明走到最后一页了，隐藏下一页按键
                document.getElementById("videoPagePre").style.visibility = "visible";
                document.getElementById("videoPageNext").style.visibility = "hidden";
            }
        } else if (currentvideoPage == 1) {
            //说明当前在第一页，隐藏上一页按钮
            document.getElementById("videoPagePre").style.visibility = "hidden";
            document.getElementById("videoPageNext").style.visibility = "visible";
        } else {
            //说明当前是中间页，可前进可后退
            document.getElementById("videoPagePre").style.visibility = "visible";
            document.getElementById("videoPageNext").style.visibility = "visible";
        }
    }

    // 显示下一页
    function next() {
        currentvideoPage++;
        displayPreOrNext();
        show_current();
    }

    //显示前一页
    function pre() {
        currentvideoPage--;
        displayPreOrNext();
        show_current();
    }

    //计算并显示内容
    function show() {
        var start = (currentvideoPage - 1) * num;
        var end = currentvideoPage * num;
        for (var i = start; i < end; i++) {
            var index = i % 3;
            if (i >= totalData) {
                clearVedioFrame(index);
            }
            else {
                createRaw(videoJson[i], index);
            }
        }
    }

    //创建要显示的html元素
    function createRaw(rawData, index) {
        video[index].style.visibility = "visible";
        var link = rawData.webPath;
        videoSrc[index].src = link;
        video[index].load();
        videoName[index].style.visibility = "visible";
        videoName[index].innerHTML = rawData.videoName.split(".")[0];
    }
    //清除没用到的视频框
    function clearVedioFrame(index) {
        video[index].style.visibility = "hidden";
        videoName[index].style.visibility = "hidden";
    }

    //在页面上显示总共有几页
    function show_total_page_num() {
        videoPageTol.innerHTML = totalPage;
    }

    //显示当前页数
    function show_current_page_num() {
        videoPageCur.innerHTML = currentvideoPage;
    }

    //显示
    function show_current() {
        show();
        show_current_page_num();
    }

    function hasDataInit() {
        //初始化
        totalData = videoJson.length;
        totalPage = Math.ceil(totalData / num); // 计算需要的页数，逢小数进1
        displayPreOrNext();
        show_current();
        show_total_page_num();
    }

    //点击上一页
    $("#videoPagePre").click(function () {
        pre();
    })

    //点击下一页
    $("#videoPageNext").click(function () {
        next();
    })
});