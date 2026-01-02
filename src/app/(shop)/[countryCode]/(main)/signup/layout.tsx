import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up | CZ CLUB",
  description: "Sign up to stay updated on CZ Club releases and events.",
}

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

