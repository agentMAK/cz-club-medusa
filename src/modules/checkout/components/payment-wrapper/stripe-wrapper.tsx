"use client"

import { Stripe, StripeElementsOptions, Appearance } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { HttpTypes } from "@medusajs/types"
import { createContext } from "react"

type StripeWrapperProps = {
  paymentSession: HttpTypes.StorePaymentSession
  stripeKey?: string
  stripePromise: Promise<Stripe | null> | null
  children: React.ReactNode
}

export const StripeContext = createContext(false)

const StripeWrapper: React.FC<StripeWrapperProps> = ({
  paymentSession,
  stripeKey,
  stripePromise,
  children,
}) => {
  // Appearance configuration for Payment Element
  const appearance: Appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#000000",
      colorBackground: "#ffffff",
      colorText: "#1a1a1a",
      colorDanger: "#df1b41",
      fontFamily: "Inter, system-ui, sans-serif",
      borderRadius: "6px",
      spacingUnit: "4px",
    },
    rules: {
      ".Input": {
        border: "1px solid #e5e7eb",
        boxShadow: "none",
        padding: "12px",
      },
      ".Input:focus": {
        border: "1px solid #000000",
        boxShadow: "0 0 0 1px #000000",
      },
      ".Label": {
        fontWeight: "500",
        marginBottom: "8px",
      },
      ".Tab": {
        border: "1px solid #e5e7eb",
        boxShadow: "none",
      },
      ".Tab:hover": {
        border: "1px solid #000000",
      },
      ".Tab--selected": {
        border: "1px solid #000000",
        boxShadow: "0 0 0 1px #000000",
      },
    },
  }

  const options: StripeElementsOptions = {
    clientSecret: paymentSession!.data?.client_secret as string | undefined,
    locale: "en-GB", // Use UK locale for "postcode" instead of "zip code"
    appearance,
  }

  if (!stripeKey) {
    throw new Error(
      "Stripe key is missing. Set NEXT_PUBLIC_STRIPE_KEY environment variable."
    )
  }

  if (!stripePromise) {
    throw new Error(
      "Stripe promise is missing. Make sure you have provided a valid Stripe key."
    )
  }

  if (!paymentSession?.data?.client_secret) {
    throw new Error(
      "Stripe client secret is missing. Cannot initialize Stripe."
    )
  }

  return (
    <StripeContext.Provider value={true}>
      <Elements options={options} stripe={stripePromise}>
        {children}
      </Elements>
    </StripeContext.Provider>
  )
}

export default StripeWrapper
