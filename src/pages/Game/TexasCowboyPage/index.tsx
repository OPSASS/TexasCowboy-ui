import { historyApi, pokerApi } from '@/apis/index.api'
import BetAria from '@/components/BetAria'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import CardRender from '@/components/CardRender'
import Container from '@/components/Layout/Container/Container'
import RenderDot from '@/components/RenderDot'
import { HistoriesState } from '@/types/histories.type'
import { PokerState } from '@/types/poker.type'
import { RightOutlined, RiseOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Col, Flex, Row, Space } from 'antd'
import { useEffect, useState } from 'react'
import bgTx from '../../../assets/JPG/background-texas.jpg'
import style from './styles.module.scss'
const TexasCowboyPage = () => {
  const initCards = { player1: [0, 0], player2: [0, 0], dealer: [0, 0, 0, 0, 0] }
  const [turn, setTurn] = useState<PokerState>(initCards)
  const [historyData, setHistoryData] = useState<HistoriesState>()
  const [play, setPlay] = useState(false)
  const [turnId, setTurnId] = useState('')
  const [showResult, setShowResult] = useState(false)

  const { data } = useQuery({
    queryKey: ['historyData'],
    queryFn: () => {
      return historyApi.find({}, { limit: 1, sort: { updatedAt: -1 } })
    }
  })

  useEffect(() => {
    if (data?.data) setHistoryData(data.data[0])
  }, [data])

  const historyMutation = useMutation({
    mutationFn: (id: string) => historyApi.detail(id),
    onSuccess(data) {
      setHistoryData(data.data)
    }
  })

  const playMutation = useMutation({
    mutationFn: (body: any) => pokerApi.create(body),
    onSuccess(data) {
      setTurn({ turn, ...data.data })
      setTurnId(data.data._id)

      setTimeout(() => {
        finishMutation.mutate({})
      }, 15000)
    }
  })

  const finishMutation = useMutation({
    mutationFn: (body: any) => pokerApi.update(body, turnId),
    onSuccess(data) {
      setTurn(data.data)
      setTimeout(() => {
        historyMutation.mutate(data.data.historyId)
        setShowResult(true)
      }, 1800)

      setTimeout(() => {
        setTurn(initCards)
        setShowResult(false)
      }, 10000)

      setTimeout(() => {
        playMutation.mutate({})
      }, 12000)
    }
  })

  useEffect(() => {
    if (play) {
      playMutation.mutate({})
    }
  }, [play])

  return (
    <Container size='sm' backgroundUrl={bgTx} imgStyle={{ position: 'fixed' }}>
      <div className={style.table}>
        <Flex justify='space-between' align='center' vertical>
          <Row gutter={[24, 24]} align='bottom' style={{ marginTop: 40 }}>
            <Col span={6}>
              <Flex justify='space-between' gap={6}>
                {turn.player1.map((c, id) => (
                  <CardRender
                    key={'pl1' + id}
                    cardNumber={c}
                    delay={id === 0 ? 1500 : 0}
                    timer={id === 1 ? 10000 : 25700}
                    cardSize={9}
                  />
                ))}
              </Flex>
              <div className={style.showResult}>
                {showResult && historyData?.gameHistory?.result && (
                  <Space direction='vertical' size='large'>
                    <h3>{historyData?.gameHistory?.result[0]?.playerIndex}</h3>
                    {historyData?.gameHistory?.result[0]?.rankString}
                    <h1>{historyData?.gameHistory?.result[0]?.result}</h1>
                  </Space>
                )}
              </div>
            </Col>
            <Col span={12}>
              <Flex vertical justify='center' align='center' gap={6}>
                <div className={style.growthArea}>
                  <div className={style.growthBody}>
                    <Flex gap={5} justify='center'>
                      <RiseOutlined style={{ fontSize: 10, color: 'white' }} />
                      {historyData?.gameHistory?.playerHistory.slice(-10).map((p, id) => (
                        <RenderDot
                          result={
                            (p.playerIndex === '0' && p.result === 'win' && 'blue') ||
                            (p.playerIndex === '1' && p.result === 'win' && 'red') ||
                            undefined
                          }
                          key={'rs' + id}
                          size={10}
                        />
                      ))}
                      <RightOutlined style={{ fontSize: 10, color: 'white' }} />
                    </Flex>
                  </div>
                </div>
                <Flex justify='space-between' gap={6}>
                  {turn.dealer.map((c, id) => (
                    <CardRender key={'dl' + id} cardNumber={c} cardSize={7} delay={1000 + 100 * (id + 1)} />
                  ))}
                </Flex>
              </Flex>
            </Col>
            <Col span={6}>
              <Flex justify='space-between' gap={6}>
                {turn.player2.map((c, id) => (
                  <CardRender
                    key={'pl2' + id}
                    cardNumber={c}
                    delay={id === 0 ? 1800 : 0}
                    timer={id === 1 ? 10000 : 25500}
                    cardSize={9}
                  />
                ))}
              </Flex>
              <div className={style.showResult}>
                {showResult && historyData?.gameHistory?.result && (
                  <Space direction='vertical' size='large'>
                    <h3>{historyData?.gameHistory?.result[1]?.playerIndex}</h3>
                    {historyData?.gameHistory?.result[1]?.rankString}
                    <h1>{historyData?.gameHistory?.result[1]?.result}</h1>
                  </Space>
                )}
              </div>
            </Col>
          </Row>
          <div className={style.bettingArea}>
            <Row gutter={[6, 6]}>
              <BetAria
                data={historyData?.gameHistory}
                content='Blue'
                checkKey='blue'
                countKey='countBlue'
                valuation='x2'
                showWin={showResult}
              />
              <BetAria
                data={historyData?.gameHistory}
                content='Draw'
                checkKey='draw'
                countKey='countDraw'
                valuation='x20'
                showWin={showResult}
              />
              <BetAria
                data={historyData?.gameHistory}
                content='Red'
                checkKey='red'
                countKey='countRed'
                valuation='x2'
                showWin={showResult}
              />
              <Col span={16}>
                <Flex justify='center' className={style.contentColor}>
                  Player Wins
                </Flex>
              </Col>
              <Col span={8}>
                <Flex justify='center' className={style.contentColor}>
                  Any Player
                </Flex>
              </Col>
              <BetAria
                data={historyData?.gameHistory}
                content='High Card/One Pair'
                checkKey='highCardOrOnePair'
                countKey='countHighCardOrOnePair'
                valuation='x2.2'
                showWin={showResult}
              />

              <BetAria
                data={historyData?.gameHistory}
                content='Two Pairs'
                checkKey='twoPair'
                countKey='countTwoPair'
                valuation='x3.1'
                showWin={showResult}
              />
              <BetAria
                data={historyData?.gameHistory}
                content='Suited/Connector/Suited Connector'
                checkKey='isFlush'
                countKey='countIsFlush'
                valuation='x1.66'
                showWin={showResult}
              />
              <BetAria
                data={historyData?.gameHistory}
                content='Three of a Kind/Straight/Flush'
                checkKey='threeOfAKindOrStraightOrFlush'
                countKey='countThreeOfAKindOrStraightOrFlush'
                valuation='x4.7'
                showWin={showResult}
              />
              <BetAria
                data={historyData?.gameHistory}
                content='Full House'
                checkKey='fullHouse'
                countKey='countFullHouse'
                valuation='x20'
                showWin={showResult}
              />
              <BetAria
                data={historyData?.gameHistory}
                content='Is has Pair'
                checkKey='isHasPair'
                countKey='countIsHasPair'
                valuation='x8.5'
                showWin={showResult}
              />
              <BetAria
                col={16}
                data={historyData?.gameHistory}
                content='Four of a Kind/Straight Flush/Royal Flush'
                checkKey='fourOfAKindOrStraightFlushOrRoyalFlush'
                countKey='countFourOfAKindOrStraightFlushOrRoyalFlush'
                valuation='x248'
                showWin={showResult}
              />
              <BetAria
                col={8}
                data={historyData?.gameHistory}
                content='AA'
                checkKey='isAA'
                countKey='countIsAA'
                valuation='x100'
                showWin={showResult}
              />
            </Row>
          </div>
        </Flex>
        <ButtonCustom
          onClick={() => {
            if (play) window.location.reload()
            setPlay(!play)
          }}
          type={play ? 'default' : 'primary'}
          danger={play}
        >
          {play ? 'Stop' : 'Play'}
        </ButtonCustom>
      </div>
    </Container>
  )
}

export default TexasCowboyPage
