import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const InfoDepositPage = () => {
  const [deposits, setDeposits] = useState([{}])

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getDeposit = async () => {
    try {
      const { data } = await axios.get('http://localhost:3100/deposit/getToken', { headers: headers })
      if (data.depositsPerson) {
        setDeposits(data.depositsPerson)
        console.log(data.depositsPerson)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => { getDeposit() }, [])

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>No de Cuenta</th>
            <th>Nombre de la Cuenta</th>
            <th>Monto</th>
            {/* Otros encabezados de columna */}
          </tr>
        </thead>
        <tbody>
          {
            deposits?.map(({ _id, date1, noAccount, nameAccount, amount }, i) => {
              return (
                <tr key={i}>
                  <td>{date1}</td>
                  <td>{noAccount}</td>
                  <td>{nameAccount}</td>
                  <td>Q{amount}.00</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

