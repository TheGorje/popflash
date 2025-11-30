import { PencilIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react"
import type { MapsOptions } from "@src/@types/map"
import { PlaylistPopover } from "@src/components/playlist-popover"
import { SocialVideo } from "@src/components/video-player"
import { useAppNavigation } from "@src/router/navigation-helpers"
import { useLocalStorageData } from "@src/store/use-local-storage-data"
import { TextBodyLg, TextBodyMd, TextBodySm, TextTitleLg, TextTitleMd } from "@src/styles/typography"
import { useState } from "react"
import { useTheme } from "styled-components"

import type { ExtendedGrenades } from "../../../map-interactive"
import {
  ButtonAddPlaylist,
  Content,
  CtSide,
  DeleteButton,
  EditButton,
  Header,
  Section,
  TeamSideContainer,
  Tside,
  VideoBox,
} from "./styles"


interface GrenadeItemProps {
  grenade: ExtendedGrenades;
  currentMap: MapsOptions
}

export function GrenadeItem({ grenade, currentMap }: GrenadeItemProps) {
  const deleteGrenade = useLocalStorageData(s => s.deleteGrenade)
  const { opacity, space, colors } = useTheme()
  const [openSection, setOpenSection] = useState(false)
  const { to } = useAppNavigation()
  const [openPopoverPlaylist, setOpenPopoverPlaylist] = useState(false)

  const handleEditGrenade = () => {
    to.create({
      id: grenade.id,
      map: grenade.map,
      movement: grenade.movement,
      positionFrom: grenade.from,
      positionTo: grenade.to,
      description: grenade.description,
      teamSide: grenade.teamSide,
      technique: grenade.technique,
      type: grenade.type,
      video: grenade.video.url,
      isEditing: true
    })
  }
  const handleDeleteGrenade = (grenadeId: string) => {
    deleteGrenade(currentMap, grenadeId)
  }

  const handleAddToPlaylist = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    setOpenPopoverPlaylist(true)
  }

  return (
    <>
      <PlaylistPopover
        handleClosePopover={() => setOpenPopoverPlaylist(false)}
        openPopover={openPopoverPlaylist}
        currentGrenadeId={grenade.id}
        grenadeMap={grenade.map}
      />

      <Section onClick={() => setOpenSection(!openSection)} $open={openSection}>
        <Header>
          <div>
            <TextTitleLg style={{ textTransform: 'capitalize' }}>
              <strong>{grenade.type}</strong>
            </TextTitleLg>
            <TeamSideContainer>
              <TextBodyLg style={{ opacity: opacity[50] }}>
                Side: {grenade.teamSide.toUpperCase()}
              </TextBodyLg>

              {grenade.teamSide === 'CT' &&
                <CtSide />
              }
              {grenade.teamSide === 'T' &&
                <Tside />
              }
              {grenade.teamSide === 'any' &&
                <div style={{ gap: '4px', display: 'flex' }}>
                  <Tside />
                  <CtSide />
                </div>
              }

            </TeamSideContainer>
          </div>

          <TextBodyMd style={{ opacity: opacity[50] }}>{openSection ? "▲" : "▼"}</TextBodyMd>
        </Header>

        <ButtonAddPlaylist onClick={(event) => handleAddToPlaylist(event)}>
          <PlusIcon size={12} color={colors.white} />
          <TextBodySm>
            <strong>Add to playlist</strong>
          </TextBodySm>
        </ButtonAddPlaylist>

        {openSection && (
          <Content>
            {grenade.description && <TextBodyMd style={{ opacity: opacity[50] }}>{grenade.description}</TextBodyMd>}
            {grenade.from.name && <TextBodyMd ><strong>From:</strong> {grenade.from.name}</TextBodyMd>}
            {grenade.to.name && <TextBodyMd > <strong>To:</strong> {grenade.to.name}</TextBodyMd>}

            {(grenade.technique || grenade.movement) && (
              <>
                {grenade.technique && (
                  <TextBodyMd>
                    <strong>Technique:</strong> <span style={{ opacity: opacity[80] }}>{grenade.technique}</span>
                  </TextBodyMd>
                )}
                {grenade.movement && (
                  <TextBodyMd>
                    <strong>Movement:</strong> <span style={{ opacity: opacity[80] }}>{grenade.movement}</span>
                  </TextBodyMd>
                )}
              </>
            )}

            {grenade.video?.url && (
              <VideoBox>
                <SocialVideo url={grenade.video.url} />
              </VideoBox>
            )}

            <div style={{ display: 'flex', gap: space.md }}>
              <EditButton onClick={() => handleEditGrenade()}>
                <PencilIcon weight="fill" size={20} />
                <TextTitleMd ><strong>Edit nade</strong></TextTitleMd>
              </EditButton>

              <DeleteButton onClick={() => handleDeleteGrenade(grenade.id)}>
                <TrashIcon weight="fill" size={20} />
                <TextTitleMd ><strong>Delete nade</strong></TextTitleMd>
              </DeleteButton>
            </div>


          </Content>
        )
        }
      </Section >
    </>

  )
}
