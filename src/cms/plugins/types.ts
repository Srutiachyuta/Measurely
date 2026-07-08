export interface CmsPlugin {
  id: string
  name: string
  description: string
  icon: string
  href: string
  navOrder: number
  enabled: boolean
  version: string
  badge?: "new" | "beta"
}
