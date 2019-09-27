package com.dzb.service;

import com.dzb.commons.Result;
import com.dzb.model.Video;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VideoService {
    List<Video> queryVideoList();

    Video uploadVideo(String videoDirPath,String appRootDir,
                    MultipartFile videoFile,Video video);

    Result<String> deleteVideo(Integer videoId);
}
