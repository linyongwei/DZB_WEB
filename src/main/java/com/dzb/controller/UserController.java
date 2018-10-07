package com.dzb.controller;


import com.dzb.commons.Result;
import com.dzb.model.User;
import com.dzb.model.loginUser;
import com.dzb.service.UserService;
import com.dzb.model.checkMailCodeUser;
import com.dzb.model.sendMailCodeUser;
import com.dzb.model.resetPasswordUser;
import com.dzb.model.RandomValidateCode;
import com.dzb.model.Email.EmailSend;
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

    @RequestMapping(value = "/register", method = RequestMethod.POST)  //注册
    public Result<String> create(@RequestBody User user) {
        return userService.save(user);
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)  //登录，得先获取验证码之后才能有登录
    public Result<String> login(@RequestBody loginUser user,
                                HttpServletRequest request, HttpServletResponse response) {

        HttpSession session = request.getSession(); //这句是获取session
        String randomString = (String)session.getAttribute(RandomValidateCode.RANDOMCODEKEY);   //这个是验证码的key
        System.out.println("The code is !!!!  "+randomString);
        if(!user.getVerificationCode().toLowerCase().equals(randomString)){
            return Result.createByErrorCodeMessage(10000, "验证码错误");
//            return Result.createByErrorMessage("验证码不正确");
        }
        User currentUser = userService.getCurrentUser(user.getStudentNum());
        session.removeAttribute("currentUser");
        session.setAttribute("currentUser",currentUser);  //将当前用户存入session
        System.out.println(session.getAttribute("currentUser"));
        System.out.println("YES");
        return userService.login(user);
    }

    @RequestMapping(value = "/verification_code", method = RequestMethod.GET)  //获取验证码
    public void verificationCode(HttpServletRequest request, HttpServletResponse response) {
        new RandomValidateCode().getRandcode(request, response);
    }

    @RequestMapping(value = "/send_mail_code", method = RequestMethod.POST) //用户找回密码提交账号，得先获取验证码之后才能用
    public Result<String> sendMailCode(@RequestBody sendMailCodeUser user,
                                       HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(); //这句是获取session，true是表示如果没有则新建一个session，
        String randomString = (String)session.getAttribute(RandomValidateCode.RANDOMCODEKEY);   //这个是验证码的key
        if(!randomString.equals(user.getCode().toLowerCase())){    //都变成小写
            return Result.createByErrorCodeMessage(10000, "验证码错误");
        }
        String email = userService.getEmail(user);
        if(email.equals("")){
            return Result.createByErrorMessage("用户不存在");
        }
        new EmailSend().sendRandcode(email, request, response);
        session.removeAttribute("currentStudentNum");
        session.setAttribute("currentStudentNum",user.getStudentNum());  //将当前用户存入session
        return Result.createBySuccessMessage("验证码已发送");
    }

    @RequestMapping(value = "/check_mail_code", method = RequestMethod.POST)  //用户找回密码提交邮箱验证码接口，即将用户填入验证码与生成的验证码比较
    public Result<String> checkMailCode(@RequestBody checkMailCodeUser user,
                                        HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(); //这句是获取session，true是表示如果没有则新建一个session，
        String randomString = (String)session.getAttribute(EmailSend.RANDOMCODEKEY);   //这个是验证码的key
        if(!randomString.equals(user.getMailCode())){
            return Result.createByErrorCodeMessage(10000, "验证码错误");
        }
        //验证通过的话
        long currentStudentNum = (long)session.getAttribute("currentStudentNum");
        User currentUser = userService.getCurrentUser(currentStudentNum);
        session.removeAttribute("currentUser");
        session.setAttribute("currentUser",currentUser);  //将当前用户存入session
        return Result.createBySuccessMessage("验证通过");
    }

    @RequestMapping(value = "/reset_password", method = RequestMethod.POST)  //用户重置密码
    public Result<String> resetPassword(@RequestBody resetPasswordUser user,
                                        HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        User currentUser = (User)session.getAttribute("currentUser");
        return userService.resetPassword(currentUser, user);
    }

}

