
import type { MapsOptions } from "@src/@types/map"
import { useLocalStorageData } from "@src/store/use-local-storage-data"
import { TextTitleLg } from "@src/styles/typography"
import { useState } from "react"
import { useTheme } from "styled-components"

import { Popover } from "../popover"
import { PlaylistCard } from "./components/playlist-card"
import { ConfirmInputButton, ContentContainer, Divider, InputContainer, Overflow, PlaylistContainer, PlaylistInput } from "./styles"

interface PlaylistPopoverProps {
  openPopover: boolean
  currentGrenadeId: string | null
  grenadeMap: MapsOptions
  handleClosePopover: () => void
}

interface handleAddGrenadeToPlaylistProps {
  playlistId: string
  currentGrenadeId: string | null
}

export function PlaylistPopover({ openPopover, currentGrenadeId, grenadeMap, handleClosePopover }: PlaylistPopoverProps) {
  const createPlaylist = useLocalStorageData(s => s.createPlaylist)
  const toggleGrenadeInPlaylist = useLocalStorageData(s => s.toggleGrenadeInPlaylist)
  const deletePlaylist = useLocalStorageData(s => s.deletePlaylist)

  const [playlistName, setPlaylistName] = useState<string>('')
  const { colors } = useTheme()
  const Playlists = useLocalStorageData(s => s.getPlaylists(grenadeMap))

  const handleCreatePlaylist = () => {
    createPlaylist(grenadeMap, playlistName)
    setPlaylistName('')
  }

  const handleToggleGrenadeToPlaylist = ({ playlistId, currentGrenadeId }: handleAddGrenadeToPlaylistProps) => {
    if (currentGrenadeId) {
      toggleGrenadeInPlaylist(grenadeMap, playlistId, currentGrenadeId)
    }
  }

  const handleDeleteItemToPlaylist = (playlistId: string) => {
    deletePlaylist(grenadeMap, playlistId)
  }

  return (
    <>
      <Popover isOpen={openPopover} onClose={() => handleClosePopover()}>
        <PlaylistContainer>
          <TextTitleLg style={{ textAlign: 'center', color: colors["primary-a0"] }}>
            <strong>Playlists</strong>
          </TextTitleLg>

          <Overflow>
            <ContentContainer>
              {Playlists.map(({ grenadeIds, id, name }) => {
                return (
                  <PlaylistCard
                    key={id}
                    playlistGrenadeIds={grenadeIds}
                    playlistName={name}
                    currentGrenadeMap={grenadeMap}
                    currentGrenadeId={currentGrenadeId}
                    handleToggleGrenadeToPlaylist={() => handleToggleGrenadeToPlaylist({ currentGrenadeId: currentGrenadeId, playlistId: id })}
                    handleDeleteItemToPlaylist={() => handleDeleteItemToPlaylist(id)}
                    currentPlaylistId={id}
                  />
                )
              })}
            </ContentContainer>
          </Overflow>

          <Divider />

          <InputContainer>
            <PlaylistInput
              onChange={(e) => setPlaylistName(e.target.value)}
              value={playlistName || ''}
              $isFilled={playlistName.trim().length >= 1}
              placeholder="Name your grenade playlist..."
              autoFocus
              maxLength={40}
            />
            <ConfirmInputButton
              disabled={playlistName.trim().length <= 0}
              onClick={handleCreatePlaylist}>
              Create playlist
            </ConfirmInputButton>
          </InputContainer>

        </PlaylistContainer>
      </Popover>
    </>
  )
}