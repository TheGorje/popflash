import { EraserIcon } from "@phosphor-icons/react"
import type { MapsOptions } from "@src/@types/map"
import { useLocalStorageData } from "@src/store/use-local-storage-data"
import { TextBodySm } from "@src/styles/typography"

import type { ExtendedGrenades } from "../map-interactive"
import { GrenadeItem } from "./components/grenade-item/grenade-item-section"
import { DeleteButton, GrenadeContainer, Wrapper } from "./styles"


interface SideBarGrenadeContentProps {
  fromGrenades: ExtendedGrenades[]
  currentMap: MapsOptions
}
export function SideBarGrenadeContent({ fromGrenades, currentMap }: SideBarGrenadeContentProps) {
  const deleteGrenade = useLocalStorageData(s => s.deleteGrenade)

  const handleDeleteAllGrenades = () => {
    for (const { id } of fromGrenades) {
      deleteGrenade(currentMap, id)
    }
  }

  return (
    <Wrapper>
      <GrenadeContainer>
        <DeleteButton onClick={() => handleDeleteAllGrenades()}>
          <EraserIcon size={16} weight="fill" />
          <TextBodySm>Delete all nades</TextBodySm>
        </DeleteButton>

        {fromGrenades.map((grenade) => (
          <GrenadeItem
            key={grenade.id}
            grenade={grenade}
            currentMap={currentMap}
          />
        ))}
      </GrenadeContainer>
    </Wrapper>
  )
}

