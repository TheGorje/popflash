import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  align-items: start;
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`

export const BackupCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};

  border: 2px solid ${({ theme }) => theme.colors["surface-a10"]};
  border-radius:${({ theme }) => theme.radius.sm};
  padding: ${({ theme }) => theme.space.md};
`

export const GrenadeWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  align-items: center;
  justify-content: center;
`

export const Divider = styled.div`
  width: 2px;
  height: 1rem;
  background-color: ${({ theme }) => theme.colors["surface-a10"]};
`

export const ButtonCreate = styled.button`
  background-color: transparent;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 2px solid ${({ theme }) => theme.colors["primary-a0"]};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.lg};
  transition: 0.2s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.xs};

  &:hover{
    background-color: ${({ theme }) => theme.colors["surface-tonal-a0"]};
  }
`
export const ButtonRestore = styled(ButtonCreate) <{ $isRestored: boolean }>`
  border-color: ${({ theme }) => theme.colors["success-a0"]};
  background-color: ${({ theme, $isRestored }) => $isRestored && theme.colors["success-a0"]};
  &:hover{
    background-color: ${({ theme }) => theme.colors["success-a0"]};
  }
`

export const ButtonDelete = styled(ButtonCreate)`
  border-color: ${({ theme }) => theme.colors["danger-a10"]};

  &:hover{
    background-color: ${({ theme }) => theme.colors["danger-a10"]};
  }
`
