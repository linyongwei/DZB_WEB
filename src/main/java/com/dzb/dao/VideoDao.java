package com.dzb.dao;

import com.dzb.model.Video;

import java.util.List;
import java.util.Map;

/**
 * @description: 描述
 * @author: HeAria
 * @date: 2018-10-08
 */

public interface VideoDao {
    /**
     * 返回视频列表
     *  @return
     */
    List<Video> queryNewsList();

    /**
     * 创建新闻
     * @return
     */
    int addVideo(Video video);

    /**
     * 删除指定新闻
     * @return
     */
    int deleteVideo(int video);
}