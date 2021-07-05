import { PayloadAction } from '@reduxjs/toolkit'
import {
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
} from '../constants/productConstants'
export const GetProductsReducer = (
  state = {},
  action: PayloadAction<boolean>
) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return { loading: true }
    case GET_PRODUCTS_SUCCESS:
      return { loading: false, Products: action.payload, success: true }
    case GET_PRODUCTS_FAIL:
      return { loading: false, success: false, error: action.payload }
    default:
      return state
  }
}
