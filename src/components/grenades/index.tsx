import flashbang from "@assets/grenades/flashbang.png"
import HE from "@assets/grenades/he.png"
import molotov from "@assets/grenades/molotov.png"
import smoke from "@assets/grenades/smoke.png"

import { GrenadeImage } from "./styles"


export type GrenadeNames = "flashbang" | "HE" | "molotov" | "smoke"

interface GrenadesComponentProps {
  type: GrenadeNames
  size?: number | string
  alt?: string
}

const grenadeMap = {
  flashbang,
  HE,
  molotov,
  smoke,
}

export function GrenadesComponent({ type, size = 24, alt }: GrenadesComponentProps) {
  const grenadeSrc = grenadeMap[type]
  return <GrenadeImage src={grenadeSrc} alt={alt ?? type} size={size} />
}
