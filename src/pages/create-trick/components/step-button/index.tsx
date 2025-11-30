import { Button, Text } from "./styles"

interface StepButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string
  stepType: "back" | "next"
}

export function StepButton({ children, stepType, ...props }: StepButtonProps) {

  return (
    <Button {...props} $stepType={stepType} >
      <Text $stepType={stepType} $isFilled={children.length >= 1}>{children}</Text>
    </Button>
  )
}