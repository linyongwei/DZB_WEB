package com.dzb.model;


import java.io.Serializable;
import java.util.Date;

/**
 * @description: 新闻类
 * @author: Tomgood
 * @date: 2018-10-08
 */
public class News implements Serializable{

    /**
     *       "id": 15,
     *       "studentName": "张秋宏",
     *       "title": "11111",
     *       "newsType": "学习十九大",
     *       "newsLink": "口渴了有与交通费用<br /&尽快咯",
     *       "pubTime": "/Date(1520937880227)/"
     */

    private int id;

    private long studentNum;

    private String publisher;

    private String newsTitle;

    private String newsType;

    private String newsContent;

    private String newsLink;

    private Date pubTime;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getNewsLink() {
        return newsLink;
    }

    public void setNewsLink(String newsLink) {
        this.newsLink = newsLink;
    }

    public long getStudentNum() {
        return studentNum;
    }

    public void setStudentNum(long studentNum) {
        this.studentNum = studentNum;
    }

    public String getNewsTitle() {
        return newsTitle;
    }

    public void setNewsTitle(String title) {
        this.newsTitle = title;
    }

    public String getNewsType() {
        return newsType;
    }

    public void setNewsType(String newsType) {
        this.newsType = newsType;
    }

    public String getNewsContent() {
        return newsContent;
    }

    public void setNewsContent(String newsContent) {
        this.newsContent = newsContent;
    }

    public Date getPutTime() {
        return pubTime;
    }

    public void setPutTime(Date putTime) {
        this.pubTime = putTime;
    }

}
