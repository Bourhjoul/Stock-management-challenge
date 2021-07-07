import React, { useEffect, useState } from 'react'

import { Table, Space, Button, Modal } from 'antd'
import { ExpandAltOutlined, FileTextOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { GetOrderProducts } from '../redux/actions/OrderActions'
import { ShowErrmsg } from './ShowResult'
import { createInvoice } from './Createinvoice'
import { GET_ORDER_PRODUCTS_RESET } from '../redux/constants/orderConstants'

const { Column } = Table
export const TableProducts = (Products: any, keys: any) => {
  return (
    <Table dataSource={Products} rowKey={(record) => record.id}>
      {keys.map((key: string) => (
        <Column title={key} dataIndex={key} key={key} />
      ))}
    </Table>
  )
}

const MangementTableOrder = ({ orders, keys }: any) => {
  const [orderID, setorderID] = useState('0')
  const [customer, setcustomer] = useState('')
  const [loadingPdf, setloadingPdf] = useState(false)
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
    dispatch({ type: GET_ORDER_PRODUCTS_RESET })
    dispatch(GetOrderProducts(id))
    setisModalVisible(true)
  }
  const handleCancel = () => {
    setisModalVisible(false)
    dispatch({ type: GET_ORDER_PRODUCTS_RESET })
  }
  const createPdf = (order: any) => {
    dispatch({ type: GET_ORDER_PRODUCTS_RESET })

    setcustomer(order.customer)
    setorderID(order.id)
    setloadingPdf(true)
  }

  useEffect(() => {
    if (loadingPdf) {
      dispatch(GetOrderProducts(orderID))
    }
    if (success && loadingPdf && orderID && customer) {
      createInvoice(Products, customer)
      setloadingPdf(false)
    }
    return () => {}
  }, [dispatch, Products, success, loadingPdf, orderID, customer])

  return (
    <>
      <div>{loadingPdf && 'Loading the pdf'}</div>
      <Table rowKey={(record) => record.id} dataSource={orders}>
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
        <Column
          title="Pdf"
          key="pdf"
          render={(order) => (
            <Space size="middle">
              <Button
                type="primary"
                icon={<FileTextOutlined />}
                onClick={() => createPdf(order)}
              >
                Pdf
              </Button>
            </Space>
          )}
        />
      </Table>
      <Modal
        onCancel={handleCancel}
        title="products"
        width={700}
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
