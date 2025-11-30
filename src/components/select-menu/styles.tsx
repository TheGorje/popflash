import styled from "styled-components"

export const Container = styled.div`
  position: relative;
  width: 280px;
  user-select: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`

export const SelectedItem = styled.div<{ $isSelected?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  background: transparent;
  color: ${({ theme }) => theme.colors["white"]};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.md};
  border: 2px solid ${({ theme, $isSelected }) => $isSelected ? theme.colors["success-a0"] : theme.colors["surface-a30"]};
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors["surface-a10"]};
  }
`

export const OptionsList = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors["surface-a10"]};
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
`

export const OptionItem = styled.div<{ $isSelected?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};

  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.md};
  cursor: pointer;
  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors["primary-a0"] : theme.colors["white"]};
  background: ${({ theme }) => theme.colors["surface-a10"]};
  &:hover {
    background: ${({ theme }) => theme.colors["surface-a20"]};
  }
`
