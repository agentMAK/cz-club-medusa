import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Order Transfer | CZ CLUB",
  description: "Manage your order transfer request.",
}

export default function TransferLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

