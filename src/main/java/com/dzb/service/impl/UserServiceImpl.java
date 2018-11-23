package com.dzb.service.impl;

import com.dzb.commons.Result;
import com.dzb.dao.UserDao;
import com.dzb.model.LoginUser;
import com.dzb.model.ResetPasswordUser;
import com.dzb.model.SendMailCodeUser;
import com.dzb.model.User;
import com.dzb.service.UserService;
import com.dzb.util.MD5Util;
import org.apache.ibatis.jdbc.Null;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        validStudentNum = checkStudentDelete(user.getStudentNum());
        if(!validStudentNum){
            //此时用户之前被软删除过
            log.debug("密码:" + user.getPassword());
            user.setPassword(MD5Util.md5Encode(user.getPassword(), "UTF-8"));
            int resultCount = userDao.updateUser(user);
            if(resultCount == 0){
                //未知错误
                return Result.createByErrorMessage("注册失败！");
            }
            return Result.createBySuccessMessage("注册成功");
        }
        log.debug("密码:" + user.getPassword());
        user.setPassword(MD5Util.md5Encode(user.getPassword(), "UTF-8"));
        int resultCount = userDao.save(user);
        if(resultCount == 0){
            //未知错误
            return Result.createByErrorMessage("注册失败！");
        }
        return Result.createBySuccessMessage("注册成功");
    }

    @Override
    public Result<String> login(LoginUser user) {
        boolean resultCount = checkStudentNum(user.getStudentNum());
        if(resultCount){
            //用户不存在的情况
            return Result.createByErrorMessage("用户不存在");
        }
        int count = userDao.checkStudentPassword(user.getStudentNum(), MD5Util.md5Encode(user.getPassword(), "UTF-8"));
        if(count == 0){
            return Result.createByErrorMessage("密码错误");
        }
        return Result.createBySuccessMessage("登录成功");
    }

    @Override
    public Result<String> resetPassword(User currentUser, ResetPasswordUser user){
        userDao.resetPassword(currentUser.getStudentNum(), MD5Util.md5Encode(user.getRpassword(), "UTF-8"));
        return Result.createBySuccessMessage("更改成功");
    }

    @Override
    public String getEmail(SendMailCodeUser user){
        boolean resultCount = checkStudentNum(user.getStudentNum());
        if(resultCount){
            //用户不存在的情况
            return "";
        }
        String email = userDao.searchEmail(user);
        System.out.println(email);
        System.out.println();
        if(email == null || email.length() <= 0){
            //这时是未绑定email
            email = "no";
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

    public boolean checkStudentDelete(Long studentNum) {
        int resultCount = userDao.checkStudentDelete(studentNum);
        if(resultCount > 0) {
            return false;
        }
        return true;
    }

}
