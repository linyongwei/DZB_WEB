package com.dzb.dao;


import com.dzb.commons.Result;
import com.dzb.model.Video;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VideoDao {
    /**
     * 返回视频列表
     * @return
     */
    List<Video> queryVideoList();

    int uploadVideo(Video video);

    int deleteVideo(int video);
}
