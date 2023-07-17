import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export const UpdateDeposit = ({ _id }) => {
  const title = "Editar Deposito"

  const [form, setForm] = useState({
    amount: '',
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const updateDeposit = async () => {
    try {
      const { data } = await axios.put(`http://localhost:3100/deposit/update/${_id}`, form)
      Swal.fire({
        title: `${data.message}`,
        icon: "success",
      })
      /* alert(data.message) */
    } catch (err) {
      console.log(err)
      Swal.fire({
        title: `${err.response.data.message}`,
        icon: "warning",
      })
    }
  }

  return (
    <>
      <div className="modal" tabIndex="-1" id="myDeposit">
        <div className="modal-dialog ">
          <div className="modal-content">
            {/* titulo */}
            <div className='modal-header' style={{backgroundColor: '#BADD7C', color: '#fff'}}>
              <h1 className="modal-title">{title}</h1>
            </div>

            {/* formulario */}
            <div className='modal-body'>
              <div className="mb-3">
                <label htmlFor="" className="form-label">Monto</label>
                <input onChange={handleChange} name='amount' type="number" className="form-control" required />
              </div>
            
              {/* botones para cancelar o agregar */}
              <div className='modal-footer'>
                <button onClick={() => updateDeposit()} type="submit" className="btn btn-primary">Actualizar Deposito</button>
                <button type="submit" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
