import axios from 'axios'
import {
  GET_ORDERS_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDER_PRODUCTS_FAIL,
  GET_ORDER_PRODUCTS_REQUEST,
  GET_ORDER_PRODUCTS_SUCCESS,
} from '../constants/orderConstants'

export const GetOrders = () => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_ORDERS_REQUEST,
    })

    const { data } = await axios.get(`http://localhost:5000/orders`, {
      withCredentials: true,
    })
    dispatch({
      type: GET_ORDERS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: GET_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const GetOrderProducts = (id: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_ORDER_PRODUCTS_REQUEST,
    })

    const { data } = await axios.get(
      `http://localhost:5000/orders/products/${id}`,
      {
        withCredentials: true,
      }
    )
    dispatch({
      type: GET_ORDER_PRODUCTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: GET_ORDER_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
