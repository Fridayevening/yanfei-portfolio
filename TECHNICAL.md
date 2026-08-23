# 技术说明

## 运行

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
```

`npm run build` 必须在每次准备发布前成功完成。

## 当前架构

```text
src/main.tsx
  └── src/App.tsx
        └── src/ui/IntroScreen.tsx
              └── src/data/workStories.ts
```

这是无后端、无路由的 React + TypeScript + Vite 单页网站。

| 位置 | 职责 |
| --- | --- |
| `src/ui/IntroScreen.tsx` | 首页 SVG 桌面、人物/文件夹交互、弹窗与内容渲染。 |
| `src/data/workStories.ts` | 四个 Work 案例的唯一内容数据源。 |
| `src/styles.css` | 所有视觉样式与响应式规则。 |
| `public/intro/` | 背景、人物、眼睛方向与文件夹图标。 |
| `public/works/` | 项目案例封面图。 |
| `public/research/` | Research 文件夹加载的纯文本文章。 |

## 修改规则

- 新增或修改项目案例：先改 `src/data/workStories.ts`，不要把文案硬编码到组件。
- 修改页面行为或文件夹内容：改 `src/ui/IntroScreen.tsx`。
- 修改布局、颜色、间距、移动端显示：改 `src/styles.css`。
- 新增图片前压缩图片，并使用清晰、稳定的文件名。
- 未经明确要求，不新增 npm 依赖、不大规模重构、不删除素材。
- 每次修改后执行 typecheck、lint、build；涉及视觉时再用浏览器检查桌面和手机宽度。

## AI 修改请求模板

```text
目标：
范围：允许修改哪些文件：
不应改变：
验收标准：
需要我解释的产品背景：
```

示例：

```text
目标：为 About Me 文件夹加入简介和联系方式。
范围：只修改 IntroScreen.tsx 和 styles.css。
不应改变：Work 与 Research 的现有交互、首页人物位置。
验收标准：双击 About Me 后能阅读简介，邮箱链接可点击，手机宽度不溢出。
```
