// 一页观澜 · 书籍数据类型定义
// 字段语义与抽取自旧版单文件 HTML，内嵌 HTML 字段（lede/infoHead.h2/thesis/example/oneliner/quote text 等）
// 由组件层通过 v-html 还原，内容为本系列自有、可信，非外部输入。

export type Pair = [string, string]

// 八段式中每一节的头部：编号 / 英文眉标 / 中文标题（含内嵌 <b>） / 副标题（含内嵌 <b>）
export interface Head {
  num: string
  eyebrow: string
  h2: string
  sub: string
}

export interface Concept {
  num: string
  title: string
  en: string
  mech: string
  example: string
}

export interface Chapter {
  pin: string
  title: string
  range: string
  items: string[]
}

export interface Quote {
  text: string
  src: string
}

export interface Action {
  num: string
  h4: string
  p: string
  tag: string
}

export interface DualSide {
  tag: string
  title: string
  en: string
  sub: string
  p: string
  ul: Pair[]
  q: string
}

export interface Dual {
  label: string
  a: DualSide
  b: DualSide
}

export interface Book {
  slug: string
  no: string
  cat: string
  catCn: string
  title: string
  sub: string
  author: string
  heroImg: string
  heroAlt: string
  lede: string
  byline: Pair[]
  infoHead: Head
  meta: Pair[]
  thesis: string
  chips: string[]
  oneliner: string
  onelinerSrc: string
  oneHead: Head
  dualHead: Head
  dual: Dual[]
  biasHead: Head
  concepts: Concept[]
  mapHead: Head
  chapters: Chapter[]
  quotesHead: Head
  quotes: Quote[]
  actionHead: Head
  actions: Action[]
  whoHead: Head
  whoYes: string[]
  whoNo: string[]
  whoYesTitle: string
  whoNoTitle: string
  footMark: string
  ribbonCat: string
  accent: string
  accentName: string
  kicker: string
  authorShort: string
  shelfDesc: string
  shelfMeta: string
  shelfChips: string[]
}

export interface CategoryMeta {
  cn: string
  en: string
}
