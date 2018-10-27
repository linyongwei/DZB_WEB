package com.dzb.controller;

import com.dzb.commons.Result;
import com.dzb.commons.ResultCodeEnum;
import com.dzb.dao.NewsDao;
import com.dzb.model.News;
import com.dzb.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @description: 描述
 * @author: Tomgood
 * @date: 2018-10-08
 */
@RestController
@RequestMapping("/api/news")
public class  NewsController {

    @Autowired
    private NewsService newsService;

    @Autowired
    private NewsDao newsDao;

    /**
     * 返回新闻简略信息数组
     */
    @RequestMapping(value = "/newslist", method = RequestMethod.GET)
    public Result queryList() {

        List<News> newsList = newsService.queryNewsList();
        if (newsList == null) {
            return Result.createByError(ResultCodeEnum.RESULT_CODE_NOT_FOUND);
        }
        Map<String, Object> data = new HashMap<>();
        data.put("newsList", newsList);
        return Result.createBySuccess(data);
    }

    /**
     * 发布新闻信息提交
     */
    @RequestMapping(value = "/create",method = RequestMethod.POST)
    public Result<String> createNews(@RequestBody News news){

        System.out.println("提交了!");
        return newsService.addNews(news);
    }

    /**
     *删除指定的新闻
     */
    @RequestMapping(value = "/delete",method = RequestMethod.DELETE)
    public Result<String> deleteNews(@RequestParam Integer newsId){

        System.out.println("删除了");
        return newsService.deleteNews(newsId);
    }
}

