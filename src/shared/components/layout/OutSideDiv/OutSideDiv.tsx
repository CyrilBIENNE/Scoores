'use client'

import { useRef, useEffect } from 'react'

type Props = {
  callback: any
  styles?: any
  children: any
  styleBg?: any
  disabled?: boolean
}

function useOutsideAlerter(ref: any, callback: any) {
  useEffect(() => {
    const handleClickOutside = (e: any) => (ref.current && !ref.current.contains(e.target) ? callback(e) : null)
    document.addEventListener('mouseup', handleClickOutside)
    return () => document.removeEventListener('mouseup', handleClickOutside)
  }, [ref, callback])
}

export default function OutSideDiv(props: Props) {
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, props.callback)
  if (props.disabled) return props.children
  return (
    <>
      {props.styleBg && <div className={props.styleBg}></div>}
      <div className={props.styles ?? ''} ref={wrapperRef}>
        {props.children}
      </div>
    </>
  )
}
