import { ArrowSquareInIcon, ArrowSquareOutIcon, InfoIcon, PlayIcon } from "@phosphor-icons/react"
import { TextBodyLg } from "@src/styles/typography"
import { useTheme } from "styled-components"

import { Line, StepContainer, Wrapper } from "./styles"

type Step = "video" | "position(to)" | "position(from)" | "information"

interface StepperTrickProps {
  step: Step
}

const stepsOrder: Step[] = ["video", "position(to)", "position(from)", "information"]

export function StepperTrick({ step }: StepperTrickProps) {
  const { colors } = useTheme()
  const currentIndex = stepsOrder.indexOf(step)

  const renderIcon = (step: Step) => {
    switch (step) {
      case "video":
        return <div style={{ display: 'flex' }}><PlayIcon weight="fill"
          size={20} /></div>
      case "position(to)":
        return <div style={{ display: 'flex' }}><ArrowSquareInIcon weight="fill"
          size={20} /></div>
      case "position(from)":
        return <div style={{ display: 'flex' }}> <ArrowSquareOutIcon weight="fill"
          size={20} /></div>
      case "information":
        return <div style={{ display: 'flex' }}><InfoIcon weight="fill"
          size={20} /></div>
      default:
        return step
    }
  }


  return (
    <Wrapper>
      {stepsOrder.map((step, i) => {
        const isCompleted = i < currentIndex
        const isCurrent = i === currentIndex

        return (
          <StepContainer
            key={step}
            $isCompleted={isCompleted}
            $isCurrent={isCurrent}
          >
            {renderIcon(step)}

            <TextBodyLg
              style={{
                color:
                  `${isCompleted ? colors["success-a10"]
                    :
                    isCurrent ? colors.white : colors["surface-a40"]
                  }`
              }}>
              {step}
            </TextBodyLg>

            {i < (stepsOrder.length - 1) &&
              <Line $isCompleted={isCompleted} $isCurrent={isCurrent} />
            }
          </StepContainer>
        )
      })}
    </Wrapper>
  )
}

