package com.dzb.service.impl;

import com.dzb.commons.ConfigConsts;
import com.dzb.commons.Result;
import com.dzb.dao.FileDao;
import com.dzb.model.File;
import com.dzb.service.FileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.*;

import static jdk.nashorn.internal.runtime.regexp.joni.Config.log;

/**
 * Created by DYYing on 2018/10/21.
 */
public class FileServicelmpl implements FileService {

    private static Logger logger = LoggerFactory.getLogger(FileService.class);

    @Autowired
    private FileDao fileDao;


    /**
     * 返回公告数组
     * @return
     */
    @Override
    public List<File> queryFileList(){

        List<File> fileList = new ArrayList<>();
        fileList = fileDao.queryFileList();

        return fileList;
    }

    @Override
    public File uploadFile(String fileDirPath, String appRootDir,
                          MultipartFile File1, File file) {
        String uploadFileName = File1.getOriginalFilename();

        //Set child catalog
        Date currentTime = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("/yyyy-MM-dd");
        String childDir = formatter.format(currentTime);

        //Set web path
        String webPath = appRootDir + ConfigConsts.USER_IMAGE_DIRECTORY + childDir +  uploadFileName;

        //Set real path
        String realPath = fileDirPath + childDir;
        java.io.File fileDir = new java.io.File(realPath);
        if(!fileDir.exists()){
            fileDir.setWritable(true);
            fileDir.mkdirs();
        }

        java.io.File targetFile = new java.io.File(realPath, uploadFileName);
        try{
            File1.transferTo(targetFile);
        } catch (IOException e){
            log.println("Upload Error!");
            return null;
        }

        file.setRealPath(realPath);
        file.setWebPath(webPath);
        file.setFileName(uploadFileName);
        int uploadResult = fileDao.uploadFile(file);
        if(uploadResult == 0){
            return null;
        }

        return file;

    }


    @Override
    public Result<String> downFile(HttpServletResponse response, File file) {

        // 得到要下载的文件名
        String fileName = file.getFileName();
        try {
            // 上传位置
            String fileSaveRootPath = file.getRealPath();
            // 读取要下载的文件，保存到文件输入流
            FileInputStream in = new FileInputStream(fileSaveRootPath + "\\" + fileName);
            // 创建输出流
            OutputStream out = response.getOutputStream();
            // 创建缓冲区
            byte buffer[] = new byte[1024];
            int len = 0;
            // 循环将输入流中的内容读取到缓冲区当中
            while ((len = in.read(buffer)) > 0) {
                // 输出缓冲区的内容到浏览器，实现文件下载
                out.write(buffer, 0, len);
            }
            // 关闭文件输入流
            in.close();
            // 关闭输出流
            out.close();
        } catch (Exception e) {
            Result.createByErrorMessage("download file Failed!");
        }
        Map<String, Object> data = new HashMap<>();
        data.put("file", file);
        return Result.createBySuccess("Success!");
    }

    @Override
    public Result<String> deleteFile(File file){
        int deleteResult = fileDao.deleteFile((int) file.getId());
        if(deleteResult == 0){
            return Result.createByErrorMessage("Delete Error.");
        } else {
            return Result.createBySuccess("Success!");
        }
    }
}
