// @ts-expect-error: SVG module with ?react isn't typed in this project
import CtSideLogo from '@assets/team/ctside.svg?react'
// @ts-expect-error: SVG module with ?react isn't typed in this project
import TsideLogo from '@assets/team/tside.svg?react'
import styled from 'styled-components'


export const Section = styled.section<{$open: boolean}>`
  cursor: pointer;

  border: 2px solid ${({ theme }) => theme.colors["surface-a30"]};
  border-color: ${({$open, theme})=> $open && theme.colors["primary-a0"]};
  border-radius: ${({ theme }) => theme.space.xs};
  padding: ${({ theme }) => theme.space.md};
  transition: 0.2s ease;

  &:hover {
    border-color: ${({ theme, $open }) => !$open && theme.colors["surface-a70"]};
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ExpandIcon = styled.span`
  font-size: ${({ theme})=> theme.typography.bodyMd.fontSize};
  color: ${({ theme})=> theme.colors["surface-a40"]};
`

export const Content = styled.div`
  margin-top: ${({ theme})=> theme.space.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme})=> theme.space.xs};

  animation: grenade-item-fade-in 0.2s ease;
    @keyframes grenade-item-fade-in {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`
export const TeamSideContainer = styled.div`
  display: flex;
  gap: ${({theme})=>theme.space['2xs']};
  align-items: center;
  justify-content: center;
`

export const CtSide = styled(CtSideLogo)`
  width: 16px;
  height: 16px;
  fill: ${({ theme }) => theme.colors['ctside']};
  cursor: pointer;
`

export const Tside = styled(TsideLogo)`
  width: 16px;
  height: 16px;
  fill: ${({ theme }) => theme.colors['tside']};
  cursor: pointer;
`


export const VideoBox = styled.div`
  width: 100%;

  video {
    width: 100%;
    border-radius: 10px;
    border: 1px solid ${({ theme})=> theme.colors["primary-a10"]};
    /* max-height: 260px; */
  }
`

export const EditButton = styled.div`
  background-color: transparent;
  cursor: pointer;
  border-radius: ${({theme})=> theme.radius.sm};
  border: 2px solid ${({theme})=> theme.colors["warning-a0"]};
  padding: ${({theme})=> theme.space.xs};
  width: 100%;
  transition: 0.2s ease-out;
  opacity: ${({theme})=>theme.opacity[80]};
  &:hover {
    background-color: ${({theme})=> theme.colors["warning-a10"]};
    opacity: 1;
  }
  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({theme})=> theme.space.xs};
`

export const DeleteButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  border-radius: ${({theme})=> theme.radius.sm};
  border: 2px solid ${({theme})=> theme.colors["danger-a0"]};
  padding: ${({theme})=> theme.space.xs};
  width: 100%;
  opacity: ${({theme})=>theme.opacity[80]};

  transition: 0.2s ease-out;
  &:hover {
    background-color: ${({theme})=> theme.colors["danger-a10"]};
    opacity: 1;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({theme})=> theme.space.xs};
`

export const ButtonAddPlaylist = styled.button`
  background-color: transparent;
  cursor: pointer;
  border-radius: ${({theme})=> theme.radius.sm};
  border: 2px solid ${({theme})=> theme.colors["success-a0"]};
  padding: ${({theme})=> theme.space['2xs']} ${({theme})=> theme.space['xs']};
  opacity: ${({theme})=>theme.opacity[80]};
  margin-top: ${({theme})=> theme.space.xs};

  transition: 0.2s ease-out;
  &:hover {
    background-color: ${({theme})=> theme.colors["success-a10"]};
    opacity: 1;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({theme})=> theme.space.xs};

`