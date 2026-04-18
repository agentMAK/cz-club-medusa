import { HttpTypes } from "@medusajs/types"
import { Bebas_Neue } from "next/font/google"
import { Package, Clock, FileText } from "lucide-react"
import Accordion from "@modules/products/components/product-tabs/accordion"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })

function DeliveryBody() {
  return (
    <div className="grid grid-cols-1 gap-y-4 py-4">
      <div className="flex items-start gap-x-3">
        <Package className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className={`${bebas.className} text-xl tracking-wide mb-1`}>
            Delivery Costs
          </h3>
          <p className="text-sm text-ui-fg-subtle">
            UK delivery £8.00 (3-5 days) • International £13.99
          </p>
        </div>
      </div>

      <div className="flex items-start gap-x-3">
        <Clock className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className={`${bebas.className} text-xl tracking-wide mb-1`}>
            Pre-Orders
          </h3>
          <p className="text-sm text-ui-fg-subtle">
            Small batch production • 2–3 weeks production, typically arrives by
            4th week • Email updates at every stage
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-200">
        <LocalizedClientLink
          href="/shipping"
          className="text-sm text-black hover:text-gray-700 hover:underline transition-colors inline-flex items-center gap-1"
        >
          View full policy →
        </LocalizedClientLink>
      </div>
    </div>
  )
}

/** Medusa admin often saves rich text as HTML; plain textarea copy should pass through unchanged. */
function descriptionLooksLikeHtml(value: string): boolean {
  return /<(p|br|div|ul|ol|li|h[1-6]|span|strong|b|em|a|table|blockquote|section|article)\b/i.test(
    value
  )
}

const descriptionHtmlClassName = [
  "text-sm text-ui-fg-subtle break-words",
  "[&_p]:mb-3 last:[&_p]:mb-0",
  "[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1",
  "[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1",
  "[&_li]:marker:text-ui-fg-subtle",
  "[&_a]:underline [&_a]:text-ui-fg-base",
  "[&_strong]:font-semibold [&_b]:font-semibold",
  "[&_h1]:mb-2 [&_h2]:mb-2 [&_h3]:mb-2 [&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base [&_h1]:font-bebas [&_h2]:font-bebas [&_h3]:font-bebas",
].join(" ")

function DescriptionBody({ descriptionText }: { descriptionText: string }) {
  const asHtml = descriptionLooksLikeHtml(descriptionText)

  return (
    <div className="grid grid-cols-1 gap-y-4 py-4">
      <div className="flex items-start gap-x-3">
        <FileText className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
        <div className="min-w-0 flex-1">
          {asHtml ? (
            <div
              className={descriptionHtmlClassName}
              dangerouslySetInnerHTML={{ __html: descriptionText }}
            />
          ) : (
            <div className="text-sm text-ui-fg-subtle whitespace-pre-wrap break-words">
              {descriptionText}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

type DeliveryInfoProps = {
  product: HttpTypes.StoreProduct
}

export default function DeliveryInfo({ product }: DeliveryInfoProps) {
  const descriptionText = product.description ?? ""
  const hasDescription = descriptionText.trim().length > 0

  if (hasDescription) {
    return (
      <Accordion type="single" collapsible>
        <Accordion.Item title="Description" value="description" headingSize="medium">
          <DescriptionBody descriptionText={descriptionText} />
        </Accordion.Item>
        <Accordion.Item
          title="Delivery & Pre-Order"
          value="delivery-preorder"
          headingSize="medium"
        >
          <DeliveryBody />
        </Accordion.Item>
      </Accordion>
    )
  }

  return (
    <div className="border-grey-20 border-t border-b py-3 px-1">
      <p
        className={`${bebas.className} text-lg text-ui-fg-subtle tracking-wide`}
      >
        Delivery & Pre-Order
      </p>
      <DeliveryBody />
    </div>
  )
}
