import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  return (
    <footer className="border-t border-ui-border-base w-full" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
          <div>
            <LocalizedClientLink
              href="/"
              className="text-ui-fg-subtle text-4xl hover:text-ui-fg-base uppercase"
              style={{ fontFamily: '"Bebas Neue", sans-serif' }}
            >
              CZ Club
            </LocalizedClientLink>
          </div>
          <div className="text-base leading-6 font-normal" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
            <div className="flex flex-col gap-y-2">
              <span className="text-base font-semibold text-ui-fg-base" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>Support</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle text-base" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                <li>
                  <LocalizedClientLink
                    href="/contact"
                    className="hover:text-ui-fg-base"
                  >
                    Contact Us
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/shipping"
                    className="hover:text-ui-fg-base"
                  >
                    Shipping & Delivery
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <div className="flex w-full mb-16 justify-between text-ui-fg-muted">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} Medusa Store. All rights reserved.
          </Text>
          <MedusaCTA />
        </div> */}
      </div>
    </footer>
  )
}
