package com.dzb.service;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dzb.service.FileService;
import com.dzb.commons.Result;
//import com.dzb.model.File;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.stereotype.Controller;
/**
 * @author: DYYing
 */

public void setFileService(FileService fileService){
        this.fileService = fileService;
        }

public interface FileService {

    //文件上传
    //2018.9.30
    //
    @controller
    @RequestMapping(value = "/api/file/upload",method = RequestMethod.POST)
    public @ResponseBody String upload() {
        String string = upload();
        return string;
    }

    /*文件下载
     2018.9.30
     */
    @RequestMapping(value = "/api/file/download?fileId=", method = RequestMethod.GET)
    public void downFile() {
        downFile(, );
    }


    /*删除文件
 2018.10.1
 */
    @RequestMapping(value = "/api/file/delete" , ethod = RequestMethod.DELETE)
    public void deleteFile() {
        deleteFile(, );
    }





}
