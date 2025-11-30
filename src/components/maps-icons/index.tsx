import ancient from "@assets/maps/icon/ancient.png"
import anubis from "@assets/maps/icon/anubis.png"
import cache from "@assets/maps/icon/cache.png"
import dust2 from "@assets/maps/icon/dust2.png"
import inferno from "@assets/maps/icon/inferno.png"
import mirage from "@assets/maps/icon/mirage.png"
import nuke from "@assets/maps/icon/nuke.png"
import overpass from "@assets/maps/icon/overpass.png"
import train from "@assets/maps/icon/train.png"
import vertigo from "@assets/maps/icon/vertigo.png"
import type { MapsOptions } from "@src/@types/map"

import { MapIconImage } from "./styles"


interface MapIconComponentProps {
  map: MapsOptions
  size?: number | string
  alt?: string
}

const iconMaps = {
  ancient,
  anubis,
  cache,
  dust2,
  inferno,
  mirage,
  nuke,
  overpass,
  train,
  vertigo
}

export function MapIconComponent({ map, size = 24, alt, }: MapIconComponentProps) {
  const mapIconSrc = iconMaps[map]
  return <MapIconImage src={mapIconSrc} alt={alt ?? map} size={size} />
}
