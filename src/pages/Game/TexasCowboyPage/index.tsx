import customApi from '@/apis/custom.api'
import BetArea from '@/components/BetArea'
import BettingValue from '@/components/BettingValue'
import CardRender from '@/components/CardRender'
import CountDownTimer from '@/components/CountDown'
import Container from '@/components/Layout/Container/Container'
import RenderDot from '@/components/RenderDot'
import { AppContext } from '@/contexts/app.context'
import useResponsive from '@/hooks/useResponsives'
import { useSocket } from '@/lib/providers/socket'
import { HistoriesState } from '@/types/histories.type'
import { BettingState, PokerState } from '@/types/poker.type'
import { RightOutlined, RiseOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Col, Flex, Row } from 'antd'
import dayjs from 'dayjs'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import bgTx from '../../../assets/JPG/background-texas.jpg'
import boy from '../../../assets/PNG/Boy.png'
import girl from '../../../assets/PNG/Girl.png'
import jackpot from '../../../assets/PNG/jackpot.png'
import HistoryModal from './Components/HistoryModal'
import VensusScreen from './Components/VensusScreen'
import style from './styles.module.scss'

const CountdownNowTimer = ({
  children,
  className,
  onEnd
}: {
  children?: React.ReactNode
  className?: string
  onEnd?: () => void
}) => {
  const [remainingTime, setRemainingTime] = useState(0)

  useEffect(() => {
    const updateRemainingTime = () => {
      const now = dayjs()
      const nextGameTime = now.startOf('second').add(30 - (now.second() % 30), 'second')
      const diffInSeconds = nextGameTime.diff(now, 'second')
      setRemainingTime(diffInSeconds)
    }

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          if (onEnd) onEnd()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    updateRemainingTime()

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={className}>
      <div className={style.countdown} style={{ display: remainingTime === 0 ? 'none' : 'unset' }}>
        {remainingTime > 0 && (
          <Flex vertical align='center' justify='center' style={{ height: '100%' }}>
            <p>Next game starts in:</p> <h2>{remainingTime}s</h2>
          </Flex>
        )}
      </div>
      {children}
    </div>
  )
}

const TexasCowboyPage = () => {
  const { bettingData, profile, userWallet, setBettingData, setCoinAdd } = useContext(AppContext)
  const { sm } = useResponsive()
  const socket = useSocket()
  const queryClient = useQueryClient()
  const initCards = { player1: [0, 0], player2: [0, 0], dealer: [0, 0, 0, 0, 0] }
  const [turn, setTurn] = useState<PokerState>(initCards)
  const [historyData, setHistoryData] = useState<HistoriesState>()
  const [showResult, setShowResult] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [startBetting, setStartBetting] = useState(false)
  const [openHistory, setOpenHistory] = useState(false)
  const [isPlay, setIsPlay] = useState(false)
  const [gameAction, setGameAction] = useState<'START' | 'END' | null>(null)
  const turnTime = 30000
  const [call, setCall] = useState(false)

  const { data } = useQuery({
    queryKey: ['historyData', call],
    queryFn: () => {
      return customApi.findPrevHistory({ targetModel: 'TEXAS_COWBOY' })
    }
  })

  useEffect(() => {
    if (data?.data) setHistoryData(data.data)
  }, [data])

  const bettingMutation = useMutation({
    mutationFn: (body: BettingState) => customApi.pokerBetting({ ...body, detailedHistory: bettingData }),
    mutationKey: ['bettingMutation'],
    onSuccess(data) {
      setTimeout(() => {
        setCoinAdd(data.data.oldCoin! - userWallet + data.data.totalCoin!)
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ['userWallet'] })
        }, 700)
      }, 1000)
    }
  })

  const pokerGameStartHandler = useCallback(
    (data: PokerState) => {
      if (data && !gameAction) {
        setGameAction('START')
        setTurn(data)
        setIsPlay(true)
        setDisabled(true)

        setTimeout(() => {
          setIsPlay(false)
          setDisabled(false)
          setStartBetting(true)
        }, 2700)
      }
    },
    [gameAction]
  )

  const pokerGameEndHandler = useCallback(
    (data: PokerState) => {
      if (data && gameAction === 'START') {
        setGameAction('END')
        setStartBetting(false)
        setTurn(data)
        setDisabled(true)
        setTimeout(() => {
          bettingMutation.mutate({ gameId: data._id!, userId: profile._id })
        }, 500)

        setTimeout(() => {
          setTurn(initCards)
          setShowResult(false)
          setBettingData([])
          setCoinAdd(0)
        }, turnTime / 3)
      }
    },
    [gameAction, bettingMutation, profile._id]
  )

  const historyPokerTurnHandler = useCallback(
    (data: HistoriesState) => {
      if (data && gameAction === 'END') {
        setGameAction(null)
        setTimeout(() => {
          setHistoryData(data)
          setShowResult(true)
        }, 1700)
      }
    },
    [gameAction]
  )

  useEffect(() => {
    if (socket) {
      socket.on('pokerGameStart', pokerGameStartHandler)
      socket.on('pokerGameEnd', pokerGameEndHandler)
      socket.on('historyPokerTurn', historyPokerTurnHandler)

      return () => {
        socket.off('pokerGameStart', pokerGameStartHandler)
        socket.off('pokerGameEnd', pokerGameEndHandler)
        socket.off('historyPokerTurn', historyPokerTurnHandler)
      }
    }
  }, [socket, pokerGameStartHandler, pokerGameEndHandler, historyPokerTurnHandler])

  return (
    <>
      {isPlay && <VensusScreen duration={1.8} />}
      <Container size='sm' backgroundUrl={bgTx} imgStyle={{ position: 'fixed' }}>
        <div className={style.table}>
          <Flex justify='space-between' align='center' vertical className={style.gameArea}>
            <Flex justify='space-between'>
              <div
                className={`${style.boy} ${
                  showResult && historyData?.gameHistory?.result[0]?.result === 'lose' && style.lose
                }`}
              >
                <img src={boy} alt='boy' />
                <div className={style.showResult}>
                  {showResult && historyData?.gameHistory?.result && (
                    <h1 className={style.sweetTitle}>
                      <p data-text={historyData?.gameHistory?.result[0]?.rankString}></p>
                    </h1>
                  )}
                </div>
              </div>
              <div className={style.jackpot}>
                <img src={jackpot} alt='jackpot' />
                <div className={style.content}>
                  <p>Jackpot</p>
                  {/* <h2>{useCounting(3454112, 3454112 + 3000, 2000, 0)}</h2> */}
                  <h2>3.454.112</h2>
                </div>
              </div>
              <div
                className={`${style.girl} ${
                  showResult && historyData?.gameHistory?.result[1]?.result === 'lose' && style.lose
                }`}
              >
                <img src={girl} alt='girl' />
                <div className={style.showResult}>
                  {showResult && historyData?.gameHistory?.result && (
                    <h1 className={style.sweetTitle}>
                      <p data-text={historyData?.gameHistory?.result[1]?.rankString}></p>
                    </h1>
                  )}
                </div>
              </div>
            </Flex>
            <Row gutter={sm ? [3, 3] : [24, 24]} align={sm ? 'top' : 'bottom'} style={{ marginTop: sm ? '8vh' : 40 }}>
              <Col span={6}>
                <Flex justify='space-between' gap={6}>
                  {turn.player1.map((c, id) => (
                    <CardRender
                      key={'pl1' + id}
                      cardNumber={c}
                      delay={id === 0 ? 1700 : 0}
                      timer={id === 1 ? 10000 : turnTime - 2000}
                      cardSize={sm ? 4 : 9}
                    />
                  ))}
                </Flex>
              </Col>
              <Col span={12}>
                <Flex vertical justify='center' align='center' gap={sm ? 0 : 6}>
                  <div className={style.growthArea} onClick={() => setOpenHistory(true)}>
                    <div className={style.growthBody}>
                      <Flex gap={sm ? 3 : 5} justify='center'>
                        <RiseOutlined style={{ fontSize: sm ? 8 : 10, color: 'white' }} />
                        {historyData?.gameHistory?.playerHistory?.slice(-10).map((p, id) => (
                          <RenderDot
                            result={
                              (p.playerIndex === '0' && p.result === 'win' && 'blue') ||
                              (p.playerIndex === '1' && p.result === 'win' && 'red') ||
                              undefined
                            }
                            key={'rs' + id}
                            size={sm ? 8 : 10}
                          />
                        ))}
                        <RightOutlined style={{ fontSize: sm ? 8 : 10, color: 'white' }} />
                      </Flex>
                    </div>
                  </div>
                  <Flex justify='space-between' gap={6} style={{ marginTop: sm ? '6vh' : 0 }}>
                    {turn.dealer.map((c, id) => (
                      <CardRender key={'dl' + id} cardNumber={c} delay={1000 + 100 * (id + 1)} cardSize={sm ? 5 : 7} /> //1500
                    ))}
                  </Flex>
                  {startBetting && (
                    <div className={style.countDown}>
                      <p>Betting time:</p>
                      <h4>
                        <CountDownTimer initTime={turnTime / 120000} align='center' />
                      </h4>
                    </div>
                  )}
                </Flex>
              </Col>
              <Col span={6}>
                <Flex justify='space-between' gap={6}>
                  {turn.player2.map((c, id) => (
                    <CardRender
                      key={'pl2' + id}
                      cardNumber={c}
                      delay={id === 0 ? 1700 + 300 : 300}
                      timer={id === 1 ? 9700 : turnTime - 2300}
                      cardSize={sm ? 4 : 9}
                    />
                  ))}
                </Flex>
              </Col>
            </Row>
            <CountdownNowTimer className={style.bettingArea} onEnd={() => setCall(true)}>
              <Row gutter={sm ? [3, 3] : [6, 6]}>
                <BetArea
                  data={historyData?.gameHistory}
                  content='Blue'
                  checkKey='blue'
                  countKey='countBlue'
                  valuation='x2'
                  showWin={showResult}
                  disabled={disabled}
                />
                <BetArea
                  data={historyData?.gameHistory}
                  content='Draw'
                  checkKey='draw'
                  countKey='countDraw'
                  valuation='x20'
                  showWin={showResult}
                  disabled={disabled}
                />
                <BetArea
                  data={historyData?.gameHistory}
                  content='Red'
                  checkKey='red'
                  countKey='countRed'
                  valuation='x2'
                  showWin={showResult}
                  disabled={disabled}
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
                <BetArea
                  data={historyData?.gameHistory}
                  content='High Card/One Pair'
                  checkKey='highCardOrOnePair'
                  countKey='countHighCardOrOnePair'
                  valuation='x2.2'
                  showWin={showResult}
                  disabled={disabled}
                />

                <BetArea
                  data={historyData?.gameHistory}
                  content='Two Pairs'
                  checkKey='twoPair'
                  countKey='countTwoPair'
                  valuation='x3.1'
                  showWin={showResult}
                  disabled={disabled}
                />
                <BetArea
                  data={historyData?.gameHistory}
                  content='Suited/Connector/Suited Connector'
                  checkKey='isFlush'
                  countKey='countIsFlush'
                  valuation='x1.66'
                  showWin={showResult}
                  disabled={disabled}
                />
                <BetArea
                  data={historyData?.gameHistory}
                  content='Three of a Kind/Straight/Flush'
                  checkKey='threeOfAKindOrStraightOrFlush'
                  countKey='countThreeOfAKindOrStraightOrFlush'
                  valuation='x4.7'
                  showWin={showResult}
                  disabled={disabled}
                />
                <BetArea
                  data={historyData?.gameHistory}
                  content='Full House'
                  checkKey='fullHouse'
                  countKey='countFullHouse'
                  valuation='x20'
                  showWin={showResult}
                  disabled={disabled}
                />
                <BetArea
                  data={historyData?.gameHistory}
                  content='Is has Pair'
                  checkKey='isHasPair'
                  countKey='countIsHasPair'
                  valuation='x8.5'
                  showWin={showResult}
                  disabled={disabled}
                />
                <BetArea
                  col={16}
                  data={historyData?.gameHistory}
                  content='Four of a Kind/Straight Flush/Royal Flush'
                  checkKey='fourOfAKindOrStraightFlushOrRoyalFlush'
                  countKey='countFourOfAKindOrStraightFlushOrRoyalFlush'
                  valuation='x248'
                  showWin={showResult}
                  disabled={disabled}
                />
                <BetArea
                  col={8}
                  data={historyData?.gameHistory}
                  content='AA'
                  checkKey='isAA'
                  countKey='countIsAA'
                  valuation='x100'
                  showWin={showResult}
                  disabled={disabled}
                />
              </Row>
            </CountdownNowTimer>

            <BettingValue />
          </Flex>
        </div>
        <HistoryModal
          isOpen={openHistory}
          onClose={setOpenHistory}
          playerHistory={historyData?.gameHistory?.playerHistory}
        />
      </Container>
    </>
  )
}

export default TexasCowboyPage
