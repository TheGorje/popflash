import styled from "styled-components"

interface MapMarkerCreateTrickProps {
  id: string
  x: number
  y: number
  type: "to" | "from"
  isActive?: boolean
  isVisible?: boolean
  onClick?: (id: string, type: "to" | "from") => void
  onMouseEnter?: (id: string, type: "to" | "from") => void
  onMouseLeave?: (id: string, type: "to" | "from") => void
}

export function MapMarkerCreateTrick({
  id,
  x,
  y,
  type,
  isActive = false,
  isVisible = true,
  onClick,
  onMouseEnter,
  onMouseLeave
}: MapMarkerCreateTrickProps) {

  if (!isVisible) return null

  return (
    <MarkerWrapper
      $x={x}
      $y={y}
      $isActive={isActive}
      $type={type}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.(id, type)
      }}
      onMouseEnter={() => onMouseEnter?.(id, type)}
      onMouseLeave={() => onMouseLeave?.(id, type)}

    />
  )
}

const MarkerWrapper = styled.div<{
  $x: number
  $y: number
  $isActive: boolean
  $type: "to" | "from"
}>`
  position: absolute;
  left: ${({ $x }) => `${$x}%`};
  top: ${({ $y }) => `${$y}%`};
  transform: translate(-50%, -50%);
  width: ${({ $isActive }) => {
    if ($isActive) return "18px"
    return "16px"
  }};
  height: ${({ $isActive }) => {
    if ($isActive) return "18px"
    return "16px"
  }};
  border-radius: 50%;
  background-color: ${({ $isActive, theme }) => $isActive ? theme.colors["success-a10"] : theme.colors["white"]};
  border: 2px solid ${({ theme }) => theme.colors["surface-a10"]};
  transition: none;
  animation: create-map-maker-fade-in 0.1s ease-in;
  cursor: pointer;
  opacity: ${({ $isActive, theme }) => ($isActive ? "1" : theme.opacity[80])};

  &:hover {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.2);
  }

  @keyframes create-map-maker-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

    &::before {
    display: ${({ $isActive }) => $isActive ? 'block' : 'none'};
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors["white"]};
    opacity: 0.7;
    z-index: -1;
    animation: create-map-maker-pulse 1.6s infinite ease-out;
  }

  @keyframes create-map-maker-pulse {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }


`
