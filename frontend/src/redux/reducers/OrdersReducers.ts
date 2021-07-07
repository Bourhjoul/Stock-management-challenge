import { PayloadAction } from '@reduxjs/toolkit'
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_CUSTOMERS_FAIL,
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_ORDERS_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDER_PRODUCTS_FAIL,
  GET_ORDER_PRODUCTS_REQUEST,
  GET_ORDER_PRODUCTS_RESET,
  GET_ORDER_PRODUCTS_SUCCESS,
} from '../constants/orderConstants'

export const GetOrdersReducers = (
  state = { data: [] },
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

export const CreateOrderReducers = (
  state = {},
  action: PayloadAction<boolean>
) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true }
    case CREATE_ORDER_SUCCESS:
      return { loading: false, success: true }
    case CREATE_ORDER_FAIL:
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

export const GetCustomersReducer = (
  state = { customers: [{}] },
  action: PayloadAction<boolean>
) => {
  switch (action.type) {
    case GET_CUSTOMERS_REQUEST:
      return { loading: true }
    case GET_CUSTOMERS_SUCCESS:
      return { loading: false, customers: action.payload, success: true }
    case GET_CUSTOMERS_FAIL:
      return { loading: false, success: false, error: action.payload }
    default:
      return state
  }
}
