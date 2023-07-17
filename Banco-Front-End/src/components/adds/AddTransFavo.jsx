import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export const AddTransFavo = ({ _id }) => {
    const title = "Transferencia"

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const [form, setForm] = useState({
        amount: '',
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const saveTransfer = async (e) => {
        try {
            e.preventDefault()
            const { data } = await axios.post(`http://localhost:3100/transfer/transferFavorite/${_id}`, form, { headers: headers })
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
            /* alert(err?.response.data.message) */
        }
    }


    return (
        <>
            <div className="modal" tabIndex="-1" id="myModalTransfer">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* titulo */}
                        <div className='modal-header' style={{ backgroundColor: '#BADD7C', color: '#fff' }}>
                            <h1 className="modal-title">{title}</h1>
                        </div>


                        <div className="modal-body">
                            <div className="container-fluid">
                                <form className="row g-3">
                                    <div className=".col-md-3">
                                        <label /* name='amount' */ className="form-label" style={{ fontSize: '27px' }} >Monto a transferir</label>
                                        <input type="number" className="form-control" name='amount' onChange={handleChange} />
                                    </div>

                                    <div className="modal-footer">
                                        <button onClick={(e) => saveTransfer(e)} type="button" className="btn btn-primary">Realizar Deposito</button>
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
