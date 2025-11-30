import type { GrenadesType } from "@src/@types/data"
import { GrenadesComponent } from "@src/components/grenades"
import { useLocalStorageData } from "@src/store/use-local-storage-data"
import { TextTitleMd } from "@src/styles/typography"
import { useTheme } from "styled-components"

import { Container, Content } from "./styles"

interface GrenadeCardProps {
  grenade: GrenadesType
  size: number
}
export function GrenadeCard({ grenade, size }: GrenadeCardProps) {
  const { colors } = useTheme()
  const count = useLocalStorageData(s => s.getGrenades({ type: grenade }).count)
  const grenadeIcon = GrenadesComponent({ type: grenade, size: size })

  return (
    count >= 1 &&
    <Container>
      <Content >
        {grenadeIcon}
      </Content>

      <TextTitleMd style={{ color: colors["primary-a0"] }}>
        <strong>{count}</strong>
      </TextTitleMd>

      <TextTitleMd style={{ textTransform: 'capitalize' }}>
        <strong>{grenade}s</strong>
      </TextTitleMd>
    </Container>

  )
}