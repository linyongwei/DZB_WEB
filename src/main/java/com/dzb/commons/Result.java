package com.dzb.commons;


import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;

/**
 * @description: 结果返回的模型
 * @author: pinnuli
 * @date: 18-9-26
 */
public class Result<T> implements Serializable{

    private static final long serialVersionUID = 1L;

    private T data;
    private Integer code;
    private String message;

    /**
     * 默认返回情况
     */
    private Result(ResultCodeEnum resultCodeEnum) {
        this.code = resultCodeEnum.getCode();
        this.message = resultCodeEnum.getMessage();
    }

    private Result(Integer code, String message){
        this.code = code;
        this.message = message;
    }

    private Result(T data){
        this.code = ResultCodeEnum.RESULT_CODE_SUCCESS.getCode();
        this.message = ResultCodeEnum.RESULT_CODE_SUCCESS.getMessage();
        this.data = data;
    }

    private Result(String message, T data){
        this.code = ResultCodeEnum.RESULT_CODE_SUCCESS.getCode();
        this.message = message;
        this.data = data;
    }

    @JsonIgnore
    /**
     * //使之不在json序列化结果当中
     */
    public boolean isSuccess(){
        return this.code == ResultCodeEnum.RESULT_CODE_SUCCESS.getCode();
    }

    public Integer getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public T getData() {
        return data;
    }

    public static <T> Result<T> createByError() {
        return new Result(ResultCodeEnum.RESULT_CODE_SERVER_ERROR);
    }

    public static <T> Result<T> createByError(ResultCodeEnum resultCodeEnum) {
        return new Result<T>(resultCodeEnum);
    }
    public static <T> Result<T> createByErrorMessage(String message) {
        return new Result(ResultCodeEnum.RESULT_CODE_SERVER_ERROR.getCode(), message);
    }

    public static <T> Result<T> createByErrorCodeMessage(Integer code, String message) {
        return new Result(code, message);
    }

    public static <T> Result<T> createByErrorCodeEnum(ErrorCodeEnum errorCodeEnum) {
        return new Result<T>(errorCodeEnum.getCode(), errorCodeEnum.getMessage());
    }

    public static <T> Result<T> createByResultCodeEnum(ResultCodeEnum resultCodeEnum) {
        return new Result<T>(resultCodeEnum.getCode(), resultCodeEnum.getMessage());
    }

    public static <T> Result<T> createBySuccess() {
        return new Result(ResultCodeEnum.RESULT_CODE_SUCCESS);
    }

    public static <T> Result<T> createBySuccessMessage(String message) {
        return new Result(ResultCodeEnum.RESULT_CODE_SUCCESS.getCode(), message);
    }

    public static <T> Result<T> createBySuccess(T data) {
       return new Result(data);
    }

    public static <T> Result<T> createBySuccess(String message, T data) {
        return new Result(message, data);
    }
}
