"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ScrollToTop } from "@/components/layout/scroll-to-top"
import { SearchCommandLoader } from "@/components/layout/search-command-loader"
import { CookieConsentBanner } from "@/lib/thirdPartyScripts"

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")

  if (isAdmin) return <>{children}</>

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className="flex-1 pt-16" role="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <SearchCommandLoader />
      <CookieConsentBanner />
    </>
  )
}
