import { useState, useEffect } from 'react'
import useFunnelKey from 'shared/clients/funnel/hooks/useFunnelKey'

export default function useFunnelSelect(
  props: {
    customKey?: string
    onSubmit?: any
    isSingleInput?: boolean
    onNext?: any
    initValue?: string
    default?: string
  },
  onUpdate?: (value: any) => any,
  toString?: (value: any) => string,
  hasSearchMin?: number
) {
  const { value, onChange } = useFunnelKey(props.customKey, props.default)
  const [tmpValue, setTmpChange] = useState('')
  const [label, setLabel] = useState<null | string>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const test: string[] = []
  const [result, setResult] = useState(test)

  useEffect(() => {
    if (props.initValue) {
      setLabel(props.initValue)
    }
  }, [props.initValue])

  useEffect(() => {
    if (value) {
      setLabel(toString ? toString(value) : value)
      setResult([value])
      setTmpChange(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const onFocus = (focus: boolean, force = false) => {
    if (force || focus) return setIsOpen(focus)
  }

  const onInputChange = (val: any) => {
    if (toString ? toString(tmpValue) : tmpValue) setTmpChange('')
    setLabel(val)
    if (hasSearchMin) setIsSearching(val.length > hasSearchMin)
    if (onUpdate) onUpdate(val)
  }

  const [onSingleInputChanged, setOnSingleInputChanged] = useState(false)
  useEffect(() => {
    if (onSingleInputChanged) props.onNext()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSingleInputChanged])

  const onSelect = (data: any) => {
    setLabel(toString ? toString(data) : data)
    setIsOpen(false)
    onChange(data)
    if (props.onSubmit) {
      props.onSubmit(data)
    }
    if (props.isSingleInput) setOnSingleInputChanged(true)
  }

  const onSearchEnded = () => {
    setIsOpen(true)
    setIsSearching(false)
  }

  return {
    tmpValue,
    label,
    isSearching,
    isOpen,
    result,
    setResult,
    setIsOpen,
    onFocus,
    onInputChange,
    onSelect,
    onSearchEnded,
  }
}
