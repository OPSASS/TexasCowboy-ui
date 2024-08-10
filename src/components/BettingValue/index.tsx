import { AppContext } from '@/contexts/app.context'
import useResponsive from '@/hooks/useResponsives'
import { formatNumber } from '@/utils/common'
import { Flex } from 'antd'
import { useContext, useEffect, useState } from 'react'
import ButtonCustom from '../ButtonCustom/ButtonCustom'

const BettingValue = () => {
  const { userWallet, bettingValue, setBettingValue } = useContext(AppContext)
  const { xs, md } = useResponsive()
  const initValues = [50, 100, 500, 1000]
  const [values, setValues] = useState<any[]>(initValues)

  useEffect(() => {
    let newValues = [...values]
    let updated = false

    if (userWallet > 1000000) {
      if (!newValues.includes(10000)) {
        newValues.push(10000)
        updated = true
      }
    } else {
      if (newValues.includes(10000)) {
        newValues = newValues.filter((value) => value !== 10000)
        setBettingValue(5000)
        updated = true
      }
    }

    if (userWallet > 500000) {
      if (!newValues.includes(5000)) {
        newValues.push(5000)
        updated = true
      }
    } else {
      if (newValues.includes(5000)) {
        newValues = newValues.filter((value) => value !== 5000)
        setBettingValue(1000)
        updated = true
      }
    }

    if (updated) {
      setValues(newValues)
    }
  }, [userWallet])

  return (
    <div style={{ marginTop: 5, textAlign: 'center' }}>
      <p style={{ color: 'white', fontSize: xs ? 12 : 14 }}>Betting value</p>
      <Flex gap={md ? 5 : 10} wrap justify='center'>
        {values
          .sort((a, b) => a - b)
          .map((value) => (
            <ButtonCustom
              key={value}
              type={bettingValue === value ? 'primary' : 'default'}
              onClick={() => setBettingValue(value)}
            >
              {formatNumber(value)}
            </ButtonCustom>
          ))}
        <ButtonCustom
          onClick={() => {
            setBettingValue(userWallet / 2)
          }}
          type={userWallet / 2 === bettingValue ? 'primary' : 'default'}
        >
          1/2
        </ButtonCustom>
        <ButtonCustom
          onClick={() => {
            setBettingValue(userWallet)
          }}
          danger
          type={userWallet == bettingValue ? 'primary' : 'default'}
        >
          All in
        </ButtonCustom>
      </Flex>
    </div>
  )
}

export default BettingValue
