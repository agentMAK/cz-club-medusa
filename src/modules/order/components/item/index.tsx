import { HttpTypes } from "@medusajs/types"
import { Table, Text, Badge } from "@medusajs/ui"
import { useMemo } from "react"

import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import Thumbnail from "@modules/products/components/thumbnail"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  currencyCode: string
}

const Item = ({ item, currencyCode }: ItemProps) => {
  // Check if the item is a preorder
  const isPreorder = useMemo((): boolean => {
    // First check if metadata has preorder flag (set at add-to-cart time)
    if (item.metadata?.is_preorder === true) {
      return true
    }
    
    // Fallback to checking variant inventory status
    if (!item.variant) {
      return false
    }
    
    // Consider it a preorder if inventory_quantity is 0 or negative (oversold/backordered)
    const hasZeroOrNegativeInventory = 
      typeof item.variant.inventory_quantity === 'number' && 
      item.variant.inventory_quantity <= 0
    
    // Check if it's a preorder (managing inventory, backorders allowed, but no current stock)
    return (
      !!item.variant.manage_inventory &&
      !!item.variant.allow_backorder &&
      hasZeroOrNegativeInventory
    )
  }, [item.variant, item.metadata])

  return (
    <Table.Row className="w-full" data-testid="product-row">
      <Table.Cell className="!pl-0 p-4 w-24">
        <div className="flex w-16">
          <Thumbnail thumbnail={item.thumbnail} size="square" />
        </div>
      </Table.Cell>

      <Table.Cell className="text-left">
        <Text
          className="txt-medium-plus text-ui-fg-base"
          data-testid="product-name"
        >
          {item.product_title}
        </Text>
        <LineItemOptions variant={item.variant} data-testid="product-variant" />
        {isPreorder && (
          <Badge color="blue" className="mt-2 font-bebas">
            PREORDER
          </Badge>
        )}
      </Table.Cell>

      <Table.Cell className="!pr-0">
        <span className="!pr-0 flex flex-col items-end h-full justify-center">
          <span className="flex gap-x-1 ">
            <Text className="text-ui-fg-muted">
              <span data-testid="product-quantity">{item.quantity}</span>x{" "}
            </Text>
            <LineItemUnitPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </span>

          <LineItemPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </span>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item
