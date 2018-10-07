package com.dzb.service.impl;

import com.dzb.commons.Result;
import com.dzb.dao.UserDao;
import com.dzb.model.User;
import com.dzb.model.loginUser;
import com.dzb.model.resetPasswordUser;
import com.dzb.model.sendMailCodeUser;
import com.dzb.service.UserService;
import com.dzb.util.MD5Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.ResultSet;
import java.sql.SQLException;


/**
 * @author: pinnuli
 * @date: 18-9-26
 */
@Service
public class UserServiceImpl implements UserService {

    private static Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserDao userDao;

    @Override
    public Result<String> save(User user) {
        boolean validStudentNum = checkStudentNum(user.getStudentNum());
        if(!validStudentNum){
            return Result.createByErrorMessage("用户已存在");
        }
        log.debug("密码:" + user.getPassword());
        user.setPassword(MD5Util.MD5Encode(user.getPassword(), "UTF-8"));
        int resultCount = userDao.save(user);
        if(resultCount == 0){
            //未知错误
            return Result.createByErrorMessage("注册失败！");
        }
        return Result.createBySuccessMessage("注册成功");
    }

    @Override
    public Result<String> login(loginUser user) {
        boolean resultCount = checkStudentNum(user.getStudentNum());
        if(resultCount){
            return Result.createByErrorMessage("用户不存在");   //用户不存在的情况
        }
        int Count = userDao.checkStudentPassword(user.getStudentNum(), MD5Util.MD5Encode(user.getPassword(), "UTF-8"));
        if(Count == 0){
            return Result.createByErrorMessage("密码错误");   //用户不存在的情况
        }
        return Result.createBySuccessMessage("登录成功");
    }

    @Override
    public Result<String> resetPassword(User currentUser, resetPasswordUser user){
        userDao.resetPassword(currentUser.getStudentNum(), MD5Util.MD5Encode(user.getRpassword(), "UTF-8"));
        return Result.createBySuccessMessage("更改成功");
    }

    @Override
    public String getEmail(sendMailCodeUser user){
        boolean resultCount = checkStudentNum(user.getStudentNum());
        if(resultCount){
            return "";   //用户不存在的情况
        }
        String email = userDao.searchEmail(user);
        if(email.equals("")){
            email = "no";    //这时是未绑定email
        }
        return email;
    }

    @Override
    public User getCurrentUser(long studentNum){

        User currentUser = userDao.getCurrentUser(studentNum);
        return currentUser;
    }

    public boolean checkStudentNum(Long studentNum) {
        int resultCount = userDao.checkStudentNum(studentNum);
        if(resultCount > 0) {
            return false;
        }
        return true;
    }

}
