package com.dzb.service;

import com.dzb.commons.Result;
import com.dzb.model.FileInfo;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface FileService {

    List<FileInfo> queryFileList();

    FileInfo uploadFile(String fileDirPath, String appRootDir,
                        MultipartFile File1, FileInfo fileInfo);

    Result<String> downFile(HttpServletResponse response,FileInfo fileInfo);

    Result<String> deleteFile(Integer fileId);





}
