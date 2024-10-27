# 🎉 NJU AI 通识课

Git Page: <https://nil-zhuang.github.io/NJU-AI-Course/>
腾讯云镜像站: <http://175.27.130.124/>

## 😘 如何参与项目

本项目设置了两组讨论区，以供参与项目贡献。
* GitHub(推荐) [链接](https://github.com/NIL-zhuang/NJU-AI-Course)
* NJU GitLab [链接](https://git.nju.edu.cn/zhuangzy/NJU-AI-Course)

### 方法 1️⃣：项目 Pull Request (推荐，需要一定技术力)

#### 1.1 Fork 项目

点击项目页面右上角的 Fork 按钮，将该项目复制到你的个人仓库中，方便后续修改。

#### 1.2 添加文档和 Logo 图像

* 在你的个人仓库中添加相应的文档和 Logo 图像。
* 推荐安装 [hugo](https://gohugo.io/) 参与项目开发，安装方法请参考 [安装指南 Installation|Hugo](https://gohugo.io/installation/)。

#### 文档和图像的具体操作步骤：

* 文档：文档的路径为 `content/posts/[YOUR_PRODUCT].md`，你可以在项目根目录下运行以下命令来创建文档：
```bash
hugo new posts/[PRODUCT_NAME].md
```

这会使用模板创建一个新文档。

* 图像：图像的路径在 `static/icons/[YOUR_PRODUCT]`。如果图像大小超过 5KB，请将 Logo 图像放置在 `asserts/icons_raw` 下，然后运行以下命令进行预处理：
```bash
python3 asserts/scripts/icon_preprocess.py
```
该脚本会将处理后的图像存放在 static/icons 中的对应文件夹。

#### 1.3 验证项目修改(可选，推荐)

在项目根目录下运行以下命令来启动本地开发服务器：
```bash
hugo server --config hugo_gh_pages.toml
```
然后在浏览器中打开 `http://localhost:1313/NJU-AI-Course/`，查看是否成功添加了新的文档和图像。

#### 1.4 提交 Pull Request

确认所有更改无误后，可以在你的个人仓库中发起 Pull Request，请求将修改合并到主仓库。

### 方法 2️⃣：项目 issue 区发起讨论

可以点击 GitHub 页面上方(或 NJU GitLab 页面左侧)的 issue 区，也可以访问 [GitHub issue](https://github.com/NIL-zhuang/NJU-AI-Course/issues) 或 [NJU GitLab issue](https://git.nju.edu.cn/zhuangzy/NJU-AI-Course/-/issues)，点击新建 issue，选择对应的"feature_request"模板，填写新增 AI 产品的相关信息。

在你发起 issue 后，项目维护者或其他同学可能会在下方进行讨论或维护，可以关注一下邮件或 issue 讨论区的相关信息。

### 方法 3️⃣：向助教和维护者发邮件

联系 zzy 助教 `ziyuan.zhuang@smail.nju.edu.cn`，邮件标题请注明 `[NJU AI通识课]-[你想要添加的项目或进行的修改]`，并且在邮件中描述相应内容。

如果你要添加 AI 产品的描述信息，请在邮件中包含
1. 项目名
2. 适用模态
3. 项目可用地区
4. 项目适用场景
5. 摘要描述信息
6. 项目 logo / logo 下载链接
7. 你对该项目的评级
8. 项目官网
9. 详细介绍信息

如果你想要对网页功能或界面进行调整，也请你在邮件中详细描述您的需求。