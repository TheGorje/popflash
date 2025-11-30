import styled from "styled-components"

export const PlaylistContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme}) =>theme.space.sm};
`

export const Overflow = styled.div`
  max-height: 65vh;
  overflow: auto;
`
export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({theme})=>theme.space.md};
  padding: ${({theme})=>theme.space.sm};
`
export const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({theme}) =>theme.colors["surface-a30"]};
`

export const InputContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xs};
  justify-content: center;
  align-items: stretch;
`
export const PlaylistInput = styled.input<{ $isFilled: boolean }>`
 display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  background: transparent;
  color: ${({ theme }) => theme.colors["white"]};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.md};
  border: 2px solid ${({ theme, $isFilled }) => $isFilled ? theme.colors["success-a0"] : theme.colors["surface-a30"]};
  border-radius: ${({ theme }) => theme.radius.sm};
  min-width: 320px;
  font-weight: bold;

  transition: 0.2s ease;
  &:focus-visible{
    outline: none;
    background: ${({ theme }) => theme.colors["surface-a10"]};
  }
`
export const ConfirmInputButton = styled.button`
  user-select: none;
  cursor: pointer;
  height: auto;
  display: flex;
  align-items: center;
  gap:  ${({ theme }) => theme.space["2xs"]};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.md};
  border: 2px solid ${({ theme }) =>  theme.colors["primary-a0"]};
  border-radius: ${({ theme }) =>  theme.space["2xs"]};
  background-color: ${({ theme }) =>  theme.colors["surface-a0"]};

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