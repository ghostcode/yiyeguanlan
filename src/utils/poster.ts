// 海报渲染（移植自旧版 share.js 的 renderPoster + 排版辅助函数）
// 二维码改用成熟的 qrcode 库生成矩阵后绘制，其余文字排布与原版保持一致。
import QRCode from 'qrcode'
import type { Book } from '@/types'

export interface ShareData {
  no: string
  cat: string
  title: string
  sub: string
  author: string
  summary: string
  url: string
  accent: string
}

const SERIF =
  '"Noto Serif SC","Source Han Serif SC","Songti SC","STSong","SimSun",Georgia,serif'
const SANS =
  '"Noto Sans SC","PingFang SC","Hiragino Sans GB","Microsoft YaHei",system-ui,sans-serif'

export function buildShareData(book: Book): ShareData {
  return {
    no: book.no,
    cat: book.catCn,
    title: book.title,
    sub: book.sub,
    author: book.authorShort || book.author,
    summary: book.lede,
    url: typeof location !== 'undefined' ? location.href : '',
    accent: book.accent
  }
}

export function squeeze(s: string): string {
  return (s || '').replace(/\s+/g, ' ').trim()
}

function clip(s: string, n: number): string {
  s = squeeze(s)
  if (s.length <= n) return s
  let out = s.slice(0, n - 1)
  out = out.replace(/[（(][^（）()]*$/, '')
  out = out.replace(/[，,、·\-–—\s]+$/, '')
  if (!out) out = s.slice(0, n - 1).replace(/\s+$/, '')
  return out + '…'
}

export function hexToRgb(h: string): [number, number, number] {
  h = (h || '').replace('#', '')
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]
  const n = parseInt(h, 16)
  return isNaN(n) ? [122, 74, 42] : [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function tokens(s: string): string[] {
  const out: string[] = []
  let buf = ''
  for (let i = 0; i < s.length; i++) {
    const ch = s.charAt(i)
    const code = s.charCodeAt(i)
    const cjk =
      (code >= 0x2e80 && code <= 0x9fff) ||
      (code >= 0xf900 && code <= 0xfaff) ||
      (code >= 0xff00 && code <= 0xffef) ||
      (code >= 0x3000 && code <= 0x303f)
    if (cjk || ch === ' ') {
      if (buf) {
        out.push(buf)
        buf = ''
      }
      out.push(ch)
    } else {
      buf += ch
    }
  }
  if (buf) out.push(buf)
  return out
}

const NO_LINE_HEAD = /^[，。、；：！？）」』”’）》〉〕］】·…%]$/
function wrap(ctx: CanvasRenderingContext2D, text: string, maxW: number, maxLines: number): string[] {
  const ts = tokens(squeeze(text))
  const lines: string[] = []
  let cur = ''
  for (let i = 0; i < ts.length; i++) {
    const t = ts[i]
    if (t === ' ' && cur === '') continue
    if (ctx.measureText(t).width > maxW) {
      for (let k = 0; k < t.length; k++) {
        const ch = t.charAt(k)
        if (cur !== '' && ctx.measureText(cur + ch).width > maxW) {
          lines.push(cur)
          if (lines.length === maxLines) {
            if (k < t.length - 1 || i < ts.length - 1) lines[maxLines - 1] += '…'
            return lines
          }
          cur = ch
        } else cur += ch
      }
      continue
    }
    if (cur !== '' && !NO_LINE_HEAD.test(t) && ctx.measureText(cur + t).width > maxW) {
      const rest = t + ts.slice(i + 1).join('')
      lines.push(cur.replace(/\s+$/, ''))
      if (lines.length === maxLines) {
        if (squeeze(rest)) lines[maxLines - 1] += '…'
        return lines
      }
      cur = t === ' ' ? '' : t
    } else cur += t
  }
  if (squeeze(cur)) lines.push(cur.replace(/\s+$/, ''))
  return lines
}

const PW = 800
const PH = 1120

export function renderPoster(canvas: HTMLCanvasElement, d: ShareData): string {
  canvas.width = PW
  canvas.height = PH
  const ctx = canvas.getContext('2d')!
  const rgb = hexToRgb(d.accent)
  const accent = 'rgb(' + rgb.join(',') + ')'
  const x0 = 92
  const x1 = 730

  ctx.fillStyle = '#f4ecd8'
  ctx.fillRect(0, 0, PW, PH)
  const g1 = ctx.createRadialGradient(PW / 2, -120, 40, PW / 2, -120, PH)
  g1.addColorStop(0, 'rgba(' + rgb.join(',') + ',0.13)')
  g1.addColorStop(1, 'rgba(' + rgb.join(',') + ',0)')
  ctx.fillStyle = g1
  ctx.fillRect(0, 0, PW, PH)

  ctx.strokeStyle = '#d9cba6'
  ctx.lineWidth = 2
  ctx.strokeRect(29, 29, PW - 58, PH - 58)
  ctx.fillStyle = accent
  ctx.fillRect(30, 30, 12, PH - 60)

  ctx.textBaseline = 'alphabetic'
  ctx.textAlign = 'left'

  ctx.fillStyle = '#7a6e5d'
  ctx.font = '600 19px ' + SANS
  ctx.fillText('一页观澜 · 经典书籍读书笔记', x0, 112)
  ctx.textAlign = 'right'
  ctx.fillStyle = accent
  ctx.font = '700 32px ' + SERIF
  ctx.fillText(d.no || '', x1, 114)
  ctx.textAlign = 'left'

  if (d.cat) {
    ctx.font = '500 19px ' + SANS
    const cw = ctx.measureText(d.cat).width + 36
    roundRect(ctx, x0, 150, cw, 44, 22)
    ctx.strokeStyle = 'rgba(' + rgb.join(',') + ',0.5)'
    ctx.lineWidth = 1.6
    ctx.stroke()
    ctx.fillStyle = accent
    ctx.fillText(d.cat, x0 + 18, 179)
  }

  let ts: number
  let lines: string[] | null = null
  for (ts = 62; ts >= 44; ts -= 2) {
    ctx.font = '700 ' + ts + 'px ' + SERIF
    if (ctx.measureText(squeeze(d.title)).width <= x1 - x0) {
      lines = [squeeze(d.title)]
      break
    }
  }
  if (!lines) {
    for (ts = 62; ts >= 34; ts -= 3) {
      ctx.font = '700 ' + ts + 'px ' + SERIF
      const t2 = wrap(ctx, d.title, x1 - x0, 2)
      if (t2.length <= 2 && t2.join('').indexOf('…') < 0) {
        lines = t2
        break
      }
    }
    if (!lines) {
      ts = 34
      ctx.font = '700 34px ' + SERIF
      lines = wrap(ctx, d.title, x1 - x0, 2)
    }
  }
  ctx.fillStyle = '#1f1a14'
  let ty = 274
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x0, ty)
    ty += Math.round(ts * 1.24)
  }

  ty += 8
  ctx.fillStyle = '#4a4035'
  ctx.font = '500 23px ' + SANS
  ctx.fillText(clip(d.author, 26), x0, ty)
  ty += 38
  if (d.sub) {
    ctx.fillStyle = '#7a6e5d'
    ctx.font = '400 18px ' + SANS
    ctx.fillText(clip(d.sub, 34), x0, ty)
  }

  const dy = ty + 30
  ctx.save()
  ctx.setLineDash([7, 7])
  ctx.strokeStyle = '#d9cba6'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(x0, dy)
  ctx.lineTo(x1, dy)
  ctx.stroke()
  ctx.restore()

  ctx.fillStyle = '#4a4035'
  ctx.font = '400 25px ' + SERIF
  let sy = dy + 54
  const sl = wrap(ctx, d.summary, x1 - x0, 4)
  for (let k = 0; k < sl.length; k++) {
    ctx.fillText(sl[k], x0, sy)
    sy += 43
  }

  // 底部二维码区
  const qTop = 806
  ctx.save()
  ctx.setLineDash([7, 7])
  ctx.strokeStyle = '#d9cba6'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(x0, qTop)
  ctx.lineTo(x1, qTop)
  ctx.stroke()
  ctx.restore()

  const qy = 838
  const qs = 188
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(x0 + 8, qy + 8, qs - 16, qs - 16)
  ctx.strokeStyle = '#e2d6bb'
  ctx.lineWidth = 1
  ctx.strokeRect(x0 + 8.5, qy + 8.5, qs - 17, qs - 17)
  paintQRInline(ctx, d.url, x0 + 8, qy + 8, qs - 16)

  const tx = x0 + qs + 34
  ctx.fillStyle = '#1f1a14'
  ctx.font = '600 27px ' + SERIF
  ctx.fillText('扫码阅读这一卷', tx, qy + 62)
  ctx.fillStyle = '#7a6e5d'
  ctx.font = '400 18px ' + SANS
  ctx.fillText('长按识别二维码', tx, qy + 100)
  ctx.font = '400 14px ' + SANS
  const ul = wrap(ctx, d.url.replace(/^https?:\/\//, ''), x1 - tx, 3)
  let uy = qy + 138
  for (let u = 0; u < ul.length; u++) {
    ctx.fillText(ul[u], tx, uy)
    uy += 23
  }

  ctx.textAlign = 'center'
  ctx.fillStyle = '#7a6e5d'
  ctx.font = '400 15px ' + SANS
  ctx.fillText('本系列用于个人学习，请勿商用 · 2026', PW / 2, 1072)
  ctx.textAlign = 'left'

  return d.url
}

function paintQRInline(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, size: number): void {
  let qr
  try {
    qr = QRCode.create(text, { errorCorrectionLevel: 'M' })
  } catch (e) {
    ctx.fillStyle = '#7a6e5d'
    ctx.font = '400 16px ' + SANS
    ctx.fillText('链接过长', x + 54, y + size / 2)
    return
  }
  const m = qr.modules
  const sz = m.size
  const qz = 2
  const unit = size / (sz + qz * 2)
  ctx.fillStyle = '#1f1a14'
  for (let r = 0; r < sz; r++) {
    for (let c = 0; c < sz; c++) {
      if (!m.data[r * sz + c]) continue
      const x0 = Math.round((c + qz) * unit)
      const y0 = Math.round((r + qz) * unit)
      const x1 = Math.round((c + qz + 1) * unit)
      const y1 = Math.round((r + qz + 1) * unit)
      ctx.fillRect(x + x0, y + y0, x1 - x0, y1 - y0)
    }
  }
}
