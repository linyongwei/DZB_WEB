package com.dzb.model.email;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * 发送email
 * @author lin
 *
 */
public class EmailSend {

    /**
     * 放到session中的key
     */
    public static final String RANDOMCODEKEY = "emailcode_key";

    public void sendRandCode(String email, HttpServletRequest request,
                             HttpServletResponse response){
        HttpSession session = request.getSession();
        //创建的随机数的工具类，生成验证码
        RandomUtils randomUtils = new RandomUtils();
        String random = randomUtils.getRandom();
        try {
            EmailUtils.sendMail(email, "用户您好您的验证码为:"+random);
            System.out.println("邮件发送成功!");
            session.removeAttribute(RANDOMCODEKEY);
            session.setAttribute(RANDOMCODEKEY, random);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }


//    public static void main(String[] args) {
//
//        RandomUtils randomUtils = new RandomUtils();
//        String random = randomUtils.getRandom();
//        try {
//            EmailUtils.send_mail("843566998@qq.com", "用户您好您的验证码为:"+random);
//            System.out.println("邮件发送成功!");
//        } catch (MessagingException e) {
//            e.printStackTrace();
//        }
//    }
}