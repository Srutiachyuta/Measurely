import { NextResponse } from "next/server"
import { execFileSync } from "node:child_process"
import { requireCms } from "@/cms/lib/server-auth"

const REPO_DIR = process.cwd()

function exec(args: string[]): string {
  try {
    return execFileSync("git", args, { cwd: REPO_DIR, encoding: "utf-8", timeout: 15000, maxBuffer: 1024 * 1024 }).trim()
  } catch {
    throw new Error("Git operation failed")
  }
}

export async function GET(request: Request) {
  const denied = await requireCms(request)
  if (denied) return denied
  try {
    const statusRaw = exec(["status", "--porcelain"])
    const lines = statusRaw ? statusRaw.split("\n").filter(Boolean) : []

    const files = lines.map((line: string) => ({
      status: line.slice(0, 2).trim(),
      file: line.slice(3),
      staged: line[0] !== " " && line[0] !== "?",
    }))

    const branch = exec(["rev-parse", "--abbrev-ref", "HEAD"])
    const log = exec(["log", "--oneline", "-10"])
    const commits = log ? log.split("\n").filter(Boolean).map((l: string) => {
      const m = l.match(/^([a-f0-9]+)\s+(.*)/)
      return m ? { hash: m[1], message: m[2] } : { hash: "", message: l }
    }) : []

    const stats = {
      modified: files.filter(file => file.status === "M" || file.status === "MM").length,
      added: files.filter(file => file.status === "A" || file.status === "??").length,
      deleted: files.filter(file => file.status === "D").length,
      renamed: files.filter(file => file.status === "R").length,
    }

    return NextResponse.json({ branch, files, commits, stats, success: true })
  } catch (err) {
    return NextResponse.json({ error: "Git operation failed", success: false }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const denied = await requireCms(request)
  if (denied) return denied
  if (process.env.CMS_ALLOW_SERVER_OPERATIONS !== "true") return NextResponse.json({ error: "Server Git operations are disabled. Use your development workflow." }, { status: 403 })
  try {
    const { action, message, files } = await request.json()
    if (files !== undefined && (!Array.isArray(files) || files.length > 100 || files.some((filename: unknown) => typeof filename !== "string" || filename.startsWith("-") || filename.includes("..") || /^[\\/]|^[A-Za-z]:/.test(filename)))) return NextResponse.json({ error: "Invalid file selection" }, { status: 400 })

    if (action === "stage-all") {
      exec(["add", "-A"])
      return NextResponse.json({ success: true, message: "All files staged" })
    }

    if (action === "stage") {
      if (files?.length) {
        exec(["add", "--", ...files])
      }
      return NextResponse.json({ success: true, message: `Staged ${files?.length || 0} file(s)` })
    }

    if (action === "commit") {
      if (typeof message !== "string" || !message.trim() || message.length > 2000) return NextResponse.json({ error: "Valid commit message required" }, { status: 400 })
      exec(["commit", "-m", message])
      return NextResponse.json({ success: true, message: `Committed: ${message}` })
    }

    if (action === "diff") {
      const diff = files?.length
        ? exec(["diff", "--", ...files])
        : exec(["diff", "--stat"])
      return NextResponse.json({ success: true, diff })
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 })
  } catch (err) {
    return NextResponse.json({ error: "Git operation failed" }, { status: 500 })
  }
}
