import { message, notification } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'

const Notification = (
  type: 'success' | 'info' | 'error' | 'warning',
  description: string | React.ReactNode,
  message?: string | React.ReactNode,
  placement?: NotificationPlacement,
  duration?: number
) => {
  notification.open({
    type,
    message:
      message ||
      (type === 'info' && 'Info') ||
      (type === 'success' && 'Success') ||
      (type === 'error' && 'Error') ||
      (type === 'warning' && 'Warning'),
    description,
    placement: placement || 'topRight',
    duration
  })
}

const Message = (
  type: 'success' | 'info' | 'error' | 'warning',
  content: string | React.ReactNode,
  duration?: number
) => {
  message.open({
    type,
    content,
    duration
  })
}

export { Message, Notification }
