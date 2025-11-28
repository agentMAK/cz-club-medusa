"use client"

import { useActionState } from "react"
import { requestPasswordResetAction } from "@lib/data/customer"
import Input from "@modules/common/components/input"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text } from "@medusajs/ui"
import { SubmitButton } from "@modules/checkout/components/submit-button"

const initialState = {
  success: false,
  error: null as string | null,
}

const RequestResetPassword = () => {
  const [state, formAction] = useActionState(
    requestPasswordResetAction,
    initialState
  )

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center"
      data-testid="request-reset-password-page"
    >
      <h1 className="text-large-semi uppercase mb-6">Forgot your password?</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        Enter the email associated with your account and we&apos;ll send you instructions to reset your password.
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            data-testid="forgot-email-input"
          />
        </div>
        {state.error && (
          <p className="text-small-regular text-ui-fg-error mt-3" data-testid="forgot-password-error">
            {state.error}
          </p>
        )}
        {state.success && (
          <p className="text-small-regular text-ui-fg-success mt-3" data-testid="forgot-password-success">
            If an account exists with the specified email, it&apos;ll receive instructions to reset the password.
          </p>
        )}
        <SubmitButton className="w-full mt-6" data-testid="request-reset-password-button">
          Request password reset
        </SubmitButton>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Remember your password?{" "}
        <LocalizedClientLink href="/account" className="underline">
          Sign in
        </LocalizedClientLink>
        .
      </span>
      <Text className="text-small-regular text-ui-fg-subtle mt-4 text-center">
        For your security, we won&apos;t confirm whether an email is registered. If it is, you&apos;ll receive a reset link.
      </Text>
    </div>
  )
}

export default RequestResetPassword


