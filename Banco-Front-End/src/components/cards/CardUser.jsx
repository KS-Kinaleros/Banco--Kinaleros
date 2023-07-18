import axios from 'axios'
import React, { useState } from 'react'
import { UpdateUser } from '../ups/UpdateUser'
import { InfoMovements } from '../Movements/InfoMovements'
import Swal from 'sweetalert2'

export const CardUser = ({ _id, noAccount, DPI, title, surname, email, money, movements, role }) => {

    const [showInfo, setShowInfo] = useState(false);

    const deleteUser = async () => {
        try {
            const { data } = await axios.delete(`http://localhost:3100/user/delete/${_id}`)
            Swal.fire({
                title: `${data.message}`,
                icon: "success",
            })
        } catch (err) {
            console.log(err)
            Swal.fire({
                title: `${err.response.data.message}`,
                icon: "warning",
            })
        }
    }

    const elimUser = async () => {
        try {
            Swal.fire({
                title: 'Estas seguro de eliminar al usuario?',
                text: "No se podra revertir!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteUser()
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


    const handleInfoClick = () => {
        setShowInfo(true);
    };

    const handleInfoClose = () => {
        setShowInfo(false);
    };


    return (
        <>
            <UpdateUser _id={_id} />
            <InfoMovements _id={_id} showInfo={showInfo} setShowInfo={setShowInfo} handleInfoClose={handleInfoClose} />
            {/* <InfoMovements _id={_id} /> */}

            <div className="card m-3 g-0" style={{ maxWidth: '20rem', maxHeight: '30rem' }}>
                <div className="card-body">
                    <h5 className='card-title'>{title} {surname}</h5>
                    <p className='card-text' style={{ color: '#8A8A9C' }}>{noAccount}</p>
                    <p className='card-text'>{DPI}</p>
                    <p className='card-text'>{email}</p>
                    <p className='card-text' style={{ color: '#BADD7C' }}>{money}</p>

                    {role !== 'ADMIN' && (
                        <p className='card-text' style={{ color: "#444CD2" }}>{movements}</p>
                    )}
                    <p className='card-text' style={{ color: role === 'CLIENT' ? 'Gray' : '#FFC300' }}>{role}</p>

                    <div className="d-flex justify-content-center">

                        {role !== 'ADMIN' && (
                            <>
                                <button className='btn btn-warning btn-common me-2' data-bs-toggle="modal" data-bs-target="#myUser">Editar</button>
                                <button className='btn btn-danger btn-common me-2' onClick={() => elimUser(_id)}>Eliminar</button>
                                <button className='btn btn-info btn-common' onClick={handleInfoClick}>Movimientos</button>
                            </>
                        )}

                        {/* <button className='btn btn-warning  btn-common me-2' data-bs-toggle="modal" data-bs-target="#myUser">Editar</button>
                        <button className='btn btn-danger  btn-common me-2' onClick={() => elimUser(_id)}>Eliminar</button>

                        <button className='btn btn-info btn-common' onClick={handleInfoClick}>Movimientos</button>
                        {/* <button className='btn btn-info  btn-common' data-bs-toggle="modal" data-bs-target="#myInfoMove">Movimientos</button> */}
                    </div>


                </div>
            </div>
        </>
    )
}
