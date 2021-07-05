import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer } from './reducers/UsersReducers'
import { GetProductsReducer } from './reducers/ProductsReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  GetProducts: GetProductsReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo') || '{}')
  : null
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middelware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middelware))
)

export default store
