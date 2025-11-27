import { Metadata } from "next"

import RequestResetPassword from "@modules/account/components/request-reset-password"

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Request a password reset link for your account.",
}

export default function ForgotPasswordPage() {
  return <RequestResetPassword />
}


