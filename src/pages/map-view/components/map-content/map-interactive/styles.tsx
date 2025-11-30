import styled from "styled-components"

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.space.xs};
  user-select: none;
`

export const MapViewport = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: grab;

`
export const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
`

export const MapTransform = styled.div<{ $zoom: number; $offsetX: number; $offsetY: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
    scale(${(p) => p.$zoom})
    translate(${(p) => p.$offsetX}px, ${(p) => p.$offsetY}px);
  transform-origin: center center;
  transition: transform 0.1s ease-out;
`

export const MapImage = styled.img`
  display: block;
  width: 800px;
  height: 800px;
  object-fit: contain;
  pointer-events: none;
`

export const ZoomControls = styled.div`
  position: absolute;
  z-index: 10;
  right: 10px;
  top: 10px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space["2xs"]};

`
export const ZoomButton = styled.button`
    background: ${({ theme }) => theme.colors["surface-a0"]};
    color:  ${({ theme }) => theme.colors["white"]};
    border: 2px solid ${({ theme }) => theme.colors["surface-a20"]};
    padding: ${({ theme }) => theme.space["2xs"]} ${({ theme }) => theme.space.sm} ;
    border-radius: ${({ theme }) => theme.space["2xs"]} ;
    cursor: pointer;
    font-size: ${({ theme }) => theme.typography.titleLg.fontSize};
    line-height: ${({ theme }) => theme.typography.titleLg.lineHeight};
    transition: 0.2s ease-out;
    opacity: ${({ theme }) => theme.opacity[80]};

  &:hover{
    background: ${({ theme }) => theme.colors["surface-a10"]};
    opacity: 100;
  }
`


export const TransformWrapper = styled.div.attrs<{
  $zoom: number;
  $offsetX: number;
  $offsetY: number;
  $isDragging: boolean;
}>(props => ({
  style: {
    transform: `translate(${props.$offsetX}px, ${props.$offsetY}px) scale(${props.$zoom})`,
    cursor: props.$isDragging ? "move" : "default",
    transition: props.$isDragging ? "none" : "transform 0.15s ease",
  }
}))`
  position: absolute;
  transform-origin: center center;
`



export const MapInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
export const BackDrop = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors["surface-a0"]};
  opacity: 0.5;

  animation: backdrop-fade-in 0.5s ease;

  @keyframes backdrop-fade-in {
    0% { opacity: 0; }
    100% { opacity: 0.5;}
  } 
`