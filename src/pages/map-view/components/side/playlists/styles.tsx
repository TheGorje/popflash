import styled from "styled-components"


export const Container = styled.div`
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  width: 100%;
  max-height: 40%;
  overflow-y: auto;
`
