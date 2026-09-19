// Content parity check: site copy vs the NewBoy content that the deployed site renders.
//
// The two sites must show the same words. This script loads both content modules, compares the
// English strings field by field, and exits non-zero if anything differs.
//
//   npm run check:content
//
// NewBoy lives in a sibling workspace. Override the path with:
//   NEWBOY_CONTENT=/path/to/portfolioContent.ts npm run check:content
//
// Copy source of truth: newboy/frontend/src/components/desktop/portfolioContent.ts
// Approval gate:         newboy/docs/content-review/

import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { transform } from 'esbuild'

const here = dirname(fileURLToPath(import.meta.url))
const siteRoot = resolve(here, '..')

const NEWBOY_CONTENT =
  process.env.NEWBOY_CONTENT ??
  resolve(siteRoot, '../../newboy/frontend/src/components/desktop/portfolioContent.ts')

/** Transpile a TypeScript module and import it. */
async function loadTsModule(path) {
  const source = readFileSync(path, 'utf8')
  const { code } = await transform(source, { loader: 'ts', format: 'esm', target: 'node18' })
  const file = join(mkdtempSync(join(tmpdir(), 'parity-')), 'module.mjs')
  writeFileSync(file, code)
  return import(pathToFileURL(file).href)
}

/** Site story id -> NewBoy entry id. */
const WORK_ID_MAP = {
  'workspace-saas': 'uniubi',
  'uzhi-space': 'uspace-china',
  'ops-analytics': 'operations',
  'kreai': 'kreai',
}

const RESEARCH_ID_MAP = {
  'healthcare-alerting': 'urgent-lab',
  'lawmate': 'lawmate',
}

// Inline markup is presentation, not content, so it is stripped before comparing. A real wording
// change still fails the check.
const normalise = value =>
  String(value ?? '')
    .replace(/<\/?strong>/g, '')
    .replace(/\s+/g, ' ')
    .trim()

const differences = []

function compare(label, siteValue, newboyValue) {
  const a = normalise(siteValue)
  const b = normalise(newboyValue)
  if (a === b) return
  differences.push({ label, site: a, newboy: b })
}

function compareMetrics(label, siteMetrics, newboyMetrics) {
  const site = siteMetrics ?? []
  const newboy = (newboyMetrics ?? []).map(metric => ({
    value: normalise(metric.value),
    label: normalise(metric.label.en),
  }))

  if (site.length !== newboy.length) {
    differences.push({
      label: `${label} — metric count`,
      site: `${site.length}`,
      newboy: `${newboy.length}`,
    })
    return
  }

  site.forEach((metric, index) => {
    compare(`${label} — metric[${index}].value`, metric.value, newboy[index].value)
    compare(`${label} — metric[${index}].label`, metric.label, newboy[index].label)
  })
}

function compareSections(label, siteSections, newboySections) {
  const site = siteSections ?? []
  const newboy = newboySections ?? []

  if (site.length !== newboy.length) {
    differences.push({
      label: `${label} — section count`,
      site: `${site.length}`,
      newboy: `${newboy.length}`,
    })
  }

  const total = Math.max(site.length, newboy.length)
  for (let index = 0; index < total; index += 1) {
    const a = site[index]
    const b = newboy[index]
    const at = `${label} — section[${index}]`

    if (!a) {
      differences.push({ label: `${at} — missing on site`, site: '(none)', newboy: normalise(b.heading.en) })
      continue
    }
    if (!b) {
      differences.push({ label: `${at} — extra on site`, site: normalise(a.heading), newboy: '(none)' })
      continue
    }

    compare(`${at}.heading`, a.heading, b.heading.en)

    const siteParagraphs = a.paragraphs ?? []
    const newboyParagraphs = (b.paragraphs ?? []).map(paragraph => paragraph.en)
    if (siteParagraphs.length !== newboyParagraphs.length) {
      differences.push({
        label: `${at}.paragraphs — count`,
        site: `${siteParagraphs.length}`,
        newboy: `${newboyParagraphs.length}`,
      })
    }
    siteParagraphs.forEach((paragraph, p) => {
      compare(`${at}.paragraphs[${p}]`, paragraph, newboyParagraphs[p])
    })

    const siteItems = a.items ?? []
    const newboyItems = (b.items ?? []).map(item => item.en)
    if (siteItems.length !== newboyItems.length) {
      differences.push({
        label: `${at}.items — count`,
        site: `${siteItems.length}`,
        newboy: `${newboyItems.length}`,
      })
    }
    siteItems.forEach((item, i) => {
      compare(`${at}.items[${i}]`, item, newboyItems[i])
    })
  }
}

function compareEntries(siteEntries, newboyEntries, idMap, kind) {
  for (const [siteId, newboyId] of Object.entries(idMap)) {
    const siteEntry = siteEntries.find(entry => entry.id === siteId)
    const newboyEntry = newboyEntries.find(entry => entry.id === newboyId)
    const label = `${kind}:${siteId}`

    if (!siteEntry) {
      differences.push({ label: `${label} — missing on site`, site: '(none)', newboy: newboyId })
      continue
    }
    if (!newboyEntry) {
      differences.push({ label: `${label} — missing in NewBoy`, site: siteId, newboy: '(none)' })
      continue
    }

    compare(`${label}.title`, siteEntry.title, newboyEntry.title.en)
    compare(`${label}.subtitle`, siteEntry.subtitle, newboyEntry.subtitle.en)
    compareMetrics(label, siteEntry.metrics, newboyEntry.metrics)
    compareSections(label, siteEntry.sections, newboyEntry.sections)
    compare(`${label}.prototypeUrl`, siteEntry.prototypeUrl, newboyEntry.prototypeUrl)
  }
}

async function main() {
  const newboy = await loadTsModule(NEWBOY_CONTENT)
  const site = await loadTsModule(join(siteRoot, 'src/data/workStories.ts'))
  const research = await loadTsModule(join(siteRoot, 'src/data/researchStories.ts'))

  const newboyWork = newboy.PORTFOLIO_ENTRIES.filter(entry => entry.kind === 'work')
  const newboyResearch = newboy.PORTFOLIO_ENTRIES.filter(entry => entry.kind === 'research')

  compareEntries(site.WORK_STORIES, newboyWork, WORK_ID_MAP, 'work')
  compareEntries(research.RESEARCH_STORIES, newboyResearch, RESEARCH_ID_MAP, 'research')

  if (differences.length === 0) {
    console.log('Content parity OK — site copy matches portfolioContent.ts')
    console.log(`  work: ${Object.keys(WORK_ID_MAP).length} entries, research: ${Object.keys(RESEARCH_ID_MAP).length} entries`)
    return
  }

  console.error(`Content parity FAILED — ${differences.length} difference(s)\n`)
  for (const difference of differences) {
    console.error(`  ${difference.label}`)
    console.error(`    site:   ${difference.site}`)
    console.error(`    newboy: ${difference.newboy}`)
  }
  console.error('\nCopy source: frontend/src/components/desktop/portfolioContent.ts')
  process.exitCode = 1
}

main().catch(error => {
  console.error('Content parity check could not run.')
  console.error(error instanceof Error ? error.message : error)
  if (String(error?.message ?? '').includes('ENOENT')) {
    console.error(`\nLooked for NewBoy content at:\n  ${NEWBOY_CONTENT}`)
    console.error('Set NEWBOY_CONTENT to override the path.')
  }
  process.exitCode = 1
})
