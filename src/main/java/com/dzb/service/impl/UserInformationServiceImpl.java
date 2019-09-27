package com.dzb.service.impl;

import com.dzb.commons.Result;
import com.dzb.dao.UserInformationDao;
import com.dzb.model.User;
import com.dzb.service.UserInformationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author: pinnuli
 * @date: 18-9-26
 */
@Service
public class UserInformationServiceImpl implements UserInformationService {

    private static Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserInformationDao userInformationDao;

    @Override
    public int save(User user) {
        return userInformationDao.save(user);

    }


    @Override
    public User getUserInformation(User user) {

        return userInformationDao.getUserInformation(user);

    }

}
