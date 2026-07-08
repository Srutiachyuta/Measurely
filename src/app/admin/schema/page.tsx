"use client"

import { useState, useMemo } from "react"
import { calculators } from "@/data/calculators"
import { blogs } from "@/data/blogs"
import { comparisons } from "@/data/comparisons"
import { CATEGORIES } from "@/lib/constants"
import { validateJsonLd, SCHEMA_TYPES } from "@/cms/services/schema-service"
import { Code, Copy, CheckCircle, AlertTriangle, Info, Search, ExternalLink, Shield } from "lucide-react"

const SCHEMA_TEMPLATES: Record<string, Record<string, any>> = {
  WebSite: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Measurely",
    url: "https://measurely.in",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: "https://measurely.in/search?q={search_term_string}" },
      "query-input": "required name=search_term_string",
    },
  },
  Organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Measurely",
    url: "https://measurely.in",
    logo: "https://measurely.in/logo-light.webp",
    description: "Free online calculators and helpful guides.",
  },
  SearchAction: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Measurely",
    url: "https://measurely.in",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: "https://measurely.in/search?q={search_term_string}" },
      "query-input": "required name=search_term_string",
    },
  },
  BreadcrumbList: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://measurely.in" },
      { "@type": "ListItem", position: 2, name: "Calculators", item: "https://measurely.in/calculators" },
    ],
  },
  WebApplication: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculator Name",
    url: "https://measurely.in/calculator-slug",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    browserRequirements: "JavaScript",
  },
  FAQPage: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is this calculator?",
        acceptedAnswer: { "@type": "Answer", text: "This is a free online tool that helps you calculate..." },
      },
    ],
  },
  HowTo: {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Use This Calculator",
    step: [
      { "@type": "HowToStep", text: "Enter your input values in the fields below." },
      { "@type": "HowToStep", text: "Click the Calculate button to see results." },
      { "@type": "HowToStep", text: "Review the detailed breakdown and charts." },
    ],
  },
  BlogPosting: {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Article Title",
    description: "Article description",
    author: { "@type": "Person", name: "Author Name" },
    datePublished: "2025-01-01",
    dateModified: "2025-01-01",
    publisher: { "@type": "Organization", name: "Measurely" },
  },
  WebPage: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Page Title",
    description: "Page description",
    url: "https://measurely.in/page-slug",
  },
}

export default function SchemaManager() {
  const [tab, setTab] = useState<"templates" | "validator" | "coverage">("templates")
  const [copied, setCopied] = useState<string | null>(null)
  const [validatorInput, setValidatorInput] = useState("")
  const [validationResult, setValidationResult] = useState<ReturnType<typeof validateJsonLd> | null>(null)
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null)
  const [editedJson, setEditedJson] = useState("")

  const handleEdit = (label: string) => {
    setEditingTemplate(label)
    setEditedJson(JSON.stringify(SCHEMA_TEMPLATES[label] || {}, null, 2))
  }

  const handleSaveEdit = () => {
    try {
      JSON.parse(editedJson)
      setEditingTemplate(null)
    } catch {
      alert("Invalid JSON")
    }
  }

  const copySchema = (label: string, json: string) => {
    navigator.clipboard.writeText(json)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const runValidator = () => {
    setValidationResult(validateJsonLd(validatorInput))
  }

  const totalPages = useMemo(() => {
    return [
      ...calculators.map((c) => ({ slug: c.slug, title: c.name, type: "tool" as const })),
      ...blogs.map((b) => ({ slug: b.slug, title: b.title, type: "article" as const })),
      ...CATEGORIES.map((c) => ({ slug: c.slug, title: c.name, type: "category" as const })),
      ...comparisons.map((c) => ({ slug: c.slug, title: c.name, type: "comparison" as const })),
    ]
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Schema Engine</h1>
        <p className="text-dark-400 mt-1">JSON-LD structured data templates, validation, and coverage reports</p>
      </div>

      <div className="flex gap-2">
        {(["templates", "validator", "coverage"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? "bg-primary-600 text-white" : "bg-dark-800 text-dark-300 hover:text-white border border-dark-700"}`}>
            {t === "templates" ? "Templates" : t === "validator" ? "Validator" : "Coverage"}
          </button>
        ))}
      </div>

      {tab === "templates" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(SCHEMA_TEMPLATES).map(([label, schema]) => {
            const json = JSON.stringify(schema, null, 2)
            const schemaInfo = SCHEMA_TYPES.find((s) => s.label === label)
            return (
              <div key={label} className="bg-dark-800/50 border border-dark-700 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-dark-700">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-primary-400" />
                    <div>
                      <h3 className="text-white font-semibold text-sm">{label}</h3>
                      {schemaInfo && <p className="text-dark-500 text-xs">{schemaInfo.description}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleEdit(label)} className="p-1.5 rounded-lg hover:bg-dark-700 text-dark-400 hover:text-white transition-colors">
                      <Code className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => copySchema(label, json)}
                      className="p-1.5 rounded-lg hover:bg-dark-700 text-dark-400 hover:text-white transition-colors">
                      {copied === label ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a href={`https://validator.schema.org/#url=https://measurely.in`} target="_blank"
                      className="p-1.5 rounded-lg hover:bg-dark-700 text-dark-400 hover:text-white transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
                {editingTemplate === label ? (
                  <div className="p-3 space-y-2">
                    <textarea value={editedJson} onChange={(e) => setEditedJson(e.target.value)}
                      rows={12} className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-green-400 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary-500" />
                    <div className="flex gap-2">
                      <button onClick={handleSaveEdit} className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs">Done</button>
                      <button onClick={() => setEditingTemplate(null)} className="px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-white rounded-lg text-xs">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <pre className="p-4 text-xs text-dark-300 overflow-x-auto max-h-64 overflow-y-auto font-mono">{json}</pre>
                )}
              </div>
            )
          })}
        </div>
      )}

      {tab === "validator" && (
        <div className="max-w-3xl space-y-4">
          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-3">Schema Validator</h2>
            <p className="text-dark-400 text-sm mb-4">Paste your JSON-LD markup to validate it against schema.org standards.</p>
            <textarea value={validatorInput} onChange={(e) => setValidatorInput(e.target.value)}
              rows={10} className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg text-green-400 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder='{"@context": "https://schema.org", "@type": "WebPage", ...}' />
            <button onClick={runValidator} disabled={!validatorInput.trim()}
              className="mt-3 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors">
              Validate
            </button>
          </div>

          {validationResult && (
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">
                Results ({validationResult.length} issue{validationResult.length !== 1 ? "s" : ""})
              </h3>
              {validationResult.length === 0 ? (
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span>No issues found. Schema is valid!</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {validationResult.map((issue, i) => (
                    <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${
                      issue.severity === "error" ? "bg-red-500/10 border border-red-500/20" :
                      issue.severity === "warning" ? "bg-amber-500/10 border border-amber-500/20" :
                      "bg-blue-500/10 border border-blue-500/20"
                    }`}>
                      {issue.severity === "error" ? <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" /> :
                       issue.severity === "warning" ? <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" /> :
                       <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />}
                      <div>
                        <p className="text-sm text-white">{issue.message}</p>
                        {issue.path && <p className="text-xs text-dark-400 mt-0.5">Path: {issue.path}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {tab === "coverage" && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
              <p className="text-2xl font-bold text-white">{totalPages.length}</p>
              <p className="text-dark-400 text-sm">Total Pages</p>
            </div>
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
              <p className="text-2xl font-bold text-green-400">{totalPages.length}</p>
              <p className="text-dark-400 text-sm">With Schema</p>
            </div>
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
              <p className="text-2xl font-bold text-dark-400">0</p>
              <p className="text-dark-400 text-sm">Missing Schema</p>
            </div>
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4">
              <p className="text-2xl font-bold text-primary-400">{Object.keys(SCHEMA_TEMPLATES).length}</p>
              <p className="text-dark-400 text-sm">Schema Types</p>
            </div>
          </div>

          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-4">Schema Usage by Content Type</h2>
            <div className="space-y-3">
              {[
                { label: "Tools", count: calculators.length, schemas: "WebApplication, FAQPage, HowTo, BreadcrumbList" },
                { label: "Articles", count: blogs.length, schemas: "BlogPosting, FAQPage, BreadcrumbList" },
                { label: "Categories", count: CATEGORIES.length, schemas: "CollectionPage, BreadcrumbList" },
                { label: "Comparisons", count: comparisons.length, schemas: "WebPage, FAQPage, BreadcrumbList" },
                { label: "Global", count: 1, schemas: "WebSite, Organization, SearchAction" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 px-3 rounded-lg bg-dark-900/50">
                  <div>
                    <p className="text-white font-medium text-sm">{item.label}</p>
                    <p className="text-dark-400 text-xs mt-0.5">{item.count} pages &middot; {item.schemas}</p>
                  </div>
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-3">Schema Types Reference</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {SCHEMA_TYPES.map((st) => (
                <div key={st.label} className="px-3 py-2 rounded-lg bg-dark-900/50 border border-dark-700">
                  <p className="text-white text-sm font-medium">{st.label}</p>
                  <p className="text-dark-500 text-xs">{st.context}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
