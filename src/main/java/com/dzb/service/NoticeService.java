package com.dzb.service;

import com.dzb.commons.Result;
import com.dzb.model.Notice;
import java.util.List;

public interface NoticeService {

      Result save(Notice notice);

      List<Notice> getAll();

      Notice getNotice(Notice notice);

      int modifyNotice(Notice notice);

      int deleteNotice(long noticeId);

}
