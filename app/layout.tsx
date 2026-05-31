import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OnboardIQ — Coming Soon",
  description:
    "AI that finds where your trial users quit and saves them automatically.",
  openGraph: {
    title: "OnboardIQ — Coming Soon",
    description:
      "AI that finds where your trial users quit and saves them automatically.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
