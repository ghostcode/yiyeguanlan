# 经典书籍读书笔记 · 系列书架

把一整本书，读成一张可以反复翻阅的纸。

这是一个**经典书籍读书笔记网页系列**：每一卷都是独立的单文件 HTML，
采用同一套米色纸感、衬线主导的读书笔记视觉风格，仅通过**主色**区分卷次，
整面书架看起来像一套书。

## 目录结构

```
yiyeguanlan/
├── index.html                        # 系列书架首页（导航 + 卷次总览）
├── thinking-fast-and-slow.html       # NO.01《思考，快与慢》· 主色 铁锈红 #8a4a2a
├── the-courage-to-be-disliked.html   # NO.02《被讨厌的勇气》· 主色 蓝染 #2c4a63
├── the-almanack-of-naval-ravikant.html # NO.03《纳瓦尔宝典》· 主色 松绿 #2f6b54
├── the-psychology-of-money.html      # NO.04《金钱心理学》· 主色 暗琥珀金 #9a6b1c
├── the-weakness-of-human-nature.html # NO.05《人性的弱点》· 主色 梅紫 #7a3d55
├── awareness-of-cognition.html       # NO.06《认知觉醒》· 主色 湖蓝 #1f6f8b
├── finance-made-simple.html           # NO.07《秒懂金融》· 主色 朱红 #b0432a
└── the-most-important-thing.html      # NO.08《投资最重要的事》· 主色 橄榄绿 #6b7233
```

- `index.html`：系列入口。展示书架（书卡直链到各卷）、系列说明、页脚。
- 每卷笔记：自包含、零依赖、可离线打开，仅 HERO 引用一张 Unsplash 外链封面图。

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

## 响应式

- 桌面 / 平板 / 手机均适配：920px 两列降级、600px 单列。
- 含 `prefers-reduced-motion` 动画降级适配。

## 说明

本系列用于个人学习，请勿商用。
