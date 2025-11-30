import { GrenadesComponent } from "@components/grenades"
import type { Grenades } from "@src/@types/data"
import { OverlayPortal } from "@src/components/portal-overlay"
import { countGrenadesByType } from "@src/utils/count-grenades-by-type"
import { TextBodySm, TextTitleMd } from "@styles/typography"
import { type ReactNode, useRef, useState } from "react"

import { Button, Container, GrenadeContainer, GrenadeOverlay } from "./styles"

interface PLaylistButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isActive: boolean
  playlistGrenadeIds: string[]
  allGrenades: Grenades[]
}

export function PLaylistButton({
  children,
  isActive = false,
  playlistGrenadeIds,
  allGrenades,
  ...props
}: PLaylistButtonProps) {
  const [showOverlayGrenades, setShowOverlayGrenades] = useState(false)

  const counts = countGrenadesByType(allGrenades || [], playlistGrenadeIds)
  const isCountsHaveAnyGrenade = Object.values(counts).some(count => count >= 1)
  const [overlayPos, setOverlayPos] = useState({ top: 0, left: 0 })
  const cardRef = useRef<HTMLButtonElement>(null)

  const handleMouseEnter = () => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()

    setOverlayPos({
      top: rect.top,
      left: rect.right + 16 // distancia
    })

    setShowOverlayGrenades(true)
  }


  return (
    <Container>
      <Button
        $active={isActive}
        ref={cardRef}
        {...props}
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => setShowOverlayGrenades(false)}
      >
        <TextTitleMd>{children}</TextTitleMd>
      </Button>

      {showOverlayGrenades && isCountsHaveAnyGrenade &&
        <OverlayPortal>
          <GrenadeOverlay
            style={{
              top: overlayPos.top,
              left: overlayPos.left
            }}>
            {counts.smoke >= 1 &&
              <GrenadeContainer >
                <GrenadesComponent type='smoke' size="0.50rem" />
                <TextBodySm>{counts.smoke}</TextBodySm>
              </GrenadeContainer>
            }

            {counts.HE >= 1 &&
              <GrenadeContainer >
                <GrenadesComponent type='HE' size="0.65rem" />
                <TextBodySm>{counts.HE}</TextBodySm>
              </GrenadeContainer>
            }
            {counts.flashbang >= 1 &&
              <GrenadeContainer >
                <GrenadesComponent type='flashbang' size="0.75rem" />
                <TextBodySm>{counts.flashbang}</TextBodySm>
              </GrenadeContainer>
            }
            {counts.molotov >= 1 &&
              <GrenadeContainer >
                <GrenadesComponent type='molotov' size="0.40rem" />
                <TextBodySm>{counts.molotov}</TextBodySm>
              </GrenadeContainer>
            }
          </GrenadeOverlay>
        </OverlayPortal>
      }
    </Container>
  )
}