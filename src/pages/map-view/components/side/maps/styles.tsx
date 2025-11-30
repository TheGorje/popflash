import styled from "styled-components"

export const MapButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
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

export const Container = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  width: 100%;
  overflow-y: auto;
  margin-bottom: ${({ theme }) => theme.space.lg};;
`