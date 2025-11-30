import styled from "styled-components"

export const Container = styled.div`
  display: flex;
`

export const ContainerContent = styled.div`
  padding: ${({ theme }) => theme.space.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  align-items: center;
  justify-content: start;
  height: 100%;
  width: 100%;
`
export const Section = styled.div`
  height: 100%;
  gap: ${({ theme }) => theme.space.sm};
  display: flex;
  justify-content: center;
`

export const SectionButton = styled.button<{ $isActive: boolean }>`
  background-color: ${({ theme, $isActive }) => $isActive ? theme.colors["surface-tonal-a0"] : 'transparent'};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 2px solid ${({ theme, $isActive }) => $isActive ? theme.colors["primary-a0"] : theme.colors["surface-a20"]};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.lg};

  opacity: ${({ theme, $isActive }) => $isActive ? 1 : theme.opacity[50]};
  transition: 0.2s ease-out;
  &:hover {
    background-color: ${({ theme, $isActive }) => !$isActive && theme.colors["surface-a10"]};
    opacity: 1;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.xs};

`