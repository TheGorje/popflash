import { TextTitleMd } from "@src/styles/typography"
import styled from "styled-components"

export const Button = styled.button<{ $stepType: "back" | "next" }>`
  background-color: transparent;
  padding: ${({ theme }) => theme.space["2xs"]} ${({ theme }) => theme.space.lg};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 2px solid;
  transition: 0.2s ease-out;
  cursor: pointer;
  border-color: ${({ theme, $stepType }) =>
    $stepType === 'back'
      ? theme.colors["surface-a30"]
      : theme.colors["primary-a0"]};
  &:not(:disabled):hover {
    background-color: ${({ theme, $stepType }) =>
    $stepType === 'back'
      ? theme.colors["surface-a10"]
      : theme.colors["surface-tonal-a0"]};
  }

  &:disabled {
    opacity: ${({ theme }) => theme.opacity[50]};
    border-color: ${({ theme, $stepType }) =>
    $stepType === 'next' && theme.colors["danger-a0"]};
    color: ${({ theme, $stepType }) => $stepType === 'next' && theme.colors["danger-a0"]};
  }
`
export const Text = styled(TextTitleMd) <{ $stepType: "back" | "next", $isFilled: boolean }>`
  border-color: ${({ theme, $stepType }) =>
    $stepType === 'next' && theme.colors["danger-a0"]};
  color: ${({ theme, $isFilled, $stepType }) =>
    $stepType === "next"
      ? ($isFilled ? theme.colors["white"] : theme.colors["primary-a0"])
      : theme.colors["white"]};


`