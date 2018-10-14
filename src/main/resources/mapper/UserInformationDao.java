package com.dzb.dao;

import com.dzb.model.User;

/**
 * @author: pinnuli
 * @date: 18-9-26
 */
public interface UserInformationDao {


    /**
     * 保存修改的用户到数据库
     *
     * @param user
     * @return
     */
    int save(User user);

    /**
     * 在session中获得用户的准确信息
     *
     * @param user
     * @return
     */
    User getUserInformation(User user);


}
