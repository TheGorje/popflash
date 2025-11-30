import styled from "styled-components"

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.lg};

`

export const MapContainer = styled.div`
  position: relative;
  width: 800px;
  height: 800px;
  border-radius: ${({ theme }) => theme.space.xs};
  overflow: hidden;
  user-select: none;
`

export const MapInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

export const MapImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
`
export const PositionInputName = styled.input<{ $isFilled?: boolean }>`
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