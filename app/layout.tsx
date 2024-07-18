import { Toaster } from "sonner"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "../components/provider/theme-provider"
import { ClerkProvider, useAuth, useUser } from "@clerk/clerk-react"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { ConvexProvider } from "@/components/provider/convex-provider"
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "Aya",
  description: "Simplyfy Notation",
  icons: {
    icon: [
      {
        media: "(preference-color-scheme: dark) and (color-scheme: dark)",
        sizes: "any",
        href: "/favicon.svg",
        url: "/favicon.svg",
      },
      {
        media: "(preference-color-scheme: light) and (color-scheme: light)",
        sizes: "any",
        href: "/favicon.svg",
        url: "/favicon.svg",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={poppins.className}>
        <ConvexProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange storageKey="theme-aya">
            <Toaster position="bottom-center" />
            {children}
          </ThemeProvider>
        </ConvexProvider>
      </body>
    </html>
  )
}
