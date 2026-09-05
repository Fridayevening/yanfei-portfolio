# Yanfei Portfolio

An interactive personal portfolio built with React, TypeScript, and Vite.

The landing page is an illustrated desktop: drag the character and folders, double-click a folder to browse project stories or research, and use the close button to return to the desktop.

## Development

```bash
npm install
npm run dev
```

Other checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Project documentation

- [`PROJECT.md`](../PROJECT.md): product goals, audience and scope.
- [`TECHNICAL.md`](./TECHNICAL.md): architecture, state flow, interactions, deployment and technical debt.
- [`CONTENT-GUIDE.md`](./CONTENT-GUIDE.md): how to update Work, Research, About Me and assets.
- [`TODO.md`](../TODO.md): current roadmap.
- [`CHANGELOG.md`](./CHANGELOG.md): release-oriented change notes.

## Workspace documentation

Design-process and evidence documents live in the workspace root, outside this repository:

- `decisions/visual-redesign-plan.md`: implementation plan for asset optimisation, visual-system alignment, Popwindow redesign and character states.
- `decisions/visual-system-v1.md`: visual tokens, component rules, motion language and implementation constraints derived from the desktop homepage.
- `references/research-evidence-inventory.md`: evidence sources, used content and conclusion boundaries.

## Main content sources

- `src/data/workStories.ts`: Work cards and case-study content.
- `src/data/researchStories.ts`: Research cards and generic case-study content.
- `src/components/research/ResearchDetail.tsx`: custom Healthcare case-study layout.
- `src/components/about/AboutMe.tsx`: About Me content and contact links.
