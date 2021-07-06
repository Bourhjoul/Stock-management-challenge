import { PayloadAction } from '@reduxjs/toolkit'
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../constants/userConstants'

export const userLoginReducer = (
  state = {},
  action: PayloadAction<boolean>
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true }
    case USER_LOGIN_FAIL:
      return { loading: false, success: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}
