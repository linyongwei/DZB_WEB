package com.dzb.model;

/**
 * @description: 登录时用户需要填写的内容
 * @author lin
 */
public class LoginUser {


    /**
     * 用户学号
     */
    private Long studentNum;

    /**
     * 密码
     */
    private String password;

    /**
     * 验证码
     */
    private String verificationCode;

    public long getStudentNum(){return studentNum;}

    public void setStudentNum(Long studentNum) {
        this.studentNum = studentNum;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }
}
