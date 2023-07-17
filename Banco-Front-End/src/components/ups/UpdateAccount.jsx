import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export const UpdateAccount = () => {
    const title = 'Actualizar Usuario'

    const [form, setForm] = useState({
        amount: '',
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const updateUser = async () => {
        try {
            const {data}= await axios.put("http://localhost:3100/user/updateToken", form, { headers: headers })
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
            <div className="modal" tabIndex="-1" id="myUpdateUser">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* titulo */}
                        <div className='modal-header'>
                            <h1 className="modal-title">{title}</h1>
                        </div>

                        {/* formulario */}
                        <div className='modal-body'>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Username</label>
                                <input onChange={handleChange} name='username' type="text" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Correo</label>
                                <input onChange={handleChange} name='email' type="email" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Teléfono </label>
                                <input onChange={handleChange} name='phone' type="number" className="form-control" required />
                            </div>

                            {/* botones para cancelar o agregar */}
                            <div className='modal-footer'>
                                <button onClick={() => updateUser()} type="submit" className="btn btn-primary">Actualizar</button>
                                <button type="submit" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
