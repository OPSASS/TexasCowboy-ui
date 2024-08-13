import { Flex } from 'antd'
import { useEffect, useState } from 'react'
import backCard from '../../assets/JPG/backCard.png'
import style from './styles.module.scss'

type Props = {
  cardNumber?: number
  timer?: number
  delay?: number
  cardImg?: string
  cardSize?: number
}
type CardSuit = {
  suit: string
  value: string
}

const GetSuit = ({ suit = '♥️', size = 14 }: { suit?: string; size?: number }) => {
  if (suit === '♥️')
    return (
      <div className={style.heart} style={{ fontSize: size }}>
        <div className={style.square}></div>
        <div className={style.circle1}></div>
        <div className={style.circle2}></div>
      </div>
    )

  if (suit === '♦️')
    return (
      <div className={style.diamond} style={{ fontSize: size }}>
        <div className={style.square}></div>
      </div>
    )

  if (suit === '♣️')
    return (
      <div className={style.club} style={{ fontSize: size }}>
        <div className={style.circle1}></div>
        <div className={style.circle2}></div>
        <div className={style.circle3}></div>
        <div className={style.tail}></div>
      </div>
    )

  return (
    <div className={style.spade} style={{ fontSize: size }}>
      <div className={style.square}></div>
      <div className={style.circle1}></div>
      <div className={style.circle2}></div>
      <div className={style.tail}></div>
    </div>
  )
}

const CardRender = ({ cardNumber = 0, timer = 10000, delay = 0, cardImg = backCard, cardSize = 14 }: Props) => {
  const [card, setCard] = useState<CardSuit | null>()
  const [flip, setFlip] = useState(false)

  useEffect(() => {
    if (cardNumber > 0) {
      const cardSuit = getCardSuit(cardNumber)
      setCard(cardSuit)
    }
  }, [cardNumber])

  useEffect(() => {
    if (card) {
      setTimeout(() => {
        setFlip(true)
      }, delay)

      setTimeout(() => {
        setFlip(false)
      }, timer)
    }
  }, [card])

  const getCardSuit = (number: number): CardSuit | null => {
    const suits = ['♥️', '♦️', '♣️', '♠️']
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

    if (number < 1 || number > 52) {
      return null
    }

    const suitIndex = Math.floor((number - 1) / 13)
    const valueIndex = (number - 1) % 13

    return {
      suit: suits[suitIndex],
      value: values[valueIndex]
    }
  }

  return (
    <div>
      <div className={`${style.cards} ${flip ? style.flip : style.flipY}`} style={{ fontSize: cardSize }}>
        <div className={style.backCard}>
          <img src={cardImg} />
        </div>
        <div className={style.frontCard}>
          <div
            className={`${style.bodyCard} ${
              card?.suit === '♥️' || card?.suit === '♦️' ? style.redCard : style.blackCard
            }`}
          >
            <Flex justify='space-between' vertical style={{ height: '100%' }}>
              <Flex>
                <Flex vertical align='center'>
                  <p>{card?.value}</p>
                  <GetSuit suit={card?.suit} size={cardSize} />
                </Flex>
              </Flex>

              <div className={style.bigSuit}>
                <GetSuit suit={card?.suit} size={cardSize * 3} />
              </div>

              <Flex justify='end'>
                <Flex vertical align='center' gap={cardSize}>
                  <GetSuit suit={card?.suit} size={cardSize} />
                  <p>{card?.value}</p>
                </Flex>
              </Flex>
            </Flex>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardRender
