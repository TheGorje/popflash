import { ArrowRightIcon, ArrowsCounterClockwiseIcon } from "@phosphor-icons/react"
import type { GrenadesType } from "@src/@types/data"
import type { MapsOptions } from "@src/@types/map"
import { CheckConfirm } from "@src/components/check-confirm"
import { GrenadesComponent } from "@src/components/grenades"
import { MapIconComponent } from "@src/components/maps-icons"
import { useAppNavigation } from "@src/router/navigation-helpers"
import { TextHeadlineLg, TextTitleLg } from "@src/styles/typography"
import { useTheme } from "styled-components"

import { ActionGoMap, ActionRecreate, ActionsContainer, FinishContainer } from "./styles"

interface CreateTrickFinishScreenProps {
  map: MapsOptions
  grenadeType: GrenadesType
  isEditingMode: boolean
  handleRecreateGrenade: () => void
}

export function CreateTrickFinishScreen({ map, grenadeType, isEditingMode, handleRecreateGrenade }: CreateTrickFinishScreenProps) {
  const { space, colors } = useTheme()
  const { to } = useAppNavigation()

  return (
    <FinishContainer>
      <div style={{ display: 'grid', justifyItems: 'center', gap: space.lg }}>
        <CheckConfirm
          visible={true}
          size={120}
          duration={1.0}
          onFinish={() => console.log("done")}
        />
        <TextHeadlineLg
          style={{ display: 'flex', alignItems: 'baseline', gap: space.sm }}>
          Grenade
          {' '}
          <span style={{ color: colors["primary-a0"] }}>{grenadeType}</span>
          <GrenadesComponent type={grenadeType} size={14} />
          {' '}
          {isEditingMode ? 'edited' : 'created'} on
          <span style={{ color: colors["primary-a0"] }}>{map}</span>
          <MapIconComponent map={map} size={24} />
          {' '}
        </TextHeadlineLg>
      </div>

      <ActionsContainer>
        <ActionRecreate onClick={handleRecreateGrenade}>
          <TextTitleLg>Recreate grenade</TextTitleLg>
          <ArrowsCounterClockwiseIcon size={22} weight="fill" />
        </ActionRecreate>

        <ActionGoMap onClick={() => to.map(map)}>
          <TextTitleLg>go to {map}</TextTitleLg>
          <ArrowRightIcon size={22} />
        </ActionGoMap>

      </ActionsContainer>
    </FinishContainer>
  )
}