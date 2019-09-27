[TOC]

** 项目名：党支部内部管理系统 **

** 项目接口域名：待出 **

** 接口规范说明: **
- 接口协议必须支持http、https、ws（websocket）协议其中一种；
- 接口域名请根据具体情况修改；
- 接口URL原则上不能支持超过5层，除非通过URL传参数；
- 接口提交参数如不做特别说明，均以JSON的方式提交数据，以JSON的格式返回结果。
  返回结果标准代码库
- 参数定义规范：参数定义应全部用驼峰法，如：`userName`，不能用`username`或者`user_name`
- 符号说明：
  `url`:			请求地址
  `description`:		接口描述
  `method`:		http请求方式
  `login`:		该请求是否需要登录
  `argument`:		请求携带参数
  `key`:			参数名
  `isrequired`:		参数是否必须
  `type`:			参数类型
  `illustration`：		参数说明
  `response`:		请求成功数据返回格式
  `GET`url中的`{value}`表示参数值
  
- 支委拥有所有权限，成员只有个人信息和文件下载的权限
![](https://www.showdoc.cc/server/api/common/visitfile/sign/e40b7131116d1080cddec1d3cbbbb178?showdoc=.jpg)
注意判断角色是`支委` 还是 `成员`，对应数据库字段为role

** API说明: **

[TOC]

##### 用户登录注册
###### 用户注册
- **url：** `/api/user/register `
- **description：**用户注册信息提交接口  
- **mothod：** POST 
- **login：** false
- **request_argument：** 

|key|isrequired|type|illustration|
|:----    |:---|:----- |-----   |
|name |是  |string |成员姓名   |
|studentNum |是  |long |学号   |
|password |是  |string |密码   |
|rpassword |是  |string |重复密码   |
|grade |是  |string |年级   |
|major |是  |string |专业   |
|className |是  |string |班级   |
|joinPartyTime |是  |date | 入党时间  |
|identity |是  |string | 身份  |
|partyBranchName |是  |string |党支部   |
|role |是  |string |职位   |
|joinPartyContact |是  |string |入党联系人姓名   |

- **response(success):**

``` 
  {
    "code": 200,
	"message":"成功"
  }
```

 **备注** 

- 更多返回错误代码请看首页的错误代码描述

###### 用户登录
- **url：** `/api/user/login`
- **description：**用户登录信息提交接口  
- **mothod：** POST 
- **login：** false
- **request_argument：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|studentNum |是  |long |学号   |
|password |是  |string | 密码    |
|verificationCode     |是  |string | 验证码    |

- **response(success):**
``` 
  {
    "code": 200,
    "message": "登录成功"
  }
```

 **备注** 

- 更多返回错误代码请看首页的错误代码描述


###### 获取验证码
- **url：** `/api/user/verification_code`
- **description：**用户获取验证码接口  
- **mothod：** GET 
- **login：** false

 **备注** 
直接返回图片
- 更多返回错误代码请看首页的错误代码描述

###### 用户找回密码提交账号
- **url：** `/api/user/send_mail_code`
- **description：**用户找回密码提交账号接口  
- **mothod：** POST 
- **login：** false
- **request_argument：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|studentNum |是  |string |账号，即学号   |
|code |是  |string | 验证码    |

- **response(error):**

``` 
  {
    "code": 10000,
    "message": "验证码错误"
  }
```

 **返回参数说明** 

|参数名|类型|说明|
|:-----  |:-----|-----                           |
|code |int   |操作结果代码，在这里200表示成功，10000表示验证码错误，具体看错误带密码表|

 **备注** 
错误代码一定要跟错误代码表一致
- 更多返回错误代码请看首页的错误代码描述

###### 用户找回密码提交邮箱验证码
- **url：** `/api/user/check_mail_code`
- **description：**用户找回密码提交邮箱验证码接口  
- **mothod：** POST 
- **login：** false
- **request_argument：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|mailCode |是  |string |验证码   |

- **response(success):**

``` 
  {
    "code": 10000,
    "message": "验证码错误"
  }
```

 **返回参数说明** 

|参数名|类型|说明|
|:-----  |:-----|-----                           |
|code |int   |操作结果代码，在这里200表示成功，10000表示验证码错误，具体看错误带代码表|

 **备注** 
错误代码一定要跟错误代码表一致
- 更多返回错误代码请看首页的错误代码描述

###### 用户重置密码
- **url：** `/api/user/reset_password`
- **description：**用户重置密码提交接口  
- **mothod：** POST 
- **login：** false
- **request_argument：**
|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|password |是  |string |密码   |
|rpassword |是  |string |重复密码   |

- **response(success):**

``` 
  {
    "code": 200,
    "message": "密码修改成功"
  }
```

 **备注** 
- 更多返回错误代码请看首页的错误代码描述

- 用户找回密码重置密码提交接口

**请求URL：** 
- `/api/user/reset_password`
  
**请求方式：**
- POST 
- **request_argument：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|password |是  |string |密码   |
|rpassword |是  |string |重复密码   |

- **response(success):**
``` 
  {
    "code": 200,
    "message": "密码修改成功"
  }
```

 **备注** 
- 更多返回错误代码请看首页的错误代码描述

##### 用户个人信息
###### 获取个人信息
- **url：** `/api/person/info`
- **description：**获取个人信息接口  
- **mothod：** GET
- **login：** true
- **response(success):**

``` 
  {
    "code": 200,
    "message": "个人信息获取成功",
	"data":{
		"studentNum": "201625010418",
		"password": "123456",
		"name": "林",
		"grade": "2016级",
		"major": "计算机科学与技术                      ",
		"className": "4班",
		"email": null,
		"phone": null,
		"partyBranchName": "本科生计算机科学与技术第二党支部",
		"role": "支委",
		"joinPartyTime": "/Date(1512230400000)/",
		"identity": "预备党员",
		"joinPartyContact": "黄嘉明"
	}
  }
```

 **备注** 
- 更多返回错误代码请看首页的错误代码描述

###### 保存修改个人信息
- **url：** `/api/person/save`
- **description：**保存修改个人信息提交接口  
- **mothod：** POST 
- **login：** true

 **参数示例**
``` 
  {
	  "studentNum": "201625010418",
	  "password": "123456",
	  "name": "林",
	  "grade": "2016级",
	  "major": "计算机科学与技术                      ",
	  "className": "4班",
	  "email": null,
	  "phone": null,
	  "partyBranchName": "本科生计算机科学与技术第二党支部",
	  "role": "支委",
	  "joinPartyTime": "/Date(1512230400000)/",
	  "identity": "预备党员",
	  "joinPartyContact": "黄嘉明"
  }
```
- **response(success):**
``` 
  {
    "code": 200,
    "message": "保存成功"
  }
```
 **备注** 
 这个借口可以用于用户管理时修改用户信息的接口
- 更多返回错误代码请看首页的错误代码描述
##### 用户管理
###### 获取用户信息数组
- **url：** `/api/usermanage/userlist `
- **description：**  获取用户的简略信息数组接口
- **mothod：** GET 
- **login：** true

- **response(success):**

``` 
  {
    "code": 200,
	"message":"成功",
    "data": {
      "userlist": [
			{
			"name": "林晓乙",
			"studentNum": "201625010417",
			"joinPartyTime": "/Date(1488729600000)/",
			"identity": "预备党员"
			},
			{
				"name": "杨烨",
				"studentNum": "201525010626",
				"joinPartyTime": "/Date(1507219200000)/",
				"identity": "预备党员"
			},
			......
	  ]
    }
  }
```

 **备注** 

- 更多返回错误代码请看首页的错误代码描述
###### 根据学号获取用户详细信息
- **url：** `/api/usermanage/detailinfo/{studentNum}`
- **description：**  根据学号获取用户详细信息接口
- **mothod：** GET 
- **login：** true
- **request_argument：**

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|studentNum |是  |long |学号   |
- **response(success):**

``` 
  {
    "code": 200,
	"message":"成功",
    "data": {
		"user":{
			"studentNum": "201625010418",
			"password": "123456",
			"name": "林",
			"grade": "2016级",
			"major": "计算机科学与技术                      ",
			"className": "4班",
			"email": null,
			"phone": null,
			"partyBranchName": "本科生计算机科学与技术第二党支部",
			"role": "支委",
			"joinPartyTime": "/Date(1512230400000)/",
			"identity": "预备党员",
			"joinPartyContact": "黄嘉明"
		}
    }
  }
```

 **备注** 

- 更多返回错误代码请看首页的错误代码描述

###### 删除用户信息
- **url：** ` /api/usermanage/delete `
- **description：**  删除用户接口
- **mothod：** DELETE 
- **login：** true

- **response(success):**

```
  {
    "code": 200,
	"message":"成功"
  }
```
 **备注**
- 更多返回错误代码请看首页的错误代码描述

##### 公告管理
###### 获取公告信息数组
- **url：** `/api/notice/noticelist `
- **description：**  获取公告信息数组接口
- **mothod：** GET 
- **login：** true

- **response(success):**

``` 
  {
    "code": 200,
	"message":"成功",
    	"data":{
		noticelist:[
			 {
			"id": 58,
			"studentName": "张秋宏",
			"noticeTitle": "额一个人听歌热",
			"noticeContent": "河南的增幅环比跌幅逐步地方<br /&一件衣服和技能<br /&                合格的他还有个特点和对方",
			"pubTime": "/Date(1511276232337)/"
			},
			{
			"id": 54,
			"studentName": "张秋宏",
			"noticeTitle": "党支部第八次公告",
			"noticeContent": "大苏打大苏打大概豆腐干豆腐干地方<br /&<p style="font-size:medium;text-align:center;font-family:微软雅黑, serif;color:#333333;background-color:#FFFFFF;text-indent:28pt;"&\t<span style="font-family:仿宋_GB2312;font-size:12px;"&先进集体和优秀个人。经学院党委初审，拟推荐以下集体和个人为本次评优推荐对象，现予以公示。</span&</p&<p style="font-size:medium;text-align:center;font-family:微软雅黑, serif;color:#333333;background-color:#FFFFFF;text-indent:28pt;"&\t<span style="font-family:仿宋_GB2312;font-size:12px;"&先进党支部：数学第二教工党支部、本科生计算机科学与技术第一党支部、研究生管理科学与工程党支部</span&</p&",
			"pubTime": "/Date(1511274350600)/"
			},
			......
		]
	}
  }
```
 **备注** 

- 更多返回错误代码请看首页的错误代码描述

###### 发布公告
- **url：** ` /api/notice/create`
- **description：**  发布公告信息提交接口
- **mothod：** POST 
- **login：** true
- **request_argument：** 
``` 
  {
    "noticeTitle": "党支部第八次公告",
	"noticeContent":"大苏打大苏打大概豆腐干豆腐干地方<br /&<p style="font-size:medium;text-align:center;font-family:微软雅黑, serif;color:#333333;background-color:#FFFFFF;text-indent:28pt;"&\t<span style="font-family:仿宋_GB2312;font-size:12px;"&先进集体和优秀个人。经学院党委初审，拟推荐以下集体和个人为本次评优推荐对象，现予以公示。</span&</p&<p style="font-size:medium;text-align:center;font-family:微软雅黑, serif;color:#333333;background-color:#FFFFFF;text-indent:28pt;"&\t<span style="font-family:仿宋_GB2312;font-size:12px;"&先进党支部：数学第二教工党支部、本科生计算机科学与技术第一党支部、研究生管理科学与工程党支部</span&</p&"
  }
```
- **response(success):**

``` 
  {
    "code": 200,
	"message":"成功"
  }
```

 **备注** 

- 更多返回错误代码请看首页的错误代码描述

###### 修改公告
- **url：** ` /api/notice/update`
- **description：**  发布修改公告信息提交接口
- **mothod：** POST 
- **login：** true
- **request_argument：** 
``` 
  {
  	"id":3,
    "title": "党支部第八次公告",
	"content":"大苏打大苏打大概豆腐干豆腐干地方<br /&<p style="font-size:medium;text-align:center;font-family:微软雅黑, serif;color:#333333;background-color:#FFFFFF;text-indent:28pt;"&\t<span style="font-family:仿宋_GB2312;font-size:12px;"&先进集体和优秀个人。经学院党委初审，拟推荐以下集体和个人为本次评优推荐对象，现予以公示。</span&</p&<p style="font-size:medium;text-align:center;font-family:微软雅黑, serif;color:#333333;background-color:#FFFFFF;text-indent:28pt;"&\t<span style="font-family:仿宋_GB2312;font-size:12px;"&先进党支部：数学第二教工党支部、本科生计算机科学与技术第一党支部、研究生管理科学与工程党支部</span&</p&"
  }
```
- **response(success):**

``` 
  {
    "code": 200,
	"message":"成功"
  }
```

 **备注** 

- 更多返回错误代码请看首页的错误代码描述

###### 删除公告
- **url：** ` /api/notice/delete `
- **description：**  用户注册接口
- **mothod：** DELETE 
- **login：** true
- **request_argument：** 

|key|isrequired|type|illustration|
|:----    |:---|:----- |-----   |
|noticeId |是  |int |公告id   |

- **response(success):**

``` 
  {
    "code": 200,
	"message":"成功"
  }
```
 **备注** 

- 更多返回错误代码请看首页的错误代码描述

##### 文件管理
###### 获取文件信息数组
- **url：** `/api/file/filelist `
- **description：**  获取文件信息数组接口
- **mothod：** GET 
- **login：** true
- **response(success):**

``` 
  {
    "code": 200,
	"message":"成功",
    "data":{
		filelist:[
			 {
				"id": 40,
				"studentNum": "201430320429",
				"uploadTime": "/Date(1509259717297)/",
				"fileName": "rrrrr.txt",
				"webPath": "/files/2018-09-25/",
				"downloadTimes": 2,
				"noticeId": null,
				"userInfo": null,
				"newsId": null
			},
			{
				"id": 35,
				"studentNum": "201430320429",
				"uploadTime": "/Date(1509251513447)/",
				"fileName": "sdasdad (1).txt",
				"webPath": "C:\\Users\\hjmm\\桌面\\党支部\\新建文件夹\\DZBWeb\\File",
				"downloadTimes": 2,
				"noticeIDd": null,
				"userInfo": null,
				"newsId": null,
			},
			......
		]
	}
  }
```
 **备注** 

- 更多返回错误代码请看首页的错误代码描述

###### 上传文件
- **url：** ` /api/file/upload`
- **description：**  发布公告信息提交接口
- **mothod：** POST 
- **login：** true
- **response(success):**

``` 
  {
    "code": 200,
	"message":"成功"
  }
```

 **备注** 

- 更多返回错误代码请看首页的错误代码描述

###### 下载文件
- **url：** ` /api/file/download?fileId=`
- **description：**  发布修改公告信息提交接口
- **mothod：** GET
- **login：** true

- **response(success):**
```
  {
    "code": 200,
	"message":"成功",
	"data":
  }
```

 **备注** 文件上传下载自己摸索下，具体格式自己定

- 更多返回错误代码请看首页的错误代码描述

###### 删除文件
- **url：** ` /api/file/delete `
- **description：**  删除文件接口
- **mothod：** DELETE
- **login：** true
- **request_argument：**

|key|isrequired|type|illustration|
|:----    |:---|:----- |-----   |
|fileId |是  |int |文件id   |

- **response(success):**

```
  {
    "code": 200,
	"message":"成功"
  }
```
 **备注**

- 更多返回错误代码请看首页的错误代码描述

##### 新闻管理
###### 获取新闻简略信息数组
- **url：** `/api/news/newslist `
- **description：**  获取新闻简略信息数组接口
- **mothod：** GET 
- **login：** true
- **response(success):**
``` 
  {
    "code": 200,
	"message":"成功",
    "data":{
		newslist:[
			  "newslist" : [ {
				  "id" : 44,
				  "studentNum" : 0,
				  "newsTitle" : "党支部网站文档",
				  "newsType" : "校外新闻",
				  "newsContent" : "https://www.showdoc.cc/pinnuli?page_id=926812077729173#%E8%A7%86%E9%A2%91%E7%AE%A1%E7%90%86",
				  "newsLink" : "www.baidu.com",
				  "pubTime" : "2018-11-14 10:06:33",
				  "putTime" : "2018-11-14 10:06:33"
				},
				{
				  "id" : 43,
				  "studentNum" : 0,
				  "newsTitle" : "百度",
				  "newsType" : "校内新闻",
				  "newsContent" : "https://www.baidu.com/",
				  "newsLink" : "www.baidu.com",
				  "pubTime" : "2018-11-14 09:59:17",
				  "putTime" : "2018-11-14 09:59:17"
				},
			......
		]
	}
  }
```
 **备注** 

- 更多返回错误代码请看首页的错误代码描述

###### 发布新闻
- **url：** ` /api/news/create`
- **description：**  发布新闻信息提交接口
- **mothod：** POST
- **login：** true
- **request_argument：** 
``` 
  {
    "newsTitle": "党支部第八次公告",
	"newsContent":"大苏打大苏打大概豆腐干豆腐干地方<br /&<p style="font-size:medium;text-align:center;font-family:微软雅黑, serif;color:#333333;background-color:#FFFFFF;text-indent:28pt;"&\t<span style="font-family:仿宋_GB2312;font-size:12px;"&先进集体和优秀个人。经学院党委初审，拟推荐以下集体和个人为本次评优推荐对象，现予以公示。</span&</p&<p style="font-size:medium;text-align:center;font-family:微软雅黑, serif;color:#333333;background-color:#FFFFFF;text-indent:28pt;"&\t<span style="font-family:仿宋_GB2312;font-size:12px;"&先进党支部：数学第二教工党支部、本科生计算机科学与技术第一党支部、研究生管理科学与工程党支部</span&</p&",
	"newsType":"十九大"
  }
```

``` 
  {
    "newsTitle": "党支部第八次公告",
	"newsLink":"www.baidu.com",
	"newsType":"校内新闻"
  }
```
- **response(success):**

``` 
  {
    "code": 200,
	"message":"成功"
  }
```

 **备注** 

- 更多返回错误代码请看首页的错误代码描述

###### 删除新闻
- **url：** ` /api/news/delete `
- **description：**  删除文件接口
- **mothod：** DELETE 
- **login：** true
- **request_argument：** 

|key|isrequired|type|illustration|
|:----    |:---|:----- |-----   |
|newsId |是  |int |新闻id   |

- **response(success):**

``` 
  {
    "code": 200,
	"message":"成功"
  }
```
 **备注** 

- 更多返回错误代码请看首页的错误代码描述

##### 视频管理
###### 获取视频简略信息数组
- **url：** `/api/video/videolist `
- **description：**  获取视频简略信息数组接口
- **mothod：** GET 
- **login：** true
- **response(success):**
``` 
  {
    "code": 200,
	"message":"成功",
    "data":{
		videolist:[
			{
			"studentName": "张秋宏",
			"videoName": "不忘初心继续前进第一集.webm",
			"uploadTime": "/Date(1511998824167)/",
			"webPath": "C:\\Users\\hjmm\\Documents\\党支部文件\\党支部\\新建文件夹\\DZBWeb\\Video"
			},
			{
			"studentName": "张秋宏",
			"videoName": "不忘初心继续前进第一集.webm",
			"uploadTime": "/Date(1511998824167)/",
			"webPath": "C:\\Users\\hjmm\\Documents\\党支部文件\\党支部\\新建文件夹\\DZBWeb\\Video"
			},
			......
		]
	}
  }
```
 **备注** 

- 更多返回错误代码请看首页的错误代码描述

###### 上传视频
- **url：** ` /api/video/upload`
- **description：**  上传视频接口
- **mothod：** POST
- **login：** true
- **response(success):**

``` 
  {
    "code": 200,
	"message":"成功",
	"data":
  }
```

 **备注** 
视频的上传格式自己摸索下，不难，具体格式自己定，看好前面的接口规范说明
- 更多返回错误代码请看首页的错误代码描述

###### 删除视频
- **url：** ` /api/video/delete `
- **description：**  删除视频接口
- **mothod：** DELETE 
- **login：** true
- **request_argument：** 

|key|isrequired|type|illustration|
|:----    |:---|:----- |-----   |
|videoId |是  |int |视频id   |

- **response(success):**

``` 
  {
    "code": 200,
	"message":"成功"
  }
```
 **备注** 

- 更多返回错误代码请看首页的错误代码描述
- **url：** `/api/news/newslist `
- **description：**  获取新闻简略信息数组接口
- **mothod：** GET 
- **login：** true
- **response(success):**
``` 
  {
    "code": 200,
    "message":"成功",
    "data":{
        newslist:[
              "newslist" : [ {
                  "id" : 44,
                  "studentNum" : 0,
                  "newsTitle" : "党支部网站文档",
                  "newsType" : "校外新闻",
                  "newsContent" : "https://www.showdoc.cc/pinnuli?page_id=926812077729173#%E8%A7%86%E9%A2%91%E7%AE%A1%E7%90%86",
                  "newsLink" : "www.baidu.com",