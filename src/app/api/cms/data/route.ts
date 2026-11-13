import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { requireCms } from "@/cms/lib/server-auth"

const DATA_DIR = path.join(process.cwd(), "src/cms/data")

export async function GET(request: Request) {
  const denied = await requireCms(request)
  if (denied) return denied
  const { searchParams } = new URL(request.url)
  const file = searchParams.get("file")
  if (!file || !/^[a-z][a-z-]*\.json$/.test(file)) return NextResponse.json({ error: "Invalid data file" }, { status: 400 })
  const filePath = path.join(DATA_DIR, path.basename(file))
  if (!fs.existsSync(filePath)) return NextResponse.json(null)
  const content = fs.readFileSync(filePath, "utf-8")
  return NextResponse.json(JSON.parse(content))
}

export async function POST(request: Request) {
  const denied = await requireCms(request)
  if (denied) return denied
  const { searchParams } = new URL(request.url)
  const file = searchParams.get("file")
  if (!file || !/^[a-z][a-z-]*\.json$/.test(file) || !fs.existsSync(path.join(DATA_DIR, file))) return NextResponse.json({ error: "Unknown data file" }, { status: 400 })
  const filePath = path.join(DATA_DIR, path.basename(file))
  const raw = await request.text()
  if (Buffer.byteLength(raw) > 5 * 1024 * 1024) return NextResponse.json({ error: "Data exceeds 5 MB" }, { status: 413 })
  let body: unknown
  try { body = JSON.parse(raw) } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }) }
  fs.writeFileSync(filePath, JSON.stringify(body, null, 2), "utf-8")
  return NextResponse.json({ success: true })
}
