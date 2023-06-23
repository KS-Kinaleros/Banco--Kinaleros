import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const AddProduct = () => {
    const title = "Agregar Productos"

    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        availability: '',
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }

    const saveProduct = async () => {
        try {
            const { data } = await axios.post('http://localhost:3100/product/add', form)
            alert(data.message)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className="modal" tabIndex="-1" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* titulo */}
                        <div className='modal-header'>
                            <h1 className="modal-title">{title}</h1>
                        </div>

                        {/* formulario */}
                        <div className='modal-body'>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Nombre</label>
                                <input onChange={handleChange} name='name' type="text" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Descripción</label>
                                <input onChange={handleChange} name='description' type="text" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Precio</label>
                                <input onChange={handleChange} name='price' type="number" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Disponibilidad</label>
                                <input onChange={handleChange} name='availability' type="text" className="form-control" required />
                            </div>

                            {/* botones para cancelar o agregar */}
                            <div className='modal-footer'>
                                <button onClick={() => saveProduct()} type="submit" className="btn btn-primary">Agregar Producto</button>
                                <button type="submit" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
