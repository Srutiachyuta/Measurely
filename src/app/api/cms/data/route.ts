import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "src/cms/data")

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const file = searchParams.get("file")
  if (!file) return NextResponse.json({ error: "Missing file param" }, { status: 400 })
  const filePath = path.join(DATA_DIR, path.basename(file))
  if (!fs.existsSync(filePath)) return NextResponse.json(null)
  const content = fs.readFileSync(filePath, "utf-8")
  return NextResponse.json(JSON.parse(content))
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const file = searchParams.get("file")
  if (!file) return NextResponse.json({ error: "Missing file param" }, { status: 400 })
  const filePath = path.join(DATA_DIR, path.basename(file))
  const body = await request.json()
  fs.writeFileSync(filePath, JSON.stringify(body, null, 2), "utf-8")
  return NextResponse.json({ success: true })
}
