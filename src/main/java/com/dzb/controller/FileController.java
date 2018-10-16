package com.dzb.controller;

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

@RestController
@RequestMapping("/api/file")
public class  FileController {

    private static Logger log = LoggerFactory.getLogger(FileController.class);

    @Autowired
    private FileService fileService;

    //返回文件简略信息数组
    //2018.10.7
    //
    @RequestMapping(value = "/api/file/filelist", method = RequestMethod.GET)
    public Result queryList(@)
    {

    }





    //文件上传
    //2018.9.30
    //
    @RequestMapping(value = "/api/file/upload", method = RequestMethod.POST)
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



    /*文件下载
             2018.9.30
             */
    @RequestMapping(value = "/api/file/download?fileId=", method = RequestMethod.GET)
    public void downFile(HttpServletRequest request , HttpServletResponse response) {
             Map<String, Object> map = new HashMap<String, Object>();
        // 得到要下载的文件名
        String fileName = request.getParameter("filename");
        try {
            // 获取上传文件的目录
            ServletContext sc = request.getSession().getServletContext();
        // 上传位置
            String fileSaveRootPath = sc.getRealPath("/tempFiles");
            // 得到要下载的文件
            File file = new File(fileSaveRootPath + "\\" + fileName);
            // 设置响应头，控制浏览器下载该文件
            response.setHeader("content-disposition", "attachment;filename="
                    + URLEncoder.encode(fileName, "UTF-8"));
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
             map.put("code:200", "message:成功");
             map.put("data:", "Data");
         } catch (Exception e) {

         }
     }


    /*删除文件
         2018.10.1
         */
    @RequestMapping(value = "/api/file/delete" , ethod = RequestMethod.DELETE)
    public void deleteFile(HttpServletRequest request,
                         HttpServletResponse response) {
        Map<String, Object> map = new HashMap<String, Object>();
        // 得到要删除的文件名
        String fileName = request.getParameter("fileId");
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