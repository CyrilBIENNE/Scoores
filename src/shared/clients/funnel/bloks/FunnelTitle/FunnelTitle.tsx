type Props = {
  label: string
}

const FunnelTitle = (props: Props) => {
  return <h3 className={'mb-24'}>{props.label}</h3>
}

export default FunnelTitle
