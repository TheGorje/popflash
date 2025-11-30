import { PlusIcon } from "@phosphor-icons/react"
import type { MapsOptions } from "@src/@types/map"
import { PlaylistPopover } from "@src/components/playlist-popover"
import { useLocalStorageData } from "@src/store/use-local-storage-data"
import { TextTitleLg } from "@styles/typography"
import { useState } from "react"
import { useTheme } from "styled-components"

import { ButtonStyled } from "../button-with-icon"
import { PLaylistButton } from "../playlist-button"
import { Container } from "./styles"

interface SidePlaylistsProps {
  currentMap: MapsOptions
}

export function SidePlaylists({ currentMap }: SidePlaylistsProps) {
  const { colors } = useTheme()
  const selectedPlaylistId = useLocalStorageData(s => s.selectedPlaylistId)
  const setSelectedPlaylistId = useLocalStorageData(s => s.setSelectedPlaylistId)

  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false)
  const playlists = useLocalStorageData(s => s.getPlaylists(currentMap))
  const allGrenades = useLocalStorageData(s => s.getMap(currentMap))?.grenades || []

  const handleSelectPlaylist = (id: string) => {
    if (selectedPlaylistId === id) {
      setSelectedPlaylistId(null)
      return
    }
    setSelectedPlaylistId(id)
  }

  const handleOpenPopOver = () => {
    setIsCreatingPlaylist(true)
  }

  return (
    <>
      <PlaylistPopover
        handleClosePopover={() => setIsCreatingPlaylist(false)}
        openPopover={isCreatingPlaylist}
        currentGrenadeId={null}
        grenadeMap={currentMap}
      />

      <TextTitleLg>Playlists</TextTitleLg>

      <ButtonStyled
        onClick={handleOpenPopOver}
        iconRight={<PlusIcon size={18} weight="bold" color={colors["primary-a0"]} />}
      >
        Playlists
      </ButtonStyled>
      <Container>
        {playlists.map(({ name, id, grenadeIds }) => {
          return (
            <PLaylistButton
              isActive={selectedPlaylistId === id}
              onClick={() => handleSelectPlaylist(id)}
              playlistGrenadeIds={grenadeIds}
              allGrenades={allGrenades}
            >
              {name}
            </PLaylistButton>
          )
        })}
      </Container>
    </>
  )
}