package com.dzb.dao;


import com.dzb.model.User;

/**
 * @author: pinnuli
 * @date: 18-9-26
 */
public interface UserDao {

    int save(User user);

    int checkStudentNum(Long studentNum);

}
