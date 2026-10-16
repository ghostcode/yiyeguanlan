<script setup lang="ts">
import { ref, computed } from 'vue'
import { books, categoryMeta } from '@/data/books'
import type { Book } from '@/types'
import BookCard from '@/components/BookCard.vue'
import ShareModal from '@/components/ShareModal.vue'

const share = ref<InstanceType<typeof ShareModal> | null>(null)
function onShare(b: Book) {
  share.value?.open(b)
}

const active = ref('all')
type CatKey = keyof typeof categoryMeta
const cats = computed(() => {
  const present = new Set(books.map((b) => b.cat))
  return (Object.keys(categoryMeta) as CatKey[])
    .filter((k) => present.has(k))
    .map((k) => ({
      key: k,
      cn: categoryMeta[k].cn,
      count: books.filter((b) => b.cat === k).length,
    }))
})
const filtered = computed(() =>
  active.value === 'all' ? books : books.filter((b) => b.cat === active.value),
)
const total = books.length

function setCat(k: string) {
  active.value = k
}
</script>

<template>
  <div class="shelf-page">
    <header class="topbar">
      <div class="topbar-inner">
        <RouterLink class="home" to="/">一页观澜</RouterLink>
        <div class="brand"><span class="dot"></span>经典书籍读书笔记 · 系列书架</div>
        <nav aria-label="目录">
          <a href="#shelf">书架</a>
          <a href="#about">关于系列</a>
        </nav>
      </div>
    </header>

    <section class="shelf-hero" id="shelf">
      <div class="wrap">
        <h1 class="brand-mark">一页观澜</h1>
        <p class="brand-sub">ONE PAGE · A WIDER VIEW</p>
        <p class="brand-desc">
          把一本本好书，压成一张可以带走的书签。这里是一页观澜的书架——每一卷都是一份忠于原意、可抄可想的读书笔记。
        </p>
      </div>
    </section>

    <section class="wrap" style="padding-bottom: 56px">
      <div class="filters" role="group" aria-label="按分类筛选卷次">
        <span class="flabel">分类</span>
        <button
          type="button"
          class="filter"
          :class="{ 'is-active': active === 'all' }"
          @click="setCat('all')"
        >
          全部 <span class="cnt">{{ total }}</span>
        </button>
        <button
          v-for="c in cats"
          :key="c.key"
          type="button"
          class="filter"
          :class="{ 'is-active': active === c.key }"
          @click="setCat(c.key)"
        >
          {{ c.cn }} <span class="cnt">{{ c.count }}</span>
        </button>
      </div>

      <div class="shelf">
        <BookCard v-for="b in filtered" :key="b.slug" :book="b" @share="onShare" />
      </div>
      <div class="shelf-empty" :class="{ 'is-on': filtered.length === 0 }">
        该分类暂无卷次
      </div>
    </section>

    <section class="wrap" id="about" style="padding-top: 8px; padding-bottom: 72px">
      <div class="eyebrow2"><span class="num">·</span>关于系列</div>
      <h2>为什么是「一页观澜」</h2>
      <p class="sub" style="max-width: 64ch">
        我们读得太多，记得太少。一页观澜只做一件事：把一本书最值得带走的结构、金句与行动，收进一页之内，让笔记真正可被反复翻看，而不是躺在收藏夹里落灰。
      </p>
    </section>

    <ShareModal ref="share" />
  </div>
</template>
