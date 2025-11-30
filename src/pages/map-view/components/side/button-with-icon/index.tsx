import { TextTitleMd } from "@styles/typography"
import type { ReactNode } from "react"
import { useTheme } from "styled-components"

import { IconWrapper, StyledButton } from "./styles"


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  iconRight?: ReactNode
}

export function ButtonStyled({ children, iconRight, ...props }: ButtonProps) {
  const { colors } = useTheme()
  return (
    <StyledButton {...props}>
      <TextTitleMd style={{ color: colors["primary-a0"] }}>{children}</TextTitleMd>
      {iconRight && <IconWrapper>{iconRight}</IconWrapper>}
    </StyledButton>
  )
}
