import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { UpdateTransfer } from '../../components/ups/UpdateTransfer';
import Swal from 'sweetalert2';

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

  const deleteTransfer = async (_id) => {
    try {
      const { data } = await axios.delete(`http://localhost:3100/transfer/cancel/${_id}`)
      Swal.fire({
        title: `${data.message}`,
        icon: "success",
      })
    } catch (err) {
      console.log(err)
      Swal.fire({
        title: `${err.response.data.message}`,
        icon: "warning"
      })
    }
  }


  useEffect(() => { getTransfers() }, [])

  return (
    <>


      {/* version black */}
      {/* <table className="table table-dark table-striped-columns"> */}
      <table className="table ">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Emisor</th>
            <th>No.Cuenta</th>
            <th>Receptor</th>
            <th>Cantidad</th>
            <th>Acciones</th>
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
                  <td>Q{amount}.00</td>


                  <UpdateTransfer _id={_id} />

                  {/* para cancelar la transferencia */}
                  <td>
                    <button className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#myUpdateTransfer">Actu</button>
                    <button className='btn btn-danger' onClick={() => deleteTransfer(_id)}>Elim</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

