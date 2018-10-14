package com.dzb.service;

import com.dzb.commons.Result;
import com.dzb.model.User;

/**
 * @author: pinnuli
 * @date: 18-9-26
 */
public interface UserInformationService {


    /**
     * 保存修改用户到数据库
     *
     * @param user
     * @return
     */
    int save(User user);


    /**
     * 由学号获得用户信息
     *
     * @param user
     * @return
     */
    User getUserInformation(User user);


}


