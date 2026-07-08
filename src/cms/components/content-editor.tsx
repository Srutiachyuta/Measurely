"use client"

import { type ContentBlock } from "@/cms/types/content"
import { Plus, GripVertical, Trash2, MoveUp, MoveDown } from "lucide-react"
import { useState } from "react"

type BlockType = ContentBlock["type"]

interface Props {
  blocks: ContentBlock[]
  onChange: (blocks: ContentBlock[]) => void
}

const BLOCK_TYPES: { type: BlockType; label: string }[] = [
  { type: "heading", label: "Heading" },
  { type: "paragraph", label: "Paragraph" },
  { type: "image", label: "Image" },
  { type: "faq", label: "FAQ" },
  { type: "formula", label: "Formula" },
  { type: "table", label: "Table" },
  { type: "note", label: "Note" },
  { type: "code", label: "Code" },
  { type: "list", label: "List" },
  { type: "divider", label: "Divider" },
  { type: "buttons", label: "Buttons" },
]

function createBlock(type: BlockType): ContentBlock {
  switch (type) {
    case "heading": return { type, level: 2, text: "" }
    case "paragraph": return { type, text: "" }
    case "image": return { type, src: "", alt: "", caption: "" }
    case "faq": return { type, question: "", answer: "" }
    case "formula": return { type, latex: "", description: "" }
    case "table": return { type, headers: ["Column 1", "Column 2"], rows: [["", ""]] }
    case "note": return { type, variant: "info", text: "" }
    case "code": return { type, language: "text", code: "" }
    case "list": return { type, items: [""], ordered: false }
    case "divider": return { type }
    case "buttons": return { type, buttons: [{ text: "", href: "" }] }
    default: return { type: "paragraph", text: "" }
  }
}

export function ContentEditor({ blocks, onChange }: Props) {
  const [addingIndex, setAddingIndex] = useState<number | null>(null)

  const addBlock = (index: number, type: BlockType) => {
    const updated = [...blocks]
    updated.splice(index + 1, 0, createBlock(type))
    onChange(updated)
    setAddingIndex(null)
  }

  const removeBlock = (index: number) => {
    onChange(blocks.filter((_, i) => i !== index))
  }

  const moveBlock = (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= blocks.length) return
    const updated = [...blocks]
    ;[updated[index], updated[target]] = [updated[target], updated[index]]
    onChange(updated)
  }

  const updateBlock = (index: number, block: ContentBlock) => {
    const updated = [...blocks]
    updated[index] = block
    onChange(updated)
  }

  return (
    <div className="space-y-2">
      {blocks.map((block, i) => (
        <div key={i} className="group relative bg-dark-800/80 border border-dark-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase tracking-wider text-primary-400 font-semibold">{block.type}</span>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => moveBlock(i, -1)} disabled={i === 0} className="p-1 rounded hover:bg-dark-700 text-dark-500 hover:text-white disabled:opacity-30">
                <MoveUp className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => moveBlock(i, 1)} disabled={i === blocks.length - 1} className="p-1 rounded hover:bg-dark-700 text-dark-500 hover:text-white disabled:opacity-30">
                <MoveDown className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => removeBlock(i)} className="p-1 rounded hover:bg-dark-700 text-dark-500 hover:text-red-400">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <BlockEditor block={block} onChange={(b) => updateBlock(i, b)} />
        </div>
      ))}

      <div className="flex items-center gap-2 mt-4">
        {addingIndex === blocks.length - 1 || blocks.length === 0 ? (
          <div className="flex flex-wrap gap-2 p-3 bg-dark-800/50 border border-dark-700 rounded-xl w-full">
            {BLOCK_TYPES.map((bt) => (
              <button
                key={bt.type}
                onClick={() => addBlock(blocks.length - 1, bt.type)}
                className="px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-white rounded-lg text-xs transition-colors"
              >
                + {bt.label}
              </button>
            ))}
            <button onClick={() => setAddingIndex(null)} className="px-3 py-1.5 text-dark-500 hover:text-white rounded-lg text-xs">Close</button>
          </div>
        ) : (
          <button
            onClick={() => setAddingIndex(blocks.length - 1)}
            className="flex items-center gap-2 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-white rounded-lg text-sm transition-colors w-full justify-center"
          >
            <Plus className="w-4 h-4" /> Add Block
          </button>
        )}
      </div>
    </div>
  )
}

function BlockEditor({ block, onChange }: { block: ContentBlock; onChange: (b: ContentBlock) => void }) {
  switch (block.type) {
    case "heading":
      return (
        <div className="space-y-2">
          <select value={block.level} onChange={(e) => onChange({ ...block, level: Number(e.target.value) as 2 | 3 | 4 })}
            className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm">
            <option value={2}>Heading 2</option><option value={3}>Heading 3</option><option value={4}>Heading 4</option>
          </select>
          <input type="text" value={block.text} onChange={(e) => onChange({ ...block, text: e.target.value })}
            className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm" placeholder="Heading text..." />
        </div>
      )
    case "paragraph":
      return (
        <textarea value={block.text} onChange={(e) => onChange({ ...block, text: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm" placeholder="Write paragraph content... (supports **bold**, *italic*, [links](url), `code`)" />
      )
    case "image":
      return (
        <div className="space-y-2">
          <input type="text" value={block.src} onChange={(e) => onChange({ ...block, src: e.target.value })}
            className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm" placeholder="Image URL..." />
          <input type="text" value={block.alt} onChange={(e) => onChange({ ...block, alt: e.target.value })}
            className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm" placeholder="Alt text..." />
          <input type="text" value={block.caption || ""} onChange={(e) => onChange({ ...block, caption: e.target.value })}
            className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm" placeholder="Caption (optional)..." />
        </div>
      )
    case "faq":
      return (
        <div className="space-y-2">
          <input type="text" value={block.question} onChange={(e) => onChange({ ...block, question: e.target.value })}
            className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm" placeholder="Question..." />
          <textarea value={block.answer} onChange={(e) => onChange({ ...block, answer: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm" placeholder="Answer..." />
        </div>
      )
    case "formula":
      return (
        <div className="space-y-2">
          <input type="text" value={block.latex} onChange={(e) => onChange({ ...block, latex: e.target.value })}
            className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm font-mono" placeholder="e.g., A = P(1 + r/n)^(nt)" />
          <input type="text" value={block.description || ""} onChange={(e) => onChange({ ...block, description: e.target.value })}
            className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm" placeholder="Description (optional)..." />
        </div>
      )
    case "table":
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input type="text" value={block.headers.join(" | ")}
              onChange={(e) => onChange({ ...block, headers: e.target.value.split("|").map((s) => s.trim()) })}
              className="flex-1 px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm font-mono" placeholder="Headers separated by |" />
            <button onClick={() => onChange({ ...block, headers: [...block.headers, `Column ${block.headers.length + 1}`], rows: block.rows.map((r) => [...r, ""]) })}
              className="px-3 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg text-xs">+ Col</button>
            <button onClick={() => onChange({ ...block, rows: [...block.rows, block.headers.map(() => "")] })}
              className="px-3 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg text-xs">+ Row</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>{block.headers.map((h, ci) => (
                  <th key={ci} className="px-2 py-1"><input type="text" value={h}
                    onChange={(e) => { const hd = [...block.headers]; hd[ci] = e.target.value; onChange({ ...block, headers: hd }) }}
                    className="w-full px-2 py-1 bg-dark-900 border border-dark-700 rounded text-white text-xs" /></th>
                ))}</tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr key={ri}>{row.map((cell, ci) => (
                    <td key={ci} className="px-2 py-1"><input type="text" value={cell}
                      onChange={(e) => { const r = [...block.rows]; r[ri] = [...r[ri]]; r[ri][ci] = e.target.value; onChange({ ...block, rows: r }) }}
                      className="w-full px-2 py-1 bg-dark-900 border border-dark-700 rounded text-white text-xs" /></td>
                  ))}</tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.rows.length > 1 && (
            <button onClick={() => onChange({ ...block, rows: block.rows.slice(0, -1) })}
              className="text-xs text-dark-500 hover:text-red-400">Remove last row</button>
          )}
        </div>
      )
    case "note":
      return (
        <div className="space-y-2">
          <select value={block.variant} onChange={(e) => onChange({ ...block, variant: e.target.value as "info" | "tip" | "warning" })}
            className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm">
            <option value="info">Info</option><option value="tip">Tip</option><option value="warning">Warning</option>
          </select>
          <textarea value={block.text} onChange={(e) => onChange({ ...block, text: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm" placeholder="Note text..." />
        </div>
      )
    case "code":
      return (
        <div className="space-y-2">
          <input type="text" value={block.language} onChange={(e) => onChange({ ...block, language: e.target.value })}
            className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm" placeholder="Language (e.g., javascript, python, text)" />
          <textarea value={block.code} onChange={(e) => onChange({ ...block, code: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm font-mono" placeholder="Code..." />
        </div>
      )
    case "list":
      return (
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-dark-300">
            <input type="checkbox" checked={block.ordered} onChange={(e) => onChange({ ...block, ordered: e.target.checked })}
              className="rounded bg-dark-700 border-dark-600" />
            Ordered (numbered) list
          </label>
          {block.items.map((item, ii) => (
            <div key={ii} className="flex gap-2">
              <input type="text" value={item} onChange={(e) => { const it = [...block.items]; it[ii] = e.target.value; onChange({ ...block, items: it }) }}
                className="flex-1 px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm" placeholder="List item..." />
              <button onClick={() => onChange({ ...block, items: block.items.filter((_, j) => j !== ii) })}
                className="p-2 text-dark-500 hover:text-red-400 text-xs">✕</button>
            </div>
          ))}
          <button onClick={() => onChange({ ...block, items: [...block.items, ""] })}
            className="text-xs text-primary-400 hover:text-primary-300">+ Add item</button>
        </div>
      )
    case "divider":
      return <p className="text-dark-500 text-sm text-center py-2">Horizontal divider</p>
    case "buttons":
      return (
        <div className="space-y-2">
          {block.buttons.map((btn, bi) => (
            <div key={bi} className="flex gap-2 items-start">
              <div className="flex-1 space-y-2">
                <input type="text" value={btn.text} onChange={(e) => { const b = [...block.buttons]; b[bi] = { ...b[bi], text: e.target.value }; onChange({ ...block, buttons: b }) }}
                  className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm" placeholder="Button text..." />
                <input type="text" value={btn.href} onChange={(e) => { const b = [...block.buttons]; b[bi] = { ...b[bi], href: e.target.value }; onChange({ ...block, buttons: b }) }}
                  className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-sm" placeholder="Link URL..." />
              </div>
              <select value={btn.variant || "primary"} onChange={(e) => { const b = [...block.buttons]; b[bi] = { ...b[bi], variant: e.target.value as "primary" | "secondary" | "outline" }; onChange({ ...block, buttons: b }) }}
                className="px-2 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white text-xs">
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="outline">Outline</option>
              </select>
              <button onClick={() => onChange({ ...block, buttons: block.buttons.filter((_, j) => j !== bi) })}
                className="p-2 text-dark-500 hover:text-red-400 text-xs">✕</button>
            </div>
          ))}
          <button onClick={() => onChange({ ...block, buttons: [...block.buttons, { text: "", href: "" }] })}
            className="text-xs text-primary-400 hover:text-primary-300">+ Add button</button>
        </div>
      )
    default:
      return null
  }
}
