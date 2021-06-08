# chrome收藏夹插件
## 实现功能
    1、支持分类的公司内部网址：分为线上、测试、本地
    2、支持自定义多个网址模块
    3、支持右键直接收藏该网址
## 贡献者
1、王亚晖：车300前端扛把子、我是他的粉丝
feat: 增加多页面打包配置，输出目录dist即可
他的github地址：https://github.com/YaleWan

2、许艺宝：车300前端未来之星、UI审美
开发中

## 项目目录简要说明
server为服务端代码

## 如何本地开发

1、先你得先安装mongodb（可以自行考虑安装可视化插件）
2、在项目根目录下yarn install 并在 server 目录下yarn install
3、启动前端yarn dev  切到（http://localhost:3001/main.html url下） 启动后端（cd server） yarn dev
4、server内容需部署到服务器上
5、前端项目 yarn build 即可

## 如何使用本地包
1.获取压缩包，解压到你喜欢的位置
2.在chrome浏览器右上角选择'更多工具'中的'拓展程序'
3.点击加载已解压的拓展程序并启用
4.注册即登录，即可
5.可以在插件中手动添加网址
6.在普通网页中，可以右键收藏至插件中
7.涉及后端，因此需要联网

## 如何使用chrome拓展
在chrome应用商店安装插件即可
地址：https://chrome.google.com/webstore/detail/%E6%94%B6%E8%97%8F%E5%A4%B9/phpkibbfedlplenaamjllbgpdibojjml?hl=zh-CN

