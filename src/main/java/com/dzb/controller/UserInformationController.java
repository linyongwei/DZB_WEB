package com.dzb.controller;

import com.dzb.commons.Result;
import com.dzb.model.User;
import com.dzb.service.UserInformationService;
import com.dzb.service.UserManageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static com.dzb.commons.ResultCodeEnum.RESULT_CODE_SUCCESS;

/**
 * @author: pinnuli
 * @date: 18-9-26
 */
@RestController
@RequestMapping("/api/person")
public class UserInformationController {
    @Autowired
    private UserInformationService userInformationService;
    @RequestMapping(value = "/info", method = RequestMethod.GET)
    public Result getUserInformation(HttpServletRequest request, HttpServletResponse response) throws IOException {
        /**
         * 在session中获取登录用户个人信息
         */
        HttpSession session = request.getSession();
        System.out.println("currentUser" + session.getAttribute("currentUser"));
        User currentUser;
        currentUser=(User)session.getAttribute("currentUser");
        User user = this.userInformationService.getUserInformation(currentUser);
        return Result.createBySuccess(user);
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public Result<String> saveChange(@RequestBody User user,HttpServletRequest request) {
        /**
         * 保存修改用户信息
         */
        HttpSession session = request.getSession();
        System.out.println("currentUser" + session.getAttribute("currentUser"));
        User currentUser;
        currentUser=(User)session.getAttribute("currentUser");
        if(!currentUser.getStudentNum().equals(user.getStudentNum()))
        {
            return Result.createBySuccessMessage("不能修改学号！");
        }
        int flat = userInformationService.save(user);
        if (flat == 0) {
            return Result.createBySuccessMessage("保存失败");
        }
        return Result.createBySuccessMessage("保存成功");
    }

}
