package com.dzb.model;

/**
 * @author lin
 * @description: 获取简略用户信息组时用户信息
 */
public class UserListInformation {
    private String name;
    private Long studentNum;
    private String joinPartyTime;
    private String identity;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getJoinPartyTime() {
        return joinPartyTime;
    }

    public void setJoinPartyTime(String joinPartyTime) {
        this.joinPartyTime = joinPartyTime;
    }

    public Long getStudentNum() {
        return studentNum;
    }

    public void setStudentNum(Long studentNum) {
        this.studentNum = studentNum;
    }

    public String getIdentity() {
        return identity;
    }

    public void setIdentity(String identity) {
        this.identity = identity;
    }
    public UserListInformation(String name,long studentNum,String joinPartyTime,String identity){
        this.studentNum=studentNum;
        this.name=name;
        this.joinPartyTime=joinPartyTime;
        this.identity=identity;
    }
}
