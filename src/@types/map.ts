export const MapsOptionsArray = [
  "mirage",
  "dust2",
  "inferno",
  "ancient",
  "nuke",
  "anubis",
  "train",
  "overpass",
  "cache",
  "vertigo",
] as const

export type MapsOptions = typeof MapsOptionsArray[number];
