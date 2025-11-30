import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors['surface-a0']};
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  width: 100%;
  height: 100%;
`
