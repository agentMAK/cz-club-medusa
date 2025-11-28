import { Bebas_Neue } from "next/font/google"
import { Package, Clock } from "lucide-react"
import Accordion from "@modules/products/components/product-tabs/accordion"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap" })

export default function DeliveryInfo() {
  return (
    <Accordion type="single" collapsible>
      <Accordion.Item title="Delivery & Pre-Order" value="delivery-preorder" headingSize="medium">
        <div className="grid grid-cols-1 gap-y-4 py-4">
          {/* Delivery Costs Section */}
          <div className="flex items-start gap-x-3">
            <Package className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className={`${bebas.className} text-xl tracking-wide mb-1`}>Delivery Costs</h3>
              <p className="text-sm text-ui-fg-subtle">
                UK delivery £8.00 (3-5 days) • International £13.99
              </p>
            </div>
          </div>

          {/* Pre-Orders Section */}
          <div className="flex items-start gap-x-3">
            <Clock className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className={`${bebas.className} text-xl tracking-wide mb-1`}>Pre-Orders</h3>
              <p className="text-sm text-ui-fg-subtle">
                Small batch production • 2–3 weeks production, typically arrives by 4th week • Email updates at every stage
              </p>
            </div>
          </div>

          {/* Link to Shipping Page */}
          <div className="pt-2 border-t border-gray-200">
            <LocalizedClientLink
              href="/shipping"
              className="text-sm text-black hover:text-gray-700 hover:underline transition-colors inline-flex items-center gap-1"
            >
              View full policy →
            </LocalizedClientLink>
          </div>
        </div>
      </Accordion.Item>
    </Accordion>
  )
}
