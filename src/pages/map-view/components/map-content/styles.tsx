import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  height: 100vh;
  width: 100%;
  justify-content: center;
  margin-right: ${({ theme }) => theme.space.lg};
`

export const GrenadeContainer = styled.div`
  display: flex;
  user-select: none;
  gap: ${({ theme }) => theme.space.xs};
  justify-content: center;
  align-items: center;
  width: 100%;
`