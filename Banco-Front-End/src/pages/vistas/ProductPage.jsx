import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CardProduct } from '../../components/cards/CardProduct'
import { AddProduct } from '../../components/adds/AddProduct'
import './Boton.css'

export const ProductPage = () => {
  const [product, setProduct] = useState([{}])

  const getProduct = async () => {
    try {
      const { data } = await axios.get('http://localhost:3100/product/get')
      if (data.products) {
        setProduct(data.products)
        console.log(data.products)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => getProduct, [])


  return (
    <>
    <AddProduct/>
      <main>
        <div className="left binding color">
          Productos
        </div>
        <div className='row g-0 justify-content-center'>
          {
            product.map(({ _id, name, description, price, availability }, i) => {
              return (
                <CardProduct
                  key={i}
                  _id={_id}
                  title={name}
                  description={description}
                  price={price}
                  availability={availability}
                ></CardProduct>
              )
            })
          }
        </div>
        <button className='btn btn-success floating-button' data-bs-toggle="modal" data-bs-target="#myModal">Agregar</button>
      </main>
    </>
  )
}

