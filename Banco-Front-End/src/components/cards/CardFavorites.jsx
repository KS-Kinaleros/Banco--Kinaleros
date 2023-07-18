import axios from 'axios'
import React, { useState } from 'react'
import { AddTransFavo } from '../adds/AddTransFavo'
import Swal from 'sweetalert2'

export const CardFavorites = ({ _id, title, DPI, nickname }) => {

    const elim = async () => {
        try {
            const { data } = await axios.delete(`http://localhost:3100/favorite/delete/${_id}`)
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

    const elimFav = async () => {
        try {
            Swal.fire({
                title: 'Estas seguro de eliminar al favorito?',
                text: "No se podra revertir!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    elim()
                }
            })
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
            <AddTransFavo _id={_id} />
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-md-9 col-lg-7 col-xl-5">
                        <div className="card" style={{ borderRadius: '15px' }}>
                            <div className="card-body p-4">
                                <div className="d-flex text-black">
                                    <div className="flex-shrink-0">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                                            alt="Generic placeholder image" className="img-fluid"
                                            style={{ width: '180px', borderRadius: '10px' }} />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h5 className="mb-1">{nickname}</h5>
                                        <p className="mb-2 pb-1" style={{ color: '#2b2a2a' }}>{title}</p>

                                        <div className="d-flex pt-1">
                                            <button type="button" className="btn btn-outline-success me-1 flex-grow-1" data-bs-toggle="modal" data-bs-target="#myModalTransfer">Depositar</button>
                                            <button type="button" className="btn btn-danger flex-grow-1" onClick={() => elimFav(_id)}>Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

