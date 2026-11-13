import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import crypto from "crypto"
import sharp from "sharp"
import { requireCms } from "@/cms/lib/server-auth"

const DATA_DIR = path.join(process.cwd(), "src/cms/data")
const IMAGES_DIR = path.join(process.cwd(), "public/images")
const MEDIA_FILE = path.join(DATA_DIR, "media.json")

interface MediaRecord {
  id: string
  filename: string
  originalName: string
  url: string
  type: "image" | "svg" | "other"
  width: number
  height: number
  altText: string
  fileSize: number
  createdAt: string
}

function readMedia(): MediaRecord[] {
  if (!fs.existsSync(MEDIA_FILE)) return []
  return JSON.parse(fs.readFileSync(MEDIA_FILE, "utf-8"))
}

function writeMedia(media: MediaRecord[]) {
  fs.writeFileSync(MEDIA_FILE, JSON.stringify(media, null, 2), "utf-8")
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9.-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")
}

export async function GET(request: Request) {
  const denied = await requireCms(request)
  if (denied) return denied
  try {
    return NextResponse.json(readMedia())
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  const denied = await requireCms(request)
  if (denied) return denied
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 })
    if (file.size > 8 * 1024 * 1024) return NextResponse.json({ error: "Images must be smaller than 8 MB" }, { status: 413 })
    if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type)) return NextResponse.json({ error: "Upload a JPEG, PNG, WebP or AVIF image" }, { status: 415 })

    const buffer = Buffer.from(await file.arrayBuffer())
    const originalName = file.name
    const ext = path.extname(originalName).toLowerCase()
    if (![".jpg", ".jpeg", ".png", ".webp", ".avif"].includes(ext)) return NextResponse.json({ error: "Unsupported image extension" }, { status: 415 })
    await sharp(buffer, { limitInputPixels: 40000000 }).metadata()
    fs.mkdirSync(IMAGES_DIR, { recursive: true })
    const baseName = path.basename(originalName, ext)
    const ts = Date.now()

    let type: MediaRecord["type"] = "other"
    let width = 0
    let height = 0
    let filename = `${slugify(baseName)}-${ts}${ext}`
    const filePath = path.join(IMAGES_DIR, filename)

    if ([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"].includes(ext)) {
      type = "image"
      try {
        const metadata = await sharp(buffer).metadata()
        width = metadata.width || 0
        height = metadata.height || 0
      } catch { /* ignore */ }

      if (width > 2000 || height > 2000) {
        const webpName = `${slugify(baseName)}-${ts}.webp`
        const webpPath = path.join(IMAGES_DIR, webpName)
        await sharp(buffer).resize(2000, 2000, { fit: "inside", withoutEnlargement: true }).webp({ quality: 82 }).toFile(webpPath)
        filename = webpName
      } else {
        await sharp(buffer).webp({ quality: 82 }).toFile(filePath.replace(ext, ".webp"))
        filename = filename.replace(ext, ".webp")
      }
    } else {
      fs.writeFileSync(filePath, buffer)
    }

    const media = readMedia()
    const record: MediaRecord = {
      id: crypto.randomUUID(),
      filename,
      originalName,
      url: `/images/${filename}`,
      type,
      width,
      height,
      altText: "",
      fileSize: buffer.length,
      createdAt: new Date().toISOString(),
    }
    media.push(record)
    writeMedia(media)

    return NextResponse.json(record)
  } catch (err) {
    console.error("Upload error:", err)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const denied = await requireCms(request)
  if (denied) return denied
  try {
    const { id } = await request.json()
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

    const media = readMedia()
    const index = media.findIndex((m) => m.id === id)
    if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })

    const item = media[index]
    const filePath = path.join(IMAGES_DIR, path.basename(item.filename))
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)

    media.splice(index, 1)
    writeMedia(media)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}
