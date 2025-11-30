import styled, { keyframes } from "styled-components"

export const Wrapper = styled.div<{ $size: number; $visible: boolean }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  display: inline-grid;
  place-items: center;
  transform-origin: center;
  transform: ${({ $visible }) => ($visible ? "scale(1)" : "scale(0.85)")};
  transition: transform 160ms cubic-bezier(0.2, 0.9, 0.2, 1);
`

const pop = keyframes`
  0% { transform: scale(.88); opacity: 0 }
  60% { transform: scale(1.06); opacity: 1 }
  100% { transform: scale(1); opacity: 1 }
`

export const Svg = styled.svg<{ $color?: string }>`
  width: 100%;
  height: 100%;
  display: block;
  overflow: visible;
  stroke: ${({ $color, theme }) => $color ?? theme.colors["primary-a0"] ?? theme.colors["success-a0"]};
  fill: none;
  animation: ${pop} 260ms ease-out;
`

export const CirclePath = styled.path<{
  $duration: number;
  $delay: number;
  $play: boolean;
}>`
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: inherit;
  fill: none;

  stroke-dasharray: 160;
  stroke-dashoffset: ${({ $play }) => ($play ? 160 : 160)};
  transition: stroke-dashoffset 0s linear;
  ${({ $play, $duration, $delay }) =>
    $play
      ? `animation: drawCircle ${$duration}s ease-out ${$delay}s forwards;`
      : `animation: none;`}

  @keyframes drawCircle {
    to {
      stroke-dashoffset: 0;
    }
  }
`

export const CheckPath = styled.path<{
  $duration: number;
  $delay: number;
  $play: boolean;
}>`
  stroke-width: 2.5;
  stroke: inherit;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;

  stroke-dasharray: 40;
  stroke-dashoffset: ${({ $play }) => ($play ? 40 : 40)};
  transition: stroke-dashoffset 0s linear;
  opacity: ${({ $play }) => ($play ? 1 : 0)};

  ${({ $play, $duration, $delay }) =>
    $play
      ? `animation: drawCheck ${$duration}s cubic-bezier(.2,.9,.2,1) ${$delay}s forwards;`
      : `animation: none;`}

  @keyframes drawCheck {
    to {
      stroke-dashoffset: 0;
      opacity: 1;
    }
  }
`
