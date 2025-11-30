import { ArrowDownIcon } from "@phosphor-icons/react"
import { TextTitleLg } from "@src/styles/typography"
import { type ReactNode, useEffect, useRef, useState } from "react"
import { useTheme } from "styled-components"

import {
  Container,
  OptionItem,
  OptionsList,
  SelectedItem
} from "./styles"

interface Option {
  label: string
  value: string | number
  image?: ReactNode
}

interface SelectMenuProps {
  options: Option[]
  value: string | number
  onChange: (value: string) => void
  placeholder?: string
  label?: string
}

export function SelectMenu({ options, value, onChange, placeholder, label }: SelectMenuProps) {
  const { space } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = options.find(o => o.value === value)
  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <Container ref={ref}>
      {label && <TextTitleLg>{label}</TextTitleLg>}
      <SelectedItem onClick={() => setOpen(prev => !prev)} $isSelected={options.some(opt => opt.value === value)}>
        {selected?.image && selected.image}
        <span>{selected?.label || placeholder || "Select"}</span>
        <ArrowDownIcon
          size={12}
          style={{ position: 'absolute', right: space.md, }}
        />

      </SelectedItem>

      {open && (
        <OptionsList>
          {options.map((opt) => (
            <OptionItem
              key={opt.value}
              onClick={() => {
                onChange(String(opt.value))
                setOpen(false)
              }}
              $isSelected={opt.value === value}
            >
              {opt.image && opt.image}
              <span>{opt.label}</span>
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </Container>
  )
}
