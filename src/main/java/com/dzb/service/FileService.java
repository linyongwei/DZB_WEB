package com.dzb.service;

import com.dzb.commons.Result;
import com.dzb.model.File;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface FileService {

    List<File> queryFileList();

    File uploadFile(String fileDirPath, String appRootDir,
                   MultipartFile File1, File file);

    Result<String> downFile(HttpServletResponse response,File file);

    Result<String> deleteFile(File file);





}
