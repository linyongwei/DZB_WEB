package com.dzb.controller;


import com.dzb.commons.Result;
import com.dzb.model.User;
import com.dzb.model.LoginUser;
import com.dzb.service.UserService;
import com.dzb.model.CheckMailCodeUser;
import com.dzb.model.SendMailCodeUser;
import com.dzb.model.ResetPasswordUser;
import com.dzb.model.RandomValidateCode;
import com.dzb.model.email.EmailSend;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * @author: pinnuli
 * @date: 18-9-26
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    private static Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public Result<String> create(@RequestBody User user) {
        /**
         * 注册
         */
        return userService.save(user);
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Result<String> login(@RequestBody LoginUser user,
                                HttpServletRequest request, HttpServletResponse response) {
        /**
         *  登录，得先获取验证码之后才能有登录
         */
        //这句是获取session
        HttpSession session = request.getSession();
        //是验证码的key
        String randomString = (String)session.getAttribute(RandomValidateCode.RANDOMCODEKEY);
        System.out.println("The code is !!!!  "+randomString);
        if(!user.getVerificationCode().toLowerCase().equals(randomString)){
            return Result.createByErrorCodeMessage(10000, "验证码错误");
        }
        User currentUser = userService.getCurrentUser(user.getStudentNum());
        session.removeAttribute("currentUser");
        //将当前用户存入session
        session.setAttribute("currentUser",currentUser);
        System.out.println(session.getAttribute("currentUser"));
        System.out.println("YES");
        return userService.login(user);
    }

    @RequestMapping(value = "/verification_code", method = RequestMethod.GET)
    public void verificationCode(HttpServletRequest request, HttpServletResponse response) {
        /**
         * 获取验证码，在登录和找回密码时需要先访问一次
         */
        new RandomValidateCode().getRandcode(request, response);
    }

    @RequestMapping(value = "/send_mail_code", method = RequestMethod.POST)
    public Result<String> sendMailCode(@RequestBody SendMailCodeUser user,
                                       HttpServletRequest request, HttpServletResponse response) {
        /**
         *  用户找回密码提交账号，得先获取验证码之后才能用
         */
        //获取session
        HttpSession session = request.getSession();
        //这个是验证码的key
        String randomString = (String)session.getAttribute(RandomValidateCode.RANDOMCODEKEY);
        //都变成小写
        if(!randomString.equals(user.getCode().toLowerCase())){
            return Result.createByErrorCodeMessage(10000, "验证码错误");
        }
        String email = userService.getEmail(user);
        if("".equals(email)){
            return Result.createByErrorMessage("用户不存在");
        }
        if("no".equals(email)){
            return Result.createByErrorMessage("该用户未绑定邮箱");
        }
        new EmailSend().sendRandCode(email, request, response);
        session.removeAttribute("currentStudentNum");
        //将当前用户存入session
        session.setAttribute("currentStudentNum",user.getStudentNum());
        return Result.createBySuccessMessage("验证码已发送");
    }

    @RequestMapping(value = "/check_mail_code", method = RequestMethod.POST)
    public Result<String> checkMailCode(@RequestBody CheckMailCodeUser user,
                                        HttpServletRequest request, HttpServletResponse response) {
        /**
         *   用户找回密码提交邮箱验证码接口，即将用户填入验证码与发送往邮箱的验证码比较
         */
        HttpSession session = request.getSession();
        String randomString = (String)session.getAttribute(EmailSend.RANDOMCODEKEY);
        if(!randomString.equals(user.getMailCode())){
            return Result.createByErrorCodeMessage(10000, "验证码错误");
        }
        //验证通过的话
        long currentStudentNum = (long)session.getAttribute("currentStudentNum");
        User currentUser = userService.getCurrentUser(currentStudentNum);
        session.removeAttribute("currentUser");
        //将当前用户存入session
        session.setAttribute("currentUser",currentUser);
        return Result.createBySuccessMessage("验证通过");
    }

    @RequestMapping(value = "/reset_password", method = RequestMethod.POST)
    public Result<String> resetPassword(@RequestBody ResetPasswordUser user,
                                        HttpServletRequest request, HttpServletResponse response) {
        if("".equals(user.getPassword())){
            return Result.createByErrorMessage("请输入密码");
        }
        if("".equals(user.getRpassword())){
            return Result.createByErrorMessage("请重复输入密码");
        }
        if(!user.getPassword().equals(user.getRpassword())){
            return Result.createByErrorMessage("两次密码输入不一致");
        }
        HttpSession session = request.getSession();
        User currentUser = (User)session.getAttribute("currentUser");
        return userService.resetPassword(currentUser, user);
    }

}

