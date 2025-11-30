import type { MapsOptions } from "@src/@types/map"
import { GrenadesComponent } from "@src/components/grenades"
import { Popover } from "@src/components/popover"
import { useLocalStorageData } from "@src/store/use-local-storage-data"
import { TextBodyMd, TextCaption, TextTitleLg, TextTitleMd } from "@src/styles/typography"
import { countGrenadesByType } from "@src/utils/count-grenades-by-type"
import { useState } from "react"
import { useTheme } from "styled-components"

import { PlaylistInput } from "../../styles"
import {
  Actions,
  Container,
  DeleteButton,
  EditButton,
  EditingActions,
  EditingCancelButton,
  EditingContainer,
  EditingCurrentName,
  EditingSaveButton,
  EditingSection,
  GrenadeContainer,
  GrenadesWrapper,
  Wrapper
} from "./styles"

interface PlaylistCardProps {
  playlistGrenadeIds: string[]
  playlistName: string
  currentGrenadeMap: MapsOptions
  currentGrenadeId: string | null
  currentPlaylistId: string
  handleToggleGrenadeToPlaylist: () => void
  handleDeleteItemToPlaylist: () => void
}

export function PlaylistCard({
  playlistGrenadeIds,
  playlistName,
  currentGrenadeMap,
  currentGrenadeId,
  currentPlaylistId,
  handleToggleGrenadeToPlaylist,
  handleDeleteItemToPlaylist
}: PlaylistCardProps) {
  const { colors } = useTheme()
  const renamePlaylist = useLocalStorageData(s => s.renamePlaylist)
  const [isEditingName, setIsEditingName] = useState<boolean>(false)

  const allGrenades = useLocalStorageData(s => s.getMap(currentGrenadeMap))
  const [editPlaylistInputName, setEditPlaylistInputName] = useState(playlistName)

  const isGrenadeOnPlaylist = !!playlistGrenadeIds.find(item => item === currentGrenadeId)

  const counts = countGrenadesByType(allGrenades?.grenades || [], playlistGrenadeIds)
  const handleClose = () => {
    setIsEditingName(false)
  }
  const handleConfirmRename = () => {
    renamePlaylist(currentGrenadeMap, currentPlaylistId, editPlaylistInputName)
    setIsEditingName(false)
  }

  const PopOverEdit = () => {
    return (
      <Popover isOpen={isEditingName} onClose={handleClose}>
        <EditingContainer onClick={(e) => e.stopPropagation()}>
          <TextTitleLg
            style={{ textAlign: 'start', width: '100%' }}
          >
            Edit playlist name
          </TextTitleLg>

          <EditingSection>
            <TextCaption>Current name</TextCaption>
            <EditingCurrentName>
              <TextTitleMd style={{ color: colors["primary-a0"] }}>
                <strong style={{ lineBreak: 'anywhere' }}>{playlistName}</strong></TextTitleMd>
            </EditingCurrentName>
          </EditingSection>

          <EditingSection>
            <TextCaption>News name</TextCaption>
            <PlaylistInput
              autoFocus
              value={editPlaylistInputName}
              maxLength={40}
              placeholder="New playlist name..."
              onChange={(e) => setEditPlaylistInputName(e.target.value)}
              $isFilled={editPlaylistInputName.trim().length >= 1}
            />
          </EditingSection>

          <EditingActions>
            <EditingCancelButton
              onClick={handleClose}>
              Cancel
            </EditingCancelButton>
            <EditingSaveButton
              onClick={handleConfirmRename}
              disabled={editPlaylistInputName.trim().length <= 0}>
              Save
            </EditingSaveButton>
          </EditingActions>
        </EditingContainer>
      </Popover>
    )
  }

  return (
    <>
      <PopOverEdit />
      <Container onClick={handleToggleGrenadeToPlaylist} $isGrenadeOnPlaylist={isGrenadeOnPlaylist}>
        <TextTitleLg style={{ width: '100%', textAlign: 'start' }}>
          <strong style={{ lineBreak: 'anywhere' }}>{playlistName}</strong>
        </TextTitleLg>

        <Wrapper>
          <GrenadesWrapper>
            {counts.smoke >= 1 &&
              <GrenadeContainer >
                <GrenadesComponent type='smoke' size="0.60rem" />
                <TextTitleMd>{counts.smoke}</TextTitleMd>
              </GrenadeContainer>
            }

            {counts.HE >= 1 &&
              <GrenadeContainer >
                <GrenadesComponent type='HE' size="0.85rem" />
                <TextTitleMd>{counts.HE}</TextTitleMd>
              </GrenadeContainer>
            }
            {counts.flashbang >= 1 &&
              <GrenadeContainer >
                <GrenadesComponent type='flashbang' size="0.95rem" />
                <TextTitleMd>{counts.flashbang}</TextTitleMd>
              </GrenadeContainer>
            }
            {counts.molotov >= 1 &&
              <GrenadeContainer >
                <GrenadesComponent type='molotov' size="0.50rem" />
                <TextTitleMd>{counts.molotov}</TextTitleMd>
              </GrenadeContainer>
            }

          </GrenadesWrapper>

          <Actions>
            <DeleteButton onClick={handleDeleteItemToPlaylist}>
              <TextBodyMd>
                Delete
              </TextBodyMd>
            </DeleteButton>

            <EditButton onClick={(e) => { setIsEditingName(!isEditingName); e.stopPropagation() }}>
              <TextBodyMd>
                Edit
              </TextBodyMd>
            </EditButton>
          </Actions>
        </Wrapper>
      </Container>
    </>
  )
}