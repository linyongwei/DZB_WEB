package com.dzb.service.impl;

import com.dzb.commons.Result;
import com.dzb.model.Notice;
import com.dzb.service.NoticeService;
import com.dzb.dao.NoticeDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class NoticeServiceImpl implements NoticeService{

    private static Logger logger = LoggerFactory.getLogger(NoticeService.class);

    @Autowired
    private NoticeDao noticeDao;


    @Override
    public Result save(Notice notice) {
        int resultCount =  noticeDao.save(notice);
        if(resultCount != 0){
            return Result.createBySuccess();
        }
        else {
            return Result.createByError();
        }
    }

    /**
     * 返回公告数组
     * @return
     */
    @Override
    public List<Notice> getAll() {

        List<Notice> noticeList = new ArrayList<>();
        noticeList = noticeDao.getAll();
        return noticeList;
    }

    @Override
    public  Notice getNotice(Notice notice){
        Notice notice1 = noticeDao.getNotice(notice);
        return notice1;
    }

    @Override
    public  int  modifyNotice(Notice notice){
        int flat = noticeDao.updateNotice(notice);
        return  flat;
    }

    @Override
    public int deleteNotice(long noticeId){
        int flat = noticeDao.deleteNotice(noticeId);
        return flat;
    }

}
