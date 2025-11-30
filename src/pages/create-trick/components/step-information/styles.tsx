// @ts-expect-error: SVG module with ?react isn't typed in this project
import CtSideLogo from '@assets/team/ctside.svg?react'
// @ts-expect-error: SVG module with ?react isn't typed in this project
import TsideLogo from '@assets/team/tside.svg?react'
import styled from "styled-components"


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space["2xl"]};
  justify-content: center;
  align-items: center;
`

export const ContainerSelections = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.lg};
  justify-content: center;
  align-items: center;

`

export const TextArea = styled.textarea<{ $isFilled?: boolean }>`
  border: 2px solid ${({ theme }) => theme.colors["surface-a30"]};
  border-color: ${({ theme, $isFilled }) => $isFilled ?
    theme.colors["success-a0"]
    :
    theme.colors["surface-a30"]
  };
  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: transparent;
  transition: background-color 0.2s ease-out;
  padding: ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.typography.titleMd.fontSize};
  font-weight: ${({ theme }) => theme.typography.titleMd.fontWeight};
  line-height: ${({ theme }) => theme.typography.titleMd.lineHeight};

  min-height: 30px;
  min-width: 450px;
  max-width: 800px;
  columns: 1;
  max-height: 500px;
  outline: none;
  &:focus-visible{
    background-color: ${({ theme }) => theme.colors["surface-a10"]};
  } 
  
`

export const CtSide = styled(CtSideLogo)`
  width: 30px;
  height: 30px;
  fill: ${({ theme }) => theme.colors['ctside']};
  cursor: pointer;
`

export const Tside = styled(TsideLogo)`
  width: 30px;
  height: 30px;
  fill: ${({ theme }) => theme.colors['tside']};
  cursor: pointer;
`