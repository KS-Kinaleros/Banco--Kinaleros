import axios from 'axios'
import React, { useEffect, useState } from 'react'


export const InfoTransfersPage = () => {
  const [transfers, setTransfers] = useState([{}])

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getTransfers = async () => {
    try {
      const { data } = await axios.get('http://localhost:3100/transfer/getUser', { headers: headers })
      if (data.transfers) {
        setTransfers(data.transfers)
        console.log(data.transfers)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => { getTransfers() }, [])

  return (
    <>


      <table className="table table-dark table-striped-columns">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Emisor</th>
            <th>No.Cuenta</th>
            <th>Receptor</th>
            <th>Cantidad</th>
            {/* Otros encabezados de columna */}
          </tr>
        </thead>
        <tbody>
          {
            transfers?.map(({ _id, date1, sender, noAccount, receiver, amount }, i) => {
              return (
                <tr key={i}>
                  <td>{date1}</td>
                  <td>{sender?.name}</td>
                  <td>{noAccount}</td>
                  <td>{receiver?.name}</td>
                  <td>{amount}</td>

                  {/* para cancelar la transferencia */}
                  {/* <td> <button onClick={() => elimRe(_id)} classNameName='btn btn-danger'>Cancerlar</button></td> */}
                </tr>
              )
            })
          }
        </tbody>
      </table>




      {/* reservaciones */}
{/*       <h4 classNameName="mt-5 mb-4">Transacciones:</h4>
      <div classNameName="table-responsive">
        <table className="table table-striped">

        </table>
      </div> */}
    </>
  )
}

