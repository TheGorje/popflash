import { DownloadIcon } from "@phosphor-icons/react"
import { useLocalStorageData } from "@src/store/use-local-storage-data"
import { TextBodyMd, TextTitleLg, TextTitleMd } from "@src/styles/typography"
import { downloadMapsJSON } from "@src/utils/download-map-json"
import { useTheme } from "styled-components"

import { ImportMerge } from "./components/merge"
import { ImportReplace } from "./components/replace"
import { Container, DownloadButton, WrapperBorder } from "./styles"

export function ImportExportData() {
  const { maps } = useLocalStorageData()
  const { colors } = useTheme()

  const handleDownload = () => {
    downloadMapsJSON(maps)
  }

  return (
    <Container>

      <ImportMerge />
      <ImportReplace />


      <WrapperBorder $type="export">
        <TextTitleLg>Export Data</TextTitleLg>
        <TextBodyMd>
          Download all your current map data as a JSON file.
          Useful for backup or sharing with others.
        </TextBodyMd>
        <TextBodyMd style={{ color: colors["warning-a10"] }}>
          If you share this file with someone, remind them to merge it to avoid losing their existing data.
        </TextBodyMd>

        <DownloadButton onClick={handleDownload}>
          <TextTitleMd>Download JSON</TextTitleMd>
          <DownloadIcon weight="fill" size={18} />
        </DownloadButton>
      </WrapperBorder>
    </Container>

  )
}
