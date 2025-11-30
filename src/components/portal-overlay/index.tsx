import type { ReactNode } from "react"
import { createPortal } from "react-dom"

interface OverlayPortalProps {
  children: ReactNode
}

export function OverlayPortal({ children }: OverlayPortalProps) {
  const portalRoot = document.getElementById("overlay-root")
    || createPortalRoot()

  return createPortal(children, portalRoot)
}

function createPortalRoot() {
  const div = document.createElement("div")
  div.id = "overlay-root"
  document.body.appendChild(div)
  return div
}
