package com.dzb.controller;

import com.dzb.commons.ConfigConsts;
import com.dzb.commons.Result;
import com.dzb.commons.ResultCodeEnum;
import com.dzb.model.User;
import com.dzb.model.Video;
import com.dzb.service.UserInformationService;
import com.dzb.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/video")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @Autowired
    private UserInformationService userInformationService;

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
    public Result uploadVideo(MultipartFile videoFile, HttpServletRequest request,
                              HttpServletResponse response) throws IOException {
        //添加学号信息
        HttpSession session = request.getSession();
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        System.out.println("currentUser" + session.getAttribute("currentUser"));
        User currentUser;
        currentUser=(User)session.getAttribute("currentUser");
        User user = userInformationService.getUserInformation(currentUser);


        String videoDirPath = request.getSession().
                getServletContext().getRealPath(ConfigConsts.VIDEO_DIRECTORY);
        String appRootDir = request.getServletContext().getContextPath();

        Video video = new Video();
        video.setStudentNum(user.getStudentNum());
        video = videoService.uploadVideo(videoDirPath, appRootDir, videoFile, video);

        if(video == null){
            return Result.createByErrorMessage("Upload Failed!");
        }
        Map<String, Object> data = new HashMap<>();
        data.put("video", video);
        return Result.createBySuccess(data);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public Result<String> deleteVideo(@RequestParam Integer videoId){
        System.out.println("Deleted");
        return videoService.deleteVideo(videoId);
    }

}
