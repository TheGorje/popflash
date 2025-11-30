import type { GrenadesMovement, GrenadesTechnique, GrenadesType, Position, TeamSideType } from "./data"
import type { MapsOptions } from "./map"

export type StepType = "video" | "position(to)"| "position(from)"| "information"

export interface GrenadeData {
  id: string
  map: MapsOptions
  video: string
  type: GrenadesType
  positionTo: Position
  positionFrom: Position

  technique: GrenadesTechnique,
  movement: GrenadesMovement,
  description?: string
  teamSide: TeamSideType
}

export interface GrenadeFormData {
  id?: string
  map: MapsOptions
  movement: GrenadesMovement
  technique: GrenadesTechnique
  teamSide: TeamSideType
  type: GrenadesType
  isEditing: boolean,

  video?: string
  description?: string
  positionFrom?: Position
  positionTo?: Position
}
