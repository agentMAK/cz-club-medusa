import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Waitlist | CZ CLUB",
  description: "Join the CZ Club waitlist.",
}

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

