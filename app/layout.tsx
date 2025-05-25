import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { BreathingSessionProvider } from "@/contexts/breathing-session-context"
import { UserPreferencesProvider } from "@/contexts/user-preferences-context"
import { HistoryProvider } from "@/contexts/history-context"
import { Marcellus, Outfit, Roboto_Mono } from "next/font/google"
import GoogleAnalytics from './components/GoogleAnalytics'
import { SoundToggleButtonPortal } from "@/components/sound-toggle-button"
import { SoundProvider } from "@/contexts/sound-context"

const marcellus = Marcellus({ subsets: ["latin"], weight: "400" })
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "500"] }) // 300=Light, 500=Medium
const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: "300" }) // 300=Light

export const metadata = {
  title: "Momma's Little Helper | Breathing Meditation App",
  description: "Master slow, controlled breathing techniques with our sophisticated scoring algorithm",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SoundProvider>
            <SoundToggleButtonPortal />
            <UserPreferencesProvider>
              <HistoryProvider>
                <BreathingSessionProvider>
                  <GoogleAnalytics />
                  {children}
                </BreathingSessionProvider>
              </HistoryProvider>
            </UserPreferencesProvider>
          </SoundProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === "development" && (
          <div id="__next-bottom-left-button" />
        )}
      </body>
    </html>
  )
}

// Export font classes for use in components
export const fontClasses = {
  logo: marcellus.className,
  heading: `${outfit.className} font-medium`,
  metrics: robotoMono.className,
}
