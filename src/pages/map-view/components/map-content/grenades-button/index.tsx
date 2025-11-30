import type { ReactNode } from "react"

import { Button } from "./styles"


interface GrenadeFilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isActive: boolean
}


export function GrenadeFilterButton({ children, isActive, ...props }: GrenadeFilterButtonProps) {

  return (
    <Button $active={isActive} {...props}>
      {children}
    </Button>
  )
}