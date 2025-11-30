import type { GrenadeFormData } from "@src/@types/create-trick"
import type { MapsOptions } from "@src/@types/map"

import { useTypedNavigation } from "./use-typed-router"

export function useAppNavigation() {
  const navigate = useTypedNavigation()

  return {
    to: {
      lostPage: () => navigate("404"),

      home: () => navigate("/"),

      create: (state?: Partial<GrenadeFormData>) =>
        navigate("/create", { state }),

      map: (mapId: MapsOptions, state?: { scroll?: number }) =>
        navigate(`/map/${mapId}` as "/map/:mapId", { state }),

      allMaps: () => navigate(`/all-maps`),
      settings: () => navigate(`/settings`),

    },
  }
}
