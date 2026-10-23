<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { books } from '@/data/books'
import type { Book } from '@/types'
import ShareModal from '@/components/ShareModal.vue'

const route = useRoute()
const share = ref<InstanceType<typeof ShareModal> | null>(null)

const book = computed<Book | undefined>(() =>
  books.find((b) => b.slug === route.params.slug),
)

function openShare() {
  if (book.value) share.value?.open(book.value)
}

function heroStyle(b: Book) {
  return b.heroImg ? { backgroundImage: `url(${b.heroImg})` } : undefined
}
</script>

<template>
  <div v-if="book" class="book-page" :style="{ '--accent': book.accent }">
    <header class="topbar">
      <div class="topbar-inner">
        <RouterLink class="home" to="/">一页观澜</RouterLink>
        <button class="share-open" type="button" @click="openShare" aria-label="分享这一卷">
          分享
        </button>
        <div class="brand">阅读笔记 · {{ book.sub }}</div>
      </div>
    </header>

    <!-- HERO -->
    <section class="hero" aria-label="封面" style="padding: 0; border-top: 0">
      <div
        class="hero-img"
        role="img"
        :aria-label="book.heroAlt"
        :style="heroStyle(book)"
      ></div>
      <div class="ribbon">{{ book.no }} · {{ book.ribbonCat }}</div>
      <div class="hero-inner">
        <div class="eyebrow"><span class="line"></span>READING NOTES</div>
        <h1>
          {{ book.title }}
          <span class="sub">{{ book.sub }}</span>
        </h1>
        <p class="lede" v-html="book.lede"></p>
        <div class="byline">
          <span v-for="(b, i) in book.byline" :key="i"
            ><b>{{ b[0] }}</b> {{ b[1] }}</span
          >
        </div>
      </div>
    </section>

    <!-- 1. 书籍信息 -->
    <section id="info">
      <div class="wrap">
        <div class="eyebrow2">
          <span class="num" v-html="book.infoHead.num"></span>{{ book.infoHead.eyebrow }}
        </div>
        <h2 v-html="book.infoHead.h2"></h2>
        <p class="sub" v-html="book.infoHead.sub"></p>
        <div class="bookinfo">
          <div class="meta-card">
            <dl>
              <template v-for="(m, i) in book.meta" :key="i">
                <dt>{{ m[0] }}</dt>
                <dd v-html="m[1]"></dd>
              </template>
            </dl>
          </div>
          <div class="right">
            <p class="thesis" v-html="book.thesis"></p>
            <div>
              <span
                class="chip"
                v-for="(c, i) in book.chips"
                :key="i"
                v-html="c"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. 一句话总览 -->
    <section id="one" class="oneliner">
      <div class="wrap" style="padding-top: 0; padding-bottom: 0">
        <div class="eyebrow2">
          <span class="num" v-html="book.oneHead.num"></span>{{ book.oneHead.eyebrow }}
        </div>
        <h2 v-html="book.oneHead.h2"></h2>
        <blockquote v-html="book.oneliner"></blockquote>
        <div class="src">{{ book.onelinerSrc }}</div>
      </div>
    </section>

    <!-- 3. 两组核心对照 -->
    <section id="dual" v-if="book.dual.length">
      <div class="wrap">
        <div class="eyebrow2">
          <span class="num" v-html="book.dualHead.num"></span>{{ book.dualHead.eyebrow }}
        </div>
        <h2 v-html="book.dualHead.h2"></h2>
        <p class="sub" v-html="book.dualHead.sub"></p>
        <div class="dualset">
          <template v-for="(d, di) in book.dual" :key="di">
            <div class="setlabel" v-if="d.label">{{ d.label }}</div>
            <div class="dual">
              <div class="sys a">
                <div class="tag">{{ d.a.tag }}</div>
                <h3>{{ d.a.title }} <span class="en" v-if="d.a.en">{{ d.a.en }}</span></h3>
                <div class="sub">{{ d.a.sub }}</div>
                <p v-html="d.a.p"></p>
                <ul>
                  <li v-for="(u, ui) in d.a.ul" :key="ui">
                    <b>{{ u[0] }}</b><span>{{ u[1] }}</span>
                  </li>
                </ul>
                <div class="quote" v-if="d.a.q">{{ d.a.q }}</div>
              </div>
              <div class="vs" aria-hidden="true">vs</div>
              <div class="sys b">
                <div class="tag">{{ d.b.tag }}</div>
                <h3>{{ d.b.title }} <span class="en" v-if="d.b.en">{{ d.b.en }}</span></h3>
                <div class="sub">{{ d.b.sub }}</div>
                <p v-html="d.b.p"></p>
                <ul>
                  <li v-for="(u, ui) in d.b.ul" :key="ui">
                    <b>{{ u[0] }}</b><span>{{ u[1] }}</span>
                  </li>
                </ul>
                <div class="quote" v-if="d.b.q">{{ d.b.q }}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- 4. 关键概念 -->
    <section id="bias">
      <div class="wrap">
        <div class="eyebrow2">
          <span class="num" v-html="book.biasHead.num"></span>{{ book.biasHead.eyebrow }}
        </div>
        <h2 v-html="book.biasHead.h2"></h2>
        <p class="sub" v-html="book.biasHead.sub"></p>
        <div class="biases">
          <article
            class="bias"
            :class="'c' + ((i % 10) + 1)"
            v-for="(c, i) in book.concepts"
            :key="i"
          >
            <div class="ribbon-top"></div>
            <div class="num">{{ c.num }}</div>
            <h3>{{ c.title }} <span class="en" v-if="c.en">{{ c.en }}</span></h3>
            <p class="mech">{{ c.mech }}</p>
            <div class="example"><b>例</b>{{ c.example }}</div>
          </article>
        </div>
      </div>
    </section>

    <!-- 5. 章节脉络 -->
    <section id="map">
      <div class="wrap">
        <div class="eyebrow2">
          <span class="num" v-html="book.mapHead.num"></span>{{ book.mapHead.eyebrow }}
        </div>
        <h2 v-html="book.mapHead.h2"></h2>
        <p class="sub" v-html="book.mapHead.sub"></p>
        <div class="chaptermap">
          <article
            class="part"
            :class="'p' + ((i % 5) + 1)"
            v-for="(ch, i) in book.chapters"
            :key="i"
          >
            <div class="pin">{{ ch.pin }}</div>
            <h3>{{ ch.title }}</h3>
            <div class="range">{{ ch.range }}</div>
            <ul class="chapters">
              <li v-for="(it, j) in ch.items" :key="j">{{ it }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- 6. 金句 -->
    <section id="quotes">
      <div class="wrap">
        <div class="eyebrow2">
          <span class="num" v-html="book.quotesHead.num"></span>{{ book.quotesHead.eyebrow }}
        </div>
        <h2 v-html="book.quotesHead.h2"></h2>
        <p class="sub" v-html="book.quotesHead.sub"></p>
        <div class="quotes">
          <article
            class="quote-card"
            :class="'qc' + ((i % 5) + 1)"
            v-for="(q, i) in book.quotes"
            :key="i"
          >
            <span class="qmark">“</span>
            <p v-html="q.text"></p>
            <div class="src">{{ q.src }}</div>
          </article>
        </div>
      </div>
    </section>

    <!-- 7. 行动启发 -->
    <section id="action">
      <div class="wrap">
        <div class="eyebrow2">
          <span class="num" v-html="book.actionHead.num"></span>{{ book.actionHead.eyebrow }}
        </div>
        <h2 v-html="book.actionHead.h2"></h2>
        <p class="sub" v-html="book.actionHead.sub"></p>
        <div class="actions">
          <div class="action" v-for="(a, i) in book.actions" :key="i">
            <div class="ic">{{ a.num }}</div>
            <div>
              <h4>{{ a.h4 }}</h4>
              <p>{{ a.p }}</p>
              <span class="tag">{{ a.tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. 适合谁读 -->
    <section id="who">
      <div class="wrap">
        <div class="eyebrow2">
          <span class="num" v-html="book.whoHead.num"></span>{{ book.whoHead.eyebrow }}
        </div>
        <h2 v-html="book.whoHead.h2"></h2>
        <p class="sub" v-html="book.whoHead.sub"></p>
        <div class="readers">
          <article class="who yes">
            <h3><span class="swatch"></span>{{ book.whoYesTitle }}</h3>
            <ul>
              <li v-for="(it, i) in book.whoYes" :key="i" v-html="it"></li>
            </ul>
          </article>
          <article class="who no">
            <h3><span class="swatch"></span>{{ book.whoNoTitle }}</h3>
            <ul>
              <li v-for="(it, i) in book.whoNo" :key="i" v-html="it"></li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="foot">
      <div class="wrap">
        <div class="mark">{{ book.footMark }}</div>
        <div class="rule"></div>
        <div class="meta">
          读书笔记 · 《{{ book.title }}》 · {{ book.author }}<br />
          本笔记用于个人学习，请勿商用
        </div>
      </div>
    </footer>

    <ShareModal ref="share" />
  </div>

  <main v-else class="wrap" style="padding: 96px var(--gutter); text-align: center">
    <h1>未找到这一卷</h1>
    <p>链接可能已失效。</p>
    <RouterLink class="home" to="/">返回书架</RouterLink>
  </main>
</template>
