package com.dzb.service.impl;

import com.dzb.commons.Result;
import com.dzb.dao.UserManageDao;
import com.dzb.model.User;
import com.dzb.service.UserManageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author: pinnuli
 * @date: 18-9-26
 */
@Service
public class UserManageServiceImpl implements UserManageService {
    private static Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserManageDao userManageDao;

    @Override
    public int delete(long studentNum) {
        int flat = userManageDao.delete(studentNum);
        return flat;

    }

    @Override
    public User getUserInformation(long studentNum) {
        return userManageDao.getUserInformation(studentNum);

    }

    @Override
    public List<User> selectAllUser() {
        return userManageDao.selectAllUser();

    }
}
