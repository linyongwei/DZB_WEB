package com.dzb.dao;
import com.dzb.model.FileInfo;

import java.util.List;

public interface FileDao {
    /**
     * 返回公告列表
     *  @return
     */
    List<FileInfo> queryFileList();

    /**
     * 上传
     *  @return
     */
    int uploadFile(FileInfo fileInfo);


    /**
     * 获得
     *  @return
     */
    int downFile(FileInfo fileInfo);

    /**
     * 删除
     *  @return
     */
    int deleteFile(int file);

}
