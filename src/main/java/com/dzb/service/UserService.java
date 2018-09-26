package com.dzb.service;


import com.dzb.commons.Result;
import com.dzb.model.User;


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

}
