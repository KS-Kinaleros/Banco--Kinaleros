import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const UpdateUser = ({_id}) => {
    const title = "Editar Usuario"

    const [form, setForm] = useState({
        name: '',
        username: '',
        address: '',
        phone: '',
        email: '',
        job: '',
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const updateUser = async () => {
        try {
            const { data } = await axios.put(`http://localhost:3100/user/update/${_id}`, form)
            alert(data.message)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className="modal" tabIndex="-1" id="myUser">
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
                                        <label htmlFor="inputPassword4" className="form-label">Nombre</label>
                                        <input type="text" className="form-control" name='name' onChange={handleChange} />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="inputEmail4" className="form-label">Apellido</label>
                                        <input type="text" className="form-control" name='surname' onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputPassword4" className="form-label">Telefono</label>
                                        <input type="text" className="form-control" name='phone' onChange={handleChange} />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="inputAddress2" className="form-label">Direccion</label>
                                        <input type="text" className="form-control" name='address' onChange={handleChange} />
                                    </div>

                                    <div className="col-4">
                                        <label htmlFor="inputAddress" className="form-label">Correo</label>

                                        <div className="input-group">
                                            <div className="input-group-text">@</div>
                                            <input type="text" className="form-control" name='email' onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className="col-4">
                                        <label htmlFor="inputAddress" className="form-label">Username</label>
                                        <input type="text" className="form-control" name='username' onChange={handleChange} />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="inputCity" className="form-label">Trabajo</label>
                                        <input type="text" className="form-control" name='job' onChange={handleChange} />
                                    </div>

                                    <div className="modal-footer">
                                        <button onClick={() => updateUser()} type="button" className="btn btn-primary">Actualizar Usuario</button>
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
