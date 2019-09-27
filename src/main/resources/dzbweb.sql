/*
 Navicat MySQL Data Transfer

 Source Server         : dzb
 Source Server Type    : MySQL
 Source Server Version : 50722
 Source Host           : 193.112.59.11:3306
 Source Schema         : dzbweb

 Target Server Type    : MySQL
 Target Server Version : 50722
 File Encoding         : 65001

 Date: 27/09/2019 15:18:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `student_num` bigint(20) UNSIGNED NULL DEFAULT NULL COMMENT '学号',
  `file_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件名',
  `web_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件路径',
  `real_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件真实路径',
  `download_times` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '下载次数',
  `message_id` int(11) UNSIGNED NULL DEFAULT NULL COMMENT '文件对应消息的id',
  `is_delete` tinyint(4) UNSIGNED NOT NULL DEFAULT 0 COMMENT '软删除，0代表未删除，1代表已删除',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `news_id`(`message_id`) USING BTREE,
  INDEX `student_number`(`student_num`) USING BTREE,
  CONSTRAINT `news_id` FOREIGN KEY (`message_id`) REFERENCES `news` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `notice_id` FOREIGN KEY (`message_id`) REFERENCES `notice` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `student_num` FOREIGN KEY (`student_num`) REFERENCES `user` (`student_num`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 81 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES (51, NULL, '新建文本文档 (4).txt', '/files/2018-11-13\\新建文本文档 (4).txt', 'D:\\DZB_WEB\\target\\DZB_WEB\\files/2018-11-13\\', 0, NULL, 1, '2018-11-13 12:31:47');
INSERT INTO `file` VALUES (52, NULL, '新建文本文档 (4).txt', '/files/2018-11-13\\新建文本文档 (4).txt', 'D:\\DZB_WEB\\target\\DZB_WEB\\files/2018-11-13\\', 0, NULL, 1, '2018-11-13 12:34:20');
INSERT INTO `file` VALUES (53, NULL, '新建文本文档 (4).txt', '/files/2018-11-13\\新建文本文档 (4).txt', 'D:\\DZB_WEB\\target\\DZB_WEB\\files/2018-11-13\\', 0, NULL, 1, '2018-11-13 12:38:26');
INSERT INTO `file` VALUES (54, NULL, '新建文本文档 (4).txt', '/files/2018-11-13\\新建文本文档 (4).txt', 'D:\\DZB_WEB\\target\\DZB_WEB\\files/2018-11-13\\', 0, NULL, 1, '2018-11-13 12:42:12');
INSERT INTO `file` VALUES (55, NULL, 'test.txt', '/files/2018-11-13\\test.txt', 'D:\\DZB_WEB\\target\\DZB_WEB\\files/2018-11-13\\', 0, NULL, 1, '2018-11-13 13:40:18');
INSERT INTO `file` VALUES (56, NULL, 'test2.docx', '/files/2018-11-13\\test2.docx', 'D:\\DZB_WEB\\target\\DZB_WEB\\files/2018-11-13\\', 0, NULL, 1, '2018-11-13 20:36:39');
INSERT INTO `file` VALUES (57, NULL, '网站开发文档.docx', '/files/2018-11-16/网站开发文档.docx', '/var/java/projects/DZB_WEB/target/DZB_WEB/files/2018-11-16/', 0, NULL, 1, '2018-11-16 10:35:09');
INSERT INTO `file` VALUES (58, 201625010417, '问卷（两页版）.docx', '/files/2018-11-16/问卷（两页版）.docx', '/var/java/projects/DZB_WEB/target/DZB_WEB/files/2018-11-16/', 0, NULL, 1, '2018-11-16 10:45:45');
INSERT INTO `file` VALUES (59, 201625010605, '改革开放四十周年感想.doc', '/files/2018-11-18\\改革开放四十周年感想.doc', 'D:\\DZB_WEB\\target\\DZB_WEB\\files/2018-11-18\\', 0, NULL, 1, '2018-11-18 18:49:18');
INSERT INTO `file` VALUES (60, 201625010605, '心得体会.docx', '/files/2018-11-18\\心得体会.docx', 'D:\\DZB_WEB\\target\\DZB_WEB\\files/2018-11-18\\', 0, NULL, 1, '2018-11-18 18:57:12');
INSERT INTO `file` VALUES (61, 201625010605, '改革开放40年心得体会1.doc', '/files/2018-11-18\\改革开放40年心得体会1.doc', 'D:\\DZB_WEB\\target\\DZB_WEB\\files/2018-11-18\\', 0, NULL, 1, '2018-11-18 19:04:17');
INSERT INTO `file` VALUES (62, 201625010605, '一个90后关于改革开放40周年的感想.docx', '/files/2018-11-19\\一个90后关于改革开放40周年的感想.docx', 'D:\\DZB_WEB\\target\\DZB_WEB\\files/2018-11-19\\', 0, NULL, 1, '2018-11-19 12:51:31');
INSERT INTO `file` VALUES (63, 201625010605, '改革开放给中国带来的创新性改变.doc', '/files/2018-11-19\\改革开放给中国带来的创新性改变.doc', 'D:\\DZB_WEB\\target\\DZB_WEB\\files/2018-11-19\\', 0, NULL, 1, '2018-11-19 12:56:42');
INSERT INTO `file` VALUES (64, 201625010417, '一个90后关于改革开放40周年的感想.docx', '/files/2018-11-19/一个90后关于改革开放40周年的感想.docx', '/var/java/projects/DZB_WEB/target/DZB_WEB/files/2018-11-19/', 0, NULL, 1, '2018-11-19 18:56:55');
INSERT INTO `file` VALUES (65, 201625010417, '无标题文档', '/files/2018-11-19/无标题文档', '/var/java/projects/DZB_WEB/target/DZB_WEB/files/2018-11-19/', 0, NULL, 1, '2018-11-19 20:16:27');
INSERT INTO `file` VALUES (66, 201625010417, '无标题文档.txt', '/files/2018-11-19/无标题文档.txt', '/var/java/projects/DZB_WEB/target/DZB_WEB/files/2018-11-19/', 0, NULL, 1, '2018-11-19 20:17:55');
INSERT INTO `file` VALUES (67, 201625010605, '改革开放40年心得体会1.doc', '/files/2018-11-21/改革开放40年心得体会1.doc', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/files/2018-11-21/', 0, NULL, 1, '2018-11-21 11:27:50');
INSERT INTO `file` VALUES (68, 201625010605, '改革开放给中国带来的创新性改变.doc', '/files/2018-11-21/改革开放给中国带来的创新性改变.doc', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/files/2018-11-21/', 0, NULL, 1, '2018-11-21 11:27:58');
INSERT INTO `file` VALUES (69, 201625010605, '改革开放四十周年感想.doc', '/files/2018-11-21/改革开放四十周年感想.doc', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/files/2018-11-21/', 0, NULL, 1, '2018-11-21 11:28:06');
INSERT INTO `file` VALUES (70, 201625010605, '一个90后关于改革开放40周年的感想.docx', '/files/2018-11-21/一个90后关于改革开放40周年的感想.docx', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/files/2018-11-21/', 0, NULL, 1, '2018-11-21 11:28:30');
INSERT INTO `file` VALUES (71, 201625010605, '心得体会.docx', '/files/2018-11-21/心得体会.docx', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/files/2018-11-21/', 0, NULL, 1, '2018-11-21 11:29:09');
INSERT INTO `file` VALUES (72, 201525010611, '义教--新闻稿.docx', '/files/2018-11-24/义教--新闻稿.docx', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/files/2018-11-24/', 0, NULL, 1, '2018-11-24 15:55:40');
INSERT INTO `file` VALUES (73, 201525010611, '网站搭建和讨论--新闻稿.docx', '/files/2018-11-24/网站搭建和讨论--新闻稿.docx', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/files/2018-11-24/', 0, NULL, 1, '2018-11-24 15:55:50');
INSERT INTO `file` VALUES (74, 201625010605, '会议记录2018.10.23.docx', '/files/2018-11-24\\会议记录2018.10.23.docx', 'C:\\Users\\HP\\Desktop\\eclipse老师版\\apache-tomcat-9.0.6\\webapps\\ROOT\\files/2018-11-24\\', 0, NULL, 1, '2018-11-24 18:07:10');
INSERT INTO `file` VALUES (75, 201625010605, '改革开放40年心得体会1.doc', '/files/2018-11-28/改革开放40年心得体会1.doc', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/files/2018-11-28/', 0, NULL, 0, '2018-11-28 20:05:28');
INSERT INTO `file` VALUES (76, 201625010605, '改革开放四十周年感想.doc', '/files/2018-11-28/改革开放四十周年感想.doc', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/files/2018-11-28/', 0, NULL, 0, '2018-11-28 20:05:33');
INSERT INTO `file` VALUES (77, 201625010605, '心得体会.docx', '/files/2018-11-28/心得体会.docx', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/files/2018-11-28/', 0, NULL, 0, '2018-11-28 20:05:36');
INSERT INTO `file` VALUES (78, 201625010605, '改革开放给中国带来的创新性改变.doc', '/files/2018-11-28/改革开放给中国带来的创新性改变.doc', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/files/2018-11-28/', 0, NULL, 0, '2018-11-28 20:05:46');
INSERT INTO `file` VALUES (79, 201625010605, '一个90后关于改革开放40周年的感想.docx', '/files/2018-11-28/一个90后关于改革开放40周年的感想.docx', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/files/2018-11-28/', 0, NULL, 0, '2018-11-28 20:05:52');
INSERT INTO `file` VALUES (80, 201625010605, '学习论文.rar', '/files/2018-11-28/学习论文.rar', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/files/2018-11-28/', 0, NULL, 0, '2018-11-28 20:25:15');

-- ----------------------------
-- Table structure for meeting
-- ----------------------------
DROP TABLE IF EXISTS `meeting`;
CREATE TABLE `meeting`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增',
  `student_num` bigint(20) UNSIGNED NULL DEFAULT NULL COMMENT '学号',
  `meeting_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '会议名称',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '会议内容',
  `meeting_time` datetime(0) NOT NULL COMMENT '会议时间',
  `is_delete` tinyint(4) UNSIGNED NOT NULL DEFAULT 0 COMMENT '软删除，0代表未删除，1代表已删除',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `meeting_student_num`(`student_num`) USING BTREE,
  CONSTRAINT `meeting_student_num` FOREIGN KEY (`student_num`) REFERENCES `user` (`student_num`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `student_num` bigint(20) UNSIGNED NULL DEFAULT NULL COMMENT '学号',
  `news_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '新闻标题',
  `news_type` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '新闻类型',
  `news_content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '新闻内容',
  `news_link` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '新闻链接，校内外新闻只需要保存链接',
  `pub_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '新闻发布时间',
  `is_delete` tinyint(4) UNSIGNED NOT NULL DEFAULT 0 COMMENT '软删除，0代表未删除，1代表已删除',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '记录创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ID`(`id`) USING BTREE,
  INDEX `news_student_num`(`student_num`) USING BTREE,
  CONSTRAINT `news_student_num` FOREIGN KEY (`student_num`) REFERENCES `user` (`student_num`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 74 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES (20, 201625010417, 'qqqqqqqqqqqqq', '校内新闻', '就是客户的广泛不是办法', 'www.baidu.com', '2018-10-10 22:37:11', 1, '2018-10-10 22:37:11');
INSERT INTO `news` VALUES (21, 201625010417, '有点贵', '校内新闻', '也是对方付水电费', 'www.baidu.com', '2018-10-10 23:48:52', 1, '2018-10-10 23:48:52');
INSERT INTO `news` VALUES (22, 201625010417, '有点贵', '校内新闻', '也是对方付水电费', 'www.baidu.com', '2018-10-11 10:09:58', 1, '2018-10-11 10:09:58');
INSERT INTO `news` VALUES (24, 201625010417, '有点贵', '校内新闻', '也是对方付水电费', 'www.baidu.com', '2018-10-11 10:53:53', 1, '2018-10-11 10:53:53');
INSERT INTO `news` VALUES (25, 201625010417, '收发货', '校内新闻', '是的人格和地方 也是对方付水电费', 'www.baidu.com', '2018-10-11 10:54:19', 1, '2018-10-11 10:54:19');
INSERT INTO `news` VALUES (26, 201625010417, '书合同书', '校内新闻', '开学后分别送饿哦和覅组合式覅文件', 'www.baidu.com', '2018-10-12 09:55:44', 1, '2018-10-12 09:55:44');
INSERT INTO `news` VALUES (27, 201625010417, '党支部第八次公告', '学习十九大', '大苏打大苏打大概豆腐干豆腐干地方', 'www.baidu.com', '2018-10-12 10:01:11', 1, '2018-10-12 10:01:11');
INSERT INTO `news` VALUES (28, 201625010417, '书合同书', '校内新闻', '开学后分别送饿哦和覅组合式覅文件', 'www.baidu.com', '2018-10-12 10:11:03', 1, '2018-10-12 10:11:03');
INSERT INTO `news` VALUES (29, 201625010417, '党支部第八次公告', '学习十九大', '大苏打大苏打大概豆腐干豆腐干地方', 'www.baidu.com', '2018-10-12 11:34:41', 1, '2018-10-12 11:34:41');
INSERT INTO `news` VALUES (30, 201625010417, '党支部第八次公告', '学习十九大', '大苏打大苏打大概豆腐干豆腐干地方', 'www.baidu.com', '2018-10-22 22:16:07', 1, '2018-10-22 22:16:07');
INSERT INTO `news` VALUES (31, 201625010417, '党支部第八次公告', '学习十九大', '大苏打大苏打大概豆腐干豆腐干地方', 'www.baidu.com', '2018-10-22 22:16:28', 1, '2018-10-22 22:16:28');
INSERT INTO `news` VALUES (32, 201625010417, '123456', '校外新闻', '开学后分别送饿哦和覅组合式覅文件', 'www.baidu.com', '2018-10-24 23:46:33', 1, '2018-10-24 23:46:33');
INSERT INTO `news` VALUES (33, 201625010417, 'abcdef', '校外新闻', '开学后分别送饿哦和覅组合式覅文件', 'www.baidu.com', '2018-10-24 23:50:15', 1, '2018-10-24 23:50:15');
INSERT INTO `news` VALUES (34, 201625010417, 'abc', '校外新闻', '开学后分别送饿哦和覅组合式覅文件', 'www.baidu.com', '2018-10-25 09:48:54', 1, '2018-10-25 09:48:54');
INSERT INTO `news` VALUES (35, 201625010417, 'a激刻红包就看看', '校外新闻', '开学后分别送饿哦和覅组合式覅文件', 'www.baidu.com', '2018-10-27 10:43:26', 1, '2018-10-27 10:43:26');
INSERT INTO `news` VALUES (36, 201625010417, 'a激刻红包就看看', '校外新闻', '开学后分别送饿哦和覅组合式覅文件', 'www.baidu.com', '2018-10-27 12:59:35', 1, '2018-10-27 12:59:35');
INSERT INTO `news` VALUES (40, 201625010417, 'dae', '学习十九大', 'daewqewqewadas', 'www.baidu.com', '2018-11-07 20:24:14', 1, '2018-11-07 20:24:14');
INSERT INTO `news` VALUES (41, 201625010417, 'ew', '校内新闻', 'dda', 'www.baidu.com', '2018-11-07 20:24:35', 1, '2018-11-07 20:24:35');
INSERT INTO `news` VALUES (42, 201625010417, '百度', '学习十九大', '嘻嘻嘻', 'www.baidu.com', '2018-11-13 19:52:40', 1, '2018-11-13 19:52:40');
INSERT INTO `news` VALUES (43, 201625010417, '百度', '校内新闻', 'https://www.baidu.com/', 'www.baidu.com', '2018-11-13 19:59:17', 1, '2018-11-13 19:59:17');
INSERT INTO `news` VALUES (44, 201625010417, '党支部网站文档', '校外新闻', 'https://www.showdoc.cc/pinnuli?page_id=926812077729173#%E8%A7%86%E9%A2%91%E7%AE%A1%E7%90%86', 'www.baidu.com', '2018-11-13 20:06:33', 1, '2018-11-13 20:06:33');
INSERT INTO `news` VALUES (45, 201625010417, 'afa', '学习十九大', 'dafdas', NULL, '2018-11-16 18:03:24', 1, '2018-11-16 18:03:24');
INSERT INTO `news` VALUES (46, 201625010605, '好好学习', '学习十九大', '天天向上', NULL, '2018-11-16 18:20:21', 1, '2018-11-16 18:20:21');
INSERT INTO `news` VALUES (47, 201625010605, '改革开放40年百名杰出民营企业家名单发布', '校内新闻', 'http://www.xinhuanet.com//finance/2018-10/24/c_129978412.htm', NULL, '2018-11-18 18:45:38', 0, '2018-11-18 18:45:38');
INSERT INTO `news` VALUES (48, 201625010605, '从历史中汲取继续前进的力量——习近平总书记参观庆祝改革开放40周年大型展览侧记', '校外新闻', 'http://www.xinhuanet.com/politics/leaders/2018-11/14/c_1123714155.htm', NULL, '2018-11-18 18:46:07', 0, '2018-11-18 18:46:07');
INSERT INTO `news` VALUES (49, 201625010605, '「农村改革40年·脱贫攻坚在行动」改革开放再出发 逐梦小康战贫困', '校外新闻', 'https://baijiahao.baidu.com/s?id=1611203497226197898&wfr=spider&for=pc', NULL, '2018-11-18 18:46:38', 0, '2018-11-18 18:46:38');
INSERT INTO `news` VALUES (50, 201625010605, '第八届党知识竞赛初赛|“改革开放40周年，继往开来”', '校内新闻', 'https://mp.weixin.qq.com/s/KzzqSi6wZCXOgw67bFx43w', NULL, '2018-11-18 18:47:07', 0, '2018-11-18 18:47:07');
INSERT INTO `news` VALUES (51, 201625010605, '支部风采 | 我院研究生党支部召开“纪念改革开放40周年”支部会议', '校内新闻', 'https://mp.weixin.qq.com/s/cGn2RW4pDUzFM-F6Oh64Yw', NULL, '2018-11-18 18:47:29', 0, '2018-11-18 18:47:29');
INSERT INTO `news` VALUES (52, 201625010605, '感受伟大变革中的历史温度 “伟大的变革——庆祝改革开放40周年大型展览”掠影', '校外新闻', 'https://baijiahao.baidu.com/s?id=1617437030678921766&wfr=spider&for=pc', NULL, '2018-11-18 18:58:00', 0, '2018-11-18 18:58:00');
INSERT INTO `news` VALUES (53, 201625010605, '学校举行党委理论学习中心组(扩大)学习会', '校内新闻', 'http://www.scau.edu.cn/2018/1114/c1300a148526/page.htm', NULL, '2018-11-18 18:58:30', 0, '2018-11-18 18:58:30');
INSERT INTO `news` VALUES (54, 201625010605, '关于积极参加全省高校纪念广东改革开放40周年党建书画摄影作品征集评选活动的通知', '校内新闻', 'http://www.scau.edu.cn/2018/0622/c1395a89524/page.htm', NULL, '2018-11-18 19:02:42', 0, '2018-11-18 19:02:42');
INSERT INTO `news` VALUES (55, 201625010605, '庆祝改革开放40周年', '校外新闻', 'http://www.xinhuanet.com/politics/ggkf40/#tit001', NULL, '2018-11-18 19:03:45', 0, '2018-11-18 19:03:45');
INSERT INTO `news` VALUES (56, 201625010605, '省委理论学习中心组举行专题学习会 深入学习贯彻习近平总书记关于深化改革开放的重要论述', '校外新闻', 'http://web.scau.edu.cn/xcb/sjzt/gcsy/201811/t20181116_148390.html', NULL, '2018-11-19 12:48:48', 0, '2018-11-19 12:48:48');
INSERT INTO `news` VALUES (57, 201625010605, '关于积极参加全省高校纪念广东改革开放40周年党建书画摄影作品征集评选活动的通知', '校内新闻', 'http://www.scau.edu.cn/2018/0622/c1395a89524/page.htm', NULL, '2018-11-19 12:49:06', 0, '2018-11-19 12:49:06');
INSERT INTO `news` VALUES (58, 201625010605, '用数据说话！改革开放四十年广东经济取得了这些成果', '校外新闻', 'http://x.itunes123.com/a/18053015265875150/', NULL, '2018-11-19 12:54:39', 0, '2018-11-19 12:54:39');
INSERT INTO `news` VALUES (59, 201625010605, '新时代红色文化讲习所（第一百一十四讲）| 唐土红：盛赞改革开放40年，讴歌辉煌新时代——改革开放40周年的实践与启示', '校外新闻', 'http://www.sohu.com/a/259745743_99907108', NULL, '2018-11-19 12:55:12', 0, '2018-11-19 12:55:12');
INSERT INTO `news` VALUES (60, 201625010605, '40', '改革开放', 'ewa', NULL, '2018-11-20 23:23:53', 1, '2018-11-20 23:23:53');
INSERT INTO `news` VALUES (61, 201625010605, '改革开放四十周年', '改革开放', '2018年是中国改革开放40周年。1978年5月，一篇名为《实践是检验真理的唯一标准》的特约评论员文章，在《光明日报》一版刊发。它掀起了席卷中国的真理标准大讨论，成为那支撬动改革开放的哲学杠杆。短短六千字，激荡四十年。&amp;nbsp;[1]&amp;nbsp;&amp;nbsp;为改革开放迈出了一大步。2017年9月，中国国家主席习近平出席金砖国家工商论坛开幕式并发表主旨演讲。习近平说，明年要隆重纪念改革开放40周年。&amp;nbsp;[2]', NULL, '2018-11-20 23:24:28', 1, '2018-11-20 23:24:28');
INSERT INTO `news` VALUES (62, 201625010605, '改革开放四十周年', '改革开放', '2018年是中国改革开放40周年。1978年5月，一篇名为《实践是检验真理的唯一标准》的特约评论员文章，在《光明日报》一版刊发。它掀起了席卷中国的真理标准大讨论，成为那支撬动改革开放的哲学杠杆。短短六千字，激荡四十年', NULL, '2018-11-20 23:24:53', 0, '2018-11-20 23:24:53');
INSERT INTO `news` VALUES (63, 201625010605, 'ad', '改革开放', 'ewad', NULL, '2018-11-20 23:38:07', 1, '2018-11-20 23:38:07');
INSERT INTO `news` VALUES (64, 201625010605, '可以', '改革开放', '很棒', NULL, '2018-11-24 18:00:20', 1, '2018-11-24 18:00:20');
INSERT INTO `news` VALUES (65, 201625010605, '衣食住行40年，寻找改革开放的细节', '改革开放', '在国家博物馆北区，一道宽阔的台阶通向二层空间。当你拾级而上，仿佛通过一条时光隧道，隧道的主题是——服装。40年来的工装、军装、运动装、正装、礼服，从单色到彩色，从单一到多元，50套静态展服装和24套动态秀服装，呈现的是时代的变迁，向我们快进了一部改革开放以来的流行服饰史。展区由北京服装学院师生团队承担策划执行工作。北京服装学院服装与艺术工程学院副院长杨洁介绍，改革开放之前，人们着装比较简单，款式基本上是中山装、军便装、人民装、两用衫的天下，色彩主要是蓝、绿、灰“老三色”。1978年后，改革开放的春风也摇曳着人们的衣衫，喇叭裤、蝙蝠衫、棒针衫等外来的“奇装异服”得到年轻人的青睐。而随着中国纺织工业的发展，新事物涤纶服装开始流行，“的确良”衬衫、碎花裙，成为上世纪80年代时髦男女的首选。不同的服装折射的其实是一代人的观念：“西装热”代表着对国际范儿的追求，宽肩服装张扬着自信风度，紧身健美裤是开放思想的体现；而蓝色白条纹的运动衫、海魂衫和回力鞋，是那个时代的文艺小清新。如果说80年代是从单一走向多元，那90年代的服装则进一步与世界接轨。职业女性开始穿起套装，男士服装的商务休闲概念开始兴起。衬衫、T恤、风衣、羽绒服、羊毛衫……适合不同场合的服装类型丰富多彩；牛仔装、紧身T恤、露脐短衫、吊带背心、迷你裙……是年轻人的个性表达。进入21世纪，人们物质生活无虞，回归自然、返璞归真的精神追求带来棉麻服装的回潮，挑战自我的户外运动服装成为全民装备。而随着我国综合国力和国际地位的不断提升，近年来，具有民族风格和传统文化特色的新中式服装日益受到青睐。在《春天的故事》等大家耳熟能详的旋律中，展览现场还不定期举办服装秀。20余位模特身着阔腿裤、花衬衫、牛仔衣等不同时期的代表性服饰走秀，而他们手中的收音机、大哥大、吉他，也是不同年代青年最时尚的配置。', NULL, '2018-11-28 20:29:55', 1, '2018-11-28 20:29:55');
INSERT INTO `news` VALUES (66, 201625010605, '衣食住行40年，寻找改革开放的细节', '改革开放', '在国家博物馆北区，一道宽阔的台阶通向二层空间。当你拾级而上，仿佛通过一条时光隧道，隧道的主题是——服装。40年来的工装、军装、运动装、正装、礼服，从单色到彩色，从单一到多元，50套静态展服装和24套动态秀服装，呈现的是时代的变迁，向我们快进了一部改革开放以来的流行服饰史。展区由北京服装学院师生团队承担策划执行工作。北京服装学院服装与艺术工程学院副院长杨洁介绍，改革开放之前，人们着装比较简单，款式基本上是中山装、军便装、人民装、两用衫的天下，色彩主要是蓝、绿、灰“老三色”。', NULL, '2018-11-28 20:30:35', 0, '2018-11-28 20:30:35');
INSERT INTO `news` VALUES (67, 201625010605, '改革开放40年，成就举世瞩目', '改革开放', '改革开放是当代中国发展进步的必由之路，是实现中国梦的必由之路。“党团结带领中国人民进行的改革开放这一新的伟大革命，使中国赶上了时代，实现了中国人民从站起来到富起来、强起来的伟大飞跃”习近平总书记的话语掷地有声。放眼现实，全面深化改革实践、国家历史性变革成就生动地告诉我们，中国正是沿着改革开放的强国之路华丽蝶变，大踏步赶上时代前进的步伐，才取得举世瞩目的发展成就。一定意义上说，改革开放是决定当代中国命运的关键一招，是当代中国发展进步的活力之源，是我们党和人民大踏步赶上时代前进步伐的重要法宝，是坚持和发展中国特色社会主义的必由之路。', NULL, '2018-11-28 20:31:16', 0, '2018-11-28 20:31:16');
INSERT INTO `news` VALUES (68, 201625010605, '【改革开放40年】我与改革开放40年', '改革开放', '1978年改革开放的春风吹遍了祖国的神舟大地，从此中国进入了对内改革、对外开放的新时期。如果说那时一个初中生的我，对社会主义制度、党的改革开放新政策地推行尚处于一种模糊、朦胧的感知状态，那四十年后的我和我的家乡都真切地感受到了改革开放带来巨大又可喜的变化。现在的我已然从初高中、大学生转变为一名奋战在农业执法战线上的执法人员；我的家乡也已从农业耕作落后、农民生活条件差的旧农村转变为现在农业生产先进、家家户户翻新洋房、条条河道整洁优美、人人脸上露笑颜的新时代中国特色社会主义新农村啦！', NULL, '2018-11-28 20:31:51', 0, '2018-11-28 20:31:51');
INSERT INTO `news` VALUES (69, 201625010605, '习近平谈改革开放', '改革开放', '★改革开放是发展动力、重要法宝　　改革开放是我国经济社会发展的动力。不断扩大对外开放、提高对外开放水平，以开放促改革、促发展，是我国发展不断取得新成就的重要法宝。开放带来进步，封闭导致落后，这已为世界和我国发展实践所证明。', NULL, '2018-11-28 20:34:36', 1, '2018-11-28 20:34:36');
INSERT INTO `news` VALUES (70, 201625010605, '习近平谈改革开放', '改革开放', '★改革开放是发展动力、重要法宝　　改革开放是我国经济社会发展的动力。不断扩大对外开放、提高对外开放水平，以开放促改革、促发展，是我国发展不断取得新成就的重要法宝。开放带来进步，封闭导致落后，这已为世界和我国发展实践所证明。', NULL, '2018-11-28 20:34:36', 0, '2018-11-28 20:34:36');
INSERT INTO `news` VALUES (71, 201625010605, '改革开放40年的成就与反思', '改革开放', '正我国改革开放已经历了40年的岁月,经济社会的发展取得了有目共睹的巨大成就。这个成就来之不易,经历了长期的曲折探索过程,有诸多成功的经验,这是取得巨大成就的主要根源。但是也有不同程度的失误和迷误的教训。经验和教训两个方面都应总结,这有利于我国继续沿着中国特色社会主义道路顺利前进!一、改革40年中经济理论和实践的发展与成就邓小平提出了判断改革开放和一切工作是非得失的三条&quot;是否有利于&quot;的标准。', NULL, '2018-11-28 20:40:58', 0, '2018-11-28 20:40:58');
INSERT INTO `news` VALUES (72, 201525010611, '《中国共产党支部工作条例（试行）》', '校外新闻', 'http://www.12371.cn/special/zbgztlsx/', NULL, '2019-01-02 11:24:22', 0, '2019-01-02 11:24:22');
INSERT INTO `news` VALUES (73, 201525010611, '《中国共产党章程》', '校外新闻', 'http://www.12371.cn/special/zggcdzc/zggcdzcqw/', NULL, '2019-01-02 11:25:09', 0, '2019-01-02 11:25:09');

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `student_num` bigint(20) UNSIGNED NULL DEFAULT NULL COMMENT '学号',
  `notice_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '通知标题',
  `notice_content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '通知内容',
  `pub_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '公告发布时间',
  `is_delete` tinyint(4) UNSIGNED NOT NULL DEFAULT 0 COMMENT '软删除，0代表未删除，1代表已删除',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '记录创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ID`(`id`) USING BTREE,
  INDEX `notice_student_num`(`student_num`) USING BTREE,
  CONSTRAINT `notice_student_num` FOREIGN KEY (`student_num`) REFERENCES `user` (`student_num`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 91 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES (67, 201625010417, '党支部第sgu次公告', '大苏打大苏打大概豆腐干豆腐干地方', '2018-10-26 00:11:19', 1, '2018-10-26 00:11:19');
INSERT INTO `notice` VALUES (68, 201625010417, '党支部第N次公告', ' 大苏打大苏打大概豆腐干豆腐干地方', '2018-10-27 15:46:53', 1, '2018-10-27 15:46:53');
INSERT INTO `notice` VALUES (69, 201625010417, '嘎嘎嘎', '的撒额为', '2018-11-07 12:11:50', 1, '2018-11-07 12:11:50');
INSERT INTO `notice` VALUES (70, 201625010417, 'a', 'daewedgf', '2018-11-07 12:16:48', 1, '2018-11-07 12:16:48');
INSERT INTO `notice` VALUES (71, 201625010417, 'sadw', 'qwewqea', '2018-11-07 19:57:35', 1, '2018-11-07 19:57:35');
INSERT INTO `notice` VALUES (72, 201625010417, 'aeeda', '你好', '2018-11-07 20:02:50', 1, '2018-11-07 20:02:50');
INSERT INTO `notice` VALUES (73, 201625010417, 'a恩恩呢', '你好', '2018-11-07 20:03:06', 1, '2018-11-07 20:03:06');
INSERT INTO `notice` VALUES (74, 201625010417, '你好', '嗯嗯嗯', '2018-11-07 20:04:56', 1, '2018-11-07 20:04:56');
INSERT INTO `notice` VALUES (75, 201625010417, 'xxii', 'wae', '2018-11-07 20:27:20', 1, '2018-11-07 20:27:20');
INSERT INTO `notice` VALUES (76, 201625010417, '学院要求', '应学校要求择优推荐院内两到三名优秀党员，现在请各副书记收集的申请成为优秀党员的名单和申请材料，&amp;nbsp;&amp;nbsp;&amp;nbsp;按模板填写党员信息。&amp;lt;br&amp;nbsp;/&amp;gt;届时可能会有学生工作处下属组织可能会对其进行预约采访。&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;lt;br&amp;nbsp;/&amp;gt;申请名单和申请材料于10月7号前发送到公邮jijidierdangzhibu@163.com', '2018-11-12 20:22:51', 0, '2018-11-12 20:22:51');
INSERT INTO `notice` VALUES (77, 201625010417, '改革开放四十周年', '祝贺！', '2018-11-16 12:35:34', 1, '2018-11-16 12:35:34');
INSERT INTO `notice` VALUES (78, 201625010417, '好好学习', '天天向上', '2018-11-16 17:15:37', 1, '2018-11-16 17:15:37');
INSERT INTO `notice` VALUES (80, 201625010605, '改革开放四十周年', '真好！', '2018-11-16 18:45:26', 1, '2018-11-16 18:45:26');
INSERT INTO `notice` VALUES (81, 201625010605, '【党日活动通知】', '我们支部将于本周日下午2点至5点开展党日活动，地点为东山口，同时召开一次党会，希望15、16级的党员和预备党员积极参加。若有特殊情况不能去者，请向副书记请假，谢谢！', '2018-11-18 18:54:13', 0, '2018-11-18 18:54:13');
INSERT INTO `notice` VALUES (82, 201625010605, '完善相关文件公告', '各位本学期转正的预备党员。请于明天（19号）10点填写好转正信息表格，并且发送到公邮jijidierdangzhibu@163.com中。实在没办法填写，就请同班同学帮忙填一下。表格存储在文件管理处，请自行寻找下载。', '2018-11-18 18:56:39', 0, '2018-11-18 18:56:39');
INSERT INTO `notice` VALUES (83, 201625010605, '关于报送“改革开放40年中国职业教育成就展”有关材料的通知', '关于报送“改革开放40年中国职业教育成就展”有关材料的通知各省、自治区、直辖市教育厅（教委），各计划单列市教育局，新疆生产建设兵团教育局：　　2018年职业教育活动周将于5月6-12日举办。近期，教育部拟联合中宣部等8个部门印发职业教育活动周通知。2018年职业教育活动周期间，将举办“改革开放40年中国职业教育成就展”。为做好展览筹备工作，现将各地材料报送有关要求通知如下。　　一、材料准备&amp;nbsp;　　1.时间范围：党的十八大以来职业教育改革发展成果。　　2.内容形式：本地区职业教育改革发展总结材料（概括性文字总结3000字以内。重点介绍亮点、创新点和重大制度及工作突破）；代表本地区职业教育师生风貌特色的图片和文字；体现重大改革发展成果的图片和文字；典型地区、学校和个人的专题片、宣传片等。　　二、报送要求　　1.请用图片格式传送（图片说明文字请附Word上，勿将图片插入Word），图片分辨率尽量在150dpi以上（越大越好，务必内容清晰完整）。　　2.以上材料经本地区教育行政部门负责人审核后，请于2018年3月28日前，以电子版形式统一报送至电子邮箱312479233@qq.com。　　三、联系方式&amp;nbsp;　　《职业技术教育》杂志社&amp;nbsp;刘&amp;nbsp;娇&amp;nbsp;0431-86908346　　教育部职业技术教育中心研究所&amp;nbsp;涂三广&amp;nbsp;010-58556731　　教育部职业教育与成人教育司&amp;nbsp;王珊珊&amp;nbsp;010-66096513教育部职业教育与成人教育司2018年3月20日', '2018-11-18 18:59:32', 0, '2018-11-18 18:59:32');
INSERT INTO `notice` VALUES (84, 201625010605, '关于积极参加全省高校纪念广东改革开放40周年党建书画摄影作品征集评选活动的通知', '全校师生：&amp;nbsp;　　　　　为贯彻习近平总书记重要讲话精神，坚定中国特色社会主义文化自信，全面展现改革开放40年来我省经济社会发生翻天覆地的变化，展现全省高校党建新成果，省委教育工委决定举办全省高校纪念广东改革开放40周年党建书画摄影作品征集评选活动（见附件）。现将我校参加该评选活动的相关事宜通知如下。　　一、组织机构　　本次书画摄影作品征集评选活动由中共广东省委教育工委主办。学校宣传部负责本校作品的征集评选报送。　　二、创作主题&amp;nbsp;　　不忘初心&amp;nbsp;牢记使命&amp;nbsp;深化改革&amp;nbsp;继续前行&amp;nbsp;&amp;nbsp;　　三、参加对象&amp;nbsp;　　全校师生。　　四、作品要求&amp;nbsp;&amp;nbsp;　（一）摄影参赛作品　　1.投稿作品必须紧扣主题，内容健康向上，角度新颖，富有感染力，具有高度的思想性和艺术性；作品形式、风格不限；投稿作品除对影调、色彩进行适度调整及构图剪裁外，不得对原始图像进行任何足以影响其真实性、准确性的改动。　　2.作品黑白彩色均可，规格为7英寸。　　3.每位作者提交的作品不超过2幅（组照按1幅计，一般组照不超过4幅，按排序用胶带连接）；每幅作品的背面需注明作品名称、作者姓名、作者单位、联系方式及拍摄地点。&amp;nbsp;&amp;nbsp;　　4.征集作品必须为近年来作者原创、未经正式发表，参加过各类摄影比赛并获得名次的作品不可参赛。&amp;nbsp;　　5.参赛作品著作权归作者所有，如涉及所有权、著作权或名誉权等纠纷问题，均由参赛者负责。凡提交的参赛作品，主办方有权在举办展览、相关宣传中使用，不再支付稿费。本次参赛不收取任何费用。&amp;nbsp;　　（二）书画参赛作品&amp;nbsp;　　1.以高校党建为主题。　　2.绘画作品：中国画、油画、水彩、版画、素描等。&amp;nbsp;　　3.书法作品：毛笔书法、篆刻作品，书体不限。除楷书外，&amp;nbsp;其他字体应标注释文，或注明内容出处。&amp;nbsp;&amp;nbsp;　　4.请在作品背面右下方用铅笔正楷注明：姓名、性别、单位、联系电话。&amp;nbsp;　　5.每位作者限投2件，作品不限形式，尺幅6尺以内（含）,&amp;nbsp;所有作品请勿装裱（册页除外）。&amp;nbsp;　　6.来稿请妥善封装，以免报送途中破损。　　7.免收报名、评审、出版等一切费用。　　8.凡投稿者，即视为其已同意本活动之所有规定。&amp;nbsp;　　五、奖项设置　　由省委教育工委邀请专家对各单位选送作品进行评选，拟评选出书画参展作品60幅、摄影参展作品60幅。　　1.摄影比赛共设置一等奖作品10幅、二等奖作品20幅、&amp;nbsp;三等奖作品30幅。　　2.书画比赛共设置一等奖作品10幅、二等奖作品20幅、&amp;nbsp;三等奖作品30幅。&amp;nbsp;&amp;nbsp;　　六、时间安排　　征稿截止时间：&amp;nbsp;2018年9月15日　　七、报送方式&amp;nbsp;　　报送作品均应为实物，无需提供电子版。作品如未能获奖，将实物退还。　　八、报送联系人　　　王敏&amp;nbsp;&amp;nbsp;电话：85280028&amp;nbsp;&amp;nbsp;地址：行政楼609室党委宣传部2018年6月22日', '2018-11-18 19:00:58', 1, '2018-11-18 19:00:58');
INSERT INTO `notice` VALUES (85, 201625010605, '本科生计算机科学与技术第二党支部支委委员选举会议', '兹定于2018年10月24日（本周三）下午在数学与信息学院217会议室召开本科生计算机科学与技术第二党支部支委委员选举会议，请全体党员同志提前安排好课务，准时参加，不得缺席！会议时间：2018年10月24日下午2∶30会议地点：数学与信息学院217参会人员：本科生计算机科学与技术第二党支部全体党员                          					本科生计算机科学与技术第二党支部', '2018-11-19 12:49:42', 0, '2018-11-19 12:49:42');
INSERT INTO `notice` VALUES (86, 201625010605, '党支部学习通知', '本科生计算机科学与技术第二党支部：   	按照学校党委中心组和党总支的学习精神，为迎接党的十九大胜利召开，请各党支部在10月18日前组织召开一次专题组织生活会，继续深入学习习近平总书记“7.26”重要讲话精神。   	请各党支部于10月18日前，将支部学习情况以图文短讯方式，OA发给刘利处。   	谢谢！', '2018-11-19 12:50:18', 0, '2018-11-19 12:50:18');
INSERT INTO `notice` VALUES (87, 201625010605, '嗯嗯', '你好', '2018-11-20 23:28:07', 1, '2018-11-20 23:28:07');
INSERT INTO `notice` VALUES (88, 201525010611, '未来规划', '1.&amp;nbsp;网站建设（不断持续）2.&amp;nbsp;民主生活会a）分享农讲所学习经验b）支部网站的使用和演示c）先进个人经验分享3.&amp;nbsp;支部联谊计划和信管党支部进行一次辩论赛4.&amp;nbsp;发展对象宣誓5.&amp;nbsp;通表大会', '2018-11-24 16:02:32', 0, '2018-11-24 16:02:32');
INSERT INTO `notice` VALUES (89, 201625010605, '填写相关材料通知', '于2018.11.23完成', '2018-11-24 17:59:43', 1, '2018-11-24 17:59:43');
INSERT INTO `notice` VALUES (90, 201625010605, '不错', '很好', '2018-11-28 20:03:45', 1, '2018-11-28 20:03:45');

-- ----------------------------
-- Table structure for signin
-- ----------------------------
DROP TABLE IF EXISTS `signin`;
CREATE TABLE `signin`  (
  `id` int(11) NOT NULL,
  `student_num` bigint(20) UNSIGNED NULL DEFAULT NULL COMMENT '学号',
  `date` date NULL DEFAULT NULL COMMENT '登录日期',
  `on_time` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '上线时间',
  `off_time` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '下线时间',
  `operate` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `singin_student_num`(`student_num`) USING BTREE,
  CONSTRAINT `singin_student_num` FOREIGN KEY (`student_num`) REFERENCES `user` (`student_num`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sysdiagrams
-- ----------------------------
DROP TABLE IF EXISTS `sysdiagrams`;
CREATE TABLE `sysdiagrams`  (
  `name` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `principal_id` int(11) NULL DEFAULT NULL,
  `diagram_id` int(11) NULL DEFAULT NULL,
  `version` int(11) NULL DEFAULT NULL,
  `definition` longblob NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `student_num` bigint(20) UNSIGNED NOT NULL COMMENT '学号',
  `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `grade` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '年级',
  `major` char(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '专业',
  `class_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '班级',
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(22) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号码',
  `party_branch_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '党支部名称',
  `role` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色',
  `join_party_time` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '入党时间',
  `identity` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '职位',
  `join_party_contact` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '入党联系人',
  `is_delete` tinyint(4) UNSIGNED NOT NULL DEFAULT 0 COMMENT '软删除，0代表未删除，1代表已删除',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '记录创建时间',
  PRIMARY KEY (`student_num`) USING BTREE,
  INDEX `StuNumber`(`student_num`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (111, '202cb962ac59075b964b07152d234b70', 'da', '2014级', '123', '123', NULL, NULL, '本科生计算机科学与技术第二党支部', '支委', '2018-11-07', '中共党员', '5656', 1, '2018-11-06 11:21:59');
INSERT INTO `user` VALUES (123, '4a7d1ed414474e4033ac29ccb8653d9b', 'ad', '2014级', 'as', 'as', NULL, NULL, '本科生计算机科学与技术第二党支部', '支委', '2018-11-06', '中共党员', 'as', 1, '2018-11-06 11:14:36');
INSERT INTO `user` VALUES (2016, '7815696ecbf1c96e6894b779456d330e', '111', '2014级', 'sss', 'aaa', NULL, NULL, '本科生计算机科学与技术第二党支部', '支委', '2018-11-06', '中共党员', 'asd', 1, '2018-11-06 11:27:00');
INSERT INTO `user` VALUES (201525010611, 'ad334bb2b0caeda0e4de7228bcd6f6b3', '梁晓健', '2015级', '计算机科学与技术', '6班', '724701156@qq.com', '', '本科生计算机科学与技术第二党支部', '支委', '2017-05-29', '中共党员', '陈碧霞', 0, '2018-11-24 15:42:41');
INSERT INTO `user` VALUES (201622060209, 'e9d2ce0d9d1f7de01e14eb7bc1caf3b9', '奥利奥', '2016级', '计算机科学与技术', '5班', NULL, NULL, '本科生计算机科学与技术第二党支部', '支委', '/Date(1512230400000)/', '预备党员', '杨烨、张秋宏', 1, '2018-10-25 23:11:05');
INSERT INTO `user` VALUES (201625010417, 'e10adc3949ba59abbe56e057f20f883e', '林晓乙', '2016级', '计算机科学与技术', '4班', '1192161354@qq.com', '1581332079', '本科学计算机科学与技术第二党支部', '支委', '2018-05', '预备党员', '吴俊炫', 0, '2018-10-22 20:04:37');
INSERT INTO `user` VALUES (201625010418, 'e10adc3949ba59abbe56e057f20f883e', '郑楷航', '2016级', '计算机科学与技术', '4班', '@163.com', NULL, '本科学计算机科学与技术第二党支部', '无', '2018-05', '预备党员', '吴俊炫', 1, '2018-10-22 19:58:59');
INSERT INTO `user` VALUES (201625010517, '60ccd43f064c0615c159c772e18bcb23', '胖子', '2014级', '计算机科学与技术', '5班', NULL, NULL, '本科生计算机科学与技术第二党支部', '支委', '2018-11-08', '中共党员', '瘦子', 1, '2018-10-23 19:28:10');
INSERT INTO `user` VALUES (201625010520, 'e10adc3949ba59abbe56e057f20f883e', '胖子啊', '2016级', '计算机科学与技术', '4班', NULL, NULL, '本科学计算机科学与技术第二党支部', '无', '2018-05', '支委', '吴俊炫', 1, '2018-10-27 15:06:08');
INSERT INTO `user` VALUES (201625010521, '670b14728ad9902aecba32e22fa4f6bd', '甄韬', '2016级', '计算机科学与技术', '5班', NULL, NULL, '本科生计算机科学与技术第二党支部', '成员', '2018-06-09', '预备党员', '杨烨', 1, '2018-11-22 09:57:17');
INSERT INTO `user` VALUES (201625010524, '000000', '甄韬', '2016级', '计算机科学与技术', '5班', '', '17819570720', '本科生计算机科学与技术第二党支部', '支委', '2018-06-09', '中共党员', '杨烨', 0, '2018-10-25 01:45:27');
INSERT INTO `user` VALUES (201625010525, '96e79218965eb72c92a549dd5a330112', '郑楷航', '2016', '计算机科学与技术', '计机5', NULL, NULL, '计机第二党支部', '支委', '2018-05-04', '预备', '杨烨', 0, '2018-10-23 21:03:41');
INSERT INTO `user` VALUES (201625010599, '96e79218965eb72c92a549dd5a330112', '郑楷航', '2016', '计算机科学与技术', '计机5', NULL, NULL, '计机第二党支部', '支委', '2018-05-04', '预备', '杨烨', 1, '2018-11-22 13:51:17');
INSERT INTO `user` VALUES (201625010605, '670b14728ad9902aecba32e22fa4f6bd', '郭婉怡', '2016级', '计算机科学与技术', '6班', '291785462@qq.com', '17819570720', '本科生计算机科学与技术第二党支部', '支委', '2017-11-22', '中共党员', '黄嘉明', 0, '2018-11-06 11:30:34');
INSERT INTO `user` VALUES (201625010717, 'e10adc3949ba59abbe56e057f20f883e', '凌昊', '2016级', '计算机科学与技术', '5班', NULL, NULL, '本科学计算机科学与技术第二党支部', '支委', '2018-05', '预备党员', '杨烨', 1, '2018-10-25 22:31:40');

-- ----------------------------
-- Table structure for video
-- ----------------------------
DROP TABLE IF EXISTS `video`;
CREATE TABLE `video`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `student_num` bigint(20) UNSIGNED NULL DEFAULT NULL COMMENT '学号',
  `video_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '视频名称',
  `web_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '视频web获取路径',
  `real_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '视频本地保存路径',
  `upload_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '视频上传时间',
  `is_delete` tinyint(4) UNSIGNED NOT NULL DEFAULT 0 COMMENT '软删除，0代表未删除，1代表已删除',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '记录创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `video_student_num`(`student_num`) USING BTREE,
  CONSTRAINT `video_student_num` FOREIGN KEY (`student_num`) REFERENCES `user` (`student_num`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 41 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of video
-- ----------------------------
INSERT INTO `video` VALUES (1, 201625010417, '池弘舜女装', 'testing_HeAria', NULL, '2018-10-24 21:36:57', 1, '2018-10-24 21:36:57');
INSERT INTO `video` VALUES (2, 201625010417, 'outPutTest.txt', '/dzbweb/videos2018-10-25outPutTest.txt', 'D:\\4869\\Personal\\(170923)JAVA\\(181023)DebugForDZB\\DZB_WEB\\target\\Scau-Circle-Server\\videos2018-10-25', '2018-10-25 00:32:19', 1, '2018-10-25 00:32:19');
INSERT INTO `video` VALUES (3, 201625010417, '池弘舜你快点去女装啦！.txt', '/dzbweb/videos/2018-10-25池弘舜你快点去女装啦！.txt', 'D:\\4869\\Personal\\(170923)JAVA\\(181023)DebugForDZB\\DZB_WEB\\target\\Scau-Circle-Server\\videos2018-10-25', '2018-10-25 00:49:51', 1, '2018-10-25 00:49:51');
INSERT INTO `video` VALUES (4, 201625010417, '删库测试.txt', '/dzbweb/videos/2018-10-25删库测试.txt', 'D:\\4869\\Personal\\(170923)JAVA\\(181023)DebugForDZB\\DZB_WEB\\target\\Scau-Circle-Server\\videos/2018-10-25', '2018-10-25 00:57:36', 1, '2018-10-25 00:57:36');
INSERT INTO `video` VALUES (5, 201625010417, 'Leon女装.txt', '/dzbweb/videos/2018-10-25Leon女装.txt', 'D:\\4869\\Personal\\(170923)JAVA\\(181023)DebugForDZB\\DZB_WEB\\target\\Scau-Circle-Server\\videos/2018-10-25', '2018-10-25 00:59:04', 1, '2018-10-25 00:59:04');
INSERT INTO `video` VALUES (6, 201625010417, '朱展标傻逼.txt', '/dzbweb/videos/2018-10-25朱展标傻逼.txt', 'D:\\4869\\Personal\\(170923)JAVA\\(181023)DebugForDZB\\DZB_WEB\\target\\Scau-Circle-Server\\videos/2018-10-25', '2018-10-25 01:02:39', 1, '2018-10-25 01:02:39');
INSERT INTO `video` VALUES (7, 201625010417, '学号测试.txt', '/dzbweb/videos/2018-10-25学号测试.txt', 'D:\\4869\\Personal\\(170923)JAVA\\(181023)DebugForDZB\\DZB_WEB\\target\\Scau-Circle-Server\\videos/2018-10-25', '2018-10-25 23:17:34', 1, '2018-10-25 23:17:34');
INSERT INTO `video` VALUES (8, 201625010417, '学号测试_刚才并没有录进去.txt', '/dzbweb/videos/2018-10-25学号测试_刚才并没有录进去.txt', 'D:\\4869\\Personal\\(170923)JAVA\\(181023)DebugForDZB\\DZB_WEB\\target\\Scau-Circle-Server\\videos/2018-10-25', '2018-10-25 23:22:45', 1, '2018-10-25 23:22:45');
INSERT INTO `video` VALUES (9, 201625010417, '学号测试_再试一次.txt', '/dzbweb/videos/2018-10-25学号测试_再试一次.txt', 'D:\\4869\\Personal\\(170923)JAVA\\(181023)DebugForDZB\\DZB_WEB\\target\\Scau-Circle-Server\\videos/2018-10-25', '2018-10-25 23:44:04', 1, '2018-10-25 23:44:04');
INSERT INTO `video` VALUES (10, 201622060209, '学号测试_能成功！.txt', '/dzbweb/videos/2018-10-25学号测试_能成功！.txt', 'D:\\4869\\Personal\\(170923)JAVA\\(181023)DebugForDZB\\DZB_WEB\\target\\Scau-Circle-Server\\videos/2018-10-25', '2018-10-25 23:52:20', 1, '2018-10-25 23:52:20');
INSERT INTO `video` VALUES (11, 201625010417, '选区_059.png', '/dzbweb/videos/2018-10-27选区_059.png', '/var/java/projects/DZB_WEB/target/Scau-Circle-Server/videos/2018-10-27', '2018-10-27 16:10:39', 1, '2018-10-27 16:10:39');
INSERT INTO `video` VALUES (12, 201625010417, '选区_059.png', '/dzbweb/videos/2018-10-27/选区_059.png', '/var/java/projects/DZB_WEB/target/Scau-Circle-Server/videos/2018-10-27', '2018-10-27 16:20:50', 1, '2018-10-27 16:20:50');
INSERT INTO `video` VALUES (13, 201625010417, '选区_059.png', '/dzbweb/videos/2018-10-27/选区_059.png', '/var/java/projects/DZB_WEB/target/DZB_WEB/videos/2018-10-27', '2018-10-27 16:47:15', 1, '2018-10-27 16:47:15');
INSERT INTO `video` VALUES (14, 201625010605, 'test.flv', '/videos/2018-11-13\\test.flv', 'D:\\DZB_WEB\\target\\DZB_WEB\\videos/2018-11-13', '2018-11-13 14:00:17', 1, '2018-11-13 14:00:17');
INSERT INTO `video` VALUES (15, 201625010605, 'douyin.mp4', '/videos/2018-11-13\\douyin.mp4', 'D:\\DZB_WEB\\target\\DZB_WEB\\videos/2018-11-13', '2018-11-13 21:31:51', 1, '2018-11-13 21:31:51');
INSERT INTO `video` VALUES (16, 201625010605, '了解改革开放40周年那些事！.qsv', '/videos/2018-11-18\\了解改革开放40周年那些事！.qsv', 'D:\\DZB_WEB\\target\\DZB_WEB\\videos/2018-11-18', '2018-11-18 18:08:24', 1, '2018-11-18 18:08:24');
INSERT INTO `video` VALUES (17, 201625010605, '关于改革开放40周年.mp4', '/videos/2018-11-18\\关于改革开放40周年.mp4', 'D:\\DZB_WEB\\target\\DZB_WEB\\videos/2018-11-18', '2018-11-18 18:10:12', 1, '2018-11-18 18:10:12');
INSERT INTO `video` VALUES (18, 201625010605, '改革开放讲话.mp4', '/videos/2018-11-18\\改革开放讲话.mp4', 'D:\\DZB_WEB\\target\\DZB_WEB\\videos/2018-11-18', '2018-11-18 18:17:58', 1, '2018-11-18 18:17:58');
INSERT INTO `video` VALUES (19, 201625010605, '改革开放.mp4', '/videos/2018-11-18\\改革开放.mp4', 'D:\\DZB_WEB\\target\\DZB_WEB\\videos/2018-11-18', '2018-11-18 19:09:44', 1, '2018-11-18 19:09:44');
INSERT INTO `video` VALUES (20, 201625010605, '改革开放.mp4', '/videos/2018-11-19\\改革开放.mp4', 'D:\\DZB_WEB\\target\\DZB_WEB\\videos/2018-11-19', '2018-11-19 12:45:03', 1, '2018-11-19 12:45:03');
INSERT INTO `video` VALUES (21, 201625010605, '书写新章.mp4', '/videos/2018-11-19\\书写新章.mp4', 'D:\\DZB_WEB\\target\\DZB_WEB\\videos/2018-11-19', '2018-11-19 12:46:59', 1, '2018-11-19 12:46:59');
INSERT INTO `video` VALUES (22, 201625010605, '改革开放40年.mp4', '/videos/2018-11-19\\改革开放40年.mp4', 'D:\\DZB_WEB\\target\\DZB_WEB\\videos/2018-11-19', '2018-11-19 12:47:12', 1, '2018-11-19 12:47:12');
INSERT INTO `video` VALUES (23, 201625010605, '中国能-中国制造献礼改革开放40周年短视频.mp4', '/videos/2018-11-19\\中国能-中国制造献礼改革开放40周年短视频.mp4', 'D:\\DZB_WEB\\target\\DZB_WEB\\videos/2018-11-19', '2018-11-19 12:51:41', 1, '2018-11-19 12:51:41');
INSERT INTO `video` VALUES (24, 201625010605, '厉害了我的国：改革开放40年.mp4', '/videos/2018-11-19\\厉害了我的国：改革开放40年.mp4', 'D:\\DZB_WEB\\target\\DZB_WEB\\videos/2018-11-19', '2018-11-19 12:51:55', 1, '2018-11-19 12:51:55');
INSERT INTO `video` VALUES (25, 201625010605, '改革开放讲话.mp4', '/videos/2018-11-21/改革开放讲话.mp4', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/videos/2018-11-21', '2018-11-21 11:01:41', 1, '2018-11-21 11:01:41');
INSERT INTO `video` VALUES (26, 201625010605, '改革开放.mp4', '/videos/2018-11-21/改革开放.mp4', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/videos/2018-11-21', '2018-11-21 11:10:57', 1, '2018-11-21 11:10:57');
INSERT INTO `video` VALUES (27, 201625010605, '改革开放40年.mp4', '/videos/2018-11-21/改革开放40年.mp4', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/videos/2018-11-21', '2018-11-21 11:15:03', 1, '2018-11-21 11:15:03');
INSERT INTO `video` VALUES (28, 201625010605, '关于改革开放40周年.mp4', '/videos/2018-11-21/关于改革开放40周年.mp4', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/videos/2018-11-21', '2018-11-21 11:20:24', 1, '2018-11-21 11:20:24');
INSERT INTO `video` VALUES (29, 201625010605, '厉害了我的国：改革开放40年.mp4', '/videos/2018-11-21/厉害了我的国：改革开放40年.mp4', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/videos/2018-11-21', '2018-11-21 11:22:20', 1, '2018-11-21 11:22:20');
INSERT INTO `video` VALUES (30, 201625010605, '书写新章.mp4', '/videos/2018-11-21/书写新章.mp4', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/videos/2018-11-21', '2018-11-21 11:24:01', 1, '2018-11-21 11:24:01');
INSERT INTO `video` VALUES (31, 201625010605, '中国能-中国制造献礼改革开放40周年短视频.mp4', '/videos/2018-11-21/中国能-中国制造献礼改革开放40周年短视频.mp4', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/videos/2018-11-21', '2018-11-21 11:25:27', 1, '2018-11-21 11:25:27');
INSERT INTO `video` VALUES (32, 201625010605, '改革开放四十周年.mp4', '/videos/2018-11-24\\改革开放四十周年.mp4', 'C:\\Users\\HP\\Desktop\\eclipse老师版\\apache-tomcat-9.0.6\\webapps\\ROOT\\videos/2018-11-24', '2018-11-24 18:06:53', 1, '2018-11-24 18:06:53');
INSERT INTO `video` VALUES (33, 201625010605, '改革开放.mp4', '/videos/2018-11-28/改革开放.mp4', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/videos/2018-11-28', '2018-11-28 20:06:40', 0, '2018-11-28 20:06:40');
INSERT INTO `video` VALUES (34, 201625010605, '改革开放讲话.mp4', '/videos/2018-11-28/改革开放讲话.mp4', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/videos/2018-11-28', '2018-11-28 20:09:01', 0, '2018-11-28 20:09:01');
INSERT INTO `video` VALUES (35, 201625010605, '关于改革开放40周年.mp4', '/videos/2018-11-28/关于改革开放40周年.mp4', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/videos/2018-11-28', '2018-11-28 20:10:10', 0, '2018-11-28 20:10:10');
INSERT INTO `video` VALUES (36, 201625010605, '改革开放.mp4', '/videos/2018-11-28/改革开放.mp4', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/videos/2018-11-28', '2018-11-28 20:11:09', 0, '2018-11-28 20:11:09');
INSERT INTO `video` VALUES (37, 201625010605, '改革开放40年.mp4', '/videos/2018-11-28/改革开放40年.mp4', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/videos/2018-11-28', '2018-11-28 20:11:33', 0, '2018-11-28 20:11:33');
INSERT INTO `video` VALUES (38, 201625010605, '厉害了我的国：改革开放40年.mp4', '/videos/2018-11-28/厉害了我的国：改革开放40年.mp4', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/videos/2018-11-28', '2018-11-28 20:14:19', 0, '2018-11-28 20:14:19');
INSERT INTO `video` VALUES (39, 201625010605, '书写新章.mp4', '/videos/2018-11-28/书写新章.mp4', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/videos/2018-11-28', '2018-11-28 20:15:43', 0, '2018-11-28 20:15:43');
INSERT INTO `video` VALUES (40, 201625010605, '中国能-中国制造献礼改革开放40周年短视频.mp4', '/videos/2018-11-28/中国能-中国制造献礼改革开放40周年短视频.mp4', '/usr/develop/tomcat/apache-tomcat-9.0.8/webapps/DZB_WEB/videos/2018-11-28', '2018-11-28 20:18:55', 0, '2018-11-28 20:18:55');

SET FOREIGN_KEY_CHECKS = 1;
