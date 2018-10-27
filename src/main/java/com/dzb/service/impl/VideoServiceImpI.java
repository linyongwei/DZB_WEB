package com.dzb.service.impl;

import com.dzb.commons.ConfigConsts;
import com.dzb.commons.Result;
import com.dzb.dao.VideoDao;
import com.dzb.model.Video;
import com.dzb.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static jdk.nashorn.internal.runtime.regexp.joni.Config.log;

@Service
public class VideoServiceImpI implements VideoService {
    @Autowired
    private VideoDao videoDao;

    @Override
    public List<Video> queryVideoList(){

        List<Video> videoList = new ArrayList<>();
        videoList = videoDao.queryVideoList();

        return videoList;
    }

    @Override
    public Video uploadVideo(String videoDirPath, String appRootDir,
                                      MultipartFile videoFile, Video video) {

        //Set new video name
        String uploadVideoName = videoFile.getOriginalFilename();

        //Set child catalog
        Date currentTime = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("/yyyy-MM-dd");
        String childDir = formatter.format(currentTime);

        //Set web path
        String webPath = appRootDir + ConfigConsts.VIDEO_DIRECTORY + childDir + File.separator + uploadVideoName;

        //Set real path
        String realPath = videoDirPath + childDir;
        File fileDir = new File(realPath);
        if(!fileDir.exists()){
            fileDir.setWritable(true);
            fileDir.mkdirs();
        }

        File targetVideo = new File(realPath, uploadVideoName);
        try{
            videoFile.transferTo(targetVideo);
        } catch (IOException e){
            log.println("Upload Error!");
            return null;
        }

        video.setRealPath(realPath);
        video.setWebPath(webPath);
        video.setVideoName(uploadVideoName);
        int uploadResult = videoDao.uploadVideo(video);
        if(uploadResult == 0){
            return null;
        }

        return video;

    }

    @Override
    public Result<String> deleteVideo(Integer videoId){
        int deleteResult = videoDao.deleteVideo(videoId);
        if(deleteResult == 0){
            return Result.createByErrorMessage("Delete Error.");
        } else {
            return Result.createBySuccess("Success!");
        }
    }
}
