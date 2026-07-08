import type { SeoOverride } from "@/cms/types"
import { readJsonFile, writeJsonFile } from "@/cms/lib/api"

const SEO_FILE = "seo-overrides.json"

export async function getSeoOverrides(): Promise<SeoOverride[]> {
  return readJsonFile<SeoOverride[]>(SEO_FILE)
}

export async function saveSeoOverride(override: SeoOverride): Promise<void> {
  const overrides = await getSeoOverrides()
  const index = overrides.findIndex((o) => o.slug === override.slug && o.type === override.type)
  if (index >= 0) {
    overrides[index] = override
  } else {
    overrides.push(override)
  }
  await writeJsonFile(SEO_FILE, overrides)
}

export async function deleteSeoOverride(slug: string, type: string): Promise<void> {
  const overrides = await getSeoOverrides()
  await writeJsonFile(SEO_FILE, overrides.filter((o) => !(o.slug === slug && o.type === type)))
}

export async function loadOverrides(): Promise<Map<string, SeoOverride>> {
  const overrides = await getSeoOverrides()
  const map = new Map<string, SeoOverride>()
  for (const o of overrides) {
    map.set(`${o.type}:${o.slug}`, o)
  }
  return map
}
