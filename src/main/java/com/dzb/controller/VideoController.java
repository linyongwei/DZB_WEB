package com.dzb.controller;


import com.dzb.commons.ConfigConsts;
import com.dzb.commons.Result;
import com.dzb.commons.ResultCodeEnum;
import com.dzb.dao.VideoDao;
import com.dzb.model.Video;
import com.dzb.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/video")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @Autowired
    private VideoDao videoDao;

    @RequestMapping(value = "/videolist", method = RequestMethod.GET)
    public Result queryVideoList(){
        List<Video> videoList = videoService.queryVideoList();
        if(videoList == null){
            return Result.createByError(ResultCodeEnum.RESULT_CODE_NOT_FOUND);
        }
        Map<String,Object>data = new HashMap<>();
        data.put("videoList", videoList);
        return Result.createBySuccess(data);
    }

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public Result uploadVideo(MultipartFile videoFile, HttpServletRequest request){
        String videoDirPath = request.getSession().getServletContext().getRealPath(ConfigConsts.USER_IMAGE_DIRECTORY);

        String appRootDir = request.getServletContext().getContextPath();

        Video video = new Video();
        video = videoService.uploadVideo(videoDirPath, appRootDir, videoFile, video);
        if(video == null){
            return Result.createByErrorMessage("Upload Failed!");
        }
        Map<String, Object> data = new HashMap<>();
        data.put("video", video);
        return Result.createBySuccess(data);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public Result<String> deleteVideo(Video video){
        System.out.println("Deleted");
        return videoService.deleteVideo(video);
    }

}
