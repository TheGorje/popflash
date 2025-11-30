import type { GrenadeData, GrenadeFormData } from '@src/@types/create-trick'
import type { Data, Position } from '@src/@types/data'
import type { MapsOptions } from '@src/@types/map'
import { MapData } from '@src/components/maps-source'
import { useLocalStorageData } from '@src/store/use-local-storage-data'
import { BombSideText, TextTitleLg } from '@src/styles/typography'
import { useMemo, useState } from "react"
import { useTheme } from 'styled-components'

import { MapConnectionLine } from "../../../map-view/components/map-content/map-interactive/connection-line"
import { MapMarkerCreateTrick } from "../map-maker"
import { StepButton } from '../step-button'
import { MapContainer, MapImage, MapInner, PositionInputName, Wrapper } from "./styles"

interface StepPositionFromProps {
  onBack: () => void
  onUpdate: (data: Partial<GrenadeData>) => void
  onNext: () => void
  data: GrenadeFormData
}

export function StepPositionFrom({ onNext, onBack, onUpdate, data }: StepPositionFromProps) {
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
  const froms = useMemo(() => mapData.fromPosition ?? [], [mapData])

  const [tempMarker, setTempMarker] = useState<{ x: number; y: number } | null>(data?.positionFrom?.position ?? null)
  const [selectedFrom, setSelectedFrom] = useState<string>(data?.positionFrom?.id || "")
  const [positionName, setPositionName] = useState<string>(data?.positionFrom?.name || "")

  const activeFrom = tempMarker || (
    selectedFrom ? froms.find((f) => f.id === selectedFrom)?.position : null
  )

  const toPositionSelected = data?.positionTo?.position


  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100

    setTempMarker({ x: xPercent, y: yPercent })
    setSelectedFrom("")
    setPositionName("")
  }

  const handleSelectFrom = (id: string) => {
    if (selectedFrom === id) {
      setSelectedFrom("")
      setTempMarker(null)
      setPositionName("")
      return
    }

    const selected = froms.find((f) => f.id === id)
    if (selected) {
      setSelectedFrom(id)
      setTempMarker(null)
      setPositionName(selected.name)
    }
  }

  const UpdateData = () => {
    let dataToSave: Position | null = null

    if (selectedFrom && data.positionFrom?.id === selectedFrom) {
      dataToSave = {
        ...data.positionFrom,
        name: positionName
      }
    }

    else if (selectedFrom) {
      const base = froms.find((f) => f.id === selectedFrom)
      if (base) dataToSave = { ...base, name: positionName }
    }

    else if (tempMarker) {
      const newPos: Position = {
        id: crypto?.randomUUID?.() ?? `${Math.random().toString(36).slice(2)}`,
        name: positionName || "",
        position: tempMarker
      }
      dataToSave = newPos
    }

    if (dataToSave) {
      onUpdate({ positionFrom: dataToSave })
    }

  }

  const handleNextStep = () => {
    UpdateData()
    onNext()
  }
  const handleBackStep = () => {
    UpdateData()
    onBack()
  }

  return (
    <Wrapper>
      <TextTitleLg
        style={{ textAlign: 'center' }}
      >
        Set the position from which the grenade is thrown
      </TextTitleLg>

      <MapContainer onClick={handleMapClick}>
        <MapInner>
          <MapImage src={mapSelected.image} alt="map" />

          <BombSideText $x={mapSelected.bombsites.A.x} $y={mapSelected.bombsites.A.y}>
            A
          </BombSideText>
          <BombSideText $x={mapSelected.bombsites.B.x} $y={mapSelected.bombsites.B.y}>
            B
          </BombSideText >
          {activeFrom?.x && activeFrom?.y && toPositionSelected && (
            <MapConnectionLine
              from={activeFrom}
              to={toPositionSelected}
              type={data.type || "smoke"}
              isSelected={true}
            />
          )}


          {froms.map((from) => (
            <MapMarkerCreateTrick
              key={from.id}
              id={from.id}
              x={from.position.x}
              y={from.position.y}
              type="from"
              isActive={selectedFrom === from.id}
              onClick={() => handleSelectFrom(from.id)}
            />
          ))}

          {tempMarker && (
            <MapMarkerCreateTrick
              id="temp"
              x={tempMarker.x}
              y={tempMarker.y}
              type="from"
              isActive
              onClick={() => setTempMarker(null)}
            />
          )}

          {data?.positionTo && toPositionSelected && (
            <MapMarkerCreateTrick
              id="to"
              x={toPositionSelected.x}
              y={toPositionSelected.y}
              type="to"
              isActive
            />
          )}
        </MapInner>
      </MapContainer>

      <div style={{ gap: space.xs, display: 'grid' }}>
        <TextTitleLg>Position name (optional)</TextTitleLg>
        <PositionInputName
          name='input-position-from'
          onChange={(e) => setPositionName(e.target.value)}
          value={positionName}
          $isFilled={positionName.trim().length >= 1}
          placeholder="Name for this position..."
        />
      </div>

      <div style={{ gap: space.xs, display: 'flex' }}>
        <StepButton onClick={handleBackStep} stepType='back'>
          Back
        </StepButton>
        <StepButton
          onClick={handleNextStep}
          stepType='next'
          disabled={!selectedFrom && !tempMarker}
        >
          Next
        </StepButton>
      </div>
    </Wrapper>
  )
}
