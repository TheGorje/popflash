import { CheckIcon, UploadSimpleIcon } from "@phosphor-icons/react"
import type { ToleranceImportMergeNumber, ToleranceLabel } from "@src/@types/settings"
import { CheckConfirm } from "@src/components/check-confirm"
import { SelectMenu } from "@src/components/select-menu"
import { useLocalStorageData } from "@src/store/use-local-storage-data"
import { TextBodyMd, TextTitleLg, TextTitleMd } from "@src/styles/typography"
import { importJSONFile } from "@src/utils/import-json-file"
import { useEffect, useState } from "react"
import { useTheme } from "styled-components"

import { ButtonImport, Divider, FeedbackContainer, InputFile, Wrapper, WrapperBorder } from "./styles"

export function ImportMerge() {
  const { colors } = useTheme()
  const { mergeMapsImport } = useLocalStorageData()
  const [toleranceMerge, setToleranceMerge] = useState<ToleranceImportMergeNumber>(1.5)
  const [isImportMergeFilled, setIsImportMergeFilled] = useState(false)
  const [importMergeFileJson, setImportMergeFileJson] = useState<File | undefined>(undefined)
  const [showFeedbackConfirm, setShowFeedbackConfirm] = useState(false)

  const ToleranceOptions = [
    { label: "Ultra Low Tolerance", value: 1, image: '' },
    { label: "Low Tolerance", value: 1.5, image: '' },
    { label: "Medium Tolerance", value: 2, image: '' },
    { label: "High Tolerance", value: 2.8, image: '' },
    { label: "Ultra High Tolerance", value: 3.5, image: '' },

  ] as const satisfies {
    label: ToleranceLabel; value: ToleranceImportMergeNumber; image: ''
  }[]

  const handleImportMerge = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImportMergeFileJson(file)
    setIsImportMergeFilled(true)

  }
  const handleSubmitImportMerge = async () => {
    try {
      const json = await importJSONFile(importMergeFileJson as File)

      if (!Array.isArray(json)) {
        alert("Invalid file: wait a array maps.")
        return
      }
      mergeMapsImport(json, toleranceMerge)
      setShowFeedbackConfirm(true)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message)
    } finally {
      setIsImportMergeFilled(false)
      setImportMergeFileJson(undefined)
    }
  }

  const toleranceDescriptions: Record<ToleranceImportMergeNumber, string> = {
    "1": "Only merges positions that are almost perfectly overlapping. Maximum precision, minimal merging.",
    "1.5": "Allows merging of very close positions while remaining highly precise.",
    "2": "Balanced merging. Slight differences in coordinates will be accepted.",
    "2.8": "More flexible merging, useful when imported data contains inconsistencies.",
    "3.5": "Very forgiving merging. Even noticeably distant positions may be merged.",
  }

  useEffect(() => {
    if (showFeedbackConfirm) {
      setTimeout(() => {
        setShowFeedbackConfirm(false)
      }, 2000)
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
      <TextTitleLg style={{ color: colors["primary-a0"] }}>Import (Merge)</TextTitleLg>
      <TextBodyMd>
        Combines data from the file with your existing maps.
        Positions close to each other (based on tolerance) will be merged to avoid duplicates.
      </TextBodyMd>

      <Divider />

      <TextTitleMd>Tolerance merge</TextTitleMd>
      <TextBodyMd>
        {toleranceDescriptions[toleranceMerge]}
      </TextBodyMd>
      <SelectMenu
        label=""
        options={ToleranceOptions}
        value={toleranceMerge}
        onChange={(opt) => setToleranceMerge(Number(opt) as ToleranceImportMergeNumber)}
        placeholder="Select a tolerance mode"
      />

      <Divider />

      <Wrapper>
        <InputFile htmlFor="file-import-merge" $isFilled={isImportMergeFilled} >
          <TextTitleMd>
            {isImportMergeFilled ? 'File uploaded' : 'Import file JSON'}
          </TextTitleMd>
          {isImportMergeFilled ?
            <CheckIcon size={18} />
            :
            <UploadSimpleIcon weight="fill" size={18} />
          }
        </InputFile>

        <input
          style={{ display: 'none' }}
          id="file-import-merge"
          type="file"
          accept="application/json"
          onChange={handleImportMerge}
        />
        {isImportMergeFilled &&
          <ButtonImport onClick={handleSubmitImportMerge}>
            <TextTitleMd>
              Confirm
            </TextTitleMd>
          </ButtonImport>
        }
      </Wrapper>
    </WrapperBorder>
  )
}