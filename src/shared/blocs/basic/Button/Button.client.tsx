'use client'

type Props = {
  attributes?: any
  content?: any
  callback?: () => void
}

export default function ClientButton({ attributes, content, callback }: Props) {
  return (
    <div {...attributes} onClick={callback}>
      {content}
    </div>
  )
}
