import type { Data } from "@src/@types/data"

export function downloadMapsJSON(maps: Data[]) {
  const blob = new Blob([JSON.stringify(maps, null, 2)], {
    type: "application/json"
  })

  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "popflash_maps.json"
  a.click()
  URL.revokeObjectURL(url)
}
