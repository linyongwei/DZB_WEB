package com.dzb.controller;

import com.dzb.commons.ConfigConsts;
import com.dzb.commons.Result;
import com.dzb.commons.ResultCodeEnum;
import com.dzb.dao.FileDao;
import com.dzb.model.File;
import com.dzb.service.FileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
/**
 * @author: DYYing
 */

@RestController
@RequestMapping("/api/file")
public class  FileController {

    private static Logger log = LoggerFactory.getLogger(FileController.class);

    @Autowired
    private FileService fileService;
    @Autowired
    private FileDao fileDao;

    //返回文件简略信息数组
    //2018.10.7
    //
    @RequestMapping(value = "/filelist", method = RequestMethod.GET)
    public Result queryFileList() {
        List<com.dzb.model.File> fileList = fileService.queryFileList();
        if (fileList == null) {
            return Result.createByError(ResultCodeEnum.RESULT_CODE_NOT_FOUND);
        }
        Map<String, Object> data = new HashMap<>();
        data.put("videoList", fileList);
        return Result.createBySuccess(data);
    }


    //文件上传
    //2018.9.30
    //
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public Result uploadFile(MultipartFile File1, HttpServletRequest request) {
        String fileDirPath = request.getSession().getServletContext().getRealPath(ConfigConsts.USER_IMAGE_DIRECTORY);

        String appRootDir = request.getServletContext().getContextPath();

        File file = new File();
        file = fileService.uploadFile(fileDirPath, appRootDir, File1, file);
        if (file == null) {
            return Result.createByErrorMessage("Upload Failed!");
        }
        Map<String, Object> data = new HashMap<>();
        data.put("file", file);
        return Result.createBySuccess(data);
    }


    /*文件下载
             2018.9.30
             */
    @RequestMapping(value = "/download?fileId=", method = RequestMethod.GET)
    public Result<String> downFile(HttpServletResponse response, HttpServletRequest request) {

        File file1 = new File();
        String fileName = request.getParameter("filename");
        // 获取上传文件的目录
        ServletContext sc = request.getSession().getServletContext();
        // 上传位置
        String fileSaveRootPath = sc.getRealPath("/tempFiles");
        file1.setRealPath(fileSaveRootPath);
        // 得到要下载的文件
        file1.setFileName(fileName);
        return fileService.downFile(response, file1);

    }


    /*删除文件
         2018.10.1
         */
    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public Result<String> deleteFile(com.dzb.model.File file1) {
        System.out.println("Deleted");
        return fileService.deleteFile(file1);
    }
}