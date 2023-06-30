import axios from "axios";
import React from 'react'
import { UpdateProduct } from "../ups/UpdateProduct";

export const CardProduct = ({ _id, title, description, price, availability }) => {

    const eliminarProduct = async () => {
        try {
            const { data } = await axios.delete(`http://localhost:3100/product/delete/${_id}`)
            alert(data.message)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
        <UpdateProduct _id={_id}/>
            <div className="card m-3 g-0" style={{ maxWidth: '18rem', maxHeight: '20rem' }}>
                <div className="card-body">
                    <h5 className='card-title'>{title}</h5>
                    <p className='card-text'>{description}</p>
                    <p className='card-text' style={{ color: '#BADD7C' }}>{price}</p>
                    <p className='card-text'>{availability}</p>

                    <button className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#myProduct">Editar</button>
                    <button className='btn btn-danger' onClick={() => eliminarProduct(_id)}>Eliminar</button>
                </div>
            </div>
        </>
    )
}
