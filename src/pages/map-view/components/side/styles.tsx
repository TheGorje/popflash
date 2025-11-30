import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${({ theme }) => theme.space.md};
  width: 250px;
  height: 100vh;
  min-height: 0;
  overflow: hidden;
`

export const Divider = styled.div`
  height: 0.05rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors["surface-a30"]};
`

export const HeaderSection = styled.div`
  flex-shrink: 0;
  margin-top: ${({ theme }) => theme.space.lg};
`

export const ScrollableSection = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  overflow: hidden;
`
