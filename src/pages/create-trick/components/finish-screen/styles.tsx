
import styled from "styled-components"

export const FinishContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space["2xl"]};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  justify-items: center;
`

export const ActionsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xl};
  justify-content: center;
  align-items: center;
`
export const ActionRecreate = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  border: 2px solid ${({ theme, }) => theme.colors["surface-a20"]};
  border-radius: ${({ theme }) => theme.space["2xs"]};
  opacity:  ${({ theme }) => theme.opacity[80]};
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.lg};
  gap: ${({ theme }) => theme.space.sm};
  transition: 0.2s ease-out;

  background-color: transparent;

  &:hover {
    background-color: ${({ theme }) => theme.colors["surface-a10"]};
    opacity: 1;
  }
`

export const ActionGoMap = styled.button`
  display: flex;
  text-transform: capitalize;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  border: 2px solid ${({ theme, }) => theme.colors["primary-a0"]};
  border-radius: ${({ theme }) => theme.space["2xs"]};
  opacity:  ${({ theme }) => theme.opacity[80]};
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.lg};
  gap: ${({ theme }) => theme.space.sm};
  transition: 0.2s ease-out;

  background-color: transparent;

  &:hover {
    background-color: ${({ theme }) => theme.colors["surface-tonal-a0"]};
    opacity: 1;
  }

`