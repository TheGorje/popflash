import type { TeamSideType } from "@src/@types/data"
import styled from "styled-components"

interface MapMarkerProps {
  id: string
  x: number
  y: number
  type: "to" | "from"
  teamSide: TeamSideType
  isActive?: boolean
  isZoomed?: boolean
  count: number
  onClick?: (id: string) => void
  onHover?: (id: string | null) => void
}

export function MapMarker({
  id,
  x,
  y,
  type,
  teamSide,
  isActive = false,
  isZoomed = false,
  onClick,
  onHover,
  count
}: MapMarkerProps) {
  return (
    <MarkerWrapper
      $x={x}
      $y={y}
      $isActive={isActive}
      $isZoomed={isZoomed}
      $type={type}
      $teamSide={teamSide}
      $count={count}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.(id)
      }}
      onMouseEnter={() => {
        if (type === "to") onHover?.(id)
      }}
      onMouseLeave={() => {
        if (type === "to") onHover?.(null)
      }}
    />
  )
}


const MarkerWrapper = styled.div<{
  $x: number
  $y: number
  $isActive: boolean
  $isZoomed: boolean
  $type: "to" | "from"
  $teamSide: TeamSideType
  $count: number
}>`
  position: absolute;
  transform: translate(-50%, -50%);
  left: ${({ $x }) => `${$x}%`};
  top: ${({ $y }) => `${$y}%`};
  width: ${({ $isActive, $isZoomed }) => {
    if ($isZoomed && $isActive) return "14px"
    if ($isActive) return "18px"
    if ($isZoomed) return "12px"
    return "16px"
  }};
  height: ${({ $isActive, $isZoomed }) => {
    if ($isZoomed && $isActive) return "14px"
    if ($isActive) return "18px"
    if ($isZoomed) return "12px"

    return "16px"
  }};
  border-radius: 50%;
  background-color: ${({ theme, $teamSide }) =>
    $teamSide === "CT" ? theme.colors["ctside"] :
      $teamSide === "T" ? theme.colors["tside"] :
        theme.colors["white"]};
  border: 2px solid ${({ theme }) => theme.colors["surface-a10"]};
  transition: none;
  animation: marker-fade-in 0.1s ease-in;
  cursor: pointer;
  opacity: ${({ $isActive }) => ($isActive ? "1" : "0.8")};

  &:hover {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.2);
  }

  @keyframes marker-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* ---- efeito de pulse ---- */
  &::before {
    display: ${({ $isActive }) => $isActive ? 'block' : 'none'};
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background-color: ${({ theme, $teamSide }) =>
    $teamSide === "CT" ? theme.colors["ctside"] :
      $teamSide === "T" ? theme.colors["tside"] :
        theme.colors["white"]};
    opacity: 0.7;
    z-index: -1;
    animation: pulse 1.6s infinite ease-out;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  /* bolinha de contador */
  &::after {
    content: "${({ $count }) => $count}";
    position: absolute;
    top: -10px;
    right: -10px;
    background: ${({ theme }) => theme.colors["surface-tonal-a0"]};
    color: ${({ theme }) => theme.colors["surface-tonal-a70"]};
    border-radius: ${({ theme }) => theme.radius.full};
    font-size:  ${({ theme }) => theme.typography.caption.fontSize};
    font-weight:  ${({ theme }) => theme.typography.caption.fontWeight};
    line-height:  ${({ theme }) => theme.typography.caption.lineHeight};
    padding: ${({ theme }) => theme.space["2xs"]};
  }
`
