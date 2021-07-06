import React, { useState } from 'react'

import { Table, Space, Button, Modal } from 'antd'
import { ExpandAltOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { GetOrderProducts } from '../redux/actions/OrderActions'
import { ShowErrmsg } from './ShowResult'

const { Column } = Table
export const TableProducts = (Products: any, keys: any) => {
  return (
    <Table dataSource={Products}>
      {keys.map((key: string) => (
        <Column title={key} dataIndex={key} key={key} />
      ))}
    </Table>
  )
}

const MangementTableOrder = ({ orders, keys }: any) => {
  const dispatch = useDispatch()
  const GetOrderProductsR = useSelector((state: any) => state.GetOrderProducts)
  const { loading, Products, success, error } = GetOrderProductsR
  const [isModalVisible, setisModalVisible] = useState(false)
  orders = orders.map((order: any) => ({
    ...order,
    createdAt: order.createdAt.substring(0, 10),
    updatedAt: order.updatedAt.substring(0, 10),
  }))
  const showModal = (id: string) => {
    dispatch(GetOrderProducts(id))
    setisModalVisible(true)
  }

  const handleCancel = () => {
    setisModalVisible(false)
  }
  return (
    <>
      <Table dataSource={orders}>
        {keys.map((key: string) => (
          <Column title={key} dataIndex={key} key={key} />
        ))}
        <Column
          title="Products"
          key="id"
          dataIndex="id"
          render={(id) => (
            <Space size="middle">
              <Button
                type="primary"
                icon={<ExpandAltOutlined />}
                onClick={() => showModal(id)}
              >
                Show Products
              </Button>
            </Space>
          )}
        />
      </Table>
      <Modal
        onCancel={handleCancel}
        title="products"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
        ]}
        visible={isModalVisible}
      >
        {loading ? (
          <div>Loading</div>
        ) : success ? (
          TableProducts(Products, Object.keys(Products[0]))
        ) : (
          error && ShowErrmsg(error)
        )}
      </Modal>
    </>
  )
}
export default MangementTableOrder
