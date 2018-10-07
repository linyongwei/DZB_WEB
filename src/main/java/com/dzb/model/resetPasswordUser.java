package com.dzb.model;

/**
 * @description: 重置密码时用户需要填写的内容
 * @author lin
 */
public class resetPasswordUser {
    /**
     * 原密码
     */
    private String password;

    /**
     * 新密码
     */
    private String rpassword;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRpassword() {
        return rpassword;
    }

    public void setRpassword(String rpassword) {
        this.rpassword = rpassword;
    }
}
