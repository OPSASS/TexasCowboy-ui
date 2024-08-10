import customApi from '@/apis/custom.api'
import { transactionApi } from '@/apis/index.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import Container from '@/components/Layout/Container/Container'
import ModalCustom from '@/components/ModalCustom/ModalCustom'
import TagCustom from '@/components/TagCustom/TagCustom'
import { AppContext } from '@/contexts/app.context'
import useResponsive from '@/hooks/useResponsives'
import { formatNumberToString } from '@/utils/common'
import { CheckOutlined, CloseOutlined, InfoCircleFilled, RedoOutlined, SearchOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Flex, Form, Input, Select, Space, Table } from 'antd'
import dayjs from 'dayjs'
import { useContext, useState } from 'react'

const TransactionHistoryPage = () => {
  const { profile } = useContext(AppContext)
  const [filterQuery, setFilterQuery] = useState()
  const [options, setOptions] = useState<any>()
  const [page, setPage] = useState<number>(1)
  const [openSearch, setOpenSearch] = useState<boolean>(false)

  const { sm, md } = useResponsive()

  const reExecuteMutation = useMutation({
    mutationFn: (id: string) => customApi.reExecuteTransaction(id),
    onSuccess(data) {
      window.open(data.data.url, '_blank')
      window.close()
    }
  })

  const updateMutation = useMutation({
    mutationFn: (id: string) => transactionApi.update({ status: 'CANCEL' }, id)
  })

  const columns = [
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '25%',
      render: (date: Date) => dayjs(date).format('HH:mm - DD/MM/YYYY')
    },
    {
      title: 'Code transaction',
      dataIndex: 'codeTransaction',
      key: 'codeTransaction',
      width: '25%'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: '15%'
    },
    {
      title: 'Status',
      key: 'status',
      width: '20%',
      render: (result: any) => (
        <Flex justify='space-between' align='center'>
          <TagCustom
            content={result.status}
            intArrType={['PENDING', 'SUCCESS', 'FAIL', 'CANCEL']}
            intColor={['processing', 'success', 'error', 'default']}
          />
          {(result.status === 'PENDING' || result.status === 'FAIL') && (
            <Space>
              <ButtonCustom
                shape='circle'
                size='small'
                icon={<RedoOutlined />}
                onClick={() => reExecuteMutation.mutate(result.codeTransaction)}
              ></ButtonCustom>
              <ButtonCustom
                shape='circle'
                size='small'
                icon={<CloseOutlined />}
                danger
                onClick={() => updateMutation.mutate(result._id)}
              ></ButtonCustom>
            </Space>
          )}
        </Flex>
      )
    },
    {
      title: 'Coin',
      dataIndex: 'coin',
      key: 'coin',
      width: '15%',
      render: (number: number) => formatNumberToString(number)
    }
  ]

  const { isLoading, data } = useQuery({
    queryKey: ['transactionData', filterQuery, options, page, updateMutation.isSuccess],
    queryFn: () => {
      return transactionApi.find(filterQuery, {
        ...options,
        limit: 10,
        sort: { createdAt: -1 },
        page
      })
    },
    enabled: Boolean(profile._id)
  })

  const handleFinish = (values?: any) => {
    setOptions({ sort: { createdAt: values.createdAt ? values.createdAt : -1 } })
    delete values.createdAt
    setFilterQuery({ userId: profile._id, ...values })
  }

  return (
    <Container padding={md ? '50px 0' : '80px 0'}>
      <Space direction='vertical' size='middle'>
        <Flex justify='space-between'>
          <Space>
            <InfoCircleFilled />
            View your transaction history
          </Space>
          {md && <Button icon={<SearchOutlined />} onClick={() => setOpenSearch(true)}></Button>}
        </Flex>

        <Form onFinish={handleFinish} size={sm ? 'small' : 'middle'}>
          <Flex justify='space-between' align='center'>
            <Space>
              <Form.Item name='type'>
                <Select
                  placeholder='Type'
                  style={{ width: sm ? '100%' : 200 }}
                  options={[
                    { label: 'VNPay', value: 'VNPay' },
                    { label: 'PayPal', value: 'PayPal' }
                  ]}
                  allowClear
                />
              </Form.Item>
              <Form.Item name='status'>
                <Select
                  placeholder='Status'
                  options={[
                    { label: 'Success', value: 'SUCCESS' },
                    { label: 'Pending', value: 'PENDING' },
                    { label: 'Cancel', value: 'CANCEL' },
                    { label: 'Fail', value: 'FAIL' }
                  ]}
                  allowClear
                  style={{ width: sm ? '100%' : 200 }}
                />
              </Form.Item>
              <Form.Item name='createdAt'>
                <Select
                  placeholder='Created At'
                  style={{ width: sm ? '100%' : 200 }}
                  options={[
                    { label: 'Latest', value: -1 },
                    { label: 'Oldest', value: 1 }
                  ]}
                  allowClear
                />
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  {sm ? <CheckOutlined /> : 'Apply'}
                </Button>
              </Form.Item>
            </Space>

            <Form.Item>
              {!md && (
                <Input.Search
                  placeholder='Id'
                  style={{ width: 200 }}
                  onSearch={(e) => handleFinish({ codeTransaction: e || undefined })}
                  allowClear
                />
              )}
            </Form.Item>
          </Flex>
        </Form>
        <Table
          dataSource={data?.data?.docs}
          columns={columns}
          loading={isLoading}
          scroll={{
            x: 1000
          }}
          pagination={{
            current: data?.data?.page,
            pageSize: data?.data?.limit,
            total: data?.data?.totalDocs,
            onChange: (e) => setPage(e),
            position: ['bottomCenter']
          }}
        />
      </Space>
      <ModalCustom
        open={openSearch}
        setOpen={setOpenSearch}
        render={
          <Input.Search
            placeholder='Id'
            style={{ width: '100%' }}
            onSearch={(e) => handleFinish({ codeTransaction: e || undefined })}
            allowClear
          />
        }
      ></ModalCustom>
    </Container>
  )
}

export default TransactionHistoryPage
