package com.dzb.service.impl;

import com.dzb.commons.Result;
import com.dzb.dao.UserDao;
import com.dzb.model.User;
import com.dzb.service.UserService;
import com.dzb.util.MD5Util;
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
        log.debug("密码:" + user.getPassword());
        user.setPassword(MD5Util.MD5Encode(user.getPassword(), "UTF-8"));
        int resultCount = userDao.save(user);
        if(resultCount == 0){
            //未知错误
            return Result.createByErrorMessage("注册失败！");
        }
        return Result.createBySuccessMessage("注册成功");
    }


    public boolean checkStudentNum(Long studentNum) {
        int resultCount = userDao.checkStudentNum(studentNum);
        if(resultCount > 0) {
            return false;
        }
        return true;
    }

}
