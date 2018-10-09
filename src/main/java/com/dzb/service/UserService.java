package com.dzb.service;


import com.dzb.commons.Result;
import com.dzb.model.LoginUser;
import com.dzb.model.ResetPasswordUser;
import com.dzb.model.SendMailCodeUser;
import com.dzb.model.User;

/**
 * @author: pinnuli
 * @date: 18-9-26
 */
public interface UserService {


    /**
     * 保存用户到数据库
     * @param user
     * @return
     */
    Result<String> save(User user);

    /**
     * 登录时
     * @param user
     * @return
     */
    Result<String> login(LoginUser user);

    /**
     * 重置密码
     * @param currentUser
     * @param user
     * @return
     */
    Result<String> resetPassword(User currentUser, ResetPasswordUser user);

    /**
     * 获得用户邮箱
     * @param user
     * @return
     */
    String getEmail(SendMailCodeUser user);

    /**
     * 由学号获得用户名
     * @param studentNum
     * @return
     */
    User getCurrentUser(long studentNum);
}
