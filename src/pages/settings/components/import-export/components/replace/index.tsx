import { CheckIcon, UploadSimpleIcon } from "@phosphor-icons/react"
import { CheckConfirm } from "@src/components/check-confirm"
import { useLocalStorageData } from "@src/store/use-local-storage-data"
import { TextBodyMd, TextTitleLg, TextTitleMd } from "@src/styles/typography"
import { importJSONFile } from "@src/utils/import-json-file"
import { useEffect, useState } from "react"
import { useTheme } from "styled-components"

import { ButtonImport, Divider, FeedbackContainer, InputFile, Wrapper, WrapperBorder } from "./styles"

export function ImportReplace() {
  const { colors } = useTheme()
  const { importMapsReplace } = useLocalStorageData()
  const [isImportFilled, setIsImportFilled] = useState(false)
  const [importReplaceFileJson, setImportReplaceFileJson] = useState<File | undefined>(undefined)
  const [showFeedbackConfirm, setShowFeedbackConfirm] = useState(false)

  const handleImportReplace = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImportReplaceFileJson(file)
    setIsImportFilled(true)
  }
  const handleSubmitImportReplace = async () => {
    try {
      const json = await importJSONFile(importReplaceFileJson as File)

      if (!Array.isArray(json)) {
        alert("Invalid file: wait a array maps.")
        return
      }

      importMapsReplace(json)
      setShowFeedbackConfirm(true)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message)
    } finally {
      setIsImportFilled(false)
      setImportReplaceFileJson(undefined)
    }

  }
  useEffect(() => {
    if (showFeedbackConfirm) {
      setTimeout(() => {
        setShowFeedbackConfirm(false)
      }, 1800)
    }
  }, [showFeedbackConfirm])

  return (
    <WrapperBorder>
      {showFeedbackConfirm &&
        <FeedbackContainer onClick={() => setShowFeedbackConfirm(false)}>
          <CheckConfirm
            visible={true}
            size={120}
            duration={1.0}
            onFinish={() => console.log("done")}
          />
        </FeedbackContainer>
      }

      <TextTitleLg style={{ color: colors["surface-a70"] }}>Import Data (Replace)</TextTitleLg>

      <TextBodyMd>
        Completely replaces your current map data with the imported file.
        Use this if you want a full reset to the data in the file.
      </TextBodyMd>

      <Divider />

      <Wrapper>
        <InputFile htmlFor="file-import" $isFilled={isImportFilled} >
          <TextTitleMd>
            {isImportFilled ? 'File uploaded' : 'Import file JSON'}
          </TextTitleMd>
          {isImportFilled ?
            <CheckIcon size={18} />
            :
            <UploadSimpleIcon weight="fill" size={18} />
          }
        </InputFile>
        <input
          style={{ display: 'none' }}
          id="file-import"
          type="file"
          accept="application/json"
          onChange={handleImportReplace}
        />
        {isImportFilled &&
          <ButtonImport onClick={handleSubmitImportReplace}>
            <TextTitleMd>
              Confirm
            </TextTitleMd>
          </ButtonImport>
        }
      </Wrapper>
    </WrapperBorder>
  )
}