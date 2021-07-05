import axios from 'axios'
import {
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
} from '../constants/productConstants'

export const GetProducts = () => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_PRODUCTS_REQUEST,
    })

    const { data } = await axios.get(`http://localhost:5000/products`, {
      withCredentials: true,
    })
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
