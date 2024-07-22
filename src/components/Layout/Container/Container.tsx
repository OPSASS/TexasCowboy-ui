import { Layout } from 'antd'
import { Link } from 'react-router-dom'
import css from './Container.module.scss'
type Props = {
  background?: string
  backgroundTitle?: string
  backgroundUrl?: string
  boxLink?: boolean
  children: React.ReactNode
  className?: string
  desc?: string | React.ReactNode
  descSize?: number
  descWidth?: string | number
  header?: React.ReactNode
  heightImg?: string | number
  imgStyle?: React.CSSProperties
  margin?: string | number
  padding?: string | number
  size?: 'sm' | 'lg' | 'fs'
  style?: React.CSSProperties
  styleChild?: React.CSSProperties
  title?: string | React.ReactNode
  titleGoBack?: string
  titleHref?: string
  titleSize?: number
  titleStyle?: React.CSSProperties
  titleTextLink?: string
  titleTextSecond?: string
}

const Container = (props: Props) => {
  const {
    background,
    backgroundTitle,
    backgroundUrl,
    boxLink = true,
    children,
    className,
    desc,
    descSize,
    descWidth,
    header,
    heightImg,
    imgStyle,
    margin,
    padding,
    size,
    style,
    styleChild,
    title,
    titleGoBack,
    titleHref,
    titleSize,
    titleStyle,
    titleTextLink,
    titleTextSecond
  } = props

  const Header = Layout
  return (
    <Header
      className={`${css.headerMain} ${className}`}
      style={{
        padding: padding,
        background: background,
        margin: margin,
        ...style
      }}
    >
      {backgroundUrl && (
        <img
          src={backgroundUrl}
          alt='bg-container'
          style={{ width: '100%', height: heightImg, objectFit: 'cover', ...imgStyle }}
        />
      )}
      <div
        className={`${size !== 'fs' ? 'container' : ''} ${
          (size === 'lg' ? 'container-lg' : '') || (size === 'sm' ? 'container-sm' : '')
        }`}
        style={styleChild}
      >
        <div
          style={{
            background: backgroundTitle
          }}
          className={css.typo}
        >
          {header && <div className={css.header}>{header}</div>}
          {title && (
            <div className={css.title} style={{ fontSize: titleSize, ...titleStyle }}>
              <div>{title}</div>
            </div>
          )}
          {desc && (
            <div className={css.desc} style={{ fontSize: descSize, width: descWidth }}>
              {desc}
            </div>
          )}
        </div>
        {titleGoBack && (
          <div className={css.title} style={{ fontSize: titleSize, ...titleStyle }}>
            {titleGoBack}
          </div>
        )}
        <div className={css.titleSecond}>
          {titleTextLink && (
            <span>
              {boxLink && '「'}
              {<Link to={`${titleHref || '/'}`}>{titleTextLink}</Link>}
              {boxLink && '」'}
            </span>
          )}
          {titleTextSecond && <span>{titleTextSecond}</span>}
        </div>

        {children}
      </div>
    </Header>
  )
}

export default Container
