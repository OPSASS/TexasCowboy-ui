import { Avatar } from 'antd'
import noAvt from '../../assets/JPG/no-avt.jpg'
import css from './styles.module.scss'

type Props = {
  avtUrl?: string
  size?: number
  style?: React.CSSProperties
  className?: string
  uploadImg?: boolean
}

const AvatarCustom = (props: Props) => {
  const { avtUrl, size, style, className, uploadImg = false } = props

  return (
    <div className={uploadImg ? css.avt : undefined}>
      <Avatar
        style={{
          ...style
        }}
        size={size}
        src={avtUrl ? avtUrl : noAvt}
        className={`${className}`}
      ></Avatar>
    </div>
  )
}

export default AvatarCustom
