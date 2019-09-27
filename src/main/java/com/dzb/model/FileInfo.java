package com.dzb.model;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by DYYing on 2018/10/21.
 */
public class FileInfo implements Serializable{
    private static final long serialVersionUID = 6545042575145022622L;
    //    编号
    private int Id;

    //发布者学号
    private long studentNum;

    //上传时间
    private Date uploadTime;

    //文件名
    private String fileName;

    //文件路径
    private String webPath;

    //下载时间
    private Date downloadTime;

    //通知id
    private long noticeId;

    //用户
    private long userInfo;

    //新闻id
    private long newsId;

    private String realPath;

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    private Date createTime;



    public long getId() {
        return Id;
    }

    public void setId(int Id) {
        this.Id = Id;
    }

    public long getStudentNum() {
        return studentNum;
    }

    public void setStudentNum(long studentNum) {
        this.studentNum = studentNum;
    }

    public Date GetUploadTime() {
        return uploadTime;
    }

    public void SetUploadTime(Date uploadTime) {
        this.uploadTime = uploadTime;
    }

    public Date GetDownloadTime() {
        return downloadTime;
    }

    public void SetDownloadTime(Date downloadTime) {
        this.downloadTime = downloadTime;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }


    public long getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(long userInfo) {
        this.userInfo = userInfo;
    }

    public long getNewsId() {
        return newsId;
    }

    public void setNewsId(long newsId) {
        this.newsId = newsId;
    }

    public long getNoticeId() {
        return noticeId;
    }

    public void setNoticeId(long noticeId) {
        this.noticeId = noticeId;
    }

    public String getWebPath() {
        return webPath;
    }

    public void setWebPath(String webPath) {
        this.webPath = webPath;
    }

    public String getRealPath() {
        return realPath;
    }

    public void setRealPath(String realPath) {
        this.realPath = realPath;
    }
}
