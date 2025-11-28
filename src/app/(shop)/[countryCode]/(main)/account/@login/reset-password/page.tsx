import { Metadata } from "next"

import ResetPassword from "@modules/account/components/reset-password"

export const metadata: Metadata = {
  title: "Reset password",
  description: "Choose a new password for your account.",
}

export default function ResetPasswordPage() {
  return <ResetPassword />
}


