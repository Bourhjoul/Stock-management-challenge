import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Mangement = () => {
  const userLogin = useSelector((state: any) => state.userLogin)
  const { userInfo } = userLogin

  if (!userInfo) {
    return <Redirect to="" />
  }

  return (
    <div className="content_stock">
      <h3>Hi {userInfo.name}, this is your Mangement Dashboard.</h3>
      <div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default Mangement
