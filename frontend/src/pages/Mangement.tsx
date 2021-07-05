import { Tabs } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const { TabPane } = Tabs

const Mangement = () => {
  const userLogin = useSelector((state: any) => state.userLogin)
  const { userInfo } = userLogin

  if (!userInfo) {
    return <Redirect to="" />
  }

  return (
    <div className="content_stock">
      <h3>Hi {userInfo.name}, this is your Mangement Dashboard.</h3>
      <div className="tabs">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Products" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Orders" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default Mangement
