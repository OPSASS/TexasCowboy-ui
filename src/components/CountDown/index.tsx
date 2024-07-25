import { ClockCircleOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

type Props = {
  timeTillDate?: string
  //   timeFormat?: string
  count?: 'countUp' | 'countDown'
  initTime?: number
  initCountdown?: number
  size?: number
  start?: boolean
  className?: string
  align?: 'left' | 'center' | 'right'
  callbackTimeEnd?: React.Dispatch<React.SetStateAction<number>>
  callbackCoudown?: React.Dispatch<React.SetStateAction<number>>
  onListenEvent?: () => void
}

const CountDownTimer = (props: Props) => {
  const {
    timeTillDate,
    initTime = 1,
    initCountdown,
    // timeFormat = 'HH:mm:ss',
    align = 'left',
    count = 'countDown',
    size = 14,
    className,
    start = true,
    callbackTimeEnd,
    callbackCoudown,
    onListenEvent
  } = props
  const now = dayjs()

  const minutesInit = timeTillDate ? dayjs(timeTillDate).diff(now, 'seconds') : initTime && initTime * 60
  const [countdown, setCountdown] = useState<number>(minutesInit || 0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [stopedTime, setStopedTime] = useState<number>(0)

  useEffect(() => {
    setIsRunning(start)
    if (!start && callbackTimeEnd) callbackTimeEnd(stopedTime / 60)
  }, [start])

  useEffect(() => {
    if (initCountdown && initCountdown > 0) setCountdown(initCountdown * 60)
  }, [initCountdown])

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => (count === 'countDown' ? prevCountdown - 1 : prevCountdown + 1))
    }, 1000)

    if (!isRunning || countdown === 0) {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isRunning, countdown])

  useEffect(() => {
    setStopedTime(countdown)
    callbackCoudown && callbackCoudown(countdown)

    if (countdown === 0) {
      onListenEvent && onListenEvent()
      callbackTimeEnd && callbackTimeEnd(0)
    }
  }, [countdown])

  return (
    <Flex gap={5} justify={align} style={{ fontSize: size }} className={className}>
      <ClockCircleOutlined />
      {countdown}
    </Flex>
  )
}

export default CountDownTimer
