# Yanfei Portfolio 技术文档

> 文档基线：2026-08-28。本文描述当前仓库中的真实实现，供开发、内容维护、上线检查和后续 AI 协作使用。

## 1. 项目概览

Yanfei Portfolio 是一个无后端、无客户端路由的单页作品集。首页模拟可交互桌面，访客通过 Work、Research 和 About Me 三个文件夹进入内容窗口。

- 技术栈：React 18、TypeScript 5、Vite 5、原生 CSS
- 数据来源：仓库内 TypeScript 文件
- 页面入口：`src/main.tsx` → `src/App.tsx` → `src/ui/IntroScreen.tsx`
- 发布产物：`dist/`
- 当前无：API、数据库、登录、状态管理库、路由库、测试框架、分析 SDK

## 2. 本地运行与质量检查

环境要求：建议使用当前 LTS 版本的 Node.js 和 npm。

```bash
npm install
npm run dev
```

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动 Vite 开发服务器，默认端口 `5173`。 |
| `npm run typecheck` | 运行 TypeScript 项目检查，不生成文件。 |
| `npm run lint` | 检查全部 TypeScript/TSX 文件。 |
| `npm run build` | 先执行 TypeScript 构建检查，再生成 `dist/`。 |
| `npm run preview` | 本地预览生产构建。 |

每次准备发布前至少运行：

```bash
npm run typecheck
npm run lint
npm run build
```

## 3. 目录与职责

```text
yanfei-portfolio/
├── public/
│   ├── fonts/                 展示字体
│   ├── intro/                 桌面背景、人物、眼睛和文件夹图标
│   ├── research/              Research 案例图片及旧文本素材
│   └── works/                 Work 卡片封面
├── src/
│   ├── components/
│   │   ├── about/             About Me 内容
│   │   ├── desktop/           SVG 桌面、人物状态和场景常量
│   │   ├── research/          Research 卡片和详情
│   │   ├── shared/            Work/Research 共享案例容器
│   │   ├── window/            通用内容窗口
│   │   └── work/              Work 卡片和详情
│   ├── data/
│   │   ├── researchStories.ts Research 数据模型和内容
│   │   └── workStories.ts     Work 数据模型和内容
│   ├── ui/IntroScreen.tsx     页面状态、交互编排和内容导航
│   ├── App.tsx                根组件
│   ├── main.tsx               React 挂载与全局样式入口
│   ├── styles/                Token、内容、案例、人物和无障碍样式
│   └── styles.css             现有场景、窗口与历史页面样式
├── documents/                 产品、技术、内容和整改文档
├── PROJECT.md                 产品目标与范围
├── TODO.md                    产品和工程待办
├── CHANGELOG.md               人工维护的变更记录
└── TECHNICAL.md               本文档
```

组件依赖关系：

```text
main.tsx
└── App
    └── IntroScreen
        ├── DesktopScene
        │   └── desktopConfig
        └── PortfolioWindow
            ├── WorkCard → WorkStoryDetail → workStories
            ├── ResearchCard → ResearchDetail → researchStories
            └── AboutMe
```

## 4. 页面状态与导航

网站没有 URL 路由，导航完全由 `IntroScreen` 的本地 React state 驱动。

| 状态 | 用途 |
| --- | --- |
| `openFolder` | 当前打开的 `work`、`research`、`aboutme`，或 `null`。 |
| `openItem` | 当前打开的 Work/Research 条目 ID；为空时显示文件夹列表。 |
| `char` / `openedChar` | 桌面状态和窗口打开状态下的人物位置与缩放。 |
| `folderPos` | 三个文件夹的可拖拽位置。 |
| `popGeom` | 内容窗口的宽、高和视口位置。 |
| `eyeSrc` | 当前眼睛方向图片。 |

```text
桌面
  └── 双击文件夹
      └── 文件夹列表 / About Me
          ├── 点击卡片 → 案例详情
          ├── Back → 文件夹列表
          └── Close → 桌面
```

刷新页面后会回到桌面，浏览器前进/后退不会切换案例，也不能通过独立 URL 直达案例。如果后续需要分享具体项目链接，应引入 URL 状态或路由。

## 5. 桌面交互实现

### 坐标系统

`DesktopScene` 使用 `2560 × 1440` 的 SVG viewBox，并通过 `preserveAspectRatio="xMidYMid slice"` 铺满视口。`IntroScreen` 中的 `clientToViewBox` 和 `viewBoxToClient` 负责屏幕坐标与 SVG 坐标互转。

修改人物、眼睛或文件夹素材时，要同时检查 `desktopConfig.ts` 的坐标常量和 `characterConfig.ts` 的状态素材配置。

### 人物

- 鼠标或单指拖动：改变人物位置。
- 指针悬停：根据指针相对眼睛的角度切换九张眼睛图片。
- 鼠标滚轮或双指：以指针/双指中心为锚点缩放。
- 打开文件夹：人物移动并缩小到左下；小于 `600px` 时隐藏。
- 关闭窗口：人物返回关闭前的位置。
- Work、Research、About Me 分别映射到电脑便签、书本放大镜和问候气泡 overlay。
- 人物状态由 `CHARACTER_STATES` 配置；正式分层人物可替换 body、overlay 和 animation class。

### 文件夹

- 单击/单指拖动：改变文件夹位置。
- 双击、Enter 或 Space：打开对应文件夹。
- 当前未持久化位置；刷新后恢复预设布局。

### 响应式布局

当 SVG 宽度小于 `1000px`，或宽高比小于 `1.1` 时，使用 compact 人物和文件夹坐标。内容窗口按视口重新计算：窄屏约占视口宽度的 92%，桌面则预留左侧人物空间。

关键断点分散在两处：

- JavaScript：`600px`、`1000px` 和宽高比 `1.1`
- CSS：主要为 `760px`、`640px`、`480px`

调整响应式行为时必须同时检查这两处，避免场景和内容窗口在断点附近不一致。

## 6. 内容系统

### Work

`src/data/workStories.ts` 是四个 Work 案例的唯一内容源。`WorkStory` 同时包含列表卡片字段、详情 Hero 字段和详情章节。

| `kind` | 渲染内容 |
| --- | --- |
| `story` | 标题、可选上下文和段落。 |
| `products` | 产品卡片或连接叙事。 |
| `decisions` | 编号决策列表。 |
| `outcomes` | 结果数字和反思段落。 |

段落仅支持 `<strong>…</strong>` 形式的行内强调，由 `WorkStoryDetail.tsx` 解析；它不是通用 HTML 渲染器。

### Research

`src/data/researchStories.ts` 是 Research 列表信息、通用详情 blocks 和原型链接的数据源。

- 普通案例由 `heading`、`paragraph`、`list` 三类 block 渲染。
- `healthcare-alerting` 当前在 `ResearchDetail.tsx` 中使用专门的长页组件和固定文案。
- `public/research/essay1.txt` 与 `essay2.txt` 是旧素材，当前组件不再读取它们。

Healthcare 的专用实现带来了更强的视觉表达，但内容不完全数据驱动。修改该案例时，需要同时检查 `researchStories.ts` 的卡片数据和 `ResearchDetail.tsx` 的详情内容。

### About Me

About Me 当前直接写在 `src/components/about/AboutMe.tsx` 中，包含简介、能力、指标、教育背景和联系方式。它没有独立数据文件，CV 下载仍是占位状态。

完整内容编辑方法见 `CONTENT-GUIDE.md`。

## 7. 样式与资源

样式按职责逐步拆分：

1. `styles/tokens.css`：Visual System v1 语义 Token 与栏目主题。
2. `styles/content.css`：Work/Research 列表和 About Me。
3. `styles/case-study.css`：Work/Research 案例详情与共享阅读节奏。
4. `styles/character.css`：人物状态和 overlay 动效。
5. `styles/accessibility.css`：Focus 与 reduced-motion。
6. `styles.css`：字体、Desktop、Popwindow 和尚未进一步拆分的原有规则。

已确认无组件引用的旧 `.section`、`.project`、`.essay` 样式已删除。新增视觉值应优先使用 `tokens.css`，不要在页面中继续硬编码近似颜色。

资源路径以 `/intro/...`、`/works/...`、`/research/...` 的 public 根路径形式引用。Vite 的 `base` 设置为 `./`，JS/CSS 构建产物使用相对路径，适合部署到子目录；但 public 资源的根路径引用在子路径托管时仍需实际验证。

页面当前引用的首页 WebP 素材合计约 1.02 MiB，优化前原 PNG 为 18.09 MiB。原 PNG 位于 `source-assets/intro/`，不会进入生产构建；运行时使用 `public/intro/` 的 WebP，并预加载背景、人物和默认眼睛，其余眼睛延迟缓存。

## 8. 可访问性与动效

已有基础：

- 内容窗口使用 `role="dialog"`、`aria-modal` 和 `aria-label`。
- Close、Back、Work 卡片和 Research 操作使用原生 button/link。
- 图片提供 `alt`。
- CSS 包含 `prefers-reduced-motion: reduce` 处理。

仍需注意：

- 文件夹支持 Enter/Space 打开；弹窗支持 Escape、焦点约束和关闭后焦点返回。
- 无路由导致详情不可被链接、书签和浏览器历史访问。

## 9. 构建与部署

`vite.config.ts` 将 `base` 设为 `./`，生产构建输出到默认的 `dist/`。仓库当前没有部署平台配置或 CI 工作流。

通用静态托管流程：

1. 运行 `npm ci`。
2. 运行 `npm run build`。
3. 将 `dist/` 作为静态目录发布。
4. 在线检查字体、public 图片、Figma 外链和子路径资源。

当前无需 SPA fallback，因为没有客户端 URL 路由。

## 10. 修改位置速查

| 目标 | 首选文件 |
| --- | --- |
| 修改 Work 内容/指标/封面引用 | `src/data/workStories.ts` |
| 修改 Research 卡片或通用案例内容 | `src/data/researchStories.ts` |
| 修改 Healthcare 专用详情 | `src/components/research/ResearchDetail.tsx` |
| 修改 About Me 和联系方式 | `src/components/about/AboutMe.tsx` |
| 修改人物、文件夹和窗口行为 | `src/ui/IntroScreen.tsx` |
| 修改 SVG 场景结构 | `src/components/desktop/DesktopScene.tsx` |
| 修改素材尺寸和默认文件夹坐标 | `src/components/desktop/desktopConfig.ts` |
| 修改人物状态、overlay 与素材映射 | `src/components/desktop/characterConfig.ts`、`src/styles/character.css` |
| 修改窗口框架 | `src/components/window/PortfolioWindow.tsx` |
| 修改颜色、空间与动效 Token | `src/styles/tokens.css` |
| 修改列表/About/详情布局 | `src/styles/content.css`、`src/styles/case-study.css` |
| 修改页面标题和 meta | `index.html` |
| 修改构建或开发服务器 | `vite.config.ts` |

## 11. 已知技术债与建议顺序

1. **可分享导航**：让文件夹和案例状态进入 URL。
2. **正式人物素材**：用分层 Work/Research/About 人物替换当前 overlay 原型。
3. **内容一致性**：将 Healthcare 专用详情逐步数据化，避免同一案例分散维护。
4. **自动验证**：至少为数据完整性和关键导航增加轻量测试。
5. **发布工程**：补充部署配置、CI、SEO 和分享图。

这些是建议，不代表需要一次性重构。优先保持现有交互稳定，以小步改动配合浏览器回归检查。

## 12. 人工验收清单

- 桌面宽屏：人物、眼睛、三个文件夹和窗口位置正常。
- 窄桌面/竖屏：compact 布局切换正常，无跳位或遮挡。
- 手机：人物在打开窗口后隐藏，窗口不横向溢出。
- 人物可拖动、滚轮/双指可缩放，眼睛可跟随指针。
- 文件夹可拖动、双击可打开，关闭后人物正确返回。
- Work/Research 列表、详情、Back 和 Close 都可用。
- 长页面可以完整滚动；外部 Figma 链接在新标签页打开。
- About Me 的邮箱和 LinkedIn 链接正确。
- 开启“减少动态效果”后没有明显多余动画。
- `npm run typecheck`、`npm run lint`、`npm run build` 全部通过。

## 13. AI 协作请求模板

```text
目标：
允许修改的文件或模块：
不应改变：
桌面/手机验收标准：
内容与数据依据：
是否允许新增依赖：
```

示例：

```text
目标：为 About Me 加入可下载的英文 CV。
允许修改的文件或模块：AboutMe.tsx、styles.css、public/cv/。
不应改变：Work、Research 和首页人物交互。
桌面/手机验收标准：链接可访问，按钮不溢出，键盘焦点清晰。
内容与数据依据：使用我提供的 CV 文件和文件名。
是否允许新增依赖：否。
```
