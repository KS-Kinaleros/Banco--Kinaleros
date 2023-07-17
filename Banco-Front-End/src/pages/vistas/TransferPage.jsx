import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

export const TransferPage = () => {
  const title = "Realizar Transferencia"

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const [form, setForm] = useState({
    noAccount: '',
    DPI: '',
    amount: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const transfersave = async (e) => {
    try {
      e.preventDefault()
      const { data } = await axios.post('http://localhost:3100/transfer/save', form, { headers: headers })
      Swal.fire({
        title: `${data.message}`,
        icon: "success",
      })
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

      <div className="modal" tabIndex="-1" id="myTransferUser">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            {/* titulo */}
            <div className='modal-header' style={{ backgroundColor: '#BADD7C', color: '#fff' }}>
              <h1 className="modal-title">{title}</h1>
            </div>


            <div className="modal-body">
              <div className="container-fluid">
                <form className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Numero de Cuenta</label>
                    <input type="number" className="form-control" name='noAccount' onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">DPI</label>
                    <input type="number" className="form-control" name='DPI' onChange={handleChange} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Monto</label>
                    <input type="number" className="form-control" name='amount' onChange={handleChange} />
                  </div>

                  <div className="modal-footer">
                    <button onClick={(e) => transfersave(e)} type="button" className="btn btn-primary">Realizar Transferencia</button>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                  </div>

                </form>
              </div>
            </div>


          </div>
        </div>
      </div >
    </>
  )
}
