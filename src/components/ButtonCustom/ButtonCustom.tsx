import { Button, Flex, Tooltip } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
type Props = {
  type?: 'default' | 'primary' | 'primary' | 'dashed' | 'link' | 'text'
  bold?: boolean
  icon?: React.ReactNode
  href?: string
  size?: 'small' | 'middle' | 'large' | undefined
  shape?: 'default' | 'circle' | 'round'
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
  fontWeight?: string | number
  fontSize?: string | number
  htmlType?: 'button' | 'submit' | 'reset' | undefined
  form?: string
  children?: React.ReactNode
  background?: string
  color?: string
  tooltip?: string
  danger?: boolean
  linkTarget?: '_self' | '_blank' | '_parent' | '_top'
  loading?: boolean
  width?: number | string
  fullWidth?: boolean
  align?: 'start' | 'end' | 'center'
  onClick?: () => void
}

const ButtonCustom = (props: Props) => {
  const {
    type,
    bold = false,
    icon,
    href,
    size,
    shape,
    disabled,
    className,
    style,
    fontWeight = 400,
    fontSize = 16,
    htmlType,
    form,
    children,
    background,
    color,
    tooltip,
    danger,
    linkTarget,
    loading,
    width,
    fullWidth,
    align = 'center',
    onClick
  } = props

  return href ? (
    <Tooltip title={tooltip}>
      {linkTarget ? (
        <Button
          size={size}
          type={type}
          shape={shape}
          disabled={disabled}
          onClick={() => {
            onClick
            window.open(href, linkTarget)
          }}
          className={`${className}`}
          style={{
            color,
            background,
            fontSize,
            fontWeight: bold ? 700 : fontWeight,
            width: (fullWidth && '100%') || (width && width) || undefined,
            ...style
          }}
          form={form}
          htmlType={htmlType}
          danger={danger}
          loading={loading}
        >
          {!loading && (
            <Flex align='center' justify={align} gap={5}>
              {icon && icon} {children && <div>{children}</div>}
            </Flex>
          )}
        </Button>
      ) : (
        <Link to={`${href}`}>
          <Button
            size={size}
            type={type}
            shape={shape}
            disabled={disabled}
            onClick={onClick}
            className={`${className} `}
            style={{
              color,
              background,
              fontSize,
              fontWeight: bold ? 700 : fontWeight,
              width: (fullWidth && '100%') || (width && width) || undefined,
              ...style
            }}
            form={form}
            htmlType={htmlType}
            loading={loading}
            danger={danger}
          >
            {!loading && (
              <Flex align='center' justify={align} gap={5}>
                {icon && icon} {children && <div>{children}</div>}
              </Flex>
            )}
          </Button>
        </Link>
      )}
    </Tooltip>
  ) : (
    <Tooltip title={tooltip}>
      <Button
        size={size}
        type={type}
        shape={shape}
        disabled={disabled}
        onClick={onClick}
        className={`${className} `}
        style={{
          fontWeight: bold ? 700 : fontWeight,
          fontSize,
          width: (fullWidth && '100%') || (width && width) || undefined,
          ...style
        }}
        form={form}
        htmlType={htmlType}
        danger={danger}
        loading={loading}
      >
        {!loading && (
          <Flex align='center' justify={align} gap={5}>
            {icon && icon} {children && <div>{children}</div>}
          </Flex>
        )}
      </Button>
    </Tooltip>
  )
}

export default ButtonCustom
