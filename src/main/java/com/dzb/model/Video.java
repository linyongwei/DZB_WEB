package com.dzb.model;

import java.util.Date;
public class Video {

    private int id;

    private String studentNum;

    private String videoName;

    private Date uploadTime;

    private String webPath;

    private String realPath;

    public void setRealPath(String realPath) {
        this.realPath = realPath;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setStudentNum(String studentNum) {
        this.studentNum = studentNum;
    }

    public String getStudentNum() {
        return studentNum;
    }

    public void setVideoName(String videoName) {
        this.videoName = videoName;
    }

    public void setWebPath(String webPath) {
        this.webPath = webPath;
    }

    public String getVideoName() {
        return videoName;
    }

    public void setUploadTime(Date uploadTime) {
        this.uploadTime = uploadTime;
    }

    public Date getUploadTime() {
        return uploadTime;
    }

    public String getWebPath() {
        return webPath;
    }

    public String getRealPath() {
        return realPath;
    }
}
