import style from './styles.module.scss'

type Props = {
  result?: boolean | 'blue' | 'red'
  size?: number
}

const RenderDot = ({ result, size = 12 }: Props) => {
  return (
    <div
      className={
        (result === true && style.greenDot) ||
        (result === false && style.redDot) ||
        (result === 'blue' && style.blueDot) ||
        (result === 'red' && style.redDot2) ||
        style.blackDot
      }
      style={{ fontSize: size }}
    ></div>
  )
}

export default RenderDot
