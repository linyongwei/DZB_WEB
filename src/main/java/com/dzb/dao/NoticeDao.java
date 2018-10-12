package com.dzb.dao;
import com.dzb.commons.Result;
import com.dzb.model.Notice;

import java.util.ArrayList;
import java.util.List;

public interface NoticeDao {
    /**
     * 返回公告列表
     *  @return
     */
    List<Notice> getAll();

    /**
     * 储存新公告
     *  @return
     */
    int save(Notice notice);

    /**
     * 返回公告总条数
     *  @return
     */
    int noticeTotalNumber();

    /**
     * 获得公告
     *  @return
     */
    Notice getNotice(Notice notice);

    /**
     * 修改公告
     *  @return
     */
    int updateNotice(Notice notice);

    /**
     * 删除公告
     *  @return
     */
    int deleteNotice(long noticeId);

}
