import { AppContext } from '@/contexts/app.context'
import { GameHistory } from '@/types/histories.type'
import { debounce, formatNumber } from '@/utils/common'
import { Col, Flex } from 'antd'
import { useContext } from 'react'
import winstiker from '../../assets/PNG/winstiker.png'
import { Notification } from '../AppRedux/AppRedux'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
import RenderDot from '../RenderDot'
import style from './styles.module.scss'

type Props = {
  checkKey: keyof GameHistory
  col?: number
  content?: string | React.ReactNode
  countKey: keyof GameHistory
  data: any
  showWin?: boolean
  disabled?: boolean
  valuation?: string
}

const BetArea = (props: Props) => {
  const { checkKey, col = 8, content, countKey, data, showWin = false, disabled = false, valuation } = props
  const { bettingValue, bettingData, userWallet, setBettingData, setUserWallet } = useContext(AppContext)

  const betting = bettingData.find((v) => v.key === checkKey)
  const handleBetting = () => {
    const betting = bettingData.find((v) => v.key === checkKey)

    if (betting) {
      if (userWallet >= bettingValue) {
        const newBettingData = bettingData.map((v) => {
          if (v.key === checkKey) {
            return { ...v, coin: v.coin + bettingValue }
          }
          return v
        })
        setBettingData(newBettingData)
        setUserWallet(userWallet - bettingValue)
      } else {
        Notification('error', 'Error', 'The number of coins is not enough!')
      }
    } else {
      if (userWallet >= bettingValue) {
        const newBettingData = [...bettingData, { key: checkKey, coin: bettingValue }]
        setBettingData(newBettingData)
        setUserWallet(userWallet - bettingValue)
      } else {
        Notification('error', 'The number of coins is not enough!', 'Error')
      }
    }
  }
  return (
    <Col
      span={col}
      className={`${(showWin || disabled) && style.hidden} ${showWin && !data?.[checkKey]?.at(-1) && style.disabled}`}
    >
      <ButtonCustom className={style.bettingButton} onClick={debounce(() => handleBetting(), 50)}>
        <Flex vertical gap={15}>
          <p className={`${style.content} dangerHTMLTwoLine`}>{content}</p>
          <Flex vertical gap={3}>
            <p className={style.valuation}>{valuation}</p>
            {betting && betting.coin !== 0 && <div className={style.bettingValue}>{formatNumber(betting.coin)}</div>}
            <Flex gap={5} justify='center'>
              <div className={style.showWin}>
                {showWin && data?.[checkKey]?.at(-1) && <img src={winstiker} alt='win' />}
              </div>
              {data?.[countKey] > (col === 8 ? 12 : 25) ? (
                <p className={style.showCount}>{data?.[countKey]} Never out</p>
              ) : (
                data?.[checkKey]?.map((i: any, id: number) => <RenderDot result={i} key={id + checkKey} />)
              )}
            </Flex>
          </Flex>
        </Flex>
      </ButtonCustom>
    </Col>
  )
}

export default BetArea
