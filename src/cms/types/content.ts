export type ContentBlock =
  | { type: "heading"; level: 2 | 3 | 4; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "faq"; question: string; answer: string }
  | { type: "formula"; latex: string; description?: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "note"; variant: "info" | "tip" | "warning"; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "list"; items: string[]; ordered: boolean }
  | { type: "divider" }
  | { type: "buttons"; buttons: { text: string; href: string; variant?: "primary" | "secondary" | "outline" }[] }

export function blockToHtml(block: ContentBlock): string {
  switch (block.type) {
    case "heading":
      return `<h${block.level} class="text-2xl font-bold text-text mt-8 mb-4">${escapeHtml(block.text)}</h${block.level}>`
    case "paragraph":
      return `<p class="text-text-secondary leading-relaxed mb-4">${markdownToSimpleHtml(block.text)}</p>`
    case "image":
      return `<figure class="my-6 rounded-2xl overflow-hidden border border-border/60 bg-surface-secondary/50"><img src="${escapeHtml(block.src)}" alt="${escapeHtml(block.alt)}" class="w-full object-cover" loading="lazy" />${block.caption ? `<figcaption class="text-sm text-text-secondary text-center py-2 px-4">${escapeHtml(block.caption)}</figcaption>` : ""}</figure>`
    case "faq":
      return `<details class="group rounded-2xl border border-border/60 bg-surface overflow-hidden mb-3"><summary class="flex items-center justify-between p-4 cursor-pointer text-text font-medium hover:bg-surface-secondary transition-colors list-none">${escapeHtml(block.question)}<svg class="h-5 w-5 text-text-secondary shrink-0 group-open:rotate-180 transition-transform" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></summary><div class="px-4 pb-4"><p class="text-text-secondary text-sm leading-relaxed">${escapeHtml(block.answer)}</p></div></details>`
    case "formula":
      return `<div class="my-4 p-4 rounded-xl bg-surface-secondary/50 border border-border/60 text-center"><code class="text-lg font-mono text-primary-600 dark:text-primary-400">${escapeHtml(block.latex)}</code>${block.description ? `<p class="text-sm text-text-secondary mt-2">${escapeHtml(block.description)}</p>` : ""}</div>`
    case "table":
      return `<div class="overflow-x-auto my-6 rounded-xl border border-border/60"><table class="w-full text-sm"><thead><tr class="bg-surface-secondary/50">${block.headers.map((h) => `<th class="px-4 py-3 text-left font-semibold text-text">${escapeHtml(h)}</th>`).join("")}</tr></thead><tbody>${block.rows.map((row) => `<tr class="border-t border-border/40 hover:bg-surface-secondary/30">${row.map((cell) => `<td class="px-4 py-3 text-text-secondary">${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`
    case "note":
      const noteColors: Record<string, string> = { info: "border-blue-500/30 bg-blue-500/5", tip: "border-green-500/30 bg-green-500/5", warning: "border-yellow-500/30 bg-yellow-500/5" }
      return `<div class="my-4 p-4 rounded-xl border ${noteColors[block.variant] || noteColors.info}"><p class="text-sm text-text-secondary">${escapeHtml(block.text)}</p></div>`
    case "code":
      return `<pre class="my-4 p-4 rounded-xl bg-dark-900 border border-dark-700 overflow-x-auto"><code class="text-sm font-mono text-green-400">${escapeHtml(block.code)}</code></pre>`
    case "list":
      const tag = block.ordered ? "ol" : "ul"
      const listClass = block.ordered ? "list-decimal" : "list-disc"
      return `<${tag} class="${listClass} pl-6 text-text-secondary leading-relaxed mb-4 space-y-1">${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</${tag}>`
    case "divider":
      return `<hr class="my-8 border-border/60" />`
    case "buttons":
      return `<div class="flex flex-wrap gap-3 my-6">${block.buttons.map((btn) => {
        const variantClass = btn.variant === "primary" ? "bg-primary-600 hover:bg-primary-700 text-white" : btn.variant === "secondary" ? "bg-surface-secondary hover:bg-surface text-text border border-border/60" : "border border-primary-600 text-primary-600 hover:bg-primary-600/10"
        return `<a href="${escapeHtml(btn.href)}" class="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${variantClass}">${escapeHtml(btn.text)}</a>`
      }).join("")}</div>`
    default:
      return ""
  }
}

export function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}

function markdownToSimpleHtml(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code class=\"text-sm bg-surface-secondary/50 px-1.5 py-0.5 rounded\">$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, "<a href=\"$2\" class=\"text-primary-600 dark:text-primary-400 hover:underline\">$1</a>")
    .replace(/\n/g, "<br />")
}

export function blocksToHtml(blocks: ContentBlock[]): string {
  return blocks.map(blockToHtml).join("\n")
}
