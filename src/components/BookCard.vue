<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Book } from '@/types'

defineProps<{ book: Book }>()
const emit = defineEmits<{ (e: 'share', b: Book): void }>()
</script>

<template>
  <RouterLink
    class="book"
    :to="`/book/${book.slug}`"
    :style="{ '--bacc': book.accent }"
    :data-cat="book.cat"
  >
    <div class="ribbon-no">{{ book.no }}</div>
    <div class="kicker" v-if="book.kicker">{{ book.kicker }}</div>
    <div class="cat">{{ book.catCn }}</div>
    <h3>{{ book.title }}</h3>
    <div class="author">{{ book.authorShort || book.author }}</div>
    <p class="desc">{{ book.shelfDesc }}</p>
    <div class="chips">
      <span v-for="c in book.shelfChips" :key="c">{{ c }}</span>
    </div>
    <div class="read">阅读笔记 <span class="arrow">→</span></div>
    <div class="meta-line">{{ book.shelfMeta }}</div>
    <button
      type="button"
      class="share-mini"
      @click.prevent.stop="emit('share', book)"
      aria-label="分享这一卷"
    >
      分享
    </button>
  </RouterLink>
</template>
