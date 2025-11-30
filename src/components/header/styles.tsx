// @ts-expect-error: SVG module with ?react isn't typed in this project
import PopflashLogo from '@assets/interface/popflash-logo.svg?react'
import { GearIcon, PlusCircleIcon } from '@phosphor-icons/react'
import styled from 'styled-components'


export const Container = styled.div`
  height: 100vh;
  width: 104px;
  background-color: ${({ theme }) => theme.colors['surface-a10']};
  position: fixed;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};
  z-index: 100;

`

export const ContainerContent = styled.div`
  padding: ${({ theme }) => theme.space.xl};
  display: grid;
  justify-items: center;
  gap: ${({ theme }) => theme.space.xl};
`

export const GearButton = styled(GearIcon)`
  fill: ${({ theme }) => theme.colors['surface-a60']};
  cursor: pointer;

  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  &:hover{
    rotate: 60deg;
    scale: 1.15;
  }
`
export const CreateTrickIcon = styled(PlusCircleIcon)`
  cursor: pointer;
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
   &:hover{
    scale: 1.15;
  }
`

export const StyledLogo = styled(PopflashLogo)`
  width: 36px;
  height: 30px;
  fill: ${({ theme }) => theme.colors['primary-a0']};
  rotate: -30deg;
  cursor: pointer;

  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  &:hover{
    rotate: 0deg;
    scale: 1.15;
  }
`

export const Divider = styled.div`
  height: 1px;
  width: 104px;
  background-color: ${({ theme }) => theme.colors['surface-tonal-a10']};
`
