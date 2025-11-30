import type { MapsOptions } from "./map"

export type GrenadesType = "smoke"| "flashbang" | "molotov" | "HE"
export type VideoOriginType  = "youtube" | "tiktok" | "twitter"
export type TeamSideType = "any"| "CT" | "T" 

export interface Data {
  name: MapsOptions
  isOnMapPool: boolean

  fromPosition: Position[]
  toPosition: Position[]
  grenades: Grenades[]
  playlists: Playlist[]
}

export interface Position {
  id: string
  name: string
  position: {x: number, y: number}
}

export interface Position {
  id: string
  name: string
  position: {x: number, y: number}
}

export type GrenadesMovement = "Stationary" | "Running" | "Walking" | "Crouched" | "Crouched Walking" 
export type GrenadesTechnique = "Left Click" | "Right Click" | "Left+Right Click" | "Jump + Left Click" | "Jump + Right Click" | "Jump + Left + Right click" 

export interface Grenades {
  id: string
  type: GrenadesType
  fromId: string
  toId: string
  video: {
    url: string
    // origin:VideoOriginType
  }
  teamSide: TeamSideType,
  technique?: GrenadesTechnique,
  movement?: GrenadesMovement,
  description?: string
}

export interface Playlist {
  id: string;
  name: string;
  grenadeIds: string[];
}