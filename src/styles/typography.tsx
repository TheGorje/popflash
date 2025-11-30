import styled from 'styled-components'

// Display / Hero
export const TextDisplayLg = styled.h1`
  font-size: ${({ theme }) => theme.typography.displayLg.fontSize};
  font-weight: ${({ theme }) => theme.typography.displayLg.fontWeight};
  line-height: ${({ theme }) => theme.typography.displayLg.lineHeight};
  color: ${({ theme }) => theme.colors.text};
`

// Headlines
export const TextHeadlineLg = styled.h2`
  font-size: ${({ theme }) => theme.typography.headlineLg.fontSize};
  font-weight: ${({ theme }) => theme.typography.headlineLg.fontWeight};
  line-height: ${({ theme }) => theme.typography.headlineLg.lineHeight};
  color: ${({ theme }) => theme.colors.text};
`

export const TextHeadlineMd = styled.h3`
  font-size: ${({ theme }) => theme.typography.headlineMd.fontSize};
  font-weight: ${({ theme }) => theme.typography.headlineMd.fontWeight};
  line-height: ${({ theme }) => theme.typography.headlineMd.lineHeight};
  color: ${({ theme }) => theme.colors.text};
`

// Titles
export const TextTitleLg = styled.h4`
  font-size: ${({ theme }) => theme.typography.titleLg.fontSize};
  font-weight: ${({ theme }) => theme.typography.titleLg.fontWeight};
  line-height: ${({ theme }) => theme.typography.titleLg.lineHeight};
  color: ${({ theme }) => theme.colors.text};
`

export const TextTitleMd = styled.h5`
  font-size: ${({ theme }) => theme.typography.titleMd.fontSize};
  font-weight: ${({ theme }) => theme.typography.titleMd.fontWeight};
  line-height: ${({ theme }) => theme.typography.titleMd.lineHeight};
  color: ${({ theme }) => theme.colors.text};
`

// Body
export const TextBodyLg = styled.p`
  font-size: ${({ theme }) => theme.typography.bodyLg.fontSize};
  font-weight: ${({ theme }) => theme.typography.bodyLg.fontWeight};
  line-height: ${({ theme }) => theme.typography.bodyLg.lineHeight};
  color: ${({ theme }) => theme.colors.text};
`

export const TextBodyMd = styled.p`
  font-size: ${({ theme }) => theme.typography.bodyMd.fontSize};
  font-weight: ${({ theme }) => theme.typography.bodyMd.fontWeight};
  line-height: ${({ theme }) => theme.typography.bodyMd.lineHeight};
  color: ${({ theme }) => theme.colors.text};
`

export const TextBodySm = styled.p`
  font-size: ${({ theme }) => theme.typography.bodySm.fontSize};
  font-weight: ${({ theme }) => theme.typography.bodySm.fontWeight};
  line-height: ${({ theme }) => theme.typography.bodySm.lineHeight};
  color: ${({ theme }) => theme.colors.text};
`

// Caption / Small text
export const TextCaption = styled.span`
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  font-weight: ${({ theme }) => theme.typography.caption.fontWeight};
  line-height: ${({ theme }) => theme.typography.caption.lineHeight};
  color: ${({ theme }) => theme.colors['surface-a50']};
`

// Caption / Small text
export const BombSideText = styled.h1<{ $x: number, $y: number }>`
  position: absolute;
  font-size: 28px;
  color: ${({ theme }) => theme.colors['danger-a10']};
  font-family: ${({ theme }) => theme.fonts.bombType};
  left: ${({ $x }) => `${$x}%`};
  top: ${({ $y }) => `${$y}%`};
  transform: translate(-50%, -50%);
  transition: 0.2s ease-out;
  opacity: ${({ theme }) => theme.opacity[80]};
  &:hover{
      opacity: ${({ theme }) => theme.opacity[50]};

  }
`
