"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import { Clock, Check, XCircle } from "lucide-react"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

const variantIsPurchasable = (
  variant: HttpTypes.StoreProductVariant | undefined
): boolean => {
  if (!variant) {
    return false
  }
  if (!variant.manage_inventory) {
    return true
  }
  if (variant.allow_backorder) {
    return true
  }
  if (variant.manage_inventory && (variant.inventory_quantity || 0) > 0) {
    return true
  }
  return false
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options.
  // Otherwise default to a purchasable variant when possible (prefer M among purchasable).
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    } else if (product.variants && product.variants.length > 1) {
      const variants = product.variants
      setOptions((currentOptions) => {
        const hasAnySelection = Object.values(currentOptions).some(
          (v) => v !== undefined
        )
        if (hasAnySelection) {
          return currentOptions
        }

        if (!product.options) {
          return currentOptions
        }

        const purchasableWithM = variants.find(
          (v) =>
            variantIsPurchasable(v) &&
            !!v.options?.some((opt) => opt.value === "M")
        )
        const anyPurchasable = variants.find((v) => variantIsPurchasable(v))
        const variantWithM = variants.find((v) =>
          v.options?.some((opt) => opt.value === "M")
        )

        const chosen =
          purchasableWithM ??
          anyPurchasable ??
          variantWithM ??
          variants[0]

        const variantOptions = optionsAsKeymap(chosen.options)
        if (!variantOptions) {
          return currentOptions
        }

        return variantOptions
      })
    }
  }, [product.variants, product.options])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
    // Clear error when user selects an option
    setErrorMessage(null)
  }

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const inStock = useMemo(
    () => variantIsPurchasable(selectedVariant),
    [selectedVariant]
  )

// check if the selected variant is a preorder
  const isPreorder = useMemo((): boolean => {
    if (!selectedVariant) return false
    
    // Consider it a preorder if inventory_quantity is 0 or negative (oversold/backordered)
    const hasZeroOrNegativeInventory = 
      typeof selectedVariant.inventory_quantity === 'number' && 
      selectedVariant.inventory_quantity <= 0
    
    // Check if it's a preorder (managing inventory, backorders allowed, but no current stock)
    return (
      !!selectedVariant.manage_inventory &&
      !!selectedVariant.allow_backorder &&
      hasZeroOrNegativeInventory
    )
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    // Require variant selection
    if (!selectedVariant) {
      setErrorMessage("Please select a variant before adding to cart")
      return
    }

    // Prevent adding when not in stock or invalid
    if (!inStock || !isValidVariant) {
      setErrorMessage("This variant is currently out of stock")
      return
    }

    setErrorMessage(null)
    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
      metadata: isPreorder ? { is_preorder: true } : undefined,
    })

    setIsAdding(false)
  }

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
              <Divider />
            </div>
          )}
        </div>

        <ProductPrice product={product} variant={selectedVariant} />

        {selectedVariant && inStock && !isPreorder && (
          <div className="flex items-center gap-2 text-green-700">
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">In stock</span>
          </div>
        )}

        {selectedVariant && !inStock && (
          <div
            className="flex items-center gap-2 text-red-700"
            data-testid="product-out-of-stock"
          >
            <XCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Out of Stock</span>
          </div>
        )}

        {isPreorder && (
          <div className="flex items-center gap-2 text-blue-700">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Pre-Order • Ships in 2-3 weeks</span>
          </div>
        )}

        <Button
          onClick={handleAddToCart}
          disabled={!!disabled || isAdding || (selectedVariant ? !inStock || !isValidVariant : false)}
          variant="primary"
          className="w-full font-bebas text-xl border-2 border-black bg-black text-white rounded-full px-4 py-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          isLoading={isAdding}
          data-testid="add-product-button"
        >
          {isPreorder ? "Pre-Order Now" : "Add to cart"}
        </Button>
        {errorMessage && (
          <p className="text-sm text-red-600 mt-2" role="alert">
            {errorMessage}
          </p>
        )}
        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          isPreorder={isPreorder}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
