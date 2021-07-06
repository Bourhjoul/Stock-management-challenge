import { Tabs } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { GetProducts } from '../redux/actions/ProductActions'
import styles from './Login/Login.module.css'
import { ShowErrmsg } from '../components/ShowResult'
import { logout } from '../redux/actions/UserActions'
import MangementTableOrder, { TableProducts } from '../components/Tables'
import { GetOrders } from '../redux/actions/OrderActions'

const { TabPane } = Tabs

const Mangement = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state: any) => state.userLogin)
  const { userInfo } = userLogin
  const GetProductsr = useSelector((state: any) => state.GetProducts)
  const { loading, Products, success, error } = GetProductsr
  const GetOrdersr = useSelector((state: any) => state.GetOrders)
  const {
    loading: loadingOrders,
    data,
    success: successOrders,
    error: errorOrders,
  } = GetOrdersr
  useEffect(() => {
    dispatch(GetProducts())

    return () => {}
  }, [dispatch])

  if (!userInfo) {
    return <Redirect to="" />
  }

  const handleLogout = () => {
    dispatch(logout())
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
              <button className={styles.Btn}>+ ADD ORDER </button>
            </TabPane>
          </Tabs>
        </div>
        <button className={`${styles.Btn} logout`} onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <br />
      <br />
    </>
  )
}

export default Mangement
