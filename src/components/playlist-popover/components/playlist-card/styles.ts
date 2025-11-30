import {  PencilIcon,TrashIcon } from "@phosphor-icons/react"
import styled from "styled-components"

export const EditingContainer = styled.div`
  padding: ${({ theme }) => theme.space.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`


export const EditingTitle = styled.h3`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
`


export const EditingSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`

export const EditingLabel = styled.span`
  font-size: 12px;
  opacity: 0.7;
`

export const EditingCurrentName = styled.div`
  border: 2px solid ${({ theme }) => theme.colors["surface-a20"]};
  padding: ${({ theme }) => theme.space.xs};
  border-radius: ${({ theme }) => theme.space["2xs"]};
`

export const EditingActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.space.sm};
`

export const EditingCancelButton = styled.button`
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.md};
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors["surface-a30"]};
  border-radius: ${({ theme }) => theme.space["2xs"]};
  cursor: pointer;
  opacity: ${({ theme }) => theme.opacity[50]};
  transition: 0.2s ease-out;

  &:hover{
    opacity: 1;
    background: ${({ theme }) => theme.colors["surface-a10"]};
  }
`

export const EditingSaveButton = styled.button`
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.md};
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors["primary-a0"]};
  border-radius: ${({ theme }) => theme.space["2xs"]};
  cursor: pointer;

  transition: 0.2s ease-out;

  &:hover {
    opacity: 1;
    background: ${({ theme }) => theme.colors["surface-tonal-a0"]};
  }
  &:disabled {
    opacity: ${({ theme }) => theme.opacity[50]};
    border: 2px solid ${({ theme }) => theme.colors["danger-a10"]};
    background: ${({ theme }) => theme.colors["surface-a0"]};
    cursor: not-allowed;
  }
`



export const Container = styled.div<{ $isGrenadeOnPlaylist: boolean }>`
  cursor: pointer;
  user-select: none;
  position: relative;

  background-color: ${({theme})=>theme.colors["surface-a0"]};
  border: 2px solid ${({theme, $isGrenadeOnPlaylist})=> $isGrenadeOnPlaylist ? theme.colors["success-a10"]: theme.colors["surface-a30"]};
  border-radius: ${({theme})=>theme.space["2xs"]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({theme})=>theme.space.md};
  padding: ${({theme})=>theme.space.xs} ${({theme})=>theme.space.md};
  flex: 1;
  transition: 0.2s ease-out;
  text-align: center;

  &:hover{
    background-color: ${({theme})=> theme.colors["surface-a10"]};
    border-color: ${({theme, $isGrenadeOnPlaylist})=> !$isGrenadeOnPlaylist && theme.colors["primary-a0"]};
  }
`
export const Actions = styled.div`
  display: flex;
  gap: ${({theme})=>theme.space.sm};

`
export const DeleteButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 2px solid ${({ theme }) => theme.colors["danger-a0"]};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.lg};
  transition: 0.2s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.xs};
  width: 100%;

  &:hover{
    background-color: ${({ theme }) => theme.colors["danger-a10"]};
  }
`
export const EditButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 2px solid ${({ theme }) => theme.colors["warning-a0"]};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.lg};
  transition: 0.2s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.xs};
  width: 100%;

  &:hover{
    background-color: ${({ theme }) => theme.colors["warning-a10"]};
  }
`

export const EditIcon = styled(PencilIcon)`
  position: relative;
  top: 0;
  left: 0;
  padding: ${({theme})=> theme.space["2xs"]};
  transition: 0.2s ease-out;

  opacity: ${({theme})=>theme.opacity[50]};
  fill: ${({theme})=> theme.colors["warning-a20"]};

  &:hover{
    opacity: 1;
    fill: ${({theme})=> theme.colors["warning-a10"]};
  }
`
export const DeleteIcon = styled(TrashIcon)`
  position: relative;
  top: 0;
  right: 0;
  padding: ${({theme})=> theme.space["2xs"]};
  transition: 0.2s ease-out;

  opacity: ${({theme})=>theme.opacity[50]};
  fill: ${({theme})=> theme.colors["danger-a20"]};

  &:hover{
    opacity: 1;
    fill: ${({theme})=> theme.colors["danger-a10"]};
  }
`
export const EditPlaylistInput = styled.input< {$isFilled: boolean} >`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  background: transparent;
  color: ${({ theme }) => theme.colors["white"]};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.md};
  border: 2px solid ${({ theme, $isFilled }) => $isFilled ? theme.colors["success-a0"] : theme.colors["surface-a30"]};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: ${({ theme }) => theme.typography.titleLg.fontSize};
  font-weight: bolder;
  line-height: ${({ theme }) => theme.typography.titleLg.lineHeight};

  transition: 0.2s ease;
  &:focus-visible{
    outline: none;
    background: ${({ theme }) => theme.colors["surface-a10"]};
  }
`
export const Wrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xs};
  width: 100%;
  justify-content: space-between;
`

export const GrenadesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({theme})=>theme.space.md};
`

export const GrenadeContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  align-items: center;
  justify-content: space-around;
  border-right: 2px solid ${({ theme }) => theme.colors["surface-a20"]};
  padding-right: ${({ theme }) => theme.space.md};

  &:last-child {
    border-right: none;
    padding-right: 0;
  }
`
