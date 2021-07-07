import { PayloadAction } from '@reduxjs/toolkit'
import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_SUCCESS,
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
export const CreateProductReducer = (
  state = {},
  action: PayloadAction<boolean>
) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { loading: true }
    case CREATE_PRODUCT_SUCCESS:
      return { loading: false, success: true }
    case CREATE_PRODUCT_FAIL:
      return { loading: false, success: false, error: action.payload }
    case CREATE_PRODUCT_RESET:
      return {
        success: false,
      }
    default:
      return state
  }
}
