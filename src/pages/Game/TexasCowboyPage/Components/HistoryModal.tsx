import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import ModalCustom from '@/components/ModalCustom/ModalCustom'
import { PlayerHistory } from '@/types/histories.type'
import { Col, Flex, Row } from 'antd'
import style from './historyModal.module.scss'

type Props = {
  playerHistory?: PlayerHistory[]
  isOpen: boolean
  onClose: React.Dispatch<React.SetStateAction<boolean>>
}

const HistoryModal = ({ playerHistory = [], isOpen, onClose }: Props) => {
  return (
    <ModalCustom title='History' open={isOpen} setOpen={onClose} footer={null}>
      {playerHistory.length > 0 ? (
        <Row className={style.historyMain} gutter={[12, 12]}>
          {playerHistory
            .slice()
            .reverse()
            .map((i, id) => (
              <Col span={24} key={i.rankString + id}>
                <Flex justify={(i.playerIndex === '0' && 'left') || (i.playerIndex === '1' && 'right') || 'center'}>
                  <div
                    className={
                      (i.playerIndex === '0' && style.blue) || (i.playerIndex === '1' && style.red) || style.draw
                    }
                  >
                    {i.rankString}
                  </div>
                </Flex>
              </Col>
            ))}
        </Row>
      ) : (
        <EmptyCustom />
      )}
    </ModalCustom>
  )
}

export default HistoryModal
