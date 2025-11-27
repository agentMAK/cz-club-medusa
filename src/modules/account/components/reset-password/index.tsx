"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { useActionState } from "react"
import { resetPasswordAction } from "@lib/data/customer"
import Input from "@modules/common/components/input"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@medusajs/ui"

const initialState = {
  success: false,
  error: null as string | null,
}

const ResetPassword = () => {
  const searchParams = useSearchParams()
  const token = useMemo(() => searchParams.get("token") || "", [searchParams])
  const email = useMemo(() => searchParams.get("email") || "", [searchParams])

  const [state, formAction] = useActionState(resetPasswordAction, initialState)

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center"
      data-testid="reset-password-page"
    >
      <h1 className="text-large-semi uppercase mb-6">Reset your password</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        Choose a new password for{" "}
        <span className="font-semibold">{email || "your account"}</span>.
      </p>
      <form className="w-full" action={formAction}>
        <input type="hidden" name="token" value={token} />
        <input type="hidden" name="email" value={email} />
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="New password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            data-testid="reset-password-input"
          />
        </div>
        {state.error && (
          <p
            className="text-small-regular text-ui-fg-error mt-3"
            data-testid="reset-password-error"
          >
            {state.error}
          </p>
        )}
        {state.success && (
          <p
            className="text-small-regular text-ui-fg-success mt-3"
            data-testid="reset-password-success"
          >
            Password reset successfully! You can now sign in.
          </p>
        )}
        <Button
          size="large"
          className="w-full mt-6"
          type="submit"
          data-testid="reset-password-button"
        >
          Reset password
        </Button>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Don&apos;t want to reset?{" "}
        <LocalizedClientLink href="/account" className="underline">
          Back to sign in
        </LocalizedClientLink>
        .
      </span>
    </div>
  )
}

export default ResetPassword


