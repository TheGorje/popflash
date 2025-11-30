import styled from "styled-components"

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors['surface-a0']};
  display: flex;
  width: 100%;
  height: 100%;
`

export const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  height: 100%;
  width: 100%;
  justify-content: center;
  padding: ${({ theme }) => theme.space.md};
`