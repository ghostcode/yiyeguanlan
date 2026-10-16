# 经典书籍读书笔记 · 一页观澜

把一整本书，读成一张可以反复翻阅的纸。

这是一个**经典书籍读书笔记网页系列**。早期每一卷都是零依赖的单文件 HTML，
现已**重构为 Vue 3 + Vite + TypeScript 工程**：书的内容（八段式文本、主色、金句等）
抽成一份强类型数据，由组件统一渲染，彻底消灭 34 份重复的 HTML。

> 重构原则：**技术栈现代化，书的内容零失真。** 米色纸感、八段式骨架、分享模块等体验全部保留。

---

## 技术栈

| 维度 | 选型 |
| --- | --- |
| 框架 | Vue 3（`<script setup>` 组合式 API） |
| 语言 | TypeScript（严格模式） |
| 构建 | Vite 5 |
| 路由 | vue-router 4（history 模式，`base: './'`，适配静态部署） |
| 样式 | 全局 `theme.css` 复用旧版米色纸感类名 + CSS 变量驱动主色 |
| 分享 | 纯前端 Canvas 海报（`qrcode` 库生成二维码，零外部接口） |

---

## 目录结构

```
yiyeguanlan/
├── index.html                  # Vite 入口（挂载 #app，加载 /src/main.ts）
├── vite.config.ts
├── tsconfig.json
├── package.json
├── src/
│   ├── main.ts                 # 应用入口：创建 app、挂载 router
│   ├── App.vue                 # 根组件 + 全局路由出口
│   ├── router/index.ts         # 路由：/ 书架、/book/:slug 书页
│   ├── types.ts                # Book / Head / Concept / Quote / Action ... 全部类型
│   ├── data/
│   │   ├── books.ts            # 33 卷强类型数据（唯一内容源，含八段式字段）
│   │   └── books.raw.json      # HTML → 数据的抽取中间产物（溯源用，不参与构建）
│   ├── styles/theme.css        # 米色纸感主题：旧版全部类名 + 主色变量
│   ├── utils/poster.ts         # renderPoster：Canvas 绘制 800×1120 海报 + 二维码
│   ├── components/
│   │   ├── BookCard.vue        # 书架书卡（链接 / 主色书脊 / 分类 pill / 分享按钮）
│   │   └── ShareModal.vue      # 分享弹窗（海报预览 / 下载 / 复制图片 / 复制链接 / 微信兼容）
│   └── views/
│       ├── BookShelf.vue       # 书架首页：顶栏 + Hero + 分类筛选 + 卡片网格 + 系列说明
│       └── BookPage.vue        # 书页：八段式全量渲染，按 --accent 注入主色
└── archive/                    # 旧版 33 个单文件书页 HTML + 旧书架 index.old.html（备查）
```

---

## 数据驱动：一本书只写一次

旧架构里每一卷是独立的 `.html`（内容 + 样式 + 分享逻辑重复 34 份）。
新架构把**内容**与**渲染**解耦：

- `src/data/books.ts` 是**唯一内容源**，导出 `books: Book[]` 与 `categoryMeta`。
- 每本书 42 个字段，覆盖八段式全部段落；文本字段保留内嵌 HTML（如 `<b>` 强调），组件用 `v-html` 还原。
- 主色存于 `accent` 字段，书页根节点 `style="--accent:<主色>"` 注入，海报/弹窗经 Teleport 到 body 后重新绑定。

### 双分类体系（两套维度，各自保留）

旧设计里书页与书架用两套不同维度的分类，新架构如实保留而不是强行统一：

| 字段 | 含义 | 用途 |
| --- | --- | --- |
| `cat` / `catCn` | 书架分类（如 心智认知 / 财富投资） | 书架筛选条 + 卡片分类 pill |
| `ribbonCat` | 书页右上角 ribbon 分类（如 行为决策 / 阿德勒） | 书页 HERO 角标 |

`categoryMeta` 定义 8 个书架分类（classic / fiction / wealth / biography / mind / people / method / society），
筛选项按数据里实际出现的分类动态生成并带计数。

---

## 八段式骨架（内容结构不变）

每一卷笔记仍按固定结构组织，便于跨书对照：

1. **HERO 封面** — 大图 + 书名 + 一句话 lede + 角标 `NO.xx · ribbon分类`
2. **关于这本书** — 信息卡（作者/出版等 meta）+ 论点 thesis + 标签 chips
3. **一句话总览** — 居中大号 blockquote
4. **核心对照** — 双系统 / 双栏 `vs`（如《思考，快与慢》的系统 1 / 系统 2）
5. **关键概念** — 书签式卡片（机制 + 例子）
6. **脉络图** — 五格章节脉络
7. **金句** — 多列引用卡片
8. **行动启发** — 行动清单 + 适合谁读（yes / no 双栏）

每段头部（编号 / 英文眉标 / 标题 / 副标题）由 `*Head` 字段承载，内嵌 `<b>` 同样用 `v-html` 还原。

---

## 分享模块

卡片与书页都可一键生成分享图：

| 入口 | 位置 | 分享内容 |
| --- | --- | --- |
| 书架书卡 | 卡片右下「分享」 | 编号 / 分类 / 书名 / 作者 / 简介 |
| 书页 | 顶栏「分享」 | 编号 / 分类 / 书名 / 作者 / 导语 |

弹窗内提供：

- **海报预览** — Canvas 实时绘制（800×1120），沿用米色纸感 + 该卷主色书脊，可「下载图片」或长按保存。
- **二维码** — 由内置 `qrcode` 库实时生成（无任何外部接口），编码当前页面绝对地址。
- **复制图片** — `ClipboardItem` 写入 PNG（带降级方案）。
- **复制链接** — Clipboard API，带降级方案。
- **微信兼容** — 检测微信环境时引导长按保存/识别，不直接拦截。

---

## 本地开发 & 构建

```bash
npm install        # 安装依赖
npm run dev        # 本地开发，默认 http://localhost:5173
npm run build      # 生产构建，产物输出到 dist/
npm run preview    # 预览生产构建
npm run type-check # vue-tsc --noEmit 类型校验
```

路由使用 `base: './'`，`dist/` 可直接丢到任意静态目录 / CDN / 对象存储，无需配 rewrite。

---

## 如何新增一卷

旧架构要复制整份 HTML 并手动同步书架卡、README、筛选计数。
新架构只需**改数据**，渲染与筛选全自动：

1. 在 `src/data/books.ts` 按 `Book` 类型追加一条数据（八段式字段 + `accent` + `cat` + `ribbonCat`）。
2. （可选）若新增书架分类，在 `categoryMeta` 补一行——筛选条与计数自动更新。
3. 书架卡片、书页、分享海报全部由组件按数据生成，**无需触碰任何 HTML / 组件模板**。

> 设计哲学不变：换一本书，只需换主色与内容——骨架始终如一。只是现在"骨架"是组件，
> "内容"是数据，二者解耦，可维护性大幅提升。

---

## 旧版归档

重构前的 33 个单文件书页 HTML 与旧书架 `index.old.html` 已移入 `archive/`
目录保留备查，便于核对内容零失真，也作为数据抽取的对照源。

---

## 说明

本系列用于个人学习，请勿商用。
