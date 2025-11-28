import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col lg:max-w-[500px] font-bebas uppercase lg:mt-[100px]">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h2"
          className="text-5xl leading-10 text-ui-fg-base font-bebas uppercase"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <div className="text-sm text-ui-fg-subtle space-y-2 font-bebas uppercase">
          {product.description
            ?.split('-')
            .map((item) => item.trim())
            .filter(Boolean)
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
