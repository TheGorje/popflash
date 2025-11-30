
import { useAppNavigation } from "@src/router/navigation-helpers"
import { useTheme } from "styled-components"

import { Container, ContainerContent, CreateTrickIcon, Divider, GearButton, StyledLogo } from "./styles"
export function Header() {
  const { colors, space } = useTheme()
  const { to } = useAppNavigation()

  const goToHome = () => {
    to.home()
  }

  const goToCreateTrick = () => {
    to.create({ map: 'mirage', type: 'smoke', isEditing: false })
  }

  const goToSettings = () => {
    to.settings()
  }

  return (
    <>
      <Container>
        <ContainerContent>
          <StyledLogo onClick={goToHome} />
          <Divider />
        </ContainerContent>

        <ContainerContent>
          <CreateTrickIcon
            weight="fill"
            size={space.xl}
            color={colors["primary-a0"]}
            onClick={goToCreateTrick}
          />
        </ContainerContent>

        <ContainerContent>
          <GearButton
            onClick={goToSettings}
            weight="fill"
            size={space.xl}
          />
        </ContainerContent>

      </Container>
      <div style={{ marginRight: 104 }} />
    </>

  )
}