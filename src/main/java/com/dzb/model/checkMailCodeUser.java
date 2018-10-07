package com.dzb.model;

/**
 * @description: 邮箱验证码时用户需要填写的内容
 * @author lin
 */
public class CheckMailCodeUser {
    /**
     * 验证码
     */
    private String mailCode;

    public String getMailCode() {
        return mailCode;
    }

    public void setMailCode(String mailCode) {
        this.mailCode = mailCode;
    }
}
