import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"

export default async function AllProductsGrid({
  region,
}: {
  region: HttpTypes.StoreRegion
}) {
  const products: HttpTypes.StoreProduct[] = []

  let pageParam: number | null = 1

  while (pageParam) {
    const {
      response: { products: batch },
      nextPage,
    } = await listProducts({
      regionId: region.id,
      pageParam,
      queryParams: {
        limit: 100,
        fields: "*variants.calculated_price",
      },
    })

    products.push(...batch)
    pageParam = nextPage
  }

  if (!products.length) {
    return null
  }

  return (
    <div className="content-container py-12">
      <ul className="mx-auto max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-[80px]">
        {products.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} />
          </li>
        ))}
      </ul>
    </div>
  )
}
