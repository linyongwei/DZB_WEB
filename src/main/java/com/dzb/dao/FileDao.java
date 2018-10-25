package com.dzb.dao;
import com.dzb.model.File;

import java.util.List;

public interface FileDao {
    /**
     * 返回公告列表
     *  @return
     */
    List<File> queryFileList();

    /**
     * 上传
     *  @return
     */
    int uploadFile(File file);


    /**
     * 获得
     *  @return
     */
    int downFile(File file);

    /**
     * 删除
     *  @return
     */
    int deleteFile(int file);

}
