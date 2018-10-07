package com.dzb.model.Email;

import java.util.*;

/**
 * 生成随机字符串
 */
public class RandomUtils {
    public String getRandom() {
        String[] beforeShuffle = new String[] { "1", "2", "3", "4", "5", "6",
                "7", "8", "9", "0"};
        List list = Arrays.asList(beforeShuffle);
        Collections.shuffle(list);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < list.size(); i++) {
            sb.append(list.get(i));
        }
        String afterShuffle = sb.toString();
        String result = afterShuffle.substring(5, 9);
        System.out .print(result) ;
        return result;
    }
}