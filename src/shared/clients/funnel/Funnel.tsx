'use client'

import FunnelInput from './bloks/FunnelInput/FunnelInput'
import FunnelTitle from './bloks/FunnelTitle/FunnelTitle'
import FunnelChoice from './bloks/FunnelChoice/FunnelChoice'
import FunnelCheckbox from './bloks/FunnelCheckbox/FunnelCheckbox'
import FunnelDescription from './bloks/FunnelDescription/FunnelDescription'

import styles from './Funnel.module.scss'

import NextBtn from './nav/NextBtn/NextBtn'
import FunnelHiddenInput from './bloks/FunnelHiddenInput/FunnelHiddenInput'
import { useFunnel } from 'shared/clients/funnel/FunnelProvider'
import { dynamicCondition } from '@/utils/basic/dynamicData'
import FunnelPhone from 'shared/clients/funnel/bloks/FunnelPhone/FunnelPhone'

type Props = {
  next: string
  questions: any[]
  nav?: any
  onNext?: any
  isSaving?: boolean
  calendly?: string
}

const Funnel = (props: Props) => {
  const onNext = props.onNext ?? props.nav.onNext
  const isSaving = props.isSaving ?? props.nav?.isSaving ?? false
  const { data: funnel, isLoading } = useFunnel()

  const QuestionInput = (question: any, i: number) => {
    if (!dynamicCondition(question.if, { funnel })) return null
    const attr = { ...question, onNext: onNext, isSaving }

    switch (question.component) {
      case 'funnel_blok_title':
        return <FunnelTitle {...attr} key={i} />
      case 'funnel_blok_input':
        return <FunnelInput {...attr} key={i} />
      case 'funnel_blok_phone':
        return <FunnelPhone {...attr} key={i} />
      case 'funnel_blok_input_hidden':
        return <FunnelHiddenInput {...attr} key={i} />
      case 'funnel_blok_choice':
        return <FunnelChoice {...attr} key={i} />
      case 'funnel_blok_checkbox':
        return <FunnelCheckbox {...attr} key={i} />
      case 'funnel_blok_description':
        return <FunnelDescription {...attr} key={i} />
      case 'funnel_block_separator':
        return <br />
    }
    return <></>
  }

  if (isLoading) return <></>
  return (
    <div className={styles.steps} data-saving={isSaving}>
      {props.questions.map((question, i) => (
        <div key={question._uid}>{QuestionInput(question, i)}</div>
      ))}
      <NextBtn {...{ ...props, onNext, isSaving }}>{props.next}</NextBtn>
    </div>
  )
}

export default Funnel
