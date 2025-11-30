import { GrenadesComponent } from "@components/grenades"
import type { GrenadesType, TeamSideType } from "@src/@types/data"
import { type MapsOptions, MapsOptionsArray } from "@src/@types/map"
import { useAppNavigation } from "@src/router/navigation-helpers"
import { useLocalStorageData } from "@src/store/use-local-storage-data"
import { TextTitleMd } from "@styles/typography"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"

import { GrenadeFilterButton } from "./grenades-button"
import { MapInteractive } from "./map-interactive/"
import { Container, GrenadeContainer } from "./styles"
import { TeamSelection } from "./team-selection"

export function MapContent() {
  const { mapId } = useParams<{ mapId: MapsOptions }>()
  const { to } = useAppNavigation()

  const map = useLocalStorageData(s => s.getMap(mapId as MapsOptions))
  const selectedPlaylistId = useLocalStorageData(s => s.selectedPlaylistId)
  const playlist = useLocalStorageData(s =>
    selectedPlaylistId ? s.getPlaylists(mapId as MapsOptions).find(
      p => p.id === selectedPlaylistId) : null
  )

  const mapData = useMemo(() => {
    if (!map) return undefined
    if (!playlist) return map

    const ids = new Set(playlist.grenadeIds)

    return {
      ...map,
      grenades: map.grenades.filter(g => ids.has(g.id))
    }
  }, [map, playlist])


  const [activeSide, setActiveSide] = useState<TeamSideType>("any")
  const [currentGrenadeType, setCurrentGrenadeType] = useState<GrenadesType>('smoke')

  const smokeGrenadesCount = useLocalStorageData(
    s => s.getGrenades({ mapName: mapId, type: 'smoke', teamSide: activeSide }).count
  )
  const FlashBangGrenadesCount = useLocalStorageData(
    s => s.getGrenades({ mapName: mapId, type: 'flashbang', teamSide: activeSide }).count
  )
  const MolotovGrenadesCount = useLocalStorageData(
    s => s.getGrenades({ mapName: mapId, type: 'molotov', teamSide: activeSide }).count
  )
  const HesGrenadeCount = useLocalStorageData(
    s => s.getGrenades({ mapName: mapId, type: 'HE', teamSide: activeSide }).count
  )

  const handleCheckGrenade = (grenade: GrenadesType) => {
    if (grenade === currentGrenadeType) {
      return true
    }
    return false
  }

  const handleChangeTeamSide = (teamSelection: TeamSideType) => {
    if (activeSide === teamSelection) {
      setActiveSide('any')
      return
    }
    setActiveSide(teamSelection)
  }

  useEffect(() => {
    if (!MapsOptionsArray.includes(mapId as MapsOptions)) {
      to.lostPage()
    }
  }, [mapId, to])

  return (
    <Container>
      <GrenadeContainer>
        <GrenadeFilterButton isActive={handleCheckGrenade('smoke')} onClick={() => setCurrentGrenadeType('smoke')}>
          <GrenadesComponent type='smoke' size="0.75rem" />
          {mapId &&
            <TextTitleMd>
              {smokeGrenadesCount}
            </TextTitleMd>}
        </GrenadeFilterButton>

        <GrenadeFilterButton isActive={handleCheckGrenade('flashbang')} onClick={() => setCurrentGrenadeType('flashbang')}>
          <GrenadesComponent type='flashbang' size="1rem" />
          {mapId && <TextTitleMd>{FlashBangGrenadesCount}</TextTitleMd>}
        </GrenadeFilterButton>

        <GrenadeFilterButton isActive={handleCheckGrenade('molotov')} onClick={() => setCurrentGrenadeType('molotov')}>
          <GrenadesComponent type='molotov' size="0.50rem" />
          {mapId && <TextTitleMd>{MolotovGrenadesCount}</TextTitleMd>}
        </GrenadeFilterButton>

        <GrenadeFilterButton isActive={handleCheckGrenade('HE')} onClick={() => setCurrentGrenadeType('HE')}>
          <GrenadesComponent type='HE' size="1rem" />
          {mapId && <TextTitleMd>{HesGrenadeCount}</TextTitleMd>}
        </GrenadeFilterButton>
      </GrenadeContainer>

      {mapData && (
        <MapInteractive
          activeSide={activeSide}
          currentMap={mapId as MapsOptions}
          currentGrenadeType={currentGrenadeType}
          localStorageMapData={mapData}
          selectedPlaylistId={selectedPlaylistId}
        />
      )}

      <TeamSelection
        onChangeTeamSide={handleChangeTeamSide}
        activeSide={activeSide}
      />
    </Container>
  )
}