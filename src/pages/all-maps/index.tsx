import { Header } from "@src/components/header"
import { MapIconComponent } from "@src/components/maps-icons"
import { MapData } from "@src/components/maps-source"
import { useAppNavigation } from "@src/router/navigation-helpers"
import { useLocalStorageData } from "@src/store/use-local-storage-data"
import { TextTitleLg } from "@src/styles/typography"
import { useTheme } from "styled-components"

import { MapIconContainer, MapImageContainer, MapsContainer, MapSelected, MapWrapper } from "../home/styles"
import { Container, ContainerContent } from "./styles"

export function AllMaps() {
  const maps = useLocalStorageData(s => s.maps)
  const { to } = useAppNavigation()
  const { colors } = useTheme()

  return (
    <Container>
      <Header />
      <ContainerContent>
        <TextTitleLg style={{ color: colors["primary-a0"] }}>
          Active duty map pool
        </TextTitleLg>
        <MapsContainer>

          {maps.map(({ name, isOnMapPool }) => {
            const mapData = MapData({ map: name })

            return (
              isOnMapPool &&
              <MapWrapper key={name} onClick={() => to.map(name)}>
                <MapImageContainer>
                  <MapSelected $src={mapData.banner} className="map-banner" />
                </MapImageContainer>

                <MapIconContainer className="map-icon">
                  <MapIconComponent map={name} size={84} />
                </MapIconContainer>
              </MapWrapper>
            )
          })}
        </MapsContainer>

        <TextTitleLg style={{ color: colors["primary-a0"] }}>
          Reserve map pool
        </TextTitleLg>
        <MapsContainer>
          {maps.map(({ name, isOnMapPool }) => {
            const mapData = MapData({ map: name })
            const isMapOnReservePool = !isOnMapPool

            return (
              isMapOnReservePool &&
              <MapWrapper key={name} onClick={() => to.map(name)}>
                <MapImageContainer>
                  <MapSelected $src={mapData.banner} className="map-banner" />
                </MapImageContainer>

                <MapIconContainer className="map-icon">
                  <MapIconComponent map={name} size={84} />
                </MapIconContainer>
              </MapWrapper>
            )
          })}
        </MapsContainer>

      </ContainerContent>
    </Container>
  )

}