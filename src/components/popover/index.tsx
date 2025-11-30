import React, { useRef } from "react"
import styled from "styled-components"

interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Popover({ isOpen, onClose, children }: PopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null)

  if (!isOpen) return null

  const handleClose = () => {
    onClose()
  }

  return (
    <Overlay>
      <BackDrop onClick={() => handleClose()} />
      <PopoverContainer ref={popoverRef}>
        {children}
      </PopoverContainer>
    </Overlay>

  )
}

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 998;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
  background-color: ${({ theme }) => theme.colors["surface-a10"]};
  opacity:${({ theme }) => theme.opacity[50]};
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
`

const PopoverContainer = styled.div`
  background-color: ${({ theme }) => theme.colors["surface-a0"]};
  border: 2px solid ${({ theme }) => theme.colors["surface-a20"]};
  padding: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: 0px 4px 12px rgba(0,0,0,0.2);
  min-width: 200px;
  max-width: 75%;
  z-index: 1000;
  pointer-events: auto;
`
