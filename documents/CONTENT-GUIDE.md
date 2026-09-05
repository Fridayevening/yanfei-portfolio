# 内容编辑手册

本网站当前以 TypeScript 文件保存内容，不使用 CMS，也不会在运行时加载 Research txt 文件。修改前建议先阅读 `TECHNICAL.md` 的“内容系统”和“修改位置速查”。

## 新增或修改 Work 案例

Work 的唯一数据源是 `src/data/workStories.ts`。列表卡片和详情页来自同一个 `WorkStory` 对象，无需再到 `IntroScreen.tsx` 手工登记。

最小示例：

```ts
{
  id: 'project-id',
  cardTitle: 'Project name',
  cardSubtitle: 'One-line card summary',
  cardMetrics: [{ value: '12%', label: 'improvement' }],
  cover: '/works/project-id.webp',
  coverBg: 'rgba(227, 232, 228, 0.75)',
  cardKicker: 'Category · Stage',
  kicker: 'Project name',
  titleLines: ['A clear outcome', 'and its context'],
  heroDesc: 'Short case-study introduction.',
  metrics: [{ value: '12%', label: 'Key result' }],
  sections: [
    { kind: 'story', heading: 'Context', paragraphs: ['…'] },
    {
      kind: 'decisions',
      heading: 'Decisions that shaped the product',
      items: [{ number: '01', title: 'Decision', text: '…' }],
    },
    { kind: 'outcomes', heading: 'Outcomes', reflections: ['…'] },
  ],
}
```

可用 section：

- `story`：背景、问题或叙事段落。
- `products`：产品/方案卡片与连接说明。
- `decisions`：带编号的关键判断。
- `outcomes`：结果数字与反思。

`paragraphs`、决策 `text`、connector `text` 和 `reflections` 中仅使用 `<strong>重点</strong>` 做行内强调。不要加入其他 HTML，因为渲染器不会把它当作通用 HTML 处理。

## 新增或修改 Research 案例

Research 的主数据源是 `src/data/researchStories.ts`。新增对象后会自动出现在 Research 列表中。

```ts
{
  id: 'research-id',
  title: 'Case-study title',
  eyebrow: 'Method · Year',
  subtitle: 'One-line summary.',
  tags: ['Interview', 'Prototype'],
  prototypeUrl: 'https://…', // 可选
  blocks: [
    { type: 'heading', text: 'Research question' },
    { type: 'paragraph', text: '…' },
    { type: 'list', items: ['…', '…'] },
  ],
}
```

`healthcare-alerting` 和 `lawmate` 是例外：两个长页详情分别硬编码在 `src/components/research/ResearchDetail.tsx` 的 `HealthcareCaseStudy` 与 `LawmateCaseStudy` 中。修改案例时，要同步检查：

- `researchStories.ts`：列表标题、摘要、标签和原型 URL。
- `ResearchDetail.tsx`：详情文案、研究数据和图片。
- `public/research/healthcare/` 或 `public/research/lawmate/`：详情图片。
- `../../references/research-evidence-inventory.md`：证据来源、已用内容和结论边界。

`public/research/essay1.txt` 和 `essay2.txt` 是旧素材，当前网站不会读取；不要按旧 txt 流程新增内容。

## 修改 About Me

About Me 目前直接维护在 `src/components/about/AboutMe.tsx`，包括个人定位、简介、能力、证明数字、教育背景和联系链接。

修改邮箱、LinkedIn 或数字时，应逐项验证链接和口径。CV 文件上线后建议放在 `public/cv/`，并把“coming soon”占位改为原生下载链接。

## 图片规范

- Work 封面放在 `public/works/`，通过 `/works/文件名` 引用。
- Research 图片放在 `public/research/<case-id>/`。
- 文件名使用小写英文和连字符，如 `supply-chain.webp`。
- 优先使用经过压缩的 WebP/JPEG；需要透明背景时使用优化后的 PNG/WebP。
- 保持同类卡片素材的宽高比一致，并补充准确的 `alt` 文本。
- 删除敏感客户信息、个人数据和未授权素材。

人物和眼睛素材涉及精确坐标，不要只替换图片文件；同时检查 `desktopConfig.ts` 中的尺寸与眼睛位置。

首页无损人物、背景和眼睛原稿保存在 `source-assets/intro/`，不会进入生产构建。页面版本放在 `public/intro/`，使用压缩 WebP；人物状态和 overlay 映射维护在 `src/components/desktop/characterConfig.ts`。

## 案例写作原则

推荐顺序：背景与约束 → 真实问题 → 你的判断 → 实施方式 → 可验证结果 → 反思。

- 明确“我做了什么”和“团队做了什么”。
- 数字说明时间范围或统计口径；没有可靠数字时使用具体事实，不编造指标。
- 对研究案例写明样本量、验证范围和局限。
- 默认公开内容为英文；实施语言切换前，中文稿可先在外部文档中成对准备，避免页面出现半完成状态。

## 发布前检查

1. 运行 `npm run typecheck`、`npm run lint`、`npm run build`。
2. 打开桌面和手机尺寸，检查卡片高度、换行与滚动。
3. 打开每个修改过的详情页，检查 Back 和 Close。
4. 检查图片、邮箱、LinkedIn、Figma 和下载链接。
5. 将本次可发布变更写入 `CHANGELOG.md`。
