import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Index'

export const Navbar = () => {
    const navigate = useNavigate()

    const loginOut = () => {
        localStorage.clear()
        setLoggedIn(false)
        navigate('/')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    {/* <a className="navbar-brand" href="#">Navbar</a> */}
                    <a class="navbar-brand" href="#">
                        <img src="./img/KS.png" alt="" width="55" height="45" class="d-inline-block align-text-top"/>
                    </a>


                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Inicio</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Transferencias</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Favoritos</a>
                            </li>
{/*                             <li className="nav-item">
                                <a className="nav-link" href="#">Productos</a>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}
