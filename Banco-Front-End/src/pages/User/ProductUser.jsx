import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CardProductUser } from '../../components/cards/CardProductUser'
import { Navbar } from '../../components/Navbar'

export const ProductUser = () => {
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
         <Navbar />

      <main>
        <div className="left binding color">
          Productos
        </div>
        <div className='row g-0 justify-content-center'>
          {
            product.map(({ _id, name, description, price, availability }, i) => {
              return (
                <CardProductUser
                  key={i}
                  _id={_id}
                  name={name}
                  description={description}
                  price={price}
                  availability={availability}
                ></CardProductUser>
              )
            })
          }
        </div>
      </main>
    </>
  )
}
