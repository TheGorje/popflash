import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors['surface-a10']};
  border: 1px solid ${({ theme }) => theme.colors['surface-a20']};
  padding: ${({ theme }) => theme.space.md};
  gap: ${({ theme }) => theme.space.sm};
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.sm};
`
export const Content = styled.div`
  background-color: ${({ theme }) => theme.colors['surface-tonal-a70']};
  border-radius: ${({ theme }) => theme.radius.full};
  width: 50px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`