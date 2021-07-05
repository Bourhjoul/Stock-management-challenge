import { Tabs } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { GetProducts } from '../redux/actions/ProductActions'
import styles from './Login/Login.module.css'
import { Table } from 'antd'
import { ShowErrmsg } from '../components/ShowResult'

const { TabPane } = Tabs
const { Column } = Table

const Mangement = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state: any) => state.userLogin)
  const { userInfo } = userLogin
  const GetProductsr = useSelector((state: any) => state.GetProducts)
  const { loading, Products, success, error } = GetProductsr

  useEffect(() => {
    dispatch(GetProducts())
    return () => {}
  }, [dispatch])

  if (!userInfo) {
    return <Redirect to="" />
  }
  return (
    <>
      <div className="content_stock">
        <h3>Hi {userInfo.name}, this is your Mangement Dashboard.</h3>
        <div className="tabs">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Products" key="1">
              {loading ? (
                <div>loading</div>
              ) : success ? (
                <Table dataSource={Products}>
                  <Column title="id" dataIndex="id" key="id" />
                  <Column title="Price" dataIndex="price" key="price" />
                  <Column title="name" dataIndex="name" key="id" />
                  <Column
                    title="stockQty"
                    dataIndex="stockQty"
                    key="stockQty"
                  />
                  <Column
                    title="designation"
                    dataIndex="designation"
                    key="designation"
                  />
                </Table>
              ) : (
                error && ShowErrmsg(error)
              )}
            </TabPane>
            <TabPane tab="Orders" key="2">
              Content of Tab Pane 2
            </TabPane>
          </Tabs>
          <button className={styles.Btn}>Log Out</button>
        </div>
      </div>
      <br />
      <br />
    </>
  )
}

export default Mangement
