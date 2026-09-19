# 内容编辑手册

**本仓库只渲染内容，不创作内容。**

## 文案来源

| | |
|---|---|
| **拷贝源** | `../newboy/frontend/src/components/desktop/portfolioContent.ts` —— 线上 NewBoy 实际渲染的文本 |
| **审批闸门** | `../newboy/docs/content-review/` —— `release-1.md` 记录已确认事实与发布边界，`approved/` 是审批记录 |
| **迁移记录** | `../content/` —— 迁移映射与内容来源说明 |

```text
改 newboy 的 portfolioContent.ts
        ↓  手动迁移英文部分
本仓库 src/data/{workStories,researchStories}.ts
        ↓  npm run check:content
```

⚠️ **不要从 `docs/content-review/approved/*.md` 迁移文案** —— 那是审批记录，散文是摘要，不是上线文案。

⚠️ **不要在本仓库新写或改写公开文案。** 唯一的例外是纯版式标签（章节标题、Research 总览标题），且不得引入任何新的事实主张。

本仓库**只做英文**。`portfolioContent.ts` 是双语的，只取 `en`。

## 改完必须跑校验

```bash
npm run check:content
```

逐字段比较 6 个案例的标题、副标题、数字、小节标题、段落、bullet 与 prototype URL，有差异就非零退出。
需要 `../newboy/` 作为兄弟目录存在；路径变了用 `NEWBOY_CONTENT=/path/to/file.ts` 覆盖。

## Work

`src/data/workStories.ts`，字段与 NewBoy 的 `PortfolioEntry` 一一对应：

```ts
{
  id: 'project-id',
  title: 'Case-study title',              // ↔ portfolioContent.ts
  subtitle: 'One-line subtitle.',         // ↔
  metrics: [{ value: '2,409', label: 'enterprise organisations · cumulative portfolio' }],  // ↔
  sections: [
    { heading: 'Context: ...', paragraphs: ['…', '…'] },
    { heading: 'Product architecture: ...', items: ['…', '…'] },
  ],
  cover: '/works/project-id.png',         // 本站专用
  coverBg: 'rgba(227, 232, 228, 0.75)',   // 本站专用
}
```

- section 只有两种内容：`paragraphs` 或 `items`。
- 章节分组在 `src/data/osChapters.ts` 的 `WORK_CHAPTERS`。新增案例**必须**登记到某个 chapter 的 `storyIds`，否则不出现在列表里。
- 渲染在 `src/components/work/WorkStoryDetail.tsx`。

## Research

`src/data/researchStories.ts`。除上述 NewBoy 字段外，本站另有 `eyebrow`、`role`、`team`、`year`、`evidence`。

- `evidence` 用 `afterHeading` 按小节标题挂载报告插图；标题对不上就不渲染，改标题时记得同步。
- 详情页由 `src/components/research/ResearchDetail.tsx` 数据驱动渲染，不需要手写长页。
- 行号与路径在 `src/data/osResearch.ts`。

## 图片

- Work 封面放 `public/works/`，Research 图放 `public/research/<case-id>/`。
- 小写英文 + 连字符命名，补准确的 `alt`。
- 优先压缩后的 WebP/JPEG；删除敏感客户信息与未授权素材。
- 待核查：`public/works/` 四张封面的授权情况。

## About

`src/components/about/AboutMe.tsx` 直接维护个人定位、简介、经历、能力、教育背景与联系链接。
修改邮箱、LinkedIn 或任何数字时，逐项验证链接和口径。简历上线后放在 `public/cv/`，
并把 "coming soon" 占位换成原生下载链接。

## 发布前检查

1. `npm run typecheck && npm run lint && npm run build`
2. `npm run check:content`
3. 打开桌面与手机尺寸，核对改动页面
4. 检查图片、邮箱、LinkedIn、Figma 等链接
