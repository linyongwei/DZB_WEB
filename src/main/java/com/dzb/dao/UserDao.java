package com.dzb.dao;


import com.dzb.model.User;
import com.dzb.model.SendMailCodeUser;
import org.apache.ibatis.annotations.Param;

/**
 * @author: pinnuli
 * @date: 18-9-26
 */
public interface UserDao {
    /**
     * 保存注册的用户到数据库
     * @param user
     * @return
     */
    int save(User user);

    /**
     * 更新用户，用于注册软删除的用户
     * @param user
     * @return
     */
    int updateUser(User user);

    /**
     * 查找数据库中是否存在该学号
     * @param studentNum
     * @return
     */
    int checkStudentNum(Long studentNum);

    /**
     * 查看用户是否被软删除
     * @param studentNum
     * @return
     */
    int checkStudentDelete(Long studentNum);

    /**
     * 验证用户密码是否与学号匹配
     * @param studentNum
     * @param password
     * @return
     */
    int checkStudentPassword(@Param("studentNum") long studentNum, @Param("password") String password);

    /**
     * 重置用户密码
     * @param studentNum
     * @param newPassword
     * @return
     */
    int resetPassword(@Param("studentNum") long studentNum, @Param("newPassword") String newPassword);

    /**
     * 查找该用户的邮箱
     * @param user
     * @return
     */
    String searchEmail(SendMailCodeUser user);

    /**
     * 以一个学号获得该学号的用户的准确信息，用于存入session中
     * @param studentNum
     * @return
     */
    User getCurrentUser(long studentNum);
}
