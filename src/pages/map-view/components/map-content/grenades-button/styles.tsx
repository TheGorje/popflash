import styled from 'styled-components'

export const Button = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: stretch;
  cursor: pointer;
  border: 2px solid ${({ theme, $active }) =>
    $active ? theme.colors["primary-a0"] : theme.colors["surface-a20"]};
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