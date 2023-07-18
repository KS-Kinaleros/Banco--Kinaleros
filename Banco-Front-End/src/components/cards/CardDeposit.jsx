import axios from 'axios'
import React from 'react'
import { UpdateDeposit } from '../ups/UpdateDeposit'
import Swal from 'sweetalert2'

export const CardDeposit = ({ _id, title, date, noAccount, amounts }) => {

    const cancelDeposit = async () => {
        try {
            const { data } = await axios.delete(`http://localhost:3100/deposit/cancel/${_id}`)
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
            <UpdateDeposit _id={_id} />
            <div className="card m-3 g-0" style={{ maxWidth: '18rem', maxHeight: '20rem' }}>
                <div className="card-body">
                    <h5 className='card-title'>{title}</h5>
                    <p className='card-text'>{noAccount}</p>
                    <p className='card-text'>{date}</p>
                    <p className='card-text' style={{ color: '#BADD7C' }}>{amounts}</p>

                    <button className='btn btn-warning btn-common me-2' data-bs-toggle="modal" data-bs-target="#myDeposit">Editar</button>
                    <button className='btn btn-danger btn-common' onClick={() => cancelDeposit(_id)}>Cancelar</button>
                </div>
            </div>

        </>
    )
}
