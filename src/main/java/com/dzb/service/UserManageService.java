package com.dzb.service;

import com.dzb.commons.Result;
import com.dzb.model.User;

import java.util.List;

/**
 * @author: pinnuli
 * @date: 18-9-26
 */
public interface UserManageService {
    /**
     * 删除用户
     *
     * @param studentNum
     * @return
     */
    int delete(long studentNum);

    /**
     * 由学号获得用户信息
     *
     * @return
     * @Param studentNum
     */
    User getUserInformation(long studentNum);

    /**
     * 获得用户简略信息组
     *
     * @return
     */
    List<User> selectAllUser();
}
