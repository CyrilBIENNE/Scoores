import FunnelChoice from './FunnelChoice'

type Props = {
  customKey: string
  desktopGrow: boolean
  mobileDouble: boolean
  mobileGrow: boolean
  operators: any
  customChoices: {
    text: string
    value: string
  }[]
  required?: boolean
  isValidate: any
  isSingleInput?: boolean
  onNext?: any
  default?: string
}
const FunnelChoiceOperator = (props: Props) => {
  let choices: any[] = []
  for (const op of props.operators) {
    choices.push({
      text: op.name,
      value: op.value,
      image: '/todo/providers/' + op.img,
    })
  }
  if (props.customChoices) choices = choices.concat(props.customChoices)
  return <FunnelChoice {...props} choices={choices} />
}

export default FunnelChoiceOperator
