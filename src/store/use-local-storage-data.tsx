import type { GrenadeData } from "@src/@types/create-trick"
import type {
  Data, Grenades, GrenadesType, Playlist,
  Position, TeamSideType
} from "@src/@types/data"
import type { MapsOptions } from "@src/@types/map"
import type { BackupEntry, ToleranceImportMergeNumber } from "@src/@types/settings"
import { baseMaps } from "@src/data/base-maps"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

const STORAGE_VERSION = 1

type LocalStorageData = {
  maps: Data[]
  backups: BackupEntry[]

  // LOAD
  initialize: () => void

  // MAP
  getMap: (name: MapsOptions) => Data | undefined
  updateMapPool: (name: MapsOptions, isOnPool: boolean) => void
  addPosition: (mapName: MapsOptions, pos: Position, type: "from" | "to") => void
  restoreDefaultMapsPool: () => void

  // GRENADES
  addGrenade: (data: GrenadeData) => void
  updateGrenade: (data: GrenadeData) => void
  deleteGrenade: (mapName: MapsOptions, grenadeId: string) => void
  getGrenades: (args: {
    mapName?: MapsOptions
    type?: GrenadesType
    teamSide?: TeamSideType
  }) => { grenades: Grenades[]; count: number }
  deleteGrenadesByFromIdOnMap: (mapName: MapsOptions, fromId: string) => void
  getVisibleGrenades: (mapName?: MapsOptions | undefined) => Grenades[]

  // PLAYLISTS
  selectedPlaylistId: string | null
  setSelectedPlaylistId: (id: string | null) => void

  getPlaylists: (mapName: MapsOptions) => Playlist[]
  createPlaylist: (mapName: MapsOptions, name: string, ids?: string[]) => void
  deletePlaylist: (mapName: MapsOptions, playlistId: string) => void
  renamePlaylist: (mapName: MapsOptions, playlistId: string, newName: string) => void
  toggleGrenadeInPlaylist: (mapName: MapsOptions, playlistId: string, grenadeId: string) => void
  addGrenadeToPlaylist: (mapName: MapsOptions, playlistId: string, grenadeId: string) => void

  // import 
  importMapsReplace: (newMaps: Data[]) => void
  mergeMapsImport: (importedMaps: Data[], tolerance: ToleranceImportMergeNumber) => void

  // backup
  createBackup: () => void
  restoreBackup: (id: string) => void
  deleteBackup: (id: string) => void
}

export const useLocalStorageData = create<LocalStorageData>()(
  persist(
    (set, get) => ({
      maps: baseMaps,
      backups: [],

      // ------------------------------------------------------
      // INIT
      // ------------------------------------------------------
      initialize: () => {
        const stored = get().maps

        const cleaned = cleanupUnusedPositions(stored)
        set({ maps: cleaned })
      },

      // ------------------------------------------------------
      // GRENADES
      // ------------------------------------------------------
      getMap: (name) => get().maps.find((m) => m.name === name),

      updateMapPool: (mapName, isOnPool) =>
        set(state => ({
          maps: state.maps.map(m =>
            m.name === mapName ? { ...m, isOnMapPool: isOnPool } : m
          )
        })),

      restoreDefaultMapsPool: () =>
        set(state => ({
          maps: state.maps.map(m => {
            const base = baseMaps.find(b => b.name === m.name)
            if (!base) return m

            return {
              ...m,
              isOnMapPool: base.isOnMapPool
            }
          })
        })),

      // ------------------------------------------------------
      addPosition: (mapName, pos, type) => {
        set(state => ({
          maps: state.maps.map(m => {
            if (m.name !== mapName) return m

            const list = type === "from" ? m.fromPosition : m.toPosition

            const exists = list.some(p => p.id === pos.id)
            return {
              ...m,
              fromPosition:
                type === "from"
                  ? exists ? list : [...list, pos]
                  : m.fromPosition,
              toPosition:
                type === "to"
                  ? exists ? list : [...list, pos]
                  : m.toPosition,
            }
          })
        }))
      },

      // ------------------------------------------------------
      addGrenade: (data) => {
        const map = get().getMap(data.map)
        if (!map) return

        const newGrenade: Grenades = {
          id: data.id,
          type: data.type,
          fromId: data.positionFrom.id,
          toId: data.positionTo.id,
          teamSide: data.teamSide,
          movement: data.movement,
          technique: data.technique,
          description: data.description,
          video: { url: data.video }
        }

        set(state => ({
          maps: state.maps.map(m =>
            m.name !== data.map
              ? m
              : {
                ...m,
                fromPosition: mergeOrAdd(m.fromPosition, data.positionFrom),
                toPosition: mergeOrAdd(m.toPosition, data.positionTo),
                grenades: [...m.grenades, newGrenade]
              }
          )
        }))
      },

      // ------------------------------------------------------
      updateGrenade: (data) => {
        const map = get().getMap(data.map)
        if (!map || !data.id) return

        set(state => ({
          maps: state.maps.map(m =>
            m.name !== data.map
              ? m
              : {
                ...m,
                fromPosition: mergeOrAdd(m.fromPosition, data.positionFrom),
                toPosition: mergeOrAdd(m.toPosition, data.positionTo),
                grenades: m.grenades.map(g =>
                  g.id === data.id
                    ? {
                      ...g,
                      type: data.type,
                      fromId: data.positionFrom.id,
                      toId: data.positionTo.id,
                      teamSide: data.teamSide,
                      movement: data.movement,
                      technique: data.technique,
                      description: data.description,
                      video: { url: data.video }
                    }
                    : g
                )
              }
          )
        }))
      },

      // ------------------------------------------------------
      deleteGrenade: (mapName, grenadeId) => {
        set(state => ({
          maps: state.maps.map(m =>
            m.name !== mapName
              ? m
              : {
                ...m,
                grenades: m.grenades.filter(g => g.id !== grenadeId)
              }
          )
        }))
      },

      // ------------------------------------------------------
      getVisibleGrenades: (mapName) => {
        const state = get()
        if (!mapName) {
          return state.maps.flatMap(m => m.grenades)
        }

        const map = state.getMap(mapName)
        if (!map) return []

        const playlistId = state.selectedPlaylistId
        if (playlistId) {
          const playlist = state.getPlaylists(mapName).find(p => p.id === playlistId)
          if (playlist) {
            const ids = new Set(playlist.grenadeIds)
            return map.grenades.filter(g => ids.has(g.id))
          }
        }

        return map.grenades
      },

      getGrenades: ({ mapName, type, teamSide }) => {
        const grenades = get().getVisibleGrenades(mapName)

        const filtered = grenades.filter(g => {
          if (type && g.type !== type) return false
          if (teamSide && teamSide !== "any" && g.teamSide !== teamSide) return false
          return true
        })

        return {
          grenades: filtered,
          count: filtered.length
        }
      },

      deleteGrenadesByFromIdOnMap: (mapName, fromId) => {
        console.log(mapName, fromId)
        set(state => {
          const updated = state.maps.map(map => {
            if (map.name !== mapName) return map
            return {
              ...map,
              grenades: map.grenades.filter(g => g.fromId !== fromId)
            }
          })

          const cleaned = cleanupUnusedPositions(updated)
          return { maps: cleaned }
        })
      },

      // ------------------------------------------------------
      // PlAYLISTS
      // ------------------------------------------------------
      getPlaylists: (mapName) => {
        const m = get().maps.find(m => m.name === mapName)
        return m?.playlists ?? []
      },

      selectedPlaylistId: null,

      setSelectedPlaylistId: (id) => set({ selectedPlaylistId: id }),

      createPlaylist: (mapName, name, grenadeIds = []) =>
        set(state => ({
          maps: state.maps.map(m =>
            m.name !== mapName
              ? m
              : {
                ...m,
                playlists: [
                  ...m.playlists,
                  { id: crypto.randomUUID(), name, grenadeIds: grenadeIds }
                ]
              }
          )
        })),

      // ------------------------------------------------------
      deletePlaylist: (mapName, playlistId) =>
        set(state => ({
          maps: state.maps.map(m =>
            m.name !== mapName
              ? m
              : {
                ...m,
                playlists: m.playlists.filter(p => p.id !== playlistId)
              }
          )
        })),

      renamePlaylist: (mapName, playlistId, newName) =>
        set(state => ({
          maps: state.maps.map(m =>
            m.name !== mapName
              ? m
              : {
                ...m,
                playlists: m.playlists.map(p =>
                  p.id !== playlistId
                    ? p
                    : { ...p, name: newName }
                )
              }
          )
        })),

      // ------------------------------------------------------
      toggleGrenadeInPlaylist: (mapName, playlistId, grenadeId) =>
        set(state => ({
          maps: state.maps.map(m =>
            m.name !== mapName
              ? m
              : {
                ...m,
                playlists: m.playlists.map(pl =>
                  pl.id !== playlistId
                    ? pl
                    : {
                      ...pl,
                      grenadeIds: pl.grenadeIds.includes(grenadeId)
                        ? pl.grenadeIds.filter(id => id !== grenadeId)
                        : [...pl.grenadeIds, grenadeId]
                    }
                )
              }
          )
        })),

      // ------------------------------------------------------
      addGrenadeToPlaylist: (mapName, playlistId, grenadeId) =>
        set(state => ({
          maps: state.maps.map(m =>
            m.name !== mapName
              ? m
              : {
                ...m,
                playlists: m.playlists.map(pl =>
                  pl.id !== playlistId
                    ? pl
                    : {
                      ...pl,
                      grenadeIds: [...new Set([...pl.grenadeIds, grenadeId])]
                    }
                )
              }
          )
        })),

      // ------------------------------------------------------
      // IMPORT
      // ------------------------------------------------------

      importMapsReplace: (importedMaps) => {
        get().createBackup()

        set(() => {
          const replaced = baseMaps.map(b => {
            const found = importedMaps.find(im => im.name === b.name)
            return found ? { ...b, ...found } : b
          })
          return { maps: replaced }
        })
      },

      mergeMapsImport: (importedMaps, tolerance) => {
        get().createBackup() // <-- faz backup
        get().initialize() // <-- limpa as posições vazias

        set(state => {
          const merged = mergeMaps(state.maps, importedMaps, tolerance)
          return { maps: merged }
        })
      },

      // ------------------------------------------------------
      // BACKUP
      // ------------------------------------------------------

      createBackup: () => {
        const { maps, backups } = get()

        const newBackup: BackupEntry = {
          id: crypto.randomUUID(),
          createdAt: Date.now(),
          data: maps,
        }

        const limited = [newBackup, ...backups].slice(0, 5)

        set({ backups: limited })
      },

      restoreBackup: (id) => {
        const backup = get().backups.find(b => b.id === id)
        if (!backup) return

        set({ maps: backup.data })
      },
      deleteBackup: (id) => {
        set(state => ({
          backups: state.backups.filter(b => b.id !== id)
        }))
      },

    }),
    {
      name: "@popflash_cs2_maps",
      version: STORAGE_VERSION,
      storage: createJSONStorage(() => localStorage),
    }
  )
)


// ====================================================
// HELPERS
// ====================================================

function mergeOrAdd(list: Position[], pos: Position) {
  const exists = list.some(p => p.id === pos.id)
  return exists
    ? list.map(p => (p.id === pos.id ? pos : p))
    : [...list, pos]
}

function cleanupUnusedPositions(maps: Data[]) {
  return maps.map(map => {
    const usedFromIds = new Set(map.grenades.map(g => g.fromId))
    const usedToIds = new Set(map.grenades.map(g => g.toId))

    return {
      ...map,
      fromPosition: map.fromPosition.filter(pos => usedFromIds.has(pos.id)),
      toPosition: map.toPosition.filter(pos => usedToIds.has(pos.id))
    }
  })
}

function isPositionClose(a: Position, b: Position, tolerance: ToleranceImportMergeNumber) {
  console.log(Math.abs(a.position.x - b.position.x))
  console.log(Math.abs(a.position.y - b.position.y))
  console.log(tolerance)
  return (
    Math.abs(a.position.x - b.position.x) <= tolerance &&
    Math.abs(a.position.y - b.position.y) <= tolerance
  )
}

function mergePositionListWithIdMap(oldList: Position[], newList: Position[], tolerance: ToleranceImportMergeNumber) {
  const merged: Position[] = [...oldList]
  const idMap: Record<string, string> = {}

  for (const pos of newList) {
    const byIdIndex = merged.findIndex(p => p.id === pos.id)
    if (byIdIndex !== -1) {
      merged[byIdIndex] = { ...merged[byIdIndex], ...pos }
      idMap[pos.id] = merged[byIdIndex].id
      continue
    }

    const closeIndex = merged.findIndex(p => isPositionClose(p, pos, tolerance))
    if (closeIndex !== -1) {
      merged[closeIndex] = {
        ...merged[closeIndex],
        position: pos.position,
        name: pos.name ?? merged[closeIndex].name
      }
      idMap[pos.id] = merged[closeIndex].id
      continue
    }

    merged.push(pos)
    idMap[pos.id] = pos.id
  }

  return { mergedList: merged, idMap }
}

function mergeGrenadesWithRemap(existingGrenades: Grenades[], importedGrenades: Grenades[], idMap: Record<string, string>) {
  const merged = [...existingGrenades]
  for (const g of importedGrenades) {
    const remappedFromId = idMap[g.fromId] ?? g.fromId
    const remappedToId = idMap[g.toId] ?? g.toId

    const existingIndex = merged.findIndex(x => x.id === g.id)
    if (existingIndex !== -1) {
      merged[existingIndex] = {
        ...merged[existingIndex],
        ...g,
        fromId: remappedFromId,
        toId: remappedToId
      }
    } else {
      merged.push({
        ...g,
        fromId: remappedFromId,
        toId: remappedToId
      })
    }
  }
  return merged
}

function mergeSingleMap(oldMap: Data, importedMap: Data, tolerance: ToleranceImportMergeNumber) {
  const { mergedList: mergedTos, idMap: toIdMap } = mergePositionListWithIdMap(oldMap.toPosition, importedMap.toPosition, tolerance)

  const { mergedList: mergedFroms, idMap: fromIdMap } = mergePositionListWithIdMap(oldMap.fromPosition, importedMap.fromPosition, tolerance)

  const combinedIdMap: Record<string, string> = { ...toIdMap, ...fromIdMap }

  const mergedGrenades = mergeGrenadesWithRemap(oldMap.grenades, importedMap.grenades, combinedIdMap)

  const mergedPlaylists = [...oldMap.playlists]
  for (const pl of importedMap.playlists ?? []) {
    if (!mergedPlaylists.some(p => p.id === pl.id)) mergedPlaylists.push(pl)
  }

  return {
    ...oldMap,
    toPosition: mergedTos,
    fromPosition: mergedFroms,
    grenades: mergedGrenades,
    playlists: mergedPlaylists
  }
}

function mergeMaps(existingMaps: Data[], importedMaps: Data[], tolerance: ToleranceImportMergeNumber) {
  const result = [...existingMaps]

  for (const imported of importedMaps) {
    const idx = result.findIndex(m => m.name === imported.name)
    if (idx === -1) {
      result.push(imported)
    } else {
      result[idx] = mergeSingleMap(result[idx], imported, tolerance)
    }
  }

  return result
}
