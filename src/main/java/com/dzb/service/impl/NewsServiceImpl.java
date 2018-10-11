package com.dzb.service.impl;

import com.dzb.commons.Result;
import com.dzb.dao.NewsDao;
import com.dzb.model.News;
import com.dzb.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @description: 描述
 * @author: Tomgood
 * @date: 2018-10-08
 */

@Service
public class NewsServiceImpl implements NewsService {

    @Autowired
    private NewsDao newsDao;

    /**
     * 返回新闻信息数组
     * @return
     */
    @Override
    public List<News> queryNewsList() {

        List<News> newsList = new ArrayList<>();
        newsList = newsDao.queryNewsList();

        return newsList;
    }

    @Override
    public Result<String> addNews(News news) {
        int addResult = newsDao.addNews(news);
        if (addResult==0){
            return Result.createByErrorMessage("插入新闻失败!");
        }
        else {
            return Result.createBySuccess("成功!");
        }
    }

    @Override
    public Result<String> deleteNews(News news) {
        int deleteResult = newsDao.deleteNews(news.getId());
        if (deleteResult==0){
            return Result.createByErrorMessage("插入新闻失败!");
        }
        else {
            return Result.createBySuccess("成功!");
        }
    }


}
