import type { CmsPlugin } from "./types"

const plugins: CmsPlugin[] = []

export function registerPlugin(plugin: CmsPlugin): void {
  if (plugins.some((p) => p.id === plugin.id)) return
  plugins.push(plugin)
}

export function getPlugins(): CmsPlugin[] {
  return [...plugins].sort((a, b) => a.navOrder - b.navOrder)
}

export function getPlugin(id: string): CmsPlugin | undefined {
  return plugins.find((p) => p.id === id)
}

export function getEnabledPlugins(): CmsPlugin[] {
  return getPlugins().filter((p) => p.enabled)
}
