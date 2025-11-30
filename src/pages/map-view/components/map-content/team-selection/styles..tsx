// @ts-expect-error: SVG module with ?react isn't typed in this project
import CtSideLogo from '@assets/team/ctside.svg?react'
// @ts-expect-error: SVG module with ?react isn't typed in this project
import TsideLogo from '@assets/team/tside.svg?react'
import styled from 'styled-components'

type TeamSelected = 'tside' | 'ctside'

export const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xs};
  justify-content: center;
  align-items: center;
  width: 100%;
`
export const Button = styled.button<{ $active: boolean, $team: TeamSelected }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 2px solid ${({ theme, $active, $team }) =>
    $active ? ($team === 'ctside' ? theme.colors.ctside : theme.colors.tside) : theme.colors["surface-a20"]};
  border-radius: ${({ theme }) => theme.space["2xs"]};
  opacity: ${({ theme, $active }) => ($active ? "100" : theme.opacity[80])};
  padding: ${({ theme }) => theme.space["2xs"]} ${({ theme }) => theme.space.sm};
  gap: ${({ theme }) => theme.space.sm};
  transition: 0.2s ease-out;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors["surface-a10"] : 'transparent'};
  &:hover {
    background-color: ${({ theme }) => theme.colors["surface-a10"]};
    opacity: 100;
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