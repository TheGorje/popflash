import styled from "styled-components"


export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.xs};

  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  padding:  ${({ theme }) => theme.space["2xs"]} ${({ theme }) => theme.space.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors["primary-a0"]};
  color: ${({ theme }) => theme.colors["primary-a0"]};
  &:hover {
    background: ${({ theme }) => theme.colors["surface-tonal-a0"]};
  }
`

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`
