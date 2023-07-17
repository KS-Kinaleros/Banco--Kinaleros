import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import axios from 'axios'
import { Outlet, Link } from 'react-router-dom'
import { UpdateAccount } from '../../components/ups/UpdateAccount'

export const AccountPage = () => {
    const [user, setUser] = useState([{}])

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const getUser = async () => {
        try {
            const { data } = await axios.get('http://localhost:3100/user/getToken', { headers: headers })
            if (data.user) {
                setUser(data.user)
                console.log(data.user)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => { getUser() }, [])

    return (
        <>
            <Navbar />
            <UpdateAccount/>


            <section className="vh-200" style={{ backgroundColor: '#eee' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-12 col-xl-4">
                            <div className="card " style={{ borderRadius: '15px', width: '500px' }}>
                                <div className="card-body text-center">
                                    <div className="mt-3 mb-4">
                                        <img src="img/avatar.png" className="rounded-circle img-fluid" style={{ width: '100px' }} alt="Profile" />
                                    </div>

                                    {/* nombres */}
                                    <h4 className="mb-2">Nombre: {user.name}</h4>
                                    <h4 className="mb-2">Usuario: {user.username}</h4>
                                    <h4 className="mb-2">Coreo: {user.email}</h4>
                                    <h4 className="mb-2">Teléfono :{user.phone}</h4>
                                    <button className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#myUpdateUser">Editar</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                {/* ver transfer, depositos y productos */}
                <div className="card text-center">
                    <div className="card-header">
                        <ul className="nav nav-pills card-header-pills">
                            <li className="nav-item">
                                {/* <a className="nav-link " href="#">Transferencias</a> */}
                                <Link className='nav-link' to={'transfers'}>Transferencias</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link' to={'depositos'}>Depositos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link' to={'sells'}>Compras</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body">
                        {/* <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a> */}
                        <Outlet />
                    </div>
                </div>


            </section>

        </>
    )
}

