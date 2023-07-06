import axios from 'axios'
import React from 'react'
import { UpdateDeposit } from '../ups/UpdateDeposit'

export const CardDeposit = ({ _id, title, date, noAccount, amount }) => {
    
    const cancelDeposit = async () => {
        try {
            const { data } = await axios.delete(`http://localhost:3100/deposit/cancel/${_id}`)
            alert(data.message)
        } catch (err) {
            console.log(err)
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
                    <p className='card-text' style={{ color: '#BADD7C' }}>{amount}</p>

                    <button className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#myDeposit">Editar</button>
                    <button className='btn btn-danger' onClick={() => cancelDeposit(_id)}>Cancelar</button>
                </div>
            </div>

        </>
    )
}
