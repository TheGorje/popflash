import styled from "styled-components"

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors['surface-a0']};
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  width: 100%;
  height: 100%;
`

export const Wrapper = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space["2xl"]};
  padding: ${({ theme }) => theme.space.xl};
  justify-content: center;
  align-items: center;
  justify-items:  center;
`

export const Selection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.lg};
`

export const VideoWrapper = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};
  justify-content: center;
  width: 100%;
  align-items: center;
  justify-items:  center;
`

export const InputVideo = styled.input<{ $isFilled?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  background: transparent;
  color: ${({ theme }) => theme.colors["white"]};
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.md};
  border: 2px solid ${({ theme, $isFilled }) => $isFilled ? theme.colors["success-a0"] : theme.colors["surface-a30"]};
  border-radius: ${({ theme }) => theme.radius.sm};
  min-width: 320px;
  
  transition: 0.2s ease;
  &:focus-visible{
    outline: none;
    background: ${({ theme }) => theme.colors["surface-a10"]};
  }
`

export const PreviewVideo = styled.div`
  display: grid;
  aspect-ratio: 16 / 9;
  min-width: 450px;
  max-width: 850px;
  background-color: ${({ theme }) => theme.colors["surface-a10"]};
  border-radius: ${({ theme }) => theme.space.xs};
  padding: ${({ theme }) => theme.space.xs};
`