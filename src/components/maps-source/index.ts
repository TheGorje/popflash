import ancientBanner from "@assets/maps/banner/ancient.png"
import anubisBanner from "@assets/maps/banner/anubis.png"
import cacheBanner from "@assets/maps/banner/cache.png"
import dust2Banner from "@assets/maps/banner/dust2.png"
import infernoBanner from "@assets/maps/banner/inferno.png"
import mirageBanner from "@assets/maps/banner/mirage.png"
import nukeBanner from "@assets/maps/banner/nuke.png"
import overpassBanner from "@assets/maps/banner/overpass.png"
import trainBanner from "@assets/maps/banner/train.png"
import vertigoBanner from "@assets/maps/banner/vertigo.png"
import ancient from "@assets/maps/radar/ancient_radar_1.webp"
import anubis from "@assets/maps/radar/anubis_radar_1.webp"
import cache from "@assets/maps/radar/cache_radar_1.webp"
import dust2 from "@assets/maps/radar/dust2_radar_1.webp"
import inferno from "@assets/maps/radar/inferno_radar_1.webp"
import mirage from "@assets/maps/radar/mirage_radar_1.webp"
import nuke from "@assets/maps/radar/nuke_radar_1.webp"
import overpass from "@assets/maps/radar/overpass_radar_1.webp"
import train from "@assets/maps/radar/train_radar_1.webp"
import vertigo from "@assets/maps/radar/vertigo_radar_1.webp"
import type { MapsOptions } from "@src/@types/map"

export interface BombSite {
  A: { x: number; y: number }
  B: { x: number; y: number }
}



interface MapSourceProps {
  map: MapsOptions
}

export function MapData({ map }: MapSourceProps) {
  return MapDatabase[map]
}

export interface MapData {
  image: string
  banner: string
  bombsites: BombSite
}

export const MapDatabase: Record<MapsOptions, MapData> = {
  ancient: {
    image: ancient,
    banner: ancientBanner,
    bombsites: {
      A: { x: 29.5, y: 24.1 },
      B: { x: 78.8, y: 41 },
    },
  },
  anubis: {
    image: anubis,
    banner: anubisBanner,

    bombsites: {
      A: { x: 74.5, y: 26.5 },
      B: { x: 31.5, y: 50 },
    },
  },
  cache: {
    image: cache,
    banner: cacheBanner,

    bombsites: {
      A: { x: 31.5, y: 24.5 },
      B: { x: 34.8, y: 81.8 },
    },
  },
  dust2: {
    image: dust2,
    banner: dust2Banner,

    bombsites: {
      A: { x: 80, y: 16.5 },
      B: { x: 19.5, y: 12 },
    },
  },
  inferno: {
    image: inferno,
    banner: infernoBanner,

    bombsites: {
      A: { x: 83.5, y: 72 },
      B: { x: 48, y: 21 },
    },
  },
  mirage: {
    image: mirage,
    banner: mirageBanner,

    bombsites: {
      A: { x: 54, y: 81.8 },
      B: { x: 16, y: 24 },
    }
  },
  nuke: {
    image: nuke,
    banner: nukeBanner,

    bombsites: {
      A: { x: 56.5, y: 49.5 },
      B: { x: 5000, y: 5000 },
    },
  },
  overpass: {
    image: overpass,
    banner: overpassBanner,

    bombsites: {
      A: { x: 44.1, y: 20.75 },
      B: { x: 66.25, y: 32.1 },
    },
  },
  train: {
    image: train,
    banner: trainBanner,

    bombsites: {
      A: { x: 64.6, y: 52.25 },
      B: { x: 54.3, y: 81 },
    },
  },
  vertigo: {
    image: vertigo,
    banner: vertigoBanner,

    bombsites: {
      A: { x: 7000, y: 3000 },
      B: { x: 19, y: 15.5 },
    },
  },
}
