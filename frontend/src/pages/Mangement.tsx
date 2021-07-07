import { Tabs, Modal, Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { GetProducts } from '../redux/actions/ProductActions'
import styles from './Login/Login.module.css'
import { ShowErrmsg } from '../components/ShowResult'
import { logout } from '../redux/actions/UserActions'
import MangementTableOrder, { TableProducts } from '../components/Tables'
import { GetOrders } from '../redux/actions/OrderActions'
import CreateOrder from '../components/CreateOrder'
import { ChildComponentProps } from './Login/LogIn'

const { TabPane } = Tabs

const Mangement: React.FC<ChildComponentProps> = ({ history }) => {
  const [isModalVisible, setisModalVisible] = useState(false)
  const dispatch = useDispatch()
  const userLogin = useSelector((state: any) => state.userLogin)
  const { userInfo } = userLogin
  const GetProductsr = useSelector((state: any) => state.GetProducts)
  const { loading, Products, success, error } = GetProductsr
  const GetOrdersr = useSelector((state: any) => state.GetOrders)
  const CreateOrderR = useSelector((state: any) => state.CreateOrder)
  const { success: successCreate } = CreateOrderR
  const {
    loading: loadingOrders,
    data,
    success: successOrders,
    error: errorOrders,
  } = GetOrdersr

  useEffect(() => {
    dispatch(GetProducts())
    if (successCreate) {
      message.success('Order Created')
    }

    return () => {}
  }, [dispatch, history, successCreate])

  if (!userInfo) {
    return <Redirect to="" />
  }

  const handleLogout = () => {
    dispatch(logout())
  }
  const handleCancel = () => {
    setisModalVisible(false)
    window.location.reload()
  }
  const changeTabHandler = (key: string) => {
    switch (key) {
      case '1':
        dispatch(GetProducts())
        break
      case '2':
        dispatch(GetOrders())
        break

      default:
        break
    }
  }
  return (
    <>
      <div className="content_stock">
        <h3>Hi {userInfo.name}, this is your Mangement Dashboard.</h3>
        <div className="tabs">
          <Tabs
            defaultActiveKey="1"
            onChange={(key) => changeTabHandler(key)}
            centered
          >
            <TabPane tab="Products" key="1">
              {loading ? (
                <div>loading</div>
              ) : success ? (
                TableProducts(Products, Object.keys(Products[0]))
              ) : (
                error && ShowErrmsg(error)
              )}
            </TabPane>
            <TabPane tab="Orders" key="2">
              {loadingOrders ? (
                <div>loading</div>
              ) : successOrders && data ? (
                <MangementTableOrder
                  orders={data}
                  keys={Object.keys(data[0])}
                />
              ) : (
                errorOrders && ShowErrmsg(errorOrders)
              )}
              <button
                className={styles.Btn}
                onClick={() => setisModalVisible(true)}
              >
                + ADD ORDER{' '}
              </button>
            </TabPane>
          </Tabs>
        </div>
        <button className={`${styles.Btn} logout`} onClick={handleLogout}>
          Log Out
        </button>
      </div>
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
        <CreateOrder />
      </Modal>
    </>
  )
}

export default Mangement
