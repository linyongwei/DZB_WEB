package com.dzb.controller;

import com.dzb.commons.ConfigConsts;
import com.dzb.commons.Result;
import com.dzb.commons.ResultCodeEnum;
import com.dzb.dao.FileDao;
import com.dzb.model.FileInfo;
import com.dzb.model.User;
import com.dzb.service.FileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author: DYYing
 */

@RestController
@RequestMapping("/api/file")
public class FileController {

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
        List<FileInfo> fileInfoList = fileService.queryFileList();
        if (fileInfoList == null) {
            return Result.createByError(ResultCodeEnum.RESULT_CODE_NOT_FOUND);
        }
        Map<String, Object> data = new HashMap<>();
        data.put("fileList", fileInfoList);
        return Result.createBySuccess(data);
    }

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public Result uploadFile(MultipartFile file, HttpServletRequest request) {
        HttpSession session = request.getSession();
        System.out.println("currentUser" + session.getAttribute("currentUser"));
        User currentUser;
        currentUser=(User)session.getAttribute("currentUser");
        if(!"支委".equals(currentUser.getRole())){
            return Result.createBySuccessMessage("没有权限访问！");
        }
        String fileDirPath = request.getSession().getServletContext().getRealPath(ConfigConsts.FILE_DIRECTORY);

        String appRootDir = request.getServletContext().getContextPath();

        FileInfo newFile = new FileInfo();
        newFile.setStudentNum(currentUser.getStudentNum());
        newFile = fileService.uploadFile(fileDirPath, appRootDir, file, newFile);
        if (newFile == null) {
            return Result.createByErrorMessage("Upload Failed!");
        }
        Map<String, Object> data = new HashMap<>();
        data.put("file", newFile);
        return Result.createBySuccess(data);
    }


    /*文件下载
       2018.9.30*/

    @RequestMapping(value = "/download?fileId=", method = RequestMethod.GET)
    public Result<String> downFile(HttpServletResponse response, HttpServletRequest request) {

        FileInfo fileInfo1 = new FileInfo();
        String fileName = request.getParameter("filename");
        // 获取上传文件的目录
        ServletContext sc = request.getSession().getServletContext();
        // 上传位置
        String fileSaveRootPath = sc.getRealPath("/tempFiles");
        fileInfo1.setRealPath(fileSaveRootPath);
        // 得到要下载的文件
        fileInfo1.setFileName(fileName);
        return fileService.downFile(response, fileInfo1);

    }


    /*删除文件
         2018.10.1
         */
    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public Result<String> deleteFile(@RequestParam Integer fileId) {
        System.out.println("Deleted");
        return fileService.deleteFile(fileId);
    }
}