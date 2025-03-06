import useFunnelValidator from 'shared/clients/funnel/hooks/useFunnelValidator'
import { useEffect } from 'react'
import Loader from 'shared/components/animations/Loader/Loader'
import Button from '@/blocs/basic/Button/Button'
import { ColorType } from 'shared/helpers/color.type'

type Props = {
  children: string
  questions: any[]
  onNext?: any
  isSaving?: boolean
  type?: ColorType
}

const NextBtn = ({ children, questions, onNext, isSaving, type }: Props) => {
  const { isValid, isHidden } = useFunnelValidator(questions)

  useEffect(() => {
    const listener = (e: any) => {
      if (e.code !== 'Enter' || e.code !== 'NumpadEnter') return
      if (isValid) onNext()
      e.preventDefault()
    }

    document.addEventListener('keydown', listener)
    return () => document.removeEventListener('keydown', listener)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid])

  if (isHidden) return <></>

  return (
    <Button disabled={!isValid || isSaving} callback={onNext} type={type ?? ColorType.PRIMARY} fullWidth={true}>
      {children}
      {isSaving && <Loader white={true} />}
    </Button>
  )
}

export default NextBtn
