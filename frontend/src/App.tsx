import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css'
import LogIn from './pages/Login/LogIn'
import Mangement from './pages/Mangement'
import 'antd/dist/antd.css'
export interface User {
  name: string
  email: number
  id: string
}
function App() {
  return (
    <div className="App">
      <Router>
        <Route component={Mangement} path="/mangement" />
        <Route component={LogIn} exact path="/" />
      </Router>
    </div>
  )
}

export default App
