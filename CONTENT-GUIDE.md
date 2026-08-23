# 内容编辑手册

## 新增项目案例

在 `src/data/workStories.ts` 的 `WORK_STORIES` 数组中新增一项，并在 `IntroScreen.tsx` 的 Work 文件夹清单里添加同一个 `storyId`。

最小结构：

```ts
{
  id: 'project-id',
  cover: '/works/project-id.png',
  coverBg: 'rgba(227, 232, 228, 0.75)',
  cardKicker: '类别 · 阶段',
  kicker: '项目名称',
  titleLines: ['一句核心成果', '第二行可选'],
  heroDesc: '项目简介。',
  metrics: [{ value: '12%', label: '关键结果' }],
  sections: [
    { kind: 'story', heading: '背景', paragraphs: ['…'] },
    { kind: 'decisions', heading: '关键判断', items: [{ number: '01', title: '…', text: '…' }] },
    { kind: 'outcomes', heading: '结果', reflections: ['…'] },
  ],
}
```

`paragraphs`、`text` 和 `reflections` 中可用 `<strong>重点</strong>` 标记加粗；不要放入不可信的 HTML。

## 图片规范

- 项目封面放到 `public/works/`，并用 `/works/文件名.png` 引用。
- 保持横向构图，优先 WebP 或优化后的 PNG/JPEG。
- 文件名使用小写英文和连字符，例如 `supply-chain.png`。
- 图片应删除敏感客户信息、个人数据与未授权素材。

## 新增 Research 内容

1. 在 `public/research/` 新建 UTF-8 编码的 `.txt` 文件。
2. 在 `IntroScreen.tsx` 的 `FOLDER_CONTENT.research.items` 中增加标题、摘要和 `textFile` 路径。
3. 在浏览器中打开并检查段落与滚动。

## 案例写作顺序

背景与约束 → 真实问题 → 你的判断 → 实施方式 → 可验证结果 → 反思。

数字应说明口径；没有可靠数字时，使用具体事实或行为变化，不要编造指标。
