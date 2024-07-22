import { GameHistory } from '@/types/histories.type'
import { Col, Flex } from 'antd'
import winstiker from '../../assets/PNG/winstiker.png'
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
  valuation?: string
}

const BetAria = (props: Props) => {
  const { checkKey, col = 8, content, countKey, data, showWin = false, valuation } = props

  return (
    <Col span={col}>
      <ButtonCustom className={style.bettingButton}>
        <Flex vertical gap={15}>
          <p className={`${style.content} dangerHTMLTwoLine`}>{content}</p>
          <Flex vertical gap={3}>
            <p className={style.valuation}>{valuation}</p>
            <Flex gap={5} justify='center'>
              <div className={style.showWin}>
                {showWin && data?.[checkKey]?.at(-1) && <img src={winstiker} alt='win' />}
              </div>
              {data?.[countKey] > 12 ? (
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

export default BetAria
