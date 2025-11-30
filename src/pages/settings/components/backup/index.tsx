import { CheckIcon } from "@phosphor-icons/react"
import type { Data, GrenadesType } from "@src/@types/data"
import { GrenadesComponent } from "@src/components/grenades"
import { useLocalStorageData } from "@src/store/use-local-storage-data"
import { TextBodyLg, TextTitleMd } from "@src/styles/typography"
import { useState } from "react"
import { useTheme } from "styled-components"

import { BackupCard, ButtonCreate, ButtonDelete, ButtonRestore, Container, Divider, GrenadeWrapper, Wrapper } from "./styles"

export function Backup() {
  const { colors } = useTheme()
  const { backups, createBackup, restoreBackup, deleteBackup } = useLocalStorageData()
  const [backupIdRestored, setBackupIdRestored] = useState<string | undefined>(undefined)

  const CountGrenades = (Data: Data[], type: GrenadesType): number => {
    return Data.reduce((acc, { grenades }) => {
      const filtered = grenades.filter(g => !type || g.type === type)
      return acc + filtered.length
    }, 0)
  }

  const handleRestoreBackup = (id: string) => {
    setBackupIdRestored(id)
    restoreBackup(id)
  }

  return (
    <Container>
      <ButtonCreate onClick={createBackup}>
        <TextTitleMd style={{ color: colors["primary-a0"] }}>Create Backup</TextTitleMd>
      </ButtonCreate>
      {backups.length >= 1 && <TextTitleMd>Max (5) backups</TextTitleMd>}

      <Wrapper>
        {backups.map(({ createdAt, id, data }) => {
          const smoke = CountGrenades(data, 'smoke')
          const flashBang = CountGrenades(data, 'flashbang')
          const HE = CountGrenades(data, 'HE')
          const molotov = CountGrenades(data, 'molotov')

          const hasGrenades = data.some(item => item.grenades.length >= 1)

          return (
            <BackupCard key={id}>
              {new Date(createdAt).toLocaleString()}

              <Divider />

              {smoke >= 1 &&
                <GrenadeWrapper>
                  <GrenadesComponent type="smoke" size={10} />
                  <TextBodyLg>{smoke}</TextBodyLg>
                </GrenadeWrapper>
              }
              {flashBang >= 1 &&
                <GrenadeWrapper>
                  <GrenadesComponent type="flashbang" size={15} />
                  <TextBodyLg>{flashBang}</TextBodyLg>
                </GrenadeWrapper>
              }
              {HE >= 1 &&
                <GrenadeWrapper>
                  <GrenadesComponent type="HE" size={15} />
                  <TextBodyLg>{HE}</TextBodyLg>
                </GrenadeWrapper>
              }
              {molotov >= 1 &&
                <GrenadeWrapper>
                  <GrenadesComponent type="molotov" size={10} />
                  <TextBodyLg>{molotov}</TextBodyLg>
                </GrenadeWrapper>
              }

              {hasGrenades && <Divider />}

              <ButtonRestore
                onClick={() => handleRestoreBackup(id)}
                $isRestored={backupIdRestored === id}
              >
                <TextTitleMd>
                  {backupIdRestored === id ? "Restored" : "Restore"}
                </TextTitleMd>

                {backupIdRestored === id &&
                  <CheckIcon size={18} />
                }


              </ButtonRestore>

              <ButtonDelete onClick={() => deleteBackup(id)}>
                <TextTitleMd>
                  Delete
                </TextTitleMd>
              </ButtonDelete>

            </BackupCard>
          )
        })}
      </Wrapper>

    </Container>
  )
}