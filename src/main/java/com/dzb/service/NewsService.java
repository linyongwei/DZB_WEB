package com.dzb.service;

import com.dzb.commons.Result;
import com.dzb.model.News;

import java.util.List;

public interface NewsService {

    List<News> queryNewsList();

    Result<String> addNews(News news);

    Result<String> deleteNews(Integer newsId);
}
