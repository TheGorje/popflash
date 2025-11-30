import { Header } from '@components/header'
import { MapIconComponent } from '@src/components/maps-icons'
import { MapData } from '@src/components/maps-source'
import { useAppNavigation } from '@src/router/navigation-helpers'
import { useLocalStorageData } from '@src/store/use-local-storage-data'
import { TextHeadlineMd, TextTitleMd } from '@styles/typography'
import { useTheme } from 'styled-components'

import { GrenadeCard } from './components/grenades-card'
import { Container, GrenadesInfosContainer, Main, MapIconContainer, MapImageContainer, MapsContainer, MapSelected, MapWrapper, StyledLogo, TopTextContainer } from './styles'

export function Home() {
  const maps = useLocalStorageData(s => s.maps)

  const { to } = useAppNavigation()
  const { colors } = useTheme()

  return (
    <Container>
      <Header />
      <Main>
        <TopTextContainer>
          <StyledLogo />
          <TextHeadlineMd
            style={{
              color: colors['primary-a0'],
              textAlign: 'center',
              fontSize: 38,
              fontWeight: 'bolder',
              userSelect: 'none'
            }}
          >
            PopFlash
          </TextHeadlineMd>
        </TopTextContainer>

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

        <TextTitleMd
          style={{ color: colors['primary-a0'], cursor: 'pointer', textAlign: 'center' }}
          onClick={() => to.allMaps()}
        >
          See all maps
        </TextTitleMd>

        <GrenadesInfosContainer>
          <GrenadeCard grenade='HE' size={15} />
          <GrenadeCard grenade='flashbang' size={16} />
          <GrenadeCard grenade='molotov' size={8} />
          <GrenadeCard grenade='smoke' size={11} />
        </GrenadesInfosContainer>
      </Main>

    </Container>
  )
}
