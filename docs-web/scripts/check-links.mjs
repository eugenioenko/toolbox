import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, join, relative } from 'node:path';

const root = resolve('dist');
const base = `/${(process.env.BASE_PATH || '').replace(/^\/+|\/+$/g, '')}`.replace(/\/$/, '');
const origin = 'https://docs.invalid';
const pages = new Map();

async function collect(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await collect(path);
    else if (entry.name.endsWith('.html')) pages.set(path, await readFile(path, 'utf8'));
  }
}
await collect(root);
const failures = [];
for (const [path, html] of pages) {
  const pagePath = `${base}/${relative(root, path).replaceAll('\\', '/')}`.replace(/index\.html$/, '');
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) continue;
    const url = new URL(href, origin + pagePath);
    const pathname = decodeURIComponent(url.pathname);
    if (base && pathname !== base && !pathname.startsWith(base + '/')) {
      failures.push(`${pagePath}: link escapes base: ${href}`);
      continue;
    }
    let target = resolve(root, '.' + pathname.slice(base.length));
    try {
      if ((await stat(target)).isDirectory()) target = join(target, 'index.html');
      await stat(target);
      if (url.hash && pages.has(target)) {
        const id = decodeURIComponent(url.hash.slice(1));
        const content = pages.get(target);
        if (!content.includes(`id="${id}"`)) failures.push(`${pagePath}: missing anchor: ${href}`);
      }
    } catch {
      failures.push(`${pagePath}: missing target: ${href}`);
    }
  }
}
if (failures.length) {
  console.error([...new Set(failures)].join('\n'));
  process.exitCode = 1;
} else console.log(`Checked internal links, assets, and anchors in ${pages.size} HTML pages (base: ${base || '/'}).`);
