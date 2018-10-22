package com.dzb.controller;

import com.dzb.commons.Result;
import com.dzb.dao.NoticeDao;
import com.dzb.model.Notice;
import com.dzb.service.NoticeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notice")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;
    @Autowired
    private NoticeDao noticeDao;

    @RequestMapping(value = "/noticelist",method = RequestMethod.GET)
    public Result noticelist(){
        System.out.println("10");
        List<Notice> noticeList = noticeService.getAll();
        if(noticeList == null){
            return Result.createByErrorMessage("获取失败");
        }
        Map<String , Object> data = new HashMap<>();
       data.put("noticeList",noticeList);
        return Result.createBySuccess(data);
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
        public Result create(@RequestBody Notice notice){
        return noticeService.save(notice);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public Result update(@RequestBody Notice notice){
           int  flat= noticeService.modifyNotice(notice);
           if(flat == 0){
               return Result.createByErrorMessage("修改失败");
           }
           return Result.createBySuccess();
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public Result delete(long noticeId){
       int flat = noticeService.deleteNotice(noticeId);
       if(flat == 0){
           return  Result.createBySuccessMessage("删除失败");
       }
       return Result.createBySuccessMessage("删除成功");
    }


}

