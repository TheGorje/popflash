import React, { useEffect } from "react"

import { CheckPath, CirclePath, Svg, Wrapper } from "./styles"

interface CheckConfirmProps {
  visible?: boolean;               // dispara a animação
  size?: number;                   // tamanho em px (width/height)
  duration?: number;               // duração total em segundos
  color?: string;                  // cor do check
  onFinish?: () => void;           // callback ao terminar
  className?: string;
}

export function CheckConfirm({
  visible = true,
  size = 64,
  duration = 0.9,
  color,
  onFinish,
  className
}: CheckConfirmProps) {
  const circleDuration = duration * 0.55
  const checkDuration = duration * 0.45
  const gap = 0.06

  useEffect(() => {
    if (!visible) return
    const total = (circleDuration + checkDuration + gap) * 1000
    if (onFinish) {
      const id = window.setTimeout(onFinish, total)
      return () => window.clearTimeout(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  return (
    <Wrapper className={className} $size={size} $visible={visible}>
      <Svg viewBox="0 0 52 52" $color={color}>
        <CirclePath
          d="M26 2a24 24 0 1 1 0 48 24 24 0 0 1 0-48z"
          $duration={circleDuration}
          $delay={0}
          $play={visible}
        />
        <CheckPath
          d="M14 27l6 6 18-18"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          $duration={checkDuration}
          $delay={circleDuration + gap}
          $play={visible}
        />
      </Svg>
    </Wrapper>
  )
}
