import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react/dist/ssr"
import type { MapsOptions } from "@src/@types/map"
import { MapIconComponent } from "@src/components/maps-icons"
import { MapData } from "@src/components/maps-source"
import { useLocalStorageData } from "@src/store/use-local-storage-data"
import { TextBodyLg, TextTitleLg } from "@src/styles/typography"

import { Action, Container, MapBanner, MapButton, MapContainer, MapNameText, MapWrapper, RestoreButton } from "./styles"

export function MapsPool() {
  const { updateMapPool, restoreDefaultMapsPool } = useLocalStorageData()

  const mapPoolAndName = useLocalStorageData(s => s.maps)


  const handleToggleMapActivity = (mapName: MapsOptions, isOnMapPool: boolean) => {
    updateMapPool(mapName, isOnMapPool)
  }

  const handleRestoreToDefaultMapsPool = () => {
    restoreDefaultMapsPool()
  }

  return (
    <Container>
      <TextTitleLg>Active duty map pool</TextTitleLg>
      <MapContainer>
        {mapPoolAndName.map(({ name, isOnMapPool }) => {
          const bannerSrc = MapData({ map: name }).banner
          return (
            isOnMapPool &&
            <MapButton key={name}
              onClick={() => handleToggleMapActivity(name, !isOnMapPool)}
            >
              <div
                className="map-icon"
                style={{ transition: '0.2s ease' }}
              >
                <MapIconComponent map={name} size={64} />
              </div>
              <MapNameText
                style={{ textShadow: '0px 0px 10px black' }}
                className="map-text"
              >
                {name}
              </MapNameText>

              <MapWrapper>
                <MapBanner $imageSrc={bannerSrc} className="map-banner" />
              </MapWrapper>
            </MapButton>
          )
        })}
      </MapContainer>

      <TextTitleLg>Reserve map pool</TextTitleLg>
      <MapContainer>
        {mapPoolAndName.map(({ name, isOnMapPool }) => {
          const isOnReserveMapPool = !isOnMapPool
          const bannerSrc = MapData({ map: name }).banner

          return (
            isOnReserveMapPool &&
            <MapButton key={name}
              onClick={() => handleToggleMapActivity(name, !isOnMapPool)}
            >
              <div
                className="map-icon"
                style={{ transition: '0.2s ease' }}
              >
                <MapIconComponent map={name} size={64} />
              </div>

              <MapNameText
                style={{ textShadow: '0px 0px 10px black' }}
                className="map-text"
              >
                {name}
              </MapNameText>

              <MapWrapper>
                <MapBanner $imageSrc={bannerSrc} className="map-banner" />
              </MapWrapper>
            </MapButton>
          )
        })}
      </MapContainer>

      <Action>
        <RestoreButton onClick={handleRestoreToDefaultMapsPool}>
          <TextBodyLg>Restore to default</TextBodyLg>
          <ArrowCounterClockwiseIcon
            weight="fill"
            size={18}
          />
        </RestoreButton>
      </Action>
    </Container>
  )
}