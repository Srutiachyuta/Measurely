"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/ui/toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      storageKey="measurely-theme"
    >
      <ToastProvider>
        {children}
      </ToastProvider>
    </ThemeProvider>
  );
}
