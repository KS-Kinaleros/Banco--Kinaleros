import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const InfoSellPage = () => {
  const [sells, setSells] = useState([{}])

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getSell = async () => {
    try {
      const { data } = await axios.get('http://localhost:3100/buy/getBuys', { headers: headers })
      if (data.buys) {
        setSells(data.buys)
        console.log(data.buys)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => { getSell() }, [])

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Comprador</th>
            <th>Producto</th>
            <th>Costo</th>
            {/* Otros encabezados de columna */}
          </tr>
        </thead>
        <tbody>
          {
            sells?.map(({ _id, date1, user, product, total }, i) => {
              return (
                <tr key={i}>
                  <td>{date1}</td>
                  <td>{user?.name}</td>
                  <td>{product?.name}</td>
                  <td>Q{total}.00</td>

                  {/* para cancelar la transferencia */}
                  {/* <td> <button onClick={() => elimRe(_id)} classNameName='btn btn-danger'>Cancerlar</button></td> */}
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

