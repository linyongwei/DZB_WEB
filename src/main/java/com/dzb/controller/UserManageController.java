package com.dzb.controller;

import com.dzb.commons.Result;
import com.dzb.model.User;
import com.dzb.model.UserListInformation;
import com.dzb.service.UserManageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.test.annotation.Timed;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author: pinnuli
 * @date: 18-9-26
 */
@RestController
@RequestMapping("/api/usermanage")
public class UserManageController {
    @Autowired
    private UserManageService userManageService;

    @RequestMapping(value = "/userlist", method = RequestMethod.GET)
    public Result getUserList(HttpServletRequest request, HttpServletResponse response) throws IOException {
        /**
         * 获取用户简略信息表
        */
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        List<User> userList = userManageService.selectAllUser();
        List<UserListInformation> userListInformations = new ArrayList<>();
        for (User user : userList) {
            userListInformations.add(new UserListInformation(user.getName(), user.getStudentNum(), user.getJoinPartyTime(), user.getIdentity()));
        }
        Map<String, Object> data = new HashMap<>();
        data.put("userlist", userListInformations);
        return Result.createBySuccess(data);
    }

    @RequestMapping(value = "/detailinfo/{studentNum}", method = RequestMethod.GET)
    public Result getUserInformation(@PathVariable long studentNum, HttpServletRequest request, HttpServletResponse response) throws IOException {
        /**
         * 根据学号获取用户个人信息
         */
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        User user = this.userManageService.getUserInformation(studentNum);
        Map<String, Object> data = new HashMap<>();
        data.put("user", user);
        return Result.createBySuccess(data);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public Result<String> deleteUser(long studentNum) {
        /**
         * 根据学号删除用户个人信息
         */
        int flat = userManageService.delete(studentNum);
        if (flat == 0) {
            return Result.createBySuccessMessage("删除失败");
        }
        return Result.createBySuccessMessage("删除成功");
    }


}
