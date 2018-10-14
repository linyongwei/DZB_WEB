package com.dzb.dao;

import com.dzb.model.User;

import java.util.List;

/**
 * @author: pinnuli
 * @date: 18-9-26
 */
public interface UserManageDao {
    /**
     * 根据学号获得用户的准确信息
     *
     * @param studentNum
     * @return
     */
    User getUserInformation(long studentNum);

    /**
     * 获得用户简略信息组
     *
     * @param
     * @return
     */
    List<User> selectAllUser();

    /**
     * 删除用户
     *
     * @param studentNum
     * @return
     */
    int delete(long studentNum);
}
