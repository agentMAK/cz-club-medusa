import { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: "Waitlist | CZ CLUB",
  description: "Join the CZ Club waitlist.",
}

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-mode="dark" suppressHydrationWarning>
      <body style={{ backgroundColor: "black" }}>
        <main className="relative">{children}</main>
        <Analytics />
      </body>
    </html>
  )
}
