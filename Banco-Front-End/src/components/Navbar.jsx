import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Index'

export const Navbar = () => {
    const { loggedIn, setLoggedIn } = useContext(AuthContext)
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
                    <Link to='/home' className="navbar-brand" href="#">
                        <img src="./img/KS.png" alt="" width="55" height="45" className="d-inline-block align-text-top" />
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to='/home' className="nav-link active" aria-current="page" href="#">Inicio</Link>
                            </li>

                            <li className="nav-item">
                                <Link to='/transfer' className="nav-link active" aria-current="page">Transferencia</Link>
                            </li>

                            <li className="nav-item">
                                <Link to='/favorites' className="nav-link active" aria-current="page" href="#">Favoritos</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/productos' className="nav-link active" aria-current="page" href="#">Productos</Link>
                            </li>

                            {/* ver su cuenta */}

                            <div /* className="d-flex align-items-center" */ className="d-flex aling-items-end">
                                {loggedIn ? (
                                    <>
                                        <Link to='/account'>
                                            <button className="btn btn-outline-secondary mx-2">
                                                Su cueta
                                            </button>
                                        </Link>
                                        <button type="button" className="btn btn-primary me-3" onClick={loginOut}>
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login">
                                            <button type="button" className="btn btn-primary px-3 me-2">
                                                Login
                                            </button>
                                        </Link>
                                    </>
                                )}
                            </div>

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
