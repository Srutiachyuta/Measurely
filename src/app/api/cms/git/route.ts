import { NextResponse } from "next/server"
import { execSync } from "child_process"

const REPO_DIR = process.cwd()

function exec(cmd: string): string {
  try {
    return execSync(cmd, { cwd: REPO_DIR, encoding: "utf-8", timeout: 15000 }).trim()
  } catch (e: any) {
    return e.stdout?.trim() || e.message || "Error"
  }
}

export async function GET() {
  try {
    const statusRaw = exec('git status --porcelain')
    const lines = statusRaw ? statusRaw.split("\n").filter(Boolean) : []

    const files = lines.map((line: string) => ({
      status: line.slice(0, 2).trim(),
      file: line.slice(3),
      staged: line[0] !== " " && line[0] !== "?",
    }))

    const branch = exec('git rev-parse --abbrev-ref HEAD')
    const log = exec('git log --oneline -10')
    const commits = log ? log.split("\n").filter(Boolean).map((l: string) => {
      const m = l.match(/^([a-f0-9]+)\s+(.*)/)
      return m ? { hash: m[1], message: m[2] } : { hash: "", message: l }
    }) : []

    const stats = {
      modified: files.filter((f: any) => f.status === "M" || f.status === "MM").length,
      added: files.filter((f: any) => f.status === "A" || f.status === "??").length,
      deleted: files.filter((f: any) => f.status === "D").length,
      renamed: files.filter((f: any) => f.status === "R").length,
    }

    return NextResponse.json({ branch, files, commits, stats, success: true })
  } catch (err) {
    return NextResponse.json({ error: "Git operation failed", success: false }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { action, message, files } = await request.json()

    if (action === "stage-all") {
      exec('git add -A')
      return NextResponse.json({ success: true, message: "All files staged" })
    }

    if (action === "stage") {
      if (files?.length) {
        for (const f of files) exec(`git add "${f}"`)
      }
      return NextResponse.json({ success: true, message: `Staged ${files?.length || 0} file(s)` })
    }

    if (action === "commit") {
      if (!message) return NextResponse.json({ error: "Commit message required" }, { status: 400 })
      exec(`git commit -m "${message.replace(/"/g, '\\"')}"`)
      return NextResponse.json({ success: true, message: `Committed: ${message}` })
    }

    if (action === "diff") {
      const diff = files?.length
        ? files.map((f: string) => `=== ${f} ===\n${exec(`git diff "${f}"`)}`).join("\n\n")
        : exec('git diff --stat')
      return NextResponse.json({ success: true, diff })
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 })
  } catch (err) {
    return NextResponse.json({ error: "Git operation failed" }, { status: 500 })
  }
}
