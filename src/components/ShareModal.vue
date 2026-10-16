<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { Book } from '@/types'
import { buildShareData, renderPoster, type ShareData } from '@/utils/poster'

const isOn = ref(false)
const note = ref('')
const posterCv = ref<HTMLCanvasElement | null>(null)
const posterImg = ref('')
const curData = ref<ShareData | null>(null)

const isWeChat =
  /micromessenger/i.test(navigator.userAgent) ||
  typeof (window as any).WeixinJSBridge !== 'undefined'

function open(book: Book) {
  curData.value = buildShareData(book)
  posterImg.value = ''
  isOn.value = true
  document.documentElement.style.overflow = 'hidden'
  requestAnimationFrame(() => {
    if (posterCv.value && curData.value) {
      renderPoster(posterCv.value, curData.value)
      if (isWeChat) posterImg.value = posterCv.value.toDataURL('image/png')
    }
    note.value = isWeChat
      ? '微信环境：请长按上方海报进行分享、下载'
      : location.protocol === 'file:'
        ? '提示：当前以本地文件方式打开；部署到线上后，链接方可正常访问。'
        : ''
  })
}

function close() {
  isOn.value = false
  document.documentElement.style.overflow = ''
}

function showImg() {
  if (!posterCv.value) return
  posterImg.value = posterCv.value.toDataURL('image/png')
}

function flash(btn: HTMLElement, _ok: boolean, msg: string) {
  const old = btn.textContent
  btn.textContent = msg
  setTimeout(() => {
    btn.textContent = old
  }, 1600)
}

async function copyImage(btn: HTMLElement) {
  if (isWeChat || !posterCv.value) {
    showImg()
    flash(btn, false, '长按上图进行分享、下载')
    return
  }
  try {
    const blob = await new Promise<Blob | null>((res) =>
      posterCv.value!.toBlob((b) => res(b), 'image/png')
    )
    if (blob && navigator.clipboard && (window as any).ClipboardItem) {
      await navigator.clipboard.write([
        new (window as any).ClipboardItem({ 'image/png': blob })
      ])
      flash(btn, true, '已复制')
      return
    }
  } catch (e) {
    /* 退化到长按 */
  }
  showImg()
}

function copy(btn: HTMLElement) {
  if (!curData.value) return
  navigator.clipboard
    ?.writeText(curData.value.url)
    .then(() => flash(btn, true, '已复制'))
    .catch(() => flash(btn, false, '复制失败'))
}

function download(btn: HTMLElement) {
  if (isWeChat || !posterCv.value) {
    showImg()
    flash(btn, false, '长按上图进行分享、下载')
    return
  }
  posterCv.value.toBlob((blob) => {
    if (!blob) {
      flash(btn, false, '保存失败')
      return
    }
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    const safe = (curData.value?.title || '').replace(/[\\/:*?"<>|]/g, '')
    a.download =
      '一页观澜-' +
      (curData.value?.no?.replace(/[^\w一-龥]+/g, '-') || '') +
      '-' +
      safe.slice(0, 32) +
      '.png'
    document.body.appendChild(a)
    a.click()
    setTimeout(() => {
      URL.revokeObjectURL(a.href)
      a.remove()
    }, 1200)
    flash(btn, true, '已保存')
  }, 'image/png')
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOn.value) close()
}

onMounted(() => document.addEventListener('keydown', onKey))
onBeforeUnmount(() => document.removeEventListener('keydown', onKey))

defineExpose({ open })
</script>

<template>
  <Teleport to="body">
    <div class="share-modal" :class="{ 'is-on': isOn }" :style="curData ? { '--accent': curData.accent } : undefined">
      <div class="share-mask" @click="close"></div>
      <div class="share-card">
        <div class="share-head">
          <b>分享这一卷</b>
          <button class="share-x" type="button" @click="close" aria-label="关闭">×</button>
        </div>
        <div class="share-poster">
          <canvas ref="posterCv" v-show="!posterImg"></canvas>
          <img v-if="posterImg" class="share-poster-img" :src="posterImg" alt="分享海报" />
        </div>
        <div class="share-note" v-if="note">{{ note }}</div>
        <div class="share-acts">
          <button
            class="share-btn primary"
            type="button"
            @click="(e) => download(e.currentTarget as HTMLElement)"
          >
            下载图片
          </button>
          <button
            class="share-btn"
            type="button"
            @click="(e) => copyImage(e.currentTarget as HTMLElement)"
          >
            复制图片
          </button>
          <button
            class="share-btn"
            type="button"
            @click="(e) => copy(e.currentTarget as HTMLElement)"
          >
            复制链接
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
