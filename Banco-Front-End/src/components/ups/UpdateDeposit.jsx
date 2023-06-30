import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
      alert(data.message)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="modal" tabIndex="-1" id="myProduct">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* titulo */}
            <div className='modal-header' style={{ backgroundColor: '#BADD7C', color: '#fff' }}>
              <h1 className="modal-title">{title}</h1>
            </div>

            {/* formulario */}
            <div class="modal-dialog modal-sm">
              <div className="mb-3">
                <label htmlFor="" className="form-label">Monto</label>
                <input onChange={handleChange} name='amount' type="number" className="form-control" required />
              </div>
            </div>


            <div className="modal-footer">
              <button onClick={() => updateDeposit()} type="button" className="btn btn-primary">Actualizar Depoisito</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
