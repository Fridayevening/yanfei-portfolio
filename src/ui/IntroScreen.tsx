import { useCallback, useEffect, useRef, useState } from 'react'
import { WORK_STORIES, type WorkStory } from '../data/workStories'

// ================================================================
// 开场动画：bg1（背景）→ bg2（前景）→ 人物
// viewBox 与背景图一致（2560×1440，16:9），保证背景铺满、无空白区
// ================================================================
const VB_W = 2560
const VB_H = 1440

// 背景图尺寸（bg1 / bg2 均为 2560×1440，铺满整个画布）
const BG_W = 2560
const BG_H = 1440

// 人物画布尺寸（onlygirl.png 的 1x 尺寸，比背景高）
const CHAR_IMG_W = 2560
const CHAR_IMG_H = 1696

// 眼睛位置（Figma 1x: dx=1208, dy=527, 524×189；2x 文件 1048×378）
const EYE_X = 1208
const EYE_Y = 527
const EYE_W = 524
const EYE_H = 189

// ---- 默认人物参数（用户调定）----
const DEFAULT_CHAR = { x: 163, y: 366, scale: 0.55 }
const COMPACT_CHAR = { x: 400, y: 680, scale: 0.27 }

// ---- 人物缩放范围 ----
const SCALE_MIN = 0.05
const SCALE_MAX = 2

// ---- 眼睛方向映射 ----
const DIRECTION_MAP: Record<string, string> = {
  center:      '/intro/eye-center.png',
  right:       '/intro/eye-right.png',
  'up-right':  '/intro/eye-up-right.png',
  up:          '/intro/eye-up.png',
  'up-left':   '/intro/eye-up-left.png',
  left:        '/intro/eye-left.png',
  'down-left': '/intro/eye-down-left.png',
  down:        '/intro/eye-down.png',
  'down-right':'/intro/eye-down-right.png',
}

function angleToDirection(angleDeg: number): string {
  if (angleDeg >= 337.5 || angleDeg < 22.5)   return 'right'
  if (angleDeg >= 22.5  && angleDeg < 67.5)   return 'up-right'
  if (angleDeg >= 67.5  && angleDeg < 112.5)  return 'up'
  if (angleDeg >= 112.5 && angleDeg < 157.5)  return 'up-left'
  if (angleDeg >= 157.5 && angleDeg < 202.5)  return 'left'
  if (angleDeg >= 202.5 && angleDeg < 247.5)  return 'down-left'
  if (angleDeg >= 247.5 && angleDeg < 292.5)  return 'down'
  return 'down-right'
}

// ---- 打开文件夹后：人物收缩到左下 + bg2 淡出 ----
const OPENED_CHAR = { x: 25, y: 1039, scale: 0.23 }

function getOpenedChar(viewportWidth: number, viewportHeight: number) {
  if (viewportWidth < 600) return { x: 0, y: 0, scale: 0 }

  const aspect = viewportWidth / viewportHeight
  const visibleW = Math.min(VB_W, VB_H * aspect)
  const visibleLeft = (VB_W - visibleW) / 2
  const compact = viewportWidth < 1000 || aspect < 1.1
  const preferredScale = compact ? 0.17 : 0.23
  const svgScale = Math.max(viewportWidth / VB_W, viewportHeight / VB_H)
  const maxScaleForGutter = (viewportWidth * 0.2) / (CHAR_IMG_W * svgScale)
  const scale = Math.min(preferredScale, maxScaleForGutter)

  return {
    x: Math.round(visibleLeft + visibleW * 0.025),
    y: Math.round(VB_H - CHAR_IMG_H * scale - 12),
    scale,
  }
}

// ---- popwindow 默认大小/位置 ----
const DEFAULT_POP = { width: 1277, titlebarH: 53, contentH: 700, contentW: 1200, left: 61, top: 48 }

// ---- 窗口默认几何（居右：右边缘距右 5%，垂直居中）----
const defaultPopGeom = () => {
  const vw = typeof window === 'undefined' ? 1440 : window.innerWidth
  const vh = typeof window === 'undefined' ? 900 : window.innerHeight
  const narrowViewport = vw < 600
  const characterGutter = Math.round(vw * 0.24)
  const rightMargin = Math.max(16, Math.round(vw * 0.035))
  const w = narrowViewport
    ? Math.round(vw * 0.92)
    : Math.min(DEFAULT_POP.width, vw - characterGutter - rightMargin)
  const h = Math.min(DEFAULT_POP.titlebarH + DEFAULT_POP.contentH + 2, Math.round(vh * 0.92))
  return {
    w,
    h,
    x: narrowViewport
      ? Math.round((vw - w) / 2)
      : Math.max(characterGutter, vw - rightMargin - w),
    y: Math.max(0, Math.round((vh - h) / 2)),
  }
}

// ---- 文件夹 ----
type FolderKey = 'work' | 'research' | 'aboutme'
const FOLDER_SIZE = 90

interface FolderDef {
  key: FolderKey
  label: string
  icon: string
  x: number
  y: number
}

const FOLDERS: FolderDef[] = [
  { key: 'research', label: 'Research', icon: '/intro/researchicon.png', x: 588, y: 390 },
  { key: 'work', label: 'Work', icon: '/intro/workicon.png', x: 988, y: 183 },
  { key: 'aboutme', label: 'About Me', icon: '/intro/aboutmeicon.png', x: 1452, y: 518 },
]

const DEFAULT_FOLDER_POS = Object.fromEntries(FOLDERS.map(f => [f.key, { x: f.x, y: f.y }])) as Record<FolderKey, { x: number; y: number }>
const COMPACT_FOLDER_POS: Record<FolderKey, { x: number; y: number }> = {
  research: { x: 1050, y: 460 },
  work: { x: 1280, y: 240 },
  aboutme: { x: 1500, y: 460 },
}

// ---- 弹窗内容 ----
type ContentBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }

interface FolderItem {
  id: string
  title: string
  subtitle: string
  metrics?: { value: string; label: string }[]
  blocks?: ContentBlock[]
  textFile?: string
  storyId?: string
}

interface FolderContent {
  title: string
  items: FolderItem[]
}

const FOLDER_CONTENT: Record<FolderKey, FolderContent> = {
  work: {
    title: 'Yanfei\\Work',
    items: [
      {
        id: 'workspace-saas',
        title: 'Uniubi · International Product Line',
        subtitle: 'Hardware + software, built from zero · 16 countries',
        metrics: [
          { value: '850K+', label: 'employees' },
          { value: '5,381', label: 'organizations' },
          { value: '7,610', label: 'devices' },
        ],
        storyId: 'workspace-saas',
      },
      {
        id: 'uzhi-space',
        title: 'U智空间 · China Market Platform',
        subtitle: 'Validated abroad, then brought it home',
        metrics: [
          { value: '294K', label: 'MAU' },
          { value: '2,409', label: 'enterprise clients' },
          { value: '15', label: 'admin modules' },
        ],
        storyId: 'uzhi-space',
      },
      {
        id: 'ops-analytics',
        title: 'Operations Analytics & Supply Chain',
        subtitle: 'The system nobody had on their roadmap',
        metrics: [
          { value: '100%', label: 'catalogue managed' },
          { value: '3', label: 'core dashboards' },
        ],
        storyId: 'ops-analytics',
      },
      {
        id: 'kreai',
        title: 'KreAI · AI Creator Business Platform',
        subtitle: 'Six versions in six months — then the users ran out',
        metrics: [
          { value: '25%', label: 'adoption improvement' },
          { value: '6', label: 'versions in 6 months' },
        ],
        storyId: 'kreai',
      },
    ],
  },
  research: {
    title: 'Yanfei\\Research',
    items: [
      {
        id: 'essay1',
        title: 'Revolutionising Patient Care',
        subtitle: 'How might we develop a secure system of alerting doctors of an urgent lab result?',
        textFile: '/research/essay1.txt',
      },
      {
        id: 'essay2',
        title: 'User Centered Design — Design Project',
        subtitle: 'Group design project · Yanfei Wang et al.',
        textFile: '/research/essay2.txt',
      },
    ],
  },
  aboutme: {
    title: 'Yanfei\\About Me',
    items: [],
  },
}

// ---- 行内加粗：把 <strong>…</strong> 转成 React 元素 ----
function renderInline(text: string) {
  return text.split(/(<strong>.*?<\/strong>)/g).map((part, i) =>
    part.startsWith('<strong>') && part.endsWith('</strong>') ? (
      <strong key={i}>{part.slice(8, -9)}</strong>
    ) : (
      part
    ),
  )
}

// ---- 叙事式 Project 详情（数据驱动） ----
function StoryDetail({ story }: { story: WorkStory }) {
  return (
    <div className="work-story">
      <section className="ws-hero">
        <p className="ws-kicker">{story.kicker}</p>
        <h2 className="ws-title">
          {story.titleLines.map((line, i) => (
            <span key={i} className="ws-title-line">
              {line}
              {i < story.titleLines.length - 1 ? <br /> : null}
            </span>
          ))}
        </h2>
        <p className="ws-hero-desc">{story.heroDesc}</p>
        <div className="ws-hero-image" style={{ backgroundColor: story.coverBg }}>
          <img src={story.cover} alt={story.kicker} />
        </div>
        <div className="ws-metrics">
          {story.metrics.map((m, i) => (
            <div key={i} className="ws-metric">
              {m.value ? <span className="ws-metric-value">{m.value}</span> : null}
              <span className="ws-metric-label">{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {story.sections.map((s, i) => {
        switch (s.kind) {
          case 'story':
            return (
              <section key={i} className="ws-section">
                <h3 className="ws-h">{s.heading}</h3>
                {s.context && <p className="ws-context">{s.context}</p>}
                {s.paragraphs.map((p, j) => (
                  <p key={j} className="ws-p">{renderInline(p)}</p>
                ))}
              </section>
            )
          case 'products':
            return (
              <section key={i} className="ws-section">
                <h3 className="ws-h">{s.heading}</h3>
                {s.desc && <p className="ws-section-desc">{s.desc}</p>}
                <div className="ws-cards">
                  {s.items.map((item, j) =>
                    item.kind === 'connector' ? (
                      <div key={j} className="ws-connector">
                        <p>{renderInline(item.text)}</p>
                      </div>
                    ) : (
                      <div key={j} className="ws-card">
                        <div className="ws-card-icon">{item.icon}</div>
                        <div className="ws-card-body">
                          <h4 className="ws-card-title">{item.title}</h4>
                          {item.type && <p className="ws-card-type">{item.type}</p>}
                          {item.paragraphs.map((p, k) => (
                            <p key={k} className="ws-p">{renderInline(p)}</p>
                          ))}
                          {item.meta && <p className="ws-card-meta">{item.meta}</p>}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </section>
            )
          case 'decisions':
            return (
              <section key={i} className="ws-section">
                <h3 className="ws-h">{s.heading}</h3>
                <div className="ws-decisions">
                  {s.items.map((d, j) => (
                    <div key={j} className="ws-decision">
                      <span className="ws-decision-no">{d.number}</span>
                      <div className="ws-decision-body">
                        <h4 className="ws-decision-title">{d.title}</h4>
                        <p className="ws-p">{renderInline(d.text)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          case 'outcomes':
            return (
              <section key={i} className="ws-section ws-outcomes">
                <h3 className="ws-h ws-outcomes-h">{s.heading}</h3>
                {s.grid && (
                  <div className="ws-outcome-grid">
                    {s.grid.map((o, j) => (
                      <div key={j} className="ws-outcome">
                        <span className="ws-outcome-value">{o.value}</span>
                        <span className="ws-outcome-label">{o.label}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="ws-reflection">
                  {s.reflections.map((r, j) => (
                    <p key={j} className="ws-p">{renderInline(r)}</p>
                  ))}
                </div>
              </section>
            )
          default:
            return null
        }
      })}
    </div>
  )
}

export default function IntroScreen() {
  const [char, setChar] = useState(DEFAULT_CHAR)
  const charRef = useRef(char)
  charRef.current = char
  const [openedChar, setOpenedChar] = useState(OPENED_CHAR)
  const svgRef = useRef<SVGSVGElement>(null)
  const layoutModeRef = useRef<'desktop' | 'compact' | null>(null)
  const layoutTransitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const charGroupRef = useRef<SVGGElement>(null)
  const isDraggingRef = useRef(false)
  const dragStartRef = useRef({ vbX: 0, vbY: 0, charX: 0, charY: 0 })
  const pinchRef = useRef<{ dist: number; scale: number; cx: number; cy: number } | null>(null)

  // ---- 眼睛方向状态 ----
  const [eyeSrc, setEyeSrc] = useState(DIRECTION_MAP.center)
  const currentDirRef = useRef('center')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const returnRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ---- 文件夹：打开状态 + 位置（可拖动） ----
  const [openFolder, setOpenFolder] = useState<FolderKey | null>(null)
  const openFolderRef = useRef(openFolder)
  openFolderRef.current = openFolder
  const [folderPos, setFolderPos] = useState<Record<FolderKey, { x: number; y: number }>>(DEFAULT_FOLDER_POS)
  const folderPosRef = useRef(folderPos)
  folderPosRef.current = folderPos
  const folderDragRef = useRef<{ key: FolderKey; vbX: number; vbY: number; startX: number; startY: number } | null>(null)

  // ---- 人物拖拽中（用于关闭位移动画） ----
  const [dragging, setDragging] = useState(false)
  const [layoutTransitioning, setLayoutTransitioning] = useState(false)

  // ---- 窗口内导航：打开的条目（列表 → 详情） ----
  const [openItem, setOpenItem] = useState<string | null>(null)
  const [essayText, setEssayText] = useState<string | null>(null)

  const [popGeom, setPopGeom] = useState(defaultPopGeom)

  // 人物实际显示位（打开文件夹后收缩到左下）
  const displayChar = openFolder ? openedChar : char
  const displayCharRef = useRef(displayChar)
  displayCharRef.current = displayChar

  // 窄屏使用独立构图；回到桌面布局时，恢复桌面默认参数而非沿用缩小后的状态。
  useEffect(() => {
    const updateLayout = () => {
      const svg = svgRef.current
      if (!svg) return
      const rect = svg.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      const compact = rect.width < 1000 || rect.width / rect.height < 1.1
      const nextMode = compact ? 'compact' : 'desktop'

      // 这两项依赖实际视口：每次 resize 都要刷新，不能只在布局模式切换时更新。
      setLayoutTransitioning(true)
      if (layoutTransitionTimerRef.current) clearTimeout(layoutTransitionTimerRef.current)
      layoutTransitionTimerRef.current = setTimeout(() => setLayoutTransitioning(false), 180)
      setOpenedChar(getOpenedChar(rect.width, rect.height))
      setPopGeom(defaultPopGeom())

      if (layoutModeRef.current === nextMode) return
      layoutModeRef.current = nextMode

      if (compact) {
        setChar(COMPACT_CHAR)
        setFolderPos(COMPACT_FOLDER_POS)
      } else {
        setChar(DEFAULT_CHAR)
        setFolderPos(DEFAULT_FOLDER_POS)
      }
    }
    updateLayout()
    window.addEventListener('resize', updateLayout)
    return () => {
      window.removeEventListener('resize', updateLayout)
      if (layoutTransitionTimerRef.current) clearTimeout(layoutTransitionTimerRef.current)
    }
  }, [])

  // 当前打开的文件夹内容 + 选中的条目
  const activeFolder = openFolder ? FOLDER_CONTENT[openFolder] : null
  const activeItem = activeFolder && openItem ? activeFolder.items.find(i => i.id === openItem) : null
  const activeStory = activeItem?.storyId ? WORK_STORIES.find(s => s.id === activeItem.storyId) : null

  // ---- client 坐标 → viewBox 坐标（slice 模式：内容铺满并裁边） ----
  const clientToViewBox = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current
    if (!svg) return { x: 0, y: 0 }
    const rect = svg.getBoundingClientRect()
    const s = Math.max(rect.width / VB_W, rect.height / VB_H)
    const ox = (rect.width - VB_W * s) / 2
    const oy = (rect.height - VB_H * s) / 2
    return { x: (clientX - rect.left - ox) / s, y: (clientY - rect.top - oy) / s }
  }, [])

  // ---- viewBox 坐标 → client 坐标（slice 模式） ----
  const viewBoxToClient = useCallback((vx: number, vy: number) => {
    const svg = svgRef.current
    if (!svg) return { x: 0, y: 0 }
    const rect = svg.getBoundingClientRect()
    const s = Math.max(rect.width / VB_W, rect.height / VB_H)
    const ox = (rect.width - VB_W * s) / 2
    const oy = (rect.height - VB_H * s) / 2
    return { x: rect.left + ox + vx * s, y: rect.top + oy + vy * s }
  }, [])

  // ---- 计算鼠标相对眼睛的方向 ----
  const getDirection = useCallback((clientX: number, clientY: number): string => {
    const c = displayCharRef.current
    const eyeVbCx = c.x + EYE_X * c.scale + (EYE_W * c.scale) / 2
    const eyeVbCy = c.y + EYE_Y * c.scale + (EYE_H * c.scale) / 2
    const eyeScreen = viewBoxToClient(eyeVbCx, eyeVbCy)
    const dx = clientX - eyeScreen.x
    const dy = clientY - eyeScreen.y
    if (Math.abs(dx) < 30 && Math.abs(dy) < 30) return 'center'
    let angleDeg = (Math.atan2(-dy, dx) * 180) / Math.PI
    if (angleDeg < 0) angleDeg += 360
    return angleToDirection(angleDeg)
  }, [viewBoxToClient])

  // ---- 方向切换（40ms 防抖，避免扇区边界抖动） ----
  const switchTo = useCallback((dir: string) => {
    if (dir === currentDirRef.current) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      if (dir === currentDirRef.current) return
      currentDirRef.current = dir
      setEyeSrc(DIRECTION_MAP[dir])
    }, 40)
  }, [])

  // ---- 人物拖拽开始 ----
  const handleDragStart = useCallback((clientX: number, clientY: number) => {
    if (openFolderRef.current) return
    const p = clientToViewBox(clientX, clientY)
    isDraggingRef.current = true
    pinchRef.current = null
    setDragging(true)
    dragStartRef.current = { vbX: p.x, vbY: p.y, charX: charRef.current.x, charY: charRef.current.y }
  }, [clientToViewBox])

  // ---- 文件夹拖拽开始 ----
  const startFolderDrag = useCallback((key: FolderKey, clientX: number, clientY: number) => {
    if (openFolderRef.current) return
    const p = clientToViewBox(clientX, clientY)
    folderDragRef.current = { key, vbX: p.x, vbY: p.y, startX: folderPosRef.current[key].x, startY: folderPosRef.current[key].y }
  }, [clientToViewBox])

  // ---- 缩放：围绕锚点缩放，保持锚点下的画面不动 ----
  const applyScale = useCallback((nextScale: number, ax: number, ay: number) => {
    setChar(prev => {
      const s = Math.min(SCALE_MAX, Math.max(SCALE_MIN, nextScale))
      if (s === prev.scale) return prev
      return {
        x: ax - ((ax - prev.x) * s) / prev.scale,
        y: ay - ((ay - prev.y) * s) / prev.scale,
        scale: s,
      }
    })
  }, [])

  // ---- 鼠标拖拽 / 触摸拖动 + 双指缩放 ----
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // 文件夹拖拽
      if (folderDragRef.current) {
        const p = clientToViewBox(e.clientX, e.clientY)
        const dx = p.x - folderDragRef.current.vbX
        const dy = p.y - folderDragRef.current.vbY
        const key = folderDragRef.current.key
        setFolderPos(prev => ({ ...prev, [key]: { x: folderDragRef.current!.startX + dx, y: folderDragRef.current!.startY + dy } }))
        return
      }
      // 人物拖拽
      if (isDraggingRef.current) {
        const p = clientToViewBox(e.clientX, e.clientY)
        const dx = p.x - dragStartRef.current.vbX
        const dy = p.y - dragStartRef.current.vbY
        setChar(prev => ({ ...prev, x: dragStartRef.current.charX + dx, y: dragStartRef.current.charY + dy }))
        return
      }
      if (returnRef.current) clearTimeout(returnRef.current)
      switchTo(getDirection(e.clientX, e.clientY))
    }

    const onUp = () => {
      isDraggingRef.current = false
      folderDragRef.current = null
      setDragging(false)
    }

    const onLeave = () => {
      isDraggingRef.current = false
      folderDragRef.current = null
      setDragging(false)
      returnRef.current = setTimeout(() => switchTo('center'), 300)
    }

    const onTouch = (e: TouchEvent) => {
      if (e.touches.length >= 2) {
        const [a, b] = [e.touches[0], e.touches[1]]
        const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
        const p = clientToViewBox((a.clientX + b.clientX) / 2, (a.clientY + b.clientY) / 2)
        isDraggingRef.current = false
        if (!pinchRef.current) {
          pinchRef.current = { dist, scale: charRef.current.scale, cx: p.x, cy: p.y }
          return
        }
        applyScale(pinchRef.current.scale * (dist / pinchRef.current.dist), pinchRef.current.cx, pinchRef.current.cy)
        return
      }
      pinchRef.current = null
      const t = e.touches[0]
      if (isDraggingRef.current) {
        const p = clientToViewBox(t.clientX, t.clientY)
        const dx = p.x - dragStartRef.current.vbX
        const dy = p.y - dragStartRef.current.vbY
        setChar(prev => ({ ...prev, x: dragStartRef.current.charX + dx, y: dragStartRef.current.charY + dy }))
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchend', onUp)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchend', onUp)
      window.removeEventListener('mouseleave', onLeave)
      if (debounceRef.current) clearTimeout(debounceRef.current)
      if (returnRef.current) clearTimeout(returnRef.current)
    }
  }, [clientToViewBox, applyScale, getDirection, switchTo])

  // ---- 滚轮缩放（指针悬停在人物上时，围绕指针缩放） ----
  useEffect(() => {
    const el = charGroupRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (openFolderRef.current) return
      e.preventDefault()
      const p = clientToViewBox(e.clientX, e.clientY)
      const factor = e.deltaY < 0 ? 1.08 : 1 / 1.08
      applyScale(charRef.current.scale * factor, p.x, p.y)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [clientToViewBox, applyScale])

  // ---- 加载 essay 文本 ----
  useEffect(() => {
    if (!openFolder || !openItem) { setEssayText(null); return }
    const it = FOLDER_CONTENT[openFolder].items.find(i => i.id === openItem)
    if (!it?.textFile) { setEssayText(null); return }
    let cancelled = false
    fetch(it.textFile).then(r => r.text()).then(t => { if (!cancelled) setEssayText(t) })
    return () => { cancelled = true }
  }, [openFolder, openItem])

  return (
    <div className="intro-screen">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        className="intro-svg"
      >
        {/* 细微噪点 + 扫描线 */}
        <defs>
          <filter id="noise-subtle">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <pattern id="scan-subtle" width="2" height="5" patternUnits="userSpaceOnUse">
            <rect width="2" height="1" fill="rgba(0,0,0,0.02)" />
          </pattern>
        </defs>

        {/* ① 背景图 bg1（最底层，铺满画布） */}
        <image href="/intro/bg1.png" x="0" y="0" width={BG_W} height={BG_H} />

        {/* ② 前景图 bg2（打开文件夹后淡出） */}
        <image
          href="/intro/bg2.png"
          x="0" y="0" width={BG_W} height={BG_H}
          style={{ opacity: openFolder ? 0 : 1, transition: 'opacity 0.6s ease' }}
        />

        <rect x="0" y="0" width={VB_W} height={VB_H} filter="url(#noise-subtle)" opacity="0.04" style={{ mixBlendMode: 'multiply' as const }} />
        <rect x="0" y="0" width={VB_W} height={VB_H} fill="url(#scan-subtle)" />

        {/* ③ 人物 + 眼睛（可拖动 / 滚轮缩放 / 眼睛跟随；打开文件夹后收缩到左下） */}
        <g
          ref={charGroupRef}
          style={{
            transform: `translate(${displayChar.x}px, ${displayChar.y}px) scale(${displayChar.scale})`,
            transformOrigin: '0 0',
            opacity: openFolder && displayChar.scale === 0 ? 0 : 1,
            transition: layoutTransitioning
              ? 'opacity 0.18s ease-out'
              : dragging
                ? 'none'
                : 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
            cursor: openFolder ? 'default' : 'grab',
          }}
          onMouseDown={(e) => { if (openFolder) return; e.stopPropagation(); e.preventDefault(); handleDragStart(e.clientX, e.clientY) }}
          onTouchStart={(e) => { if (openFolder) return; e.stopPropagation(); if (e.touches.length >= 2) return; const t = e.touches[0]; handleDragStart(t.clientX, t.clientY) }}
        >
          <image href="/intro/onlygirl.png" x="0" y="0" width={CHAR_IMG_W} height={CHAR_IMG_H} />
          <image href={eyeSrc} x={EYE_X} y={EYE_Y} width={EYE_W} height={EYE_H} />
        </g>

        {/* ④ 文件夹（可拖动 / 双击打开） */}
        {FOLDERS.map(f => (
          <g
            key={f.key}
            transform={`translate(${folderPos[f.key].x}, ${folderPos[f.key].y})`}
            style={{
              opacity: openFolder ? 0 : 1,
              transition: 'opacity 0.4s ease',
              pointerEvents: openFolder ? 'none' : 'auto',
              cursor: 'grab',
            }}
            onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); startFolderDrag(f.key, e.clientX, e.clientY) }}
            onDoubleClick={() => { setOpenFolder(f.key); setOpenItem(null) }}
          >
            <image href={f.icon} x={-FOLDER_SIZE / 2} y={-FOLDER_SIZE / 2} width={FOLDER_SIZE} height={FOLDER_SIZE} />
            <text x="0" y={FOLDER_SIZE / 2 + 44} className="folder-label">{f.label}</text>
          </g>
        ))}
      </svg>

      {/* 弹窗 popwindow（浏览器式窗口） */}
      {openFolder && activeFolder && (
        <div className="popwindow" style={{ width: `${popGeom.w}px`, height: `${popGeom.h}px`, left: `${popGeom.x}px`, top: `${popGeom.y}px` }}>
          <div className="popwindow__titlebar" style={{ height: `${DEFAULT_POP.titlebarH}px` }}>
            <span className="popwindow__dots"><span /><span /><span /></span>
            <span className="popwindow__title">{activeItem ? `${activeFolder.title}\\${activeItem.title}` : activeFolder.title}</span>
            <button className="popwindow__close" onClick={() => setOpenFolder(null)} aria-label="关闭">✕</button>
          </div>
          <div className="popwindow__content">
            {activeItem ? (
              activeStory ? (
                <>
                  <button className="popwindow__back" onClick={() => setOpenItem(null)}>← 返回</button>
                  <StoryDetail story={activeStory} />
                </>
              ) : (
                <>
                  <button className="popwindow__back" onClick={() => setOpenItem(null)}>← 返回</button>
                  {activeItem.metrics && (
                    <div className="popwindow__metrics">
                      {activeItem.metrics.map((m, i) => (
                        <div key={i} className="popwindow__metric">
                          <span className="popwindow__metric-value">{m.value}</span>
                          <span className="popwindow__metric-label">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeItem.textFile ? (
                    essayText == null ? (
                      <p className="popwindow__p">加载中…</p>
                    ) : (
                      <div className="popwindow__essay">
                        {essayText.split('\n').filter(l => l.trim()).map((line, i) => (
                          <p key={i} className="popwindow__p">{line}</p>
                        ))}
                      </div>
                    )
                  ) : (
                    activeItem.blocks?.map((b, i) => {
                      if (b.type === 'heading') return <h3 key={i} className="popwindow__h">{b.text}</h3>
                      if (b.type === 'list') return <ul key={i} className="popwindow__list">{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
                      return <p key={i} className="popwindow__p">{b.text}</p>
                    })
                  )}
                </>
              )
            ) : (
              activeFolder.items.length === 0 ? (
                <p className="popwindow__p">内容待补充…</p>
              ) : activeFolder.items.some(it => it.storyId) ? (
                <div className="work-grid">
                  {activeFolder.items.map(it => {
                    const story = it.storyId ? WORK_STORIES.find(s => s.id === it.storyId) : null
                    if (!story) return null
                    return (
                      <button key={it.id} className="work-card" onClick={() => setOpenItem(it.id)}>
                        <div className="work-card-cover" style={{ backgroundColor: story.coverBg }}>
                          <img src={story.cover} alt={it.title} loading="lazy" />
                        </div>
                        <div className="work-card-body">
                          <span className="work-card-kicker">{story.cardKicker}</span>
                          <h3 className="work-card-title">{it.title}</h3>
                          <p className="work-card-desc">{it.subtitle}</p>
                          {it.metrics && it.metrics.length > 0 && (
                            <div className="work-card-tags">
                              {it.metrics.map((m, i) => (
                                <span key={i} className="work-card-tag">
                                  <em>{m.value}</em> {m.label}
                                </span>
                              ))}
                            </div>
                          )}
                          <span className="work-card-link">View project →</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className="popwindow__listview">
                  {activeFolder.items.map(it => (
                    <button key={it.id} className="popwindow__listitem" onClick={() => setOpenItem(it.id)}>
                      <span className="popwindow__listitem-title">{it.title}</span>
                      <span className="popwindow__listitem-sub">{it.subtitle}</span>
                      {it.metrics && it.metrics[0] && (
                        <span className="popwindow__listitem-metric">{it.metrics[0].value} <em>{it.metrics[0].label}</em></span>
                      )}
                    </button>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      )}

    </div>
  )
}
