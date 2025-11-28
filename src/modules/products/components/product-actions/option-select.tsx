import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const getSizeOrder = (value: string) => {
    const sizeMap: Record<string, number> = {
      'XS': 0, 'S': 1, 'M': 2, 'L': 3, 'XL': 4, 'XXL': 5, 'XXXL': 6
    };
    return sizeMap[value] ?? 999; // Unknown sizes go to end
  };

  const sortedValues = (option.values ?? []).sort((a, b) => 
    getSizeOrder(a.value) - getSizeOrder(b.value)
  );

  const filteredOptions = sortedValues.map((v) => v.value)

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm font-bebas">Select {title}</span>
      <div
        className="flex flex-wrap gap-4"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          const isSelected = v === current
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                "font-bebas text-xl rounded-full px-4 py-2",
                {
                  "border-2 border-black bg-black text-white": isSelected,
                  "bg-transparent text-black hover:opacity-70": !isSelected,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
