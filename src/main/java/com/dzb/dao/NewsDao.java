package com.dzb.dao;

import com.dzb.model.News;

import java.util.List;
import java.util.Map;

/**
 * @description: 描述
 * @author: Tomgood
 * @date: 2018-10-08
 */

public interface NewsDao {
    /**
     * 返回新闻列表
     *  @return
     */
    List<News> queryNewsList();

    /**
     * 创建新闻
     * @return
     */
    int addNews(News news);

    /**
     * 删除指定新闻
     * @return
     */
    int deleteNews(int id);

    News getNews(int id);
}
