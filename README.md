[ULEDEV](https://github.com/boat3471/uledev) — 用于构建邮乐前端个人开发环境
==================================================

贡献
--------------------------------------

基于 `Nodejs, Git, GitHub, NPM` 实现对ULE前端开发的自动化:

1. [Nodejs](https://github.com/)
2. [Nodejs CN](http://nodejs.cn/)
2. [Nodejs Api](http://nodeapi.ucdok.com/#/api/)
3. [GitHub](https://github.com/)
4. [Git](https://git-scm.com/downloads)
5. [NPM](https://nodejs.org/en/)



使用说明
--------------------------------------

1. 安装Git
2. 安装Nodejs
3. **`npm install -g uledev`** 安装 uledev
4. 创建个人开发目录, 一般使用个人姓名全拼命名
5. 进入个人开发目录, 执行命令:

	**`uledev start`**
	
常用命令
--------------------------------------

- **`npm install -g uledev`** 安装uledev
- **`uledev start`** 运行uledev, 在个人开发目录运行
- **`uledev -v`** 查看版本号
- **`uledev -h`** 查看命令
- **`uledev`** 输出简介
- **`uledev event`** 创建活动模版, 自动生成html, css, js, 自动处理页头页脚, 自动发布生产文件, 创建完成后个人只需修改banner, 背景, 微调商品列表样式和导航条
- **`uledev event -copy`** 复制活动
- **`uledev event -del`** 删除活动