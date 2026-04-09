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

  const single = products.length === 1

  return (
    <div className="content-container">
      <ul
        className={
          single
            ? "mx-auto grid max-w-[500px] grid-cols-1 gap-[40px] md:gap-[80px]"
            : "mx-auto max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[80px]"
        }
      >
        {products.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} />
          </li>
        ))}
      </ul>
    </div>
  )
}
