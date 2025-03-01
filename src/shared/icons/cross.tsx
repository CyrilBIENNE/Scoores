type Props = {
  size?: string
  color?: string
}
export default function Icon({ size, color }: Props) {
  return (
    <svg width={size ?? 19} height={size ?? 18} viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        id="Vector"
        d="M14.0001 11.8927L6.60728 4.49986C6.16348 4.05606 5.44394 4.05606 5.00014 4.49986C4.55634 4.94366 4.55634 5.6632 5.00014 6.107L12.393 13.4999C12.8368 13.9437 13.5563 13.9437 14.0001 13.4999C14.4439 13.0561 14.4439 12.3365 14.0001 11.8927Z"
        fill={color ?? 'currentColor'}
      />
      <path
        id="Vector_2"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.0001 6.10728L6.60728 13.5001C6.16346 13.944 5.44396 13.944 5.00014 13.5001C4.55632 13.0563 4.55632 12.3368 5.00014 11.893L12.393 4.50014C12.8368 4.05632 13.5563 4.05632 14.0001 4.50014C14.444 4.94396 14.444 5.66346 14.0001 6.10728Z"
        fill={color ?? 'currentColor'}
      />
    </svg>
  )
}
