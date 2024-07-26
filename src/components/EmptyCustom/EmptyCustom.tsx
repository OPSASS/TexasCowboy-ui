import { Empty, Space } from 'antd'
import { Link } from 'react-router-dom'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
import './EmptyCustom.scss'

type Props = {
  buttonText?: string
  buttonHref?: string
  buttonPrimaryText?: string
  buttonPrimaryHref?: string
  imageUrl?: string | null
  heightImage?: string | number
  description?: string | React.ReactNode
  margin?: string | number
  style?: React.CSSProperties
}

const EmptyCustom = (props: Props) => {
  const {
    buttonText,
    buttonHref,
    buttonPrimaryText,
    buttonPrimaryHref,
    imageUrl,
    heightImage,
    description,
    margin,
    style
  } = props

  return (
    <Empty
      image={imageUrl}
      imageStyle={{
        height: heightImage,
        margin: margin
      }}
      description={description}
      style={style}
    >
      <Space>
        {buttonText && (
          <ButtonCustom>
            <Link className='white-text' to={buttonHref || '#'}>
              {buttonText}
            </Link>
          </ButtonCustom>
        )}
        {buttonPrimaryText && (
          <ButtonCustom type='primary' href={buttonPrimaryHref}>
            <Link className='white-text' to={buttonHref || '#'}>
              {buttonPrimaryText}
            </Link>
          </ButtonCustom>
        )}
      </Space>
    </Empty>
  )
}

export default EmptyCustom
