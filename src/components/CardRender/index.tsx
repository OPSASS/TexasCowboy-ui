import { useEffect, useState } from 'react'
import backCard from '../../assets/JPG/backCard.png'

import { Flex } from 'antd'
import './styles.scss'
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
      <div className='heart' style={{ fontSize: size }}>
        <div className='square'></div>
        <div className='circle1'></div>
        <div className='circle2'></div>
      </div>
    )

  if (suit === '♦️')
    return (
      <div className='diamond' style={{ fontSize: size }}>
        <div className='square'></div>
      </div>
    )

  if (suit === '♣️')
    return (
      <div className='club' style={{ fontSize: size }}>
        <div className='circle1'></div>
        <div className='circle2'></div>
        <div className='circle3'></div>
        <div className='tail'></div>
      </div>
    )

  return (
    <div className='spade' style={{ fontSize: size }}>
      <div className='square'></div>
      <div className='circle1'></div>
      <div className='circle2'></div>
      <div className='tail'></div>
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
    <div className={`cards ${flip ? 'flip' : 'flipY'}`} style={{ fontSize: cardSize }}>
      <div className='backCard'>
        <img src={cardImg} />
      </div>
      <div className='frontCard'>
        <div className={`bodyCard ${card?.suit === '♥️' || card?.suit === '♦️' ? 'redCard' : 'blackCard'}`}>
          <Flex justify='space-between' vertical style={{ height: '100%' }}>
            <Flex>
              <Flex vertical align='center'>
                <p>{card?.value}</p>
                <GetSuit suit={card?.suit} size={cardSize} />
              </Flex>
            </Flex>

            <div className='bigSuit'>
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
  )
}

export default CardRender
