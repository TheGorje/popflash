import type { GrenadeFormData } from "@src/@types/create-trick"
import type { GrenadesMovement, GrenadesTechnique, TeamSideType } from "@src/@types/data"
import { SelectMenu } from "@src/components/select-menu"
import { SocialVideo } from "@src/components/video-player"
import { TextTitleLg, TextTitleMd } from "@src/styles/typography"
import { type ChangeEvent, type ReactNode, useEffect, useState } from "react"
import { useTheme } from "styled-components"

import { StepButton } from "../step-button"
import { Container, ContainerSelections, CtSide, TextArea, Tside } from "./styles"

interface StepInformationProps {
  onBack: () => void
  onUpdate: (data: Partial<GrenadeFormData>) => void
  onFinish: (grenadeDataCompleted: GrenadeFormData) => void

  data: GrenadeFormData
}
export function StepInformation({ onBack, onUpdate, onFinish, data }: StepInformationProps) {
  const { space } = useTheme()
  const [teamSide, setTeamSide] = useState<TeamSideType>(data?.teamSide || 'any')
  const [movement, setMovement] = useState<GrenadesMovement>(data?.movement || 'Stationary')
  const [technique, setTechnique] = useState<GrenadesTechnique>(data?.technique || 'Left Click')
  const [description, setDescription] = useState<string>(data?.description || '')


  const TeamSideOptions = [
    { label: "Any", value: "any", image: '' },
    { label: "Counter-Terrorist", value: "CT", image: <CtSide /> },
    { label: "Terrorist", value: "T", image: <Tside /> },
  ] as const satisfies {
    label: string; value: TeamSideType; image: ReactNode
  }[]

  const MovementOptions = [
    { label: "Stationary", value: "Stationary", image: '' },
    { label: "Crouched", value: "Crouched", image: '' },
    { label: "Crouched Walking", value: "Crouched Walking", image: '' },
    { label: "Walking", value: "Walking", image: '' },
    { label: "Running", value: "Running", image: '' },
  ] as const satisfies {
    label: string; value: GrenadesMovement; image: ReactNode
  }[]

  const TechniqueOptions = [
    { label: "Left Click", value: "Left Click", image: '' },
    { label: "Right Click", value: "Right Click", image: '' },
    { label: "Left+Right Click", value: "Left+Right Click", image: '' },
    { label: "Jump + Left Click", value: "Jump + Left Click", image: '' },
    { label: "Jump + Right Click", value: "Jump + Right Click", image: '' },
    { label: "Jump + Left + Right click", value: "Jump + Left + Right click", image: '' },

  ] as const satisfies {
    label: string; value: GrenadesTechnique; image: ReactNode
  }[]

  const handleFinishStep = () => {
    onFinish({
      id: data.id,
      map: data.map,
      movement: data.movement,
      positionFrom: data.positionFrom!,
      positionTo: data.positionTo!,
      teamSide: data.teamSide,
      technique: data.technique,
      type: data.type,
      video: data.video!,
      description: data.description!,
      isEditing: data.isEditing
    })
  }

  useEffect(() => {
    onUpdate({
      teamSide: teamSide,
      movement: movement,
      technique: technique,
      description: description
    })
  }, [teamSide, movement, technique, onUpdate, description])

  return (
    <Container>
      <ContainerSelections>
        <SelectMenu
          label='Team side'
          options={TeamSideOptions}
          value={teamSide as TeamSideType}
          onChange={(opt) => setTeamSide(opt as TeamSideType)}
          placeholder="Select a team side"
        />

        <SelectMenu
          label='Movement'
          options={MovementOptions}
          value={movement as GrenadesMovement}
          onChange={(opt) => setMovement(opt as GrenadesMovement)}
          placeholder="Select a grenade movement"
        />

        <SelectMenu
          label='Technique'
          options={TechniqueOptions}
          value={technique as GrenadesTechnique}
          onChange={(opt) => setTechnique(opt as GrenadesTechnique)}
          placeholder="Select a technique"
        />
      </ContainerSelections>

      <div style={{ gap: space.xs, display: 'grid' }}>
        <TextTitleMd>Preview</TextTitleMd>
        <SocialVideo url={data.video!} />
      </div >

      <div style={{ gap: space.xs, display: 'grid' }}>
        <TextTitleLg>Description (optional)</TextTitleLg>
        <TextArea
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          $isFilled={description.length >= 1}
          placeholder="Explain what this grenade does, timing, purpose..."
        />
      </div>

      <div style={{ gap: space.xs, display: 'flex' }}>
        <StepButton onClick={onBack} stepType='back'>
          Back
        </StepButton>

        <StepButton
          onClick={handleFinishStep}
          stepType='next'
          disabled={false}
        >
          Finish
        </StepButton>
      </div>
    </Container>
  )
}