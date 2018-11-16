package com.dzb.interceptor;

import com.alibaba.fastjson.JSON;
import com.dzb.commons.Result;
import com.dzb.commons.ResultCodeEnum;
import com.dzb.model.User;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * @description:
 * @author: pinnuli
 * @date: 2018-10-27
 */

public class RoleInterceptor implements HandlerInterceptor {
    @Override
    public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
            throws Exception {
        // TODO Auto-generated method stub

    }

    @Override
    public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
            throws Exception {
        // TODO Auto-generated method stub

    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object arg2) {
        User currentUser = (User)request.getSession().getAttribute("currentUser");
        System.out.println(currentUser.getRole());
        if (currentUser != null && !"支委".equals(currentUser.getRole())) {
            System.out.println("无权限");
            try {
                return buildResponseResult(response, ResultCodeEnum.RESULT_CODE_UNAUTHORIZED);
            } catch (IOException e) {
                e.printStackTrace();
                return false;
            }
        }
        return true;
    }

    private boolean  buildResponseResult(HttpServletResponse response, ResultCodeEnum resultCodeEnum) throws IOException {
        response.setContentType("application/json; charset=utf-8");
        PrintWriter out = response.getWriter();
        out.print(JSON.toJSONString(Result.createByResultCodeEnum(resultCodeEnum)));
        out.flush();
        out.close();
        return false;
    }
}
