import styled from "styled-components"

export const GrenadeImage = styled.img<{ size: number | string }>`
  width: ${({ size }) => (typeof size === "number" ? `${size}px` : size)};
  height: auto;
  object-fit: contain;
  display: block;
  user-select: none;
`
