import type { CmsSettings } from "@/cms/types"

const DATA_DIR = "src/cms/data"

export async function readJsonFile<T>(filename: string): Promise<T> {
  const res = await fetch(`/api/cms/data?file=${filename}`)
  if (!res.ok) throw new Error(`Failed to read ${filename}`)
  return res.json()
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  const res = await fetch(`/api/cms/data?file=${filename}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Failed to write ${filename}`)
}

export async function readSettings(): Promise<CmsSettings> {
  return readJsonFile<CmsSettings>("settings.json")
}

export async function writeSettings(settings: CmsSettings): Promise<void> {
  return writeJsonFile("settings.json", settings)
}

export function getCmsDataPath(filename: string): string {
  return `${DATA_DIR}/${filename}`
}
