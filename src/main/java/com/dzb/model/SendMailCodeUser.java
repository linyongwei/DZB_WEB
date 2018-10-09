package com.dzb.model;

/**
 * @description: 发送邮件时用户需要填写的内容
 * @author lin
 */
public class SendMailCodeUser {

    /**
     * 账号，即学号
     */
    private long studentNum;

    /**
     * 验证码
     */
    private String code;

    public long getStudentNum() {
        return studentNum;
    }

    public void setStudentNum(long studentNum) {
        this.studentNum = studentNum;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
