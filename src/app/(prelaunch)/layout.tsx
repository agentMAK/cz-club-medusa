import { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
}

export default function PrelaunchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-mode="dark" suppressHydrationWarning>
      <body style={{ backgroundColor: 'black' }}>
        <main className="relative">{children}</main>
        <Analytics />
      </body>
    </html>
  )
}

