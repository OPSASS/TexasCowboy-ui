import { formatNumberToString } from '@/utils/common'
import { useEffect, useRef, useState } from 'react'
const useCounting = (startNumber: number, endNumber: number, duration: number, delay: number) => {
  const [count, setCount] = useState(startNumber || 0)
  const startTimeRef = useRef<number | null>(null)
  const animationFrameIdRef = useRef<number>()

  useEffect(() => {
    if (
      isNaN(startNumber) ||
      isNaN(endNumber) ||
      isNaN(duration) ||
      isNaN(delay) ||
      !isFinite(startNumber) ||
      !isFinite(endNumber) ||
      !isFinite(duration) ||
      !isFinite(delay) ||
      startNumber < 0 ||
      endNumber < 0 ||
      duration <= 0 ||
      delay < 0
    ) {
      console.error('Invalid parameters for useCounting')
      return
    }

    let timeoutId: NodeJS.Timeout

    const startCounting = () => {
      const startAnimation = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp
        const progress = timestamp - startTimeRef.current - delay

        if (progress < 0) {
          animationFrameIdRef.current = requestAnimationFrame(startAnimation)
          return
        }

        const percentage = Math.min(progress / duration, 1)
        const currentCount = Math.floor((endNumber - startNumber) * percentage + startNumber)

        setCount(currentCount)

        if (progress < duration) {
          animationFrameIdRef.current = requestAnimationFrame(startAnimation)
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(startAnimation)
    }

    timeoutId = setTimeout(startCounting, delay)

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }
      clearTimeout(timeoutId)
    }
  }, [startNumber, endNumber, duration, delay])

  return formatNumberToString(count)
}

export default useCounting
