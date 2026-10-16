# 经典书籍读书笔记 · 系列书架

把一整本书，读成一张可以反复翻阅的纸。

这是一个**经典书籍读书笔记网页系列**：每一卷都是独立的单文件 HTML，
采用同一套米色纸感、衬线主导的读书笔记视觉风格，仅通过**主色**区分卷次，
整面书架看起来像一套书。

## 目录结构

```
yiyeguanlan/
├── index.html                        # 系列书架首页（导航 + 卷次总览）
├── konosuke-matsushita-open-the-way.html      # NO.25《开路》· 主色 麦秆 #c9a23a
├── konosuke-matsushita-decisive-management.html # NO.26《决断的经营》· 主色 柿 #c06a4d
├── akio-morita-made-in-japan.html             # NO.27《日本制造》· 主色 江户紫 #7a3f6e
├── akio-morita-the-japan-that-can-say-no.html # NO.28《日本可以说不》· 主色 琥珀 #c08a2e
├── soichiro-honda-autobiography.html          # NO.29《本田宗一郎自传》· 主色 红梅 #9c4a5a
├── soichiro-honda-let-my-hands-speak.html     # NO.30《让我的手来说话》· 主色 绯 #b23b4e
├── kazuo-inamori-a-compass-to-fulfillment.html # NO.31《活法》· 主色 群青 #2d5aa0
├── kazuo-inamori-how-to-work.html             # NO.32《干法》· 主色 朱柿 #c0603a
├── kazuo-inamori-the-mind-to-live.html        # NO.33《心法》· 主色 桔梗 #4a4f9e
├── thinking-fast-and-slow.html       # NO.01《思考，快与慢》· 主色 铁锈红 #8a4a2a
├── the-courage-to-be-disliked.html   # NO.02《被讨厌的勇气》· 主色 蓝染 #2c4a63
├── the-almanack-of-naval-ravikant.html # NO.03《纳瓦尔宝典》· 主色 松绿 #2f6b54
├── the-psychology-of-money.html      # NO.04《金钱心理学》· 主色 暗琥珀金 #9a6b1c
├── the-weakness-of-human-nature.html # NO.05《人性的弱点》· 主色 梅紫 #7a3d55
├── awareness-of-cognition.html       # NO.06《认知觉醒》· 主色 湖蓝 #1f6f8b
├── finance-made-simple.html           # NO.07《秒懂金融》· 主色 朱红 #b0432a
├── the-most-important-thing.html      # NO.08《投资最重要的事》· 主色 橄榄绿 #6b7233
├── poor-charlies-almanack.html        # NO.09《穷查理宝典》· 主色 紫水晶 #6a4a93
├── peak-secrets-expertise.html        # NO.10《刻意练习》· 主色 青碧 #16756b
├── begin-with-the-end-in-mind.html    # NO.11《以终为始》· 主色 石墨蓝 #45596b
├── seven-habits-of-highly-effective-people.html
│                                     # NO.12《高效能人士的七个习惯》· 主色 靛蓝 #38488c
├── work-consumerism-and-the-new-poor.html
│                                     # NO.13《工作、消费主义和新穷人》· 主色 炭褐 #54463c
├── the-millionaire-next-door.html
│                                     # NO.14《邻家的百万富翁》· 主色 苍青 #39605c
├── just-keep-buying.html             # NO.15《持续买入》· 主色 驼褐 #7d6142
├── the-permanent-portfolio.html      # NO.16《哈利·布朗的永久投资组合》· 主色 玄石 #414a52
├── elon-musk.html                    # NO.17《硅谷钢铁侠》· 主色 钢蓝 #4a6fa5
├── the-simple-path-to-wealth.html    # NO.18《简单致富》· 主色 翠玉 #3f8f7a
├── the-alchemy-of-finance.html       # NO.19《金融炼金术》· 主色 炼金紫 #70307c
├── jensen-huang-the-thinking-machine.html
                                      # NO.20《黄仁勋：英伟达之芯》· 主色 新绿 #3f6f29
├── demis-hassabis-the-infinity-machine.html
│                                     # NO.21《哈萨比斯：谷歌AI之脑》· 主色 紫棠 #8e2f7b
├── jian-zhu-ke-ling.html             # NO.22《谏逐客令》· 主色 竹青 #3f7a4e
├── the-moon-and-sixpence.html        # NO.23《月亮与六便士》· 主色 夜穹紫 #503960
└── the-gift-of-the-magi.html         # NO.24《麦琪的礼物》· 主色 冬青红 #9a3c42
```

- `index.html`：系列入口。展示书架（书卡直链到各卷）、**分类筛选**、**每张书卡的分享按钮**、系列说明、页脚。
- 每卷笔记：自包含、零依赖、可离线打开，仅 HERO 引用一张 Unsplash 外链封面图。

## 分享（图片预览 + 二维码）

卡片与详情页都可以一键生成分享图：

| 入口 | 位置 | 分享内容 |
| --- | --- | --- |
| 首页书卡 | 卡片右下「分享」 | 该卷的编号 / 分类 / 书名 / 作者 / 简介 |
| 笔记详情 | 顶栏「一页观澜」旁的「分享」 | 该卷的编号 / 分类 / 书名 / 作者 / 导语 |

弹窗内提供：

- **海报预览**：Canvas 实时绘制（800×1120），沿用米色纸感 + 该卷主色书脊，可直接「下载图片」保存或长按保存。
- **二维码**：由**内置编码器**实时生成（字节模式 / 纠错等级 M / 版本 1–10，无任何外部接口），编码当前页面的绝对地址。
- **复制链接**：Clipboard API，带降级方案。

> 二维码编码的是页面绝对地址。以 `file://` 本地打开时会提示"部署到线上后扫码可打开"；部署后扫码直达该卷。
> 分享模块零依赖、随单文件分发，新增一卷时**无需额外配置**，复制模板即自带该功能。

## 分类

首页书架上方有一排分类筛选条（书卡用 `data-cat` 标记，约 30 行原生 JS 过滤，无依赖；禁用 JS 时默认展示全部）。

| 分类 | `data-cat` | 卷次 |
| --- | --- | --- |
| 经典名篇 | `classic` | NO.22《谏逐客令》 |
| 文学小说 | `fiction` | NO.23《月亮与六便士》· NO.24《麦琪的礼物》 |
| 财富投资 | `wealth` | NO.03《纳瓦尔宝典》· NO.04《金钱心理学》· NO.07《秒懂金融》· NO.08《投资最重要的事》· NO.09《穷查理宝典》· NO.14《邻家的百万富翁》· NO.15《持续买入》· NO.16《哈利·布朗的永久投资组合》· NO.18《简单致富》· NO.19《金融炼金术》 |
| 人物传记 | `biography` | NO.17《硅谷钢铁侠》· NO.20《黄仁勋：英伟达之芯》· NO.21《哈萨比斯：谷歌AI之脑》· NO.25《开路》· NO.26《决断的经营》· NO.27《日本制造》· NO.28《日本可以说不》· NO.29《本田宗一郎自传》· NO.30《让我的手来说话》· NO.31《活法》· NO.32《干法》· NO.33《心法》 |
| 心智认知 | `mind` | NO.01《思考，快与慢》· NO.06《认知觉醒》· NO.10《刻意练习》 |
| 人际自我 | `people` | NO.02《被讨厌的勇气》· NO.05《人性的弱点》 |
| 方法效能 | `method` | NO.11《以终为始》· NO.12《高效能人士的七个习惯》 |
| 社会观察 | `society` | NO.13《工作、消费主义和新穷人》 |

新增一卷时，除了"笔记页 + 书架卡 + README 目录"三处，还要多两小步：给书卡加 `data-cat="<分类>"`，并更新筛选条上对应分类的计数。

若要**新增一个分类**：只需在筛选条加一个 `<button class="filter" data-filter="<新分类>">` 并在分类表补一行——过滤逻辑是按 `data-cat` 字符串匹配的，**不需要改 JS**。

## 设计系统

同一套视觉语言贯穿所有页面，核心规律：

- **米色纸感**：`--paper:#f4ecd8` 背景 + SVG 噪点纹理 + 顶部细条毛玻璃导航。
- **衬线主导**：标题/正文用 `Noto Serif SC` 等衬线字体，辅助信息用无衬线。
- **中性配色**：墨色文字 + 一整套低饱和色板（金 / 青瓷 / 紫蓝 / 苔绿 / 梅）。
- **CSS 变量驱动主色**：各卷只需改 `--accent` 等几个变量即可换色；首页书卡用 `--bacc` 控制书脊色。

### 读书笔记八段式骨架

每卷笔记按固定结构组织，便于跨书对照：

1. HERO 封面（大图 + 书名 + 一句话 lede + 角标 NO.xx）
2. 关于这本书（信息卡 meta-card + 论点 thesis + 标签 chips）
3. 一句话总览（居中大号 blockquote）
4. 核心对照（双栏 `vs` 卡片）
5. 关键概念卡片（书签式 `biases`：机制 + 例子）
6. 脉络图（五格 `chaptermap`）
7. 金句（2 列 `quotes`）
8. 行动启发（2 列 `actions`）+ 适合谁读（yes/no 双栏）

## 如何新增一卷

复制任一现有笔记 HTML（或 `index.html` 里一个 `.book` 卡片），按三步扩展：

1. **改主色**：调整 `--accent` / 书卡 `--bacc` 等变量，确定本卷视觉标识。
2. **填内容**：套用八段式骨架，替换书名、作者、概念、金句、行动启发。
3. **接入口**：
   - 笔记页：更新 HERO 角标编号、信息卡、各段落。
   - 首页：在书架 `.shelf` 中复制一个 `.book` 卡片，`href` 指向新文件、`--bacc` 设为主色。

> 设计哲学：换一本书，只需要换主色与内容——骨架始终如一。

> 提示：复制现有笔记 HTML 作为模板时，分享按钮与分享模块会一并带过来，无需额外操作。

## 响应式

- 桌面 / 平板 / 手机均适配：920px 两列降级、600px 单列。
- 含 `prefers-reduced-motion` 动画降级适配。

## 说明

本系列用于个人学习，请勿商用。
