import { PayloadAction } from '@reduxjs/toolkit'
import {
  GET_ORDERS_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDER_PRODUCTS_FAIL,
  GET_ORDER_PRODUCTS_REQUEST,
  GET_ORDER_PRODUCTS_RESET,
  GET_ORDER_PRODUCTS_SUCCESS,
} from '../constants/orderConstants'

export const GetOrdersReducers = (
  state = { Orders: [] },
  action: PayloadAction<boolean>
) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return { loading: true }
    case GET_ORDERS_SUCCESS:
      return { loading: false, data: action.payload, success: true }
    case GET_ORDERS_FAIL:
      return { loading: false, success: false, error: action.payload }
    default:
      return state
  }
}

export const GetOrderProductsReducers = (
  state = { Products: [], loading: true, success: false },
  action: PayloadAction<boolean>
) => {
  switch (action.type) {
    case GET_ORDER_PRODUCTS_REQUEST:
      return { loading: true }
    case GET_ORDER_PRODUCTS_SUCCESS:
      return { loading: false, Products: action.payload, success: true }
    case GET_ORDER_PRODUCTS_FAIL:
      return { loading: false, success: false, error: action.payload }
    case GET_ORDER_PRODUCTS_RESET:
      return {
        Products: [],
        loading: true,
        success: false,
      }
    default:
      return state
  }
}
