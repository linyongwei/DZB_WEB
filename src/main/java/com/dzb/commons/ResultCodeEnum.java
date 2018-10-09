package com.dzb.commons;

/**
 * @author: pinnuli
 * @date: 18-9-26
 */
public enum ResultCodeEnum {
    /**
     * 返回代码
     */
    RESULT_CODE_SUCCESS(200, "成功处理请求"),
    RESULT_CODE_UNAUTHORIZED(401, "无权限"),
    RESULT_CODE_FORBIDDEN(403, "禁止访问"),
    RESULT_CODE_NOT_FOUND(404, "未找到资源"),
    RESULT_CODE_SERVER_ERROR(500, "服务端出错");

    public static String DEFAULT_SUCCESS_MESSAGE = "完全O文明K！";
    public static String DEFAULT_ERROR_MESSAGE = "这代码有毒啊！";

    private int code;
    private String message;

    private ResultCodeEnum(int state, String message) {
        this.code = state;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
