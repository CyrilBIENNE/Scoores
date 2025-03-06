import useFunnelKey from 'shared/clients/funnel/hooks/useFunnelKey'
import { useEffect } from 'react'
import { dynamicData } from '@/utils/basic/dynamicData'

type Props = {
  customKey: string
  default: string
  _uid: string
}

export default function FunnelHiddenInput(props: Props) {
  const { onChange } = useFunnelKey(props.customKey)

  useEffect(() => {}, [])

  useEffect(() => {
    if (!props.default) return
    const data = dynamicData(props.default)
    if (data) onChange(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.default])

  return <></>
}
