import type { GrenadeFormData } from '@src/@types/create-trick'
import type { Data, Position } from '@src/@types/data'
import type { MapsOptions } from '@src/@types/map'
import { MapData } from '@src/components/maps-source'
import { useLocalStorageData } from '@src/store/use-local-storage-data'
import { BombSideText, TextTitleLg } from '@src/styles/typography'
import { useMemo, useState } from "react"
import { useTheme } from 'styled-components'

import { MapMarkerCreateTrick } from "../map-maker"
import { StepButton } from '../step-button'
import { MapContainer, MapImage, MapInner, PositionInputName, Wrapper } from "./styles"

interface StepPositionToProps {
  onBack: () => void
  onUpdate: (data: Partial<GrenadeFormData>) => void
  onNext: () => void
  data: GrenadeFormData
}

export function StepPositionTo({ onNext, onBack, onUpdate, data }: StepPositionToProps) {
  const { space } = useTheme()
  const map = (data.map ?? 'mirage') as MapsOptions
  const mapSelected = MapData({ map })

  const EMPTY_MAP: Data = {
    name: map,
    isOnMapPool: true,
    fromPosition: [],
    toPosition: [],
    grenades: [],
    playlists: []
  }

  const mapData = useLocalStorageData(s => s.getMap(map)) ?? EMPTY_MAP
  const tos = useMemo(() => mapData.toPosition ?? [], [mapData])

  const [tempMarker, setTempMarker] = useState<{ x: number; y: number } | null>(data?.positionTo?.position ?? null)
  const [selectedTo, setSelectedTo] = useState<string>(data.positionTo?.id || "")
  const [positionName, setPositionName] = useState<string>(data.positionTo?.name || "")

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100

    setTempMarker({ x: xPercent, y: yPercent })
    setSelectedTo("")
    setPositionName("")
  }

  const handleSelectTo = (id: string) => {
    const base = tos.find((t) => t.id === id)
    if (!base) return

    setSelectedTo(id)
    setTempMarker(null)

    if (data.positionTo?.id === id) {
      setPositionName(data.positionTo.name)
    } else {
      setPositionName(base.name)
    }
  }

  const updateData = () => {
    let dataToSave: Position | null = null

    if (selectedTo && data.positionTo?.id === selectedTo) {
      dataToSave = {
        ...data.positionTo,
        name: positionName
      }
    }

    else if (selectedTo) {
      const base = tos.find(t => t.id === selectedTo)
      if (base) {
        dataToSave = { ...base, name: positionName }
      }
    }

    else if (tempMarker) {
      dataToSave = {
        id: crypto.randomUUID(),
        name: positionName,
        position: tempMarker
      }
    }

    if (dataToSave) onUpdate({ positionTo: dataToSave })

  }

  const handleNextStep = () => {
    updateData()
    onNext()
  }

  const handleBackStep = () => {
    updateData()
    onBack()
  }
  return (
    <Wrapper>
      <TextTitleLg
        style={{ textAlign: 'center' }}
      >
        Set the location where the grenade will land
      </TextTitleLg>

      <MapContainer onClick={handleMapClick}>
        <MapInner>
          <MapImage src={mapSelected.image} alt="map" />
          <BombSideText $x={mapSelected.bombsites.A.x} $y={mapSelected.bombsites.A.y}>
            A
          </BombSideText>
          <BombSideText $x={mapSelected.bombsites.B.x} $y={mapSelected.bombsites.B.y}>
            B
          </BombSideText>
          {tos.map((to) => (
            <MapMarkerCreateTrick
              key={to.id}
              id={to.id}
              x={to.position.x}
              y={to.position.y}
              type="to"
              isActive={selectedTo === to.id}
              onClick={() => handleSelectTo(to.id)}
            />
          ))}

          {tempMarker && (
            <MapMarkerCreateTrick
              id="temp"
              x={tempMarker.x}
              y={tempMarker.y}
              type="to"
              isActive
              onClick={() => setTempMarker(null)}
            />
          )}
        </MapInner>
      </MapContainer>

      <div style={{ gap: space.xs, display: 'grid' }}>
        <TextTitleLg>Position name (optional)</TextTitleLg>
        <PositionInputName
          name='input-position-to'
          onChange={(e) => setPositionName(e.target.value)}
          value={positionName}
          $isFilled={positionName.trim().length >= 1}
          placeholder="Name for this position..."
        />
      </div>

      <div style={{ gap: space.xs, display: 'flex' }}>
        <StepButton
          onClick={handleBackStep}
          stepType='back'
        >
          Back
        </StepButton>
        <StepButton
          onClick={handleNextStep}
          stepType='next'
          disabled={!selectedTo && !tempMarker}
        >
          Next
        </StepButton>
      </div>
    </Wrapper >
  )
}
