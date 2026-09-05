# 变更记录

遵循“日期 / 改了什么 / 为什么 / 如何验证”的格式。每次准备上线的改动至少记录一条。

## 2026-09-05

- 将设计流程与证据文档移出代码仓库：`VISUAL-REDESIGN-PLAN.md`、`VISUAL-SYSTEM-V1.md` 迁至工作区 `decisions/`，`RESEARCH-EVIDENCE-INVENTORY.md` 迁至工作区 `references/`，让 `yanfei-portfolio/` 只维护随网站版本化的代码与文档。
- 更新 `README.md`、`CONTENT-GUIDE.md`、`TODO.md` 中的文档链接，并在 `README.md` 区分仓库内文档与工作区文档。
- 原因：`yanfei-portfolio/` 是独立 git 仓库，设计流程与证据登记属于工作区过程产物，不应随网站代码一起版本化。
- 验证：本次仅移动文档与更新链接，无运行时代码改动；运行时验证不适用。

## 2026-08-30

- 建立 `RESEARCH-EVIDENCE-INVENTORY.md`，将 Healthcare 与 Lawmate 的 PDF 原始证据、网页使用状态和结论边界统一登记。
- 补强 Healthcare 的合作方访谈、Pager/BLIP 当前流程、双角色 Persona、发送/接收任务流与 Survey 证据说明。
- 将 Healthcare 的 `prototype evaluation` 修正为 `partner and team feedback`；明确原报告未记录正式目标用户可用性测试，避免超出证据表述。
- 更新 Research 内容维护说明，记录 Healthcare 与 Lawmate 均使用专门的长篇详情组件。
- 验证：`npm run typecheck`、`npm run lint`、`npm run build` 通过；浏览器不可连接，桌面与手机视觉回归待本地确认。

## 2026-08-29

- 将 Healthcare 案例从警示橙调整为 Clinical Blue + Coral，使章节、引语和洞察卡片与蓝、红、白配图协调。
- 完成 Phase 7：清理无引用旧 CSS，将原始 PNG 移到不参与构建的 `source-assets/intro/`，生产 `dist` 总体积降至 3.6 MiB，并同步技术文档。
- 建立配置化 CharacterMode，并为 Work、Research、About Me 接入轻量 SVG 道具 overlay、入场与低频 idle，支持未来直接替换正式分层人物。
- Phase 6 确认先采用当前人物 + 道具 overlay 原型，并要求状态和素材接口可在未来直接替换正式分层人物。
- 统一 Work、Research、About Me 列表组件，并新增 CaseStudyShell 将 Work、通用 Research、Healthcare 和 Lawmate 迁移到共享内容视觉语言。
- 接入 Visual System v1 Token 和栏目主题，将 Popwindow 改造成米白纸张档案层，并补充 Escape、焦点约束、焦点返回与文件夹键盘打开。
- 将首页背景、人物和眼睛切换为 WebP 页面资源，实际引用体积从 18.09 MiB 降至 1.02 MiB，并增加关键资源预加载与眼睛延迟缓存。
- 将 `VISUAL-REDESIGN-PLAN.md` 升级为整改唯一主控文档，加入 Phase、任务编号、状态、依赖、验收标准、决策记录、风险和完成记录模板。
- 从现有 Desktop 首页提炼 Visual System v1，定义 Paper、Ink、Signal、Field Blue、Glitch Note 五种核心视觉语汇。
- 明确颜色、字体、空间、纸张材质、Popwindow、基础组件、动效、人物状态、响应式与可访问性约束，作为后续全站整改依据。
- 将 Popwindow 定义为首页画布中的“个人档案层”，后续不再沿用 macOS 红黄绿圆点、蓝色背景图和玻璃式内容面板。
- 本次仅新增和整理设计文档，未修改运行时代码。

## 2026-08-28

- 将 Lawmate Research 详情从通用文本页升级为与 Healthcare 案例一致的长篇编辑式布局，按 Discover、Define、Develop、Deliver、Takeaways 组织真实研究证据、方案取舍和局限。
- 为 Lawmate 增加独立的法律服务视觉主题和纯 CSS 界面示意，并复用现有 Research 长页的桌面与移动端布局体系。
- 按当前 React 组件和数据结构重写技术文档，补充状态流、交互坐标、内容模型、响应式、部署、可访问性、技术债与验收清单。
- 更新内容编辑手册，移除已过时的 Research txt/手工登记流程，改为当前 TypeScript 数据驱动流程。
- 整理 README 的文档入口和主要内容源，避免维护者在多个文件间猜测职责。
- 验证：`npm run typecheck`、`npm run lint`、`npm run build` 通过。

## 2026-08-23

- 确认网站目标访客为招聘人员与潜在合作伙伴；首要转化为招聘或合作联系。
- 确认默认英文、可切换中文，并计划在 About Me 提供简介、邮箱、LinkedIn 与简历下载。
- 确认未来三个月的重点是稳定运行与理解架构、建立基础前端判断力、提升人机协作效率。

## 2026-08-22

- 从旧的 3D 简历 fork 中抽离出独立作品集仓库。
- 保留桌面交互、项目案例与研究内容，移除旧 Three.js 架构和未使用依赖。
- 移除线上可见的调试面板。
- 验证：`npm run typecheck`、`npm run lint`、`npm run build` 通过。
