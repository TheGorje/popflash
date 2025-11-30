import flashbang from "@assets/grenades/flashbang.png"
import HE from "@assets/grenades/he.png"
import molotov from "@assets/grenades/molotov.png"
import smoke from "@assets/grenades/smoke.png"
// fazer ainda a solo combinations
// ------------------------------
import soloCombinations from "@assets/grenades/smoke.png"
import type { GrenadesType } from "@src/@types/data"
import styled, { useTheme } from "styled-components"


const grenadeMap = {
  flashbang,
  HE,
  molotov,
  smoke,
  soloCombinations
}

interface MapConnectionLineProps {
  from: { x: number; y: number }
  to: { x: number; y: number }
  type: GrenadesType
  isSelected?: boolean
}

export function MapConnectionLine({ from, to, type, isSelected }: MapConnectionLineProps) {
  const { colors, opacity } = useTheme()
  const pathId = `path-${from.x}-${from.y}-${to.x}-${to.y}`
  const d = `M ${from.x} ${from.y} L ${to.x} ${to.y}`
  const grenadeSrc = grenadeMap[type]

  return (
    <SvgWrapper viewBox="0 0 100 100" preserveAspectRatio="none">
      <path
        id={pathId}
        d={d}
        stroke={isSelected ? colors["surface-a70"] : colors["surface-a40"]}
        strokeDasharray="0.5"
        strokeWidth='0.5'
        fill="none"
      />

      {isSelected && (
        <g>
          <circle r="2" fill={colors["surface-a70"]} opacity={opacity[50]}>
            <animateMotion dur="2s" repeatCount="indefinite">
              <mpath href={`#${pathId}`} />
            </animateMotion>
          </circle>

          <image
            href={grenadeSrc}
            width="3"
            height="3"
            x="-1.5"
            y="-1.5"
          >
            <animateMotion dur="2s" repeatCount="indefinite">
              <mpath href={`#${pathId}`} />
            </animateMotion>
          </image>
        </g>
      )}
    </SvgWrapper>
  )
}

const SvgWrapper = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  animation: connection-fade-in 0.1s ease-in;
  transition: none;

  @keyframes connection-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
