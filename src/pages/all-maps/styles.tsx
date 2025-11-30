import styled from "styled-components"

export const Container = styled.div`
  display: flex;
`

export const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
  padding: ${({ theme }) => theme.space.xl};
`