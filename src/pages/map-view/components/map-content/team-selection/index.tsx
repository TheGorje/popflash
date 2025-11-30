import type { TeamSideType } from "@src/@types/data"

import { Button, Container, CtSide, Tside } from "./styles."

interface TeamSelectionProps {
  onChangeTeamSide: (team: TeamSideType) => void
  activeSide: TeamSideType
}

export function TeamSelection({ onChangeTeamSide, activeSide }: TeamSelectionProps) {
  return (
    <Container>
      <Button $active={activeSide === 'CT'} $team="ctside" onClick={() => onChangeTeamSide('CT')}>
        <CtSide />
      </Button>

      <Button $active={activeSide === 'T'} $team="tside" onClick={() => onChangeTeamSide('T')}>
        <Tside />
      </Button>
    </Container>
  )
}