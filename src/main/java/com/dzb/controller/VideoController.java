package com.dzb.controller;

import com.dzb.commons.Result;
import com.dzb.service.VideoService;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

//import com.dzb.model.File;
/**
 * @author: DYYing
 */

@RestController
@RequestMapping("/api/file")
public class  VideoController {

    private static Logger log = LoggerFactory.getLogger(VideoController.class);

    @Autowired
    private VideoService videoService;

    //返回视频简略信息数组
    //2018.10.7
    //
    @RequestMapping(value = "/api/video/videolist", method = RequestMethod.GET)
    public Result queryList(@)
    {

    }





    //视频上传
    //2018.9.30
    //
    @RequestMapping(value = "/api/video/upload?videoId=", method = RequestMethod.POST)
    public @ResponseBody
    String upload(
            @RequestParam MultipartFile file1, HttpServletRequest request) {

        Map<String, Object> map = new HashMap<String, Object>();
        if (file1.isEmpty()) {
            map.put("result", "error");
            map.put("msg", "上传文件不能为空");
        } else {
            String originalFilename = file1.getOriginalFilename();
            String fileBaseName = FilenameUtils.getBaseName(originalFilename);
            Date now = new Date();
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String floderName = fileBaseName + "_" + df.format(now);
            try {
                //创建要上传的路径
                File fdir = new File("D:/file");
                if (!fdir.exists()) {
                    fdir.mkdirs();
                }
                //文件上传到路径下
                FileUtils.copyInputStreamToFile(file1.getInputStream(), new File(fdir, originalFilename));
                //coding
                map.put("code:200", "message:成功");

            } catch (Exception e) {
                map.put("result", "error");
                map.put("msg", e.getMessage());

            }
        }
        return map;
    }




    /*删除视频
         2018.10.1
         */
    @RequestMapping(value = "/api/video/delete" , method = RequestMethod.DELETE)
    public void deleteFile(HttpServletRequest request,
                           HttpServletResponse response) {
        Map<String, Object> map = new HashMap<String, Object>();
        // 得到要删除的文件名
        String fileName = request.getParameter("videoId");
        try {
            // 获取上传文件的目录
            ServletContext sc = request.getSession().getServletContext();
            // 上传位置
            String fileSaveRootPath = sc.getRealPath("/tempFiles");
            // 得到要删除的文件
            File file = new File(fileSaveRootPath + "\\" + fileName);
            //删除文件
            file.delete();
            map.put("code:200", "message:成功");
        } catch (Exception e) {

        }
    }

}