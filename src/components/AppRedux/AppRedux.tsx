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
      (type === 'info' && '情報') ||
      (type === 'success' && '成功') ||
      (type === 'error' && 'エラー') ||
      (type === 'warning' && '警告'),
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

export { Notification, Message }
