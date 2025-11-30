import type { Data, Grenades, GrenadesType, Position, TeamSideType } from "@src/@types/data"
import type { MapsOptions } from "@src/@types/map"
import { MapData } from "@src/components/maps-source"
import { BombSideText, TextTitleMd } from "@styles/typography"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "styled-components"

import { SideBarGrenadeContent } from "../sidebar-grenades-content"
import { MapConnectionLine } from "./connection-line"
import { MapMarker } from "./maker"
import { BackDrop, MapContainer, MapImage, MapInner, TransformWrapper, Wrapper, ZoomButton, ZoomControls } from "./styles"

interface MapInteractiveProps {
  activeSide: TeamSideType
  currentMap: MapsOptions
  currentGrenadeType: GrenadesType
  localStorageMapData: Data
  selectedPlaylistId: string | null
}

export interface ExtendedGrenades extends Grenades {
  from: Position;
  to: Position;
  map: MapsOptions
}


export function MapInteractive({
  activeSide,
  currentMap,
  currentGrenadeType,
  localStorageMapData,
  selectedPlaylistId,
}: MapInteractiveProps) {
  const { colors } = useTheme()
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [hasMoved, setHasMoved] = useState(false)

  const [selectedTo, setSelectedTo] = useState<string | null>(null)
  const [showGrenadesVideosContent, setShowGrenadesVideosContent] = useState<boolean>(false)
  const [fromGrenades, setFromGrenades] = useState<ExtendedGrenades[]>([])
  const [hoveredTo, setHoveredTo] = useState<string | null>(null)

  const lastPos = useRef({ x: 0, y: 0 })
  const mapSelectedData = MapData({ map: currentMap })

  const filteredGrenades = localStorageMapData.grenades.filter(g => {
    const matchType = g.type === currentGrenadeType

    if (!matchType) return false

    if (activeSide === "CT") return g.teamSide === "CT"
    if (activeSide === "T") return g.teamSide === "T"
    if (activeSide === "any") return true

    return false
  })

  const isZoomMaxToMarker = zoom >= 1.5

  const tos = localStorageMapData.toPosition
    .filter(to => filteredGrenades.some(g => g.toId === to.id))
    .map(to => {
      const grenadesForThisTo = filteredGrenades.filter(g => g.toId === to.id)
      const teamSide =
        grenadesForThisTo.every(g => g.teamSide === "CT") ? "CT" :
          grenadesForThisTo.every(g => g.teamSide === "T") ? "T" :
            "any" as TeamSideType

      return {
        ...to,
        grenades: grenadesForThisTo,
        count: grenadesForThisTo.length,
        teamSide: teamSide
      }
    })


  const fromsSelected = selectedTo
    ? localStorageMapData.fromPosition
      .filter(from =>
        filteredGrenades.some(g =>
          g.toId === selectedTo &&
          g.fromId === from.id
        )
      )
      .map(from => {
        const grenadesForPair = filteredGrenades.filter(g =>
          g.toId === selectedTo && g.fromId === from.id
        )
        const teamSide =
          grenadesForPair.every(g => g.teamSide === "CT") ? "CT" :
            grenadesForPair.every(g => g.teamSide === "T") ? "T" :
              "any" as TeamSideType

        const to = tos.find(t => t.id === selectedTo)!

        return {
          ...from,
          grenades: grenadesForPair.map<ExtendedGrenades>(g => ({
            ...g,
            from,
            to,
            map: currentMap
          })),
          teamSide: teamSide
        }
      })
    : []

  const fromsHovered = hoveredTo && !selectedTo
    ? localStorageMapData.fromPosition
      .filter(from =>
        filteredGrenades.some(g =>
          g.toId === hoveredTo && g.fromId === from.id
        )
      )
      .map(from => {
        const grenadesForPair = filteredGrenades.filter(g =>
          g.toId === hoveredTo && g.fromId === from.id
        )

        const teamSide =
          grenadesForPair.every(g => g.teamSide === "CT") ? "CT" :
            grenadesForPair.every(g => g.teamSide === "T") ? "T" :
              "any" as TeamSideType

        const to = tos.find(t => t.id === hoveredTo)

        return {
          ...from,
          grenades: grenadesForPair.map(g => ({
            ...g,
            from,
            to,
            map: currentMap
          })),
          teamSide
        }
      })
    : []


  const selectedConnections = selectedTo
    ? fromsSelected.map(from => ({
      from,
      to: tos.find(t => t.id === selectedTo)!
    }))
    : []

  const hoveredConnections = hoveredTo && !selectedTo
    ? fromsHovered.map(from => ({
      from,
      to: tos.find(t => t.id === hoveredTo)!
    }))
    : []

  // Zoom
  const handleZoom = (delta: number) => {
    setZoom((z) => Math.min(3, Math.max(0.5, z + delta)))
  }

  // Drag
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    lastPos.current = { x: e.clientX, y: e.clientY }
    setIsDragging(true)
    setHasMoved(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const dx = e.clientX - lastPos.current.x
    const dy = e.clientY - lastPos.current.y
    if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) setHasMoved(true)
    lastPos.current = { x: e.clientX, y: e.clientY }
    setOffset((prev) => ({
      x: Math.max(-1200, Math.min(1200, prev.x + dx)),
      y: Math.max(-1200, Math.min(1200, prev.y + dy)),
    }))
  }


  const handleMouseUp = () => { setIsDragging(false) }
  const handleMouseLeave = () => { setIsDragging(false) }

  const handleToMarkerClick = (id: string) => {
    if (selectedTo === id) {
      setSelectedTo(null)
      setHoveredTo(null)
      return
    }
    setSelectedTo(id)
  }

  const handleFromMarkerClick = (grenades: ExtendedGrenades[]) => {
    setShowGrenadesVideosContent(true)

    const updated = grenades.filter(g =>
      localStorageMapData.grenades.some(mg => mg.id === g.id)
    )

    setFromGrenades(updated)
  }


  const handleClearMarkersClick = () => {
    if (hasMoved) return
    setSelectedTo(null)
    setShowGrenadesVideosContent(false)
  }



  useEffect(() => {
    const handleUp = () => setIsDragging(false)
    window.addEventListener("mouseup", handleUp)
    window.addEventListener("mouseleave", handleUp)

    return () => {
      window.removeEventListener("mouseup", handleUp)
      window.removeEventListener("mouseleave", handleUp)
    }
  }, [])


  useEffect(() => {
    if (selectedTo && fromGrenades.length >= 1) {
      const updatedFromGrenades = fromGrenades.filter(g =>
        localStorageMapData.grenades.some(mg => mg.id === g.id)
      )
      setFromGrenades(updatedFromGrenades)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorageMapData, selectedTo])


  useEffect(() => {
    setSelectedTo(null)
    setHoveredTo(null)
    setShowGrenadesVideosContent(false)
  }, [activeSide, currentMap, currentGrenadeType, selectedPlaylistId])
  useEffect(() => {
    if (fromGrenades.length <= 0) {
      setSelectedTo(null)
      setHoveredTo(null)
      setShowGrenadesVideosContent(false)
    }
  }, [fromGrenades])
  return (
    <Wrapper>

      {showGrenadesVideosContent && fromGrenades.length >= 1 &&
        <>
          <BackDrop className="backdrop" onClick={() => setShowGrenadesVideosContent(false)} />
          <SideBarGrenadeContent
            fromGrenades={fromGrenades}
            currentMap={currentMap}
          />
        </>
      }

      <ZoomControls>
        <ZoomButton onClick={() => handleZoom(0.25)}>+</ZoomButton>
        <ZoomButton onClick={() => handleZoom(-0.25)}>-</ZoomButton>
        <TextTitleMd style={{ color: colors["primary-a0"] }}>{zoom.toFixed(1)}x</TextTitleMd>
      </ZoomControls>


      <MapContainer
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleClearMarkersClick}
        onWheel={(e) => {
          if (e.deltaY < 0) {
            handleZoom(0.10)
          } else if (e.deltaY > 0) {
            handleZoom(-0.10)
          }
        }}
      >
        <TransformWrapper
          $zoom={zoom}
          $offsetX={offset.x}
          $offsetY={offset.y}
          $isDragging={isDragging}
        >
          <MapInner>
            <MapImage src={mapSelectedData.image} alt="map" />

            {mapSelectedData &&
              <>
                <BombSideText $x={mapSelectedData.bombsites.A.x} $y={mapSelectedData.bombsites.A.y}>
                  A
                </BombSideText>
                <BombSideText $x={mapSelectedData.bombsites.B.x} $y={mapSelectedData.bombsites.B.y}>
                  B
                </BombSideText>
              </>
            }

            {selectedConnections.map((c, i) => (
              <MapConnectionLine
                key={i}
                from={c.from.position}
                to={c.to.position}
                isSelected={true}
                type={currentGrenadeType}
              />
            ))}
            {hoveredConnections.map((c, i) => (
              <MapConnectionLine
                key={i}
                from={c.from.position}
                to={c.to.position}
                type={c.from.grenades[0].type}
                isSelected={false}
              />
            ))}

            {tos.map((to) => (
              selectedTo ?
                selectedTo === to.id &&
                <MapMarker
                  key={to.id}
                  id={to.id}
                  x={to.position.x}
                  y={to.position.y}
                  type="to"
                  teamSide={to.teamSide}
                  isActive={true} // important
                  onClick={() => handleToMarkerClick(to.id)}
                  count={to.count}
                  isZoomed={isZoomMaxToMarker}
                  onHover={(id) => setHoveredTo(id)}
                />
                :
                <MapMarker
                  key={to.id}
                  id={to.id}
                  x={to.position.x}
                  y={to.position.y}
                  type="to"
                  teamSide={to.teamSide}
                  isActive={false} // important
                  onClick={() => handleToMarkerClick(to.id)}
                  count={to.count}
                  isZoomed={isZoomMaxToMarker}
                  onHover={(id) => setHoveredTo(id)}
                />
            ))}

            {fromsSelected.map((from) => (
              <MapMarker
                key={from.id}
                id={from.id}
                x={from.position.x}
                y={from.position.y}
                type="from"
                onClick={() => handleFromMarkerClick(from.grenades)}
                teamSide={from.teamSide}
                count={from.grenades.length}
                isActive={true}
                isZoomed={isZoomMaxToMarker}
                onHover={(id) => setHoveredTo(id)}
              />
            ))}
            {fromsHovered.map((from) => (
              <MapMarker
                key={`hov-${from.id}`}
                id={from.id}
                x={from.position.x}
                y={from.position.y}
                type="from"
                isActive={true}
                count={from.grenades.length}
                teamSide={from.teamSide}

              />
            ))}
          </MapInner>
        </TransformWrapper>
      </MapContainer>
    </Wrapper>
  )
}


