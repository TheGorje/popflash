
import { type MapsOptions, MapsOptionsArray } from "@src/@types/map"
import { useAppNavigation } from "@src/router/navigation-helpers"
import { TextHeadlineLg } from "@styles/typography"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useTheme } from "styled-components"

import { SideMaps } from "./maps"
import { SidePlaylists } from "./playlists"
import { Container, Divider, HeaderSection, ScrollableSection } from "./styles"

export function Side() {
  const { colors } = useTheme()
  const { mapId } = useParams<{ mapId: MapsOptions }>()
  const { to } = useAppNavigation()

  useEffect(() => {
    if (!mapId) return
    if (!MapsOptionsArray.includes(mapId as MapsOptions)) {
      to.lostPage()
      return
    }
  }, [mapId, to])

  return (
    <Container>
      <HeaderSection>
        <TextHeadlineLg style={{ textTransform: 'capitalize', color: colors["primary-a0"] }}>
          <strong>{mapId}</strong>
        </TextHeadlineLg>
        <Divider />
      </HeaderSection>

      <ScrollableSection>
        {mapId && (
          <>
            <SidePlaylists currentMap={mapId} />
            <Divider />
          </>
        )}

        <SideMaps />
      </ScrollableSection>
    </Container>
  )

}