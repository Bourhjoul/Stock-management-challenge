import { Steps, Button, message } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Select } from 'antd'

import { GetCustomers, PostOrder } from '../redux/actions/OrderActions'
import { ShowErrmsg } from './ShowResult'
import { GetProducts } from '../redux/actions/ProductActions'
import CreateProductsTable from './CreateProductsTable'

const { Option } = Select

const { Step } = Steps

const CreateOrder = () => {
  const [Qty, setQty] = useState<
    Array<{
      productID: number
      Qty: number
    }>
  >([])
  const [productsselected, setproductsselected] = useState<
    Array<{
      productID: number
      Qty: number
    }>
  >([])
  const GetCustomersR = useSelector((state: any) => state.GetCustomers)
  const { loading, customers, error } = GetCustomersR
  const GetProductsR = useSelector((state: any) => state.GetProducts)
  const {
    loading: loadingProducts,
    Products,
    error: errorProducts,
  } = GetProductsR

  const [customerID, setcustomerID] = useState(1)
  const dispatch = useDispatch()
  const [steps, setsteps] = useState([{ title: '' }])

  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent(current + 1)
    console.log(productsselected)
  }

  useEffect(() => {
    dispatch(GetCustomers())
    dispatch(GetProducts())
    setsteps([
      {
        title: 'Customer',
      },
      {
        title: 'Products',
      },
    ])

    return () => {}
  }, [dispatch])

  const createHandler = () => {
    if (productsselected.length === 0) {
      message.error('You must select at least one product')
    } else {
      if (Qty.length === 0) {
        dispatch(
          PostOrder({
            customerId: customerID,
            products: productsselected,
          })
        )
      } else {
        const products = productsselected.map((productselected: any) =>
          Qty.map((oneQty: any) => {
            if (productselected.productID === oneQty.productID) {
              return {
                productID: productselected.productID,
                Qty: oneQty.Qty,
              }
            } else {
              return productselected
            }
          })
        )
        dispatch(
          PostOrder({ customerId: customerID, products: products.flat() })
        )
      }
    }
  }

  const switchHandler = () => {
    switch (current) {
      case 0:
        return (
          <>
            {loading ? (
              <div>loading</div>
            ) : error ? (
              ShowErrmsg(error)
            ) : (
              customers.length !== 0 && (
                <>
                  <h4>Choose a customer</h4>
                  <Select
                    onChange={(value) => {
                      setcustomerID(Number(value[0]))
                    }}
                    style={{ width: 320 }}
                    defaultValue={customers[0].name}
                  >
                    {customers.map((customer: any) => (
                      <Option
                        key={customer.id}
                        value={customer.id + ' ' + customer.name}
                      >
                        {customer.id + ' ' + customer.name}
                      </Option>
                    ))}
                  </Select>
                </>
              )
            )}
          </>
        )

      case 1:
        return (
          <>
            {loadingProducts ? (
              <div>Loading</div>
            ) : errorProducts ? (
              ShowErrmsg(errorProducts)
            ) : (
              <>
                <h3>Customer ID : {customerID}</h3>
                <CreateProductsTable
                  Products={Products}
                  keys={Object.keys(Products[0])}
                  setproducts={setproductsselected}
                  productsselected={productsselected}
                  setQty={setQty}
                />
              </>
            )}
          </>
        )
      default:
        break
    }
  }

  return (
    <>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{switchHandler()}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => createHandler()}>
            Create
          </Button>
        )}
      </div>
    </>
  )
}

export default CreateOrder
