import { Tag } from 'antd'

type Props = {
  intArrType?: string | string[]
  intColor?: string | string[]
  intAlternativeType?: string | string[]
  content: string | React.ReactNode
  color?: string
  colorText?: string
}

const TagCustom = (props: Props) => {
  const { intArrType, intColor, intAlternativeType, content, color, colorText } = props

  const renderedTags: JSX.Element[] = []

  const contents = Array.isArray(content) ? content : [content]

  contents.forEach((item, index) => {
    let renderedContent = item
    let renderedColor = color

    if (intAlternativeType) {
      if (Array.isArray(intAlternativeType)) {
        renderedContent = intAlternativeType[index] || item
      } else {
        renderedContent = intAlternativeType
      }
    }

    if (intColor) {
      if (Array.isArray(intColor)) {
        renderedColor = intColor[index] || color
      } else {
        renderedColor = intColor
      }
    }

    if (intArrType && intArrType.includes(item)) {
      const arrIndex = intArrType.indexOf(item)

      if (intAlternativeType && Array.isArray(intAlternativeType)) {
        renderedContent = intAlternativeType[arrIndex]
      }

      if (intColor && Array.isArray(intColor)) {
        renderedColor = intColor[arrIndex]
      }
    }

    renderedTags.push(
      <Tag key={index} color={renderedColor}>
        <div style={{ color: colorText, fontWeight: 700 }}>{renderedContent}</div>
      </Tag>
    )
  })

  return <>{renderedTags}</>
}

export default TagCustom
