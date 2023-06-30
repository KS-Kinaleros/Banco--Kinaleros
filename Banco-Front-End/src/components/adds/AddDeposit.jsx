import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const AddDeposit = () => {
    const title = 'Realizar Deposito'

    const [form, setForm] = useState({
        noAccount: '',
        nameAccount: '',
        amount: '',
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }

    const saveDeposit = async () => {
        try {
            const { data } = await axios.post('http://localhost:3100/deposit/save', form)
            alert(data.message)
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <div className="modal" tabIndex="-1" id="myModal">
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
                                        <label  className="form-label">Numero de Cuenta</label>
                                        <input type="number" className="form-control" name='noAccount' onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label  className="form-label">Nombre del titular</label>
                                        <input type="text" className="form-control" name='nameAccount' onChange={handleChange} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Monto</label>
                                        <input type="number" className="form-control" name='amount' onChange={handleChange} />
                                    </div> 

                                    <div className="modal-footer">
                                        <button onClick={() => saveDeposit()} type="button" className="btn btn-primary">Realizar Deposito</button>
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
