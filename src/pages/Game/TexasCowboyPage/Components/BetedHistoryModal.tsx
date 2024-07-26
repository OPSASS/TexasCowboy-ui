import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import ModalCustom from '@/components/ModalCustom/ModalCustom'
import { HistoriesState } from '@/types/histories.type'
import { formatNumber } from '@/utils/common'
import { Flex, Space } from 'antd'
import dayjs from 'dayjs'
import style from './betedHistoryModal.module.scss'

type Props = {
  historyData?: HistoriesState[]
  isOpen: boolean
  onClose: React.Dispatch<React.SetStateAction<boolean>>
}

const BetedHistoryModal = ({ historyData = [], isOpen, onClose }: Props) => {
  return (
    <ModalCustom title='Game history' open={isOpen} setOpen={onClose} footer={null}>
      {historyData.length > 0 ? (
        <Space direction='vertical'>
          {historyData.map((i) => (
            <Flex
              justify='space-between'
              align='center'
              key={i._id}
              className={`${style.historyItem} ${i.totalCoin > 0 ? style.add : style.minus}`}
            >
              <Space>
                <h3 className={style.status}>{i.totalCoin > 0 ? 'WIN' : 'LOSE'}</h3>
                {dayjs(i.createdAt).format('HH:mm - DD/MM/YYYY')}
              </Space>
              <p>
                {i.totalCoin > 0 ? '+' : ''}
                {formatNumber(i.totalCoin)}
              </p>
            </Flex>
          ))}
        </Space>
      ) : (
        <EmptyCustom />
      )}
    </ModalCustom>
  )
}

export default BetedHistoryModal
