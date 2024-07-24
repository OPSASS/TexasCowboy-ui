import { Modal } from 'antd'
import { LegacyButtonType } from 'antd/lib/button/button'
import React, { useRef, useState } from 'react'
import type { DraggableData, DraggableEvent } from 'react-draggable'
import Draggable from 'react-draggable'

type Props = {
  cancelText?: string
  children?: React.ReactNode
  className?: string
  confirmLoading?: boolean
  footer?: null | React.ReactNode
  noTitle?: boolean
  okText?: string
  okType?: LegacyButtonType
  open: boolean
  render?: React.ReactNode
  style?: React.CSSProperties
  title?: string | React.ReactNode
  width?: string | number
  afterClose?: () => void
  onCancel?: () => void
  onOk?: () => void
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}
const initBounds = { left: 0, top: 0, bottom: 0, right: 0 }
const ModalCustom = (props: Props) => {
  const {
    cancelText,
    children,
    className,
    confirmLoading,
    footer,
    noTitle,
    okText = '確認',
    okType,
    open,
    render,
    style,
    title,
    width,
    setOpen,
    onOk = () => {
      setOpen && setOpen(false)
    },
    onCancel = () => {
      setOpen && setOpen(false)
    },
    afterClose
  } = props
  const [disabled, setDisabled] = useState(true)
  const [bounds, setBounds] = useState(initBounds)
  const draggleRef = useRef<HTMLDivElement>(null)

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement
    const targetRect = draggleRef.current?.getBoundingClientRect()
    if (!targetRect) {
      return
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y)
    })
  }
  const modalStyles = {
    mask: {
      backdropFilter: 'blur(5px)'
    }
  }

  return (
    <Modal
      open={open}
      width={width}
      className={className}
      style={style}
      styles={modalStyles}
      cancelText={cancelText}
      okText={okText}
      confirmLoading={confirmLoading}
      footer={footer}
      okType={okType}
      afterClose={afterClose}
      onOk={onOk}
      onCancel={onCancel}
      title={
        noTitle ? null : (
          <div
            style={{
              width: '100%',
              cursor: 'move'
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false)
              }
            }}
            onMouseOut={() => {
              setDisabled(true)
            }}
            onFocus={() => console.log('forcus')}
            onBlur={() => console.log('blur')}
          >
            {title}
          </div>
        )
      }
      closable={noTitle ? false : true}
      modalRender={(modal) => (
        <Draggable
          disabled={disabled}
          bounds={bounds}
          nodeRef={draggleRef}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggleRef}>{render ? <div style={{ pointerEvents: 'auto' }}>{render}</div> : modal}</div>
        </Draggable>
      )}
    >
      {render ? (
        <div
          onMouseOver={() => {
            if (disabled) {
              setDisabled(false)
            }
          }}
          onMouseOut={() => {
            setDisabled(true)
          }}
          style={{ pointerEvents: 'auto', width: '100%', cursor: 'move' }}
        >
          {render}
        </div>
      ) : (
        children
      )}
    </Modal>
  )
}

export default ModalCustom
