---
title: "Cool Papers"
date: "2024-08-28T15:13:47+08:00"
tags: ["论文阅读", "国内", "文本"]
featured_image: "https://papers.cool/static/favicon.ico"
description: "让刷论文变成一种非常“酷”的沉浸式体验，“酷”主要体现在通过 Kimi 回答了几个论文的FAQ"
rating: 5
comment: true
website: "https://papers.cool/"
---

@Copyright 苏剑林 科学FM https://kexue.fm/archives/10088

## 写在开头

一直以来，笔者都有日刷Arxiv的习惯，以求尽可能跟上领域内最新成果，并告诫自己“不进则退”。之前也有不少读者问我是怎么刷Arxiv的、有什么辅助工具等，但事实上，在很长的时间里，笔者都是直接刷Arxiv官网，并且没有用任何算法过滤，都是自己一篇篇过的。这个过程很枯燥，但并非不能接受，之所以不用算法初筛，主要还是担心算法漏召，毕竟“刷”就是为了追新，一旦算法漏召就“错失先机”了。

自从Kimi Chat发布后，笔者就一直计划着写一个辅助网站结合Kimi来加速刷论文的过程。最近几个星期稍微闲了一点，于是在GPT4、Kimi的帮助下，初步写成了这个网站，并且经过几天的测试和优化后，已经逐步趋于稳定，于是正式邀请读者试用。

Cool Papers：https://papers.cool

## 写在中间

正如“Cool Papers”这个名字所述，该网站希望让刷论文变成一种非常“酷”的沉浸式体验。当然，目前的实现还是比较简陋，“酷”主要体现在通过Kimi回答了几个论文的FAQ，这可以让我们更加准确、高效地了解论文的主要内容（相比只看标题、摘要），从而判断是否是需要精读的论文。

特别要指出的是：

1、这是一个“刷”论文的网站，不是“读”论文的网站，“刷”的意思是“筛”、“过滤”，“刷”的目的是找出需要精读的论文，而不是代替精读；
2、目前只支持Arxiv作为论文源，实时同步Arxiv的最新一天的论文列表，所以刷Cool Papers基本上能等价于刷Arxiv，未来可能会接入其他论文源，比如OpenReview，这个看后面的使用情况和反馈再做计划；
3、因为定位为“刷”，所以“贵在坚持，过时不候”，因此目前只支持显示最新一天的论文，暂时不支持历史回溯，当然这个也可以根据读者后面的反馈需求再做改动；
4、FAQ基于Kimi Chat，请大家感恩并珍惜，事实上根据标题和摘要基本上也能筛掉不少论文了，Kimi FAQ的存在是为了对不确定的论文做更精准的判断，所以不要随意点“[Kimi]”；
5、点击“[PDF]”可以预览论文内容（仅限PC浏览器，手机浏览器会触发下载），但这个是依赖于自己的网页去访问Arxiv，所以如果迟迟不出来，可能是自身网络问题；
6、点击“[Copy]”会将论文的基本信息（标题、摘要、链接等）复制到剪切板中，可以在其他地方粘贴，从而分享论文；
7、论文列表默认保持Arxiv的发布顺序，如果加上“-sorted-by-stars”，则按照所有用户的点击情况计算的stars进行排序；
8、论文更新：论文的更新是直接同步Arxiv官网的，正常延迟不超过10分钟，Arxiv更新时间一般在工作日早上十点左右（北京时间），但波动可能有几个小时，并且周六日和美国的一些节假日都是不更新的，如果发现网站论文没有更新，可以到Arxiv官方上确认一下更新情况。

## 关于Kimi FAQ的进一步说明：

1、点击每篇论文对应的“[Kimi]”后，会进入排队；
2、如果排队人数比较多，会显示“Pending:xxx”的结果，“xxx”是排队数，该数字会自动更新；
3、排队完成后会显示“Loading:xxx%”，随后流式输出FAQ内容；
4、排队和生成的过程不需要保持页面打开，即便关闭页面也会在后台保持排队和生成，并且重新打开页面并点击同一“[Kimi]”时会恢复原来的进度；
5、如果你点击“[Kimi]”后发现瞬间就输出完了FAQ内容，那就意味着这篇论文已经被其他读者读过，FAQ被缓存了下来；
6、因为有排队机制，所以随意点“[Kimi]”倒是不会让网站有太大压力，但会让别人的等待时间过长，这是一个不友善的行为。

## 写在结尾

最后，欢迎大家的意见和建议，也欢迎大家继续提需求。很明显，目前的Cool Papers还非常粗糙，远没有想象中那么“酷”，并且用Kimi做FAQ也仅仅是Kimi与论文结合的一个非常基本的方案，Kimi的超长Context应该还有非常大的想象空间。所以非常期待大家发挥想象力，找到Kimi与刷论文的更完美的结合方式。