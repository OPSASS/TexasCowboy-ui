import { AppContext } from '@/contexts/app.context'
import { formatNumber } from '@/utils/common'
import { Space } from 'antd'
import { useContext, useEffect, useState } from 'react'
import ButtonCustom from '../ButtonCustom/ButtonCustom'

const BettingValue = () => {
  const { userWallet, bettingValue, setBettingValue } = useContext(AppContext)
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
      <p style={{ color: 'white' }}>Betting value</p>
      <Space>
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
            setBettingValue(userWallet)
          }}
          danger
        >
          All in
        </ButtonCustom>
      </Space>
    </div>
  )
}

export default BettingValue
