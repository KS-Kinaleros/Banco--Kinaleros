import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export const AddUser = () => {
  const title = "Agregar Usuario"

  const [form, setForm] = useState({
    DPI: '',
    name: '',
    username: '',
    password: '',
    address: '',
    phone: '',
    email: '',
    job: '',
    monthlyIncome: '',
    money: '',
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

  }

  const saveUser = async (e) => {
    try {
      e.preventDefault()
      const { data } = await axios.post('http://localhost:3100/user/add', form)
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
      <div className="modal" tabIndex="-1" id="myModal">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            {/* titulo */}
            <div className='modal-header' style={{ backgroundColor: '#BADD7C', color: '#fff' }}>
              <h1 className="modal-title">{title}</h1>
            </div>


            <div className="modal-body">
              <div className="container-fluid">
                <form className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">DPI</label>
                    <input type="text" className="form-control" name='DPI' onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" name='name' onChange={handleChange} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Apellido</label>
                    <input type="text" className="form-control" name='surname' onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Telefono</label>
                    <input type="text" className="form-control" name='phone' onChange={handleChange} />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Direccion</label>
                    <input type="text" className="form-control" name='address' onChange={handleChange} />
                  </div>

                  <div className="col-4">
                    <label className="form-label">Correo</label>

                    <div className="input-group">
                      <div className="input-group-text">@</div>
                      <input type="text" className="form-control" name='email' onChange={handleChange} />
                    </div>
                  </div>

                  <div className="col-4">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" name='username' onChange={handleChange} />
                  </div>
                  <div className="col-4">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" name='password' onChange={handleChange} />
                  </div>


                  <div className="col-md-3">
                    <label className="form-label">Trabajo</label>
                    <input type="text" className="form-control" name='job' onChange={handleChange} />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Ingresos Mensuales</label>
                    <input type="number" className="form-control" name='monthlyIncome' onChange={handleChange} />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Dinero</label>
                    <input type="number" className="form-control" name='money' onChange={handleChange} />
                  </div>

                  <div className="modal-footer">
                    <button onClick={(e) => saveUser(e)} type="button" className="btn btn-primary">Guardar Usuario</button>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
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
