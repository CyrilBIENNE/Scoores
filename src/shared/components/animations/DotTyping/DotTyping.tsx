import styles from './DotTyping.module.scss'

type Props = {
  color?: boolean
}

const DotTyping = (props: Props) => {
  const color = props.color ? '#330da5' : '#ffffff'
  return (
    <div className={styles.spinner}>
      <div className="dotTyping" />
      <style jsx>{`
        .dotTyping {
          position: relative;
          width: 6px;
          height: 6px;
          border-radius: 5px;
          background-color: ${color};
          color: ${color};
          animation: dotFlashing 1s infinite linear alternate;
          animation-delay: 0.5s;
        }
        .dotTyping::before,
        .dotTyping::after {
          content: '';
          display: inline-block;
          position: absolute;
          top: 0;
        }
        .dotTyping::before {
          left: -10px;
          width: 6px;
          height: 6px;
          border-radius: 5px;
          background-color: ${color};
          color: ${color};
          animation: dotFlashing 1s infinite alternate;
          animation-delay: 0s;
        }
        .dotTyping::after {
          left: 10px;
          width: 6px;
          height: 6px;
          border-radius: 5px;
          background-color: ${color};
          color: ${color};
          animation: dotFlashing 1s infinite alternate;
          animation-delay: 1s;
        }
        @keyframes dotFlashing {
          0% {
            background-color: ${color};
          }
          50%,
          100% {
            background-color: ${color}4f;
          }
        }
      `}</style>
    </div>
  )
}

export default DotTyping
