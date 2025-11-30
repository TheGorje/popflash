import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.md};
  user-select: none;
`

export const StepContainer = styled.div<{ $isCompleted: boolean; $isCurrent: boolean }>`
  display: flex;
  align-items: center;
  gap:  ${({ theme }) => theme.space.sm};
  transition: 0.2s ease;
  color: ${({ $isCompleted, $isCurrent, theme }) =>
    $isCompleted ?
      theme.colors["success-a0"]
      :
      $isCurrent ? theme.colors.white : theme.colors["surface-a40"]
  };
`
export const Line = styled.div<{ $isCompleted: boolean; $isCurrent: boolean }>`
  display: flex;
  height: 0.05rem;
  min-width: 40px;
  max-width: 100px;
  background-color: ${({ $isCompleted, $isCurrent, theme }) =>
    $isCompleted ?
      theme.colors["success-a0"]
      :
      $isCurrent ? theme.colors.white : theme.colors["surface-a40"]
  };
`