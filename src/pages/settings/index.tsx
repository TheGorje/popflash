import { Header } from "@src/components/header"
import { TextBodyLg } from "@src/styles/typography"
import { useState } from "react"
import { useTheme } from "styled-components"

import { Backup } from "./components/backup"
import { ImportExportData } from "./components/import-export"
import { MapsPool } from "./components/maps-pool"
import { Container, ContainerContent, Section, SectionButton } from "./styles"

type Pages = 'map pool' | 'import / export' | 'backup'

export function Settings() {
  const [pageActive, setPageActive] = useState<Pages>('backup')
  const { colors } = useTheme()

  const RenderPage = () => {
    switch (pageActive) {
      case 'map pool':
        return <MapsPool />
      case 'import / export':
        return <ImportExportData />
      case 'backup':
        return <Backup />
      default:
        break
    }
  }

  return (
    <Container>
      <Header />
      <ContainerContent>
        <Section>
          <SectionButton
            $isActive={pageActive === 'map pool'}
            onClick={() => setPageActive("map pool")}
          >
            <TextBodyLg
              style={{ color: `${pageActive === 'map pool' ? colors["primary-a0"] : colors.white}` }}
            >
              Map pool
            </TextBodyLg>
          </SectionButton>

          <SectionButton
            $isActive={pageActive === 'import / export'}
            onClick={() => setPageActive("import / export")}
          >
            <TextBodyLg
              style={{
                color: `${pageActive === 'import / export' ? colors["primary-a0"] : colors.white}`
              }}
            >
              import / export
            </TextBodyLg>
          </SectionButton>

          <SectionButton
            $isActive={pageActive === 'backup'}
            onClick={() => setPageActive("backup")}
          >
            <TextBodyLg
              style={{
                color: `${pageActive === 'backup' ? colors["primary-a0"] : colors.white}`
              }}
            >
              Backup
            </TextBodyLg>
          </SectionButton>
        </Section>

        <RenderPage />

      </ContainerContent>
    </Container>
  )
}