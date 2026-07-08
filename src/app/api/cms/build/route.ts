import { NextResponse } from "next/server"
import { execSync } from "child_process"

export async function POST() {
  try {
    const output = execSync("npm run build 2>&1", {
      cwd: process.cwd(),
      timeout: 180000,
      encoding: "utf-8",
    })
    return NextResponse.json({ success: true, output: output.slice(-2000) })
  } catch (error: unknown) {
    const err = error as { stdout?: string; stderr?: string; message?: string }
    return NextResponse.json(
      { success: false, output: err.stdout || err.stderr || err.message },
      { status: 500 }
    )
  }
}
