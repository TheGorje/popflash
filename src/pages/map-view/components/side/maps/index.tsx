import { ArrowRightIcon } from "@phosphor-icons/react"
import { type MapsOptions, MapsOptionsArray } from "@src/@types/map"
import { MapIconComponent } from "@src/components/maps-icons"
import { useAppNavigation } from "@src/router/navigation-helpers"
import { TextTitleLg, TextTitleMd } from "@styles/typography"
import { useParams } from "react-router-dom"

import { Container, MapButton } from "./styles"



export function SideMaps() {
  const { to } = useAppNavigation()
  const { mapId } = useParams<{ mapId: MapsOptions }>()

  const goToMap = (currentMap: MapsOptions) => {
    to.map(currentMap)
  }

  return (
    <>
      <TextTitleLg>Maps</TextTitleLg>
      <Container>
        {MapsOptionsArray.map((map: MapsOptions) => {
          return (
            <MapButton key={map} $active={mapId === map} onClick={() => goToMap(map)}>
              <MapIconComponent map={map as MapsOptions} />
              <TextTitleMd style={{ textTransform: 'capitalize' }}>{map}</TextTitleMd>
              <ArrowRightIcon />
            </MapButton>
          )
        })}
      </Container>
    </>
  )
}