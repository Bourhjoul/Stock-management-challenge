import React, { SyntheticEvent, useEffect, useState } from 'react'
import logo from './Darsolar_logo.png'
import { History } from 'history'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/actions/UserActions'
import { RouteComponentProps } from 'react-router-dom'
import styles from './Login.module.css'
import { ShowErrmsg } from '../../components/ShowResult'

export interface ChildComponentProps extends RouteComponentProps<any> {
  history: History
}

const LogIn: React.FC<ChildComponentProps> = ({ history }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state: any) => state.userLogin)
  const { userInfo, error, success } = userLogin
  const [input, setInput] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }
  const loginHandler = async (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(login(input))
  }

  useEffect(() => {
    if (success || userInfo) {
      history.push('/mangement')
    }
    return () => {}
  }, [success, userInfo, history])

  return (
    <div>
      <div className={styles.background_login}></div>
      <div className={styles.page_container}>
        <div className={styles.image_container}>
          <img src={logo} className={styles.logo} alt="logo" />
        </div>
        <div className={styles.logIn_Container}>
          <h3> Please Sign In. </h3>
          {error && ShowErrmsg(error)}
          <br />
          <form className={styles.form_container} onSubmit={loginHandler}>
            Email : <br />
            <input
              type="text"
              className={styles.Input_form}
              placeholder="Type your email"
              name="email"
              value={input.email}
              onChange={handleChange}
            />
            <br />
            Password : <br />
            <input
              value={input.password}
              type="Password"
              className={styles.Input_form}
              placeholder="Type your Password"
              onChange={handleChange}
              name="password"
            />
            <br />
            <button type="submit" className={styles.Btn}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LogIn
