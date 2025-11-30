import type { Grenades } from "@src/@types/data"

export function countGrenadesByType(allGrenades: Grenades[], grenadeIds: string[]) {
    const counts = {
      molotov: 0,
      smoke: 0,
      flashbang: 0,
      HE: 0,
    }

    grenadeIds.forEach(id => {
      const g = allGrenades.find(gr => gr.id === id)
      if (!g) return

      counts[g.type] = (counts[g.type] || 0) + 1
    })

    return counts
  }