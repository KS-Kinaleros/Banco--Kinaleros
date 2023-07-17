import axios from 'axios'
import React, { useState } from 'react'
import { UpdateUser } from '../ups/UpdateUser'
import Swal from 'sweetalert2'

export const CardUser = ({ _id, noAccount, DPI, title, surname, email, money }) => {

    const elimUser = async () => {
        try {
            const { data } = await axios.delete(`http://localhost:3100/user/delete/${_id}`)
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
            <UpdateUser _id={_id} />
            <div className="card m-3 g-0" style={{ maxWidth: '18rem', maxHeight: '20rem' }}>
                <div className="card-body">
                    <h5 className='card-title'>{title} {surname}</h5>
                    <p className='card-text'>{noAccount}</p>
                    <p className='card-text'>{DPI}</p>
                    <p className='card-text'>{email}</p>
                    <p className='card-text' style={{ color: '#BADD7C' }}>{money}</p>

                    <div className="d-flex justify-content-center">
                        <button className='btn btn-warning  btn-common me-2' data-bs-toggle="modal" data-bs-target="#myUser">Editar</button>
                        <button className='btn btn-danger  btn-common me-2' onClick={() => elimUser(_id)}>Eliminar</button>
                        <button className='btn btn-info  btn-common'>Movimientos</button>
                    </div>


                </div>
            </div>
        </>
    )
}
