import { Metadata } from "next"
import WaitlistLayoutClient from "./layout-client"

export const metadata: Metadata = {
  title: "CZ Club",
  description: "Join the CZ Club waitlist",
}

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <WaitlistLayoutClient>{children}</WaitlistLayoutClient>
}

