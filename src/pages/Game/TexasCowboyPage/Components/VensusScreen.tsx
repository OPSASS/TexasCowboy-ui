import style from './vensusScreen.module.scss'
type Props = { duration?: number; player1?: string; player2?: string }

const VensusScreen = ({ duration = 1.5, player1, player2 }: Props) => {
  return (
    <div className={style.versusContainer}>
      <div className={style.player1} style={{ animationDuration: duration + 's' }} data-text='V'>
        <p className={style.player1Name}>{player1}</p>
      </div>
      <div className={style.player2} style={{ animationDuration: duration + 's' }} data-text='S'>
        <p className={style.player2Name}>{player2}</p>
      </div>
    </div>
  )
}

export default VensusScreen
