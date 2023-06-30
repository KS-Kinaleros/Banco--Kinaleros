import axios from 'axios'
import React, { useState } from 'react'

export const AddFavorite = () => {
    const title = 'Agregar Favoritos'

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const [form, setForm] = useState({
        noAccount: '',
        DPI: '',
        nickname: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }

    const saveFavorite = async (e) => {
        try {
            e.preventDefault()
            const { data } = await axios.post('http://localhost:3100/favorite/save', form, {headers: headers})
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
                                        <label className="form-label">DPI</label>
                                        <input type="text" className="form-control" name='DPI' onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Numero de Cuenta</label>
                                        <input type="text" className="form-control" name='noAccount' onChange={handleChange} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Apodo</label>
                                        <input type="text" className="form-control" name='nickname' onChange={handleChange} />
                                    </div>


                                    <div className="modal-footer">
                                        <button onClick={(e) => saveFavorite(e)} type="button" className="btn btn-primary">Guardar Favorito</button>
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

