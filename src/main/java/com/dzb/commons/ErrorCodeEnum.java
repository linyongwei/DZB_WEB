package com.dzb.commons;

/**
 * @author: pinnuli
 * @date: 18-9-26
 */
public enum ErrorCodeEnum {


    VERIFICATIONCODE_ERROR(10000, "验证码错误"),
    EMAIL_NOT_BIND(10001, "该账号未绑定邮箱");

    private Integer code;
    private String message;

    ErrorCodeEnum(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    public Integer getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

}
