import React, { SyntheticEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { PostProduct } from '../redux/actions/ProductActions'
import styles from '../pages/Login/Login.module.css'

const CreateProductForm = () => {
  const CreateProductStyle = {
    margin: '0 150px',
  }
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    name: '',
    designation: '',
    price: 100,
    stockQty: 1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }
  const createProductHandler = (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(
      PostProduct({
        name: input.name,
        designation: input.designation,
        price: Number(input.price),
        stockQty: Number(input.stockQty),
      })
    )
  }
  return (
    <div style={CreateProductStyle}>
      <form className={styles.form_container} onSubmit={createProductHandler}>
        Name : <br />
        <input
          type="text"
          className={styles.Input_form}
          placeholder="Type Product Name"
          name="name"
          value={input.name}
          onChange={handleChange}
          required
        />
        <br />
        Designation : <br />
        <input
          value={input.designation}
          type="text"
          className={styles.Input_form}
          placeholder="Type Product Pesignation"
          onChange={handleChange}
          name="designation"
          required
        />
        <br />
        Price <br />
        <input
          type="number"
          className={styles.Input_form}
          placeholder="Type Product Price"
          name="price"
          value={input.price}
          onChange={handleChange}
          required
        />
        <br />
        Stock Quantity <br />
        <input
          type="number"
          className={styles.Input_form}
          placeholder="Type Product QTY"
          name="stockQty"
          value={input.stockQty}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.Btn}>
          Create Product
        </button>
      </form>
    </div>
  )
}

export default CreateProductForm
