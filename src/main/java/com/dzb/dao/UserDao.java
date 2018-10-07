package com.dzb.dao;


import com.dzb.model.User;
import com.dzb.model.loginUser;
import com.dzb.model.resetPasswordUser;
import com.dzb.model.sendMailCodeUser;
import org.apache.ibatis.annotations.Param;

import java.sql.ResultSet;

/**
 * @author: pinnuli
 * @date: 18-9-26
 */
public interface UserDao {

    int save(User user);

    int checkStudentNum(Long studentNum);

    int checkStudentPassword(@Param("studentNum") long studentNum, @Param("password") String password);

    int resetPassword(@Param("studentNum") long studentNum, @Param("newPassword") String newPassword);

    String searchEmail(sendMailCodeUser user);

    User getCurrentUser(long studentNum);
}
