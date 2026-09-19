# Yanfei Portfolio

An interactive portfolio built as a browser-based retro operating system — a tab bar, a dock, and a
content window that scrolls inside a fixed frame so the whole shell stays within one viewport.

Four apps:

| App | Contents |
| --- | --- |
| `About_me` | Background, experience and contact |
| `Work` | Four case studies, grouped into two chapters |
| `Research` | Two exploratory HCI studies |
| `Playground` | An embedded live window into a separate project |

## Stack

React 18 · TypeScript · Vite · plain CSS with a token layer.

Hash-based routing with no router library, and no state library. The whole app is client-rendered and
deploys as static files.

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
```

Other checks:

```bash
npm run typecheck
npm run lint
npm run build
npm run check:content
```

`check:content` verifies that case-study copy in `src/data/` matches the reviewed source it was
migrated from. That source lives in a separate repository, so the command expects it to be present as a
sibling directory. Point elsewhere with `NEWBOY_CONTENT=/path/to/source.ts`.

## Routes

| Hash | View |
| --- | --- |
| `#about` | About_me |
| `#work` | Work overview |
| `#work/<storyId>` | Work case study, opened as a tab |
| `#research` | Research overview |
| `#research/<storyId>` | Research case study, opened as a tab |
| `#playground` | Embedded project |

Because routing is hash-based, no server rewrite or SPA fallback is required — the build can be served
from any static host, including a subdirectory (`vite.config.ts` sets `base: './'`).

## Structure

```text
src/
├── components/
│   ├── os/          Shell: tabs, dock, hash routing
│   ├── work/        Work overview and case-study renderer
│   ├── research/    Research overview and case-study renderer
│   ├── about/       About_me
│   ├── playground/  Embedded project window
│   └── shared/      Shared rendering helpers
├── data/            Case-study content
└── styles/          Design tokens and view styles
```

## Content

Case-study copy and metrics are **not drafted in this repository**. They are migrated verbatim from an
externally reviewed source of truth, and `npm run check:content` compares every title, subtitle, metric,
section heading, paragraph and bullet against it, failing on any wording change.

The rule this protects: nothing reaches the site that has not been reviewed for accuracy. Presentation
— layout, emphasis, grouping — is decided here; the words are not.

## Documentation

- `CONTENT-GUIDE.md` — how case-study content is edited, where it comes from, and how it is verified.
- `PROJECT.md` — product goals, audience and scope.

Working notes and handoff documents are kept outside this repository, alongside the design-process and
content-review records they refer to.

## Licence

Personal project. No licence is granted for reuse of the code, copy, or imagery.
