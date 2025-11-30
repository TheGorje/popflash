import type { GrenadeData, GrenadeFormData, StepType } from '@src/@types/create-trick'
import { Header } from '@src/components/header'
import { useLocalStorageData } from '@src/store/use-local-storage-data'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { CreateTrickFinishScreen } from './components/finish-screen'
import { StepInformation } from './components/step-information'
import { StepPositionFrom } from './components/step-position-from'
import { StepPositionTo } from './components/step-position-to'
import { StepVideo } from './components/step-video'
import {
  StepperTrick
} from './components/stepper'
import { Container, ContainerContent } from './styles'

const steps: StepType[] = ["video", "position(to)", "position(from)", "information"]

type GrenadeCreateData = GrenadeData
type GrenadeEditData = GrenadeData



export function CreateTrick() {
  const addGrenade = useLocalStorageData(s => s.addGrenade)
  const updateGrenade = useLocalStorageData(s => s.updateGrenade)

  const location = useLocation()
  const dataState =
    location.state as GrenadeFormData

  const [isFinishScreen, setIsFinishScreen] = useState(false)
  const [currentStep, setCurrentStep] = useState<StepType>("video")
  const [grenadeData, setGrenadeData] = useState<GrenadeFormData>(dataState)

  const goNext = () => {
    const idx = steps.indexOf(currentStep)
    if (idx < steps.length - 1) {
      setCurrentStep(steps[idx + 1])
    }
  }

  const goBack = () => {
    const idx = steps.indexOf(currentStep)
    if (idx > 0) {
      setCurrentStep(steps[idx - 1])
    }
  }

  const buildEditPayload = (form: GrenadeFormData): GrenadeEditData => {
    return {
      id: form.id!,
      map: form.map!,
      video: form.video!,
      type: form.type!,
      positionFrom: form.positionFrom!,
      positionTo: form.positionTo!,
      movement: form.movement!,
      technique: form.technique!,
      description: form.description,
      teamSide: form.teamSide!
    }
  }

  const buildCreatePayload = (form: GrenadeFormData): GrenadeCreateData => {
    return {
      id: crypto.randomUUID(),
      map: form.map!,
      video: form.video!,
      type: form.type!,
      positionFrom: form.positionFrom!,
      positionTo: form.positionTo!,
      movement: form.movement!,
      technique: form.technique!,
      description: form.description,
      teamSide: form.teamSide!
    }
  }

  const handleUpdate = (partialData: Partial<GrenadeFormData>) => {
    setGrenadeData((prev: GrenadeFormData) => ({ ...prev, ...partialData }))
  }

  const handleFinish = (grenadeDataCompleted: GrenadeFormData) => {
    if (grenadeDataCompleted.isEditing) {
      const edit = buildEditPayload(grenadeDataCompleted)
      updateGrenade(edit)
    } else {
      const create = buildCreatePayload(grenadeDataCompleted)
      addGrenade(create)
    }
    console.log(grenadeDataCompleted)
    setIsFinishScreen(true)
  }

  const handleRecreateGrenade = () => {
    setGrenadeData(prev => ({
      ...prev,
      isEditing: false
    }))
    setCurrentStep('video')
    setIsFinishScreen(false)
  }

  useEffect(() => {
    console.log(grenadeData)
  }, [grenadeData])

  return (
    <Container>
      <Header />
      {isFinishScreen ?
        <CreateTrickFinishScreen
          map={grenadeData.map}
          grenadeType={grenadeData.type}
          isEditingMode={grenadeData.isEditing}
          handleRecreateGrenade={handleRecreateGrenade}
        />
        :
        <ContainerContent>
          <StepperTrick step={currentStep} />
          <div>
            {currentStep === "video" && (
              <StepVideo onNext={goNext} onUpdate={handleUpdate} data={grenadeData} />
            )}
            {currentStep === "position(to)" && (
              <StepPositionTo onNext={goNext} onBack={goBack} onUpdate={handleUpdate} data={grenadeData} />
            )}
            {currentStep === "position(from)" && (
              <StepPositionFrom onNext={goNext} onBack={goBack} onUpdate={handleUpdate} data={grenadeData} />
            )}

            {currentStep === "information" && (
              <StepInformation
                onBack={goBack}
                onUpdate={handleUpdate}
                onFinish={handleFinish}
                data={grenadeData}
              />
            )}
          </div>

        </ContainerContent>
      }

    </Container>
  )

};
