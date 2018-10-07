package com.dzb.service;


import com.dzb.commons.Result;
import com.dzb.model.User;
import com.dzb.model.loginUser;
import com.dzb.model.checkMailCodeUser;
import com.dzb.model.sendMailCodeUser;
import com.dzb.model.resetPasswordUser;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author: pinnuli
 * @date: 18-9-26
 */
public interface UserService {


    /**
     * @description 注册用户
     * @param user
     * @return 返回操作结果
     */
    Result<String> save(User user);

    Result<String> login(loginUser user);

    Result<String> resetPassword(User currentUser,  resetPasswordUser user);

    String getEmail(sendMailCodeUser user);

    User getCurrentUser(long studentNum);
}
