import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../Index';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const { loggedIn, setLoggedIn, setDataUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        password: '',
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const logIn = async (e) => {
        try {
            e.preventDefault()
            const { data } = await axios.post('http://localhost:3100/user/login', form)
            console.log(data.user)
            if (data.message) {
                alert(data.message)
                localStorage.setItem('token', data.token)
                setDataUser(data.userLogged)
                setLoggedIn(true)
                navigate('/dashboard')
            }
        } catch (err) {
            console.error(err)
            alert(err.response?.data.message)
        }
    }

    return (
        <>
            <section className="vh-100" style={{ backgroundColor: "#ad8762" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img src='/img/login2.png' alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem", objectFit: 'cover', width: '100%', height: '100%' }} />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <form>
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i>
                                                    <span className="h1 fw-bold mb-0">KS Bank</span>
                                                </div>
                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Inicia sesión con su cuenta</h5>
                                                <div className="form-outline mb-4">
                                                    <input onChange={handleChange} name='username' type="email" className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="">Username</label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input onChange={handleChange} name='password' type="password" className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="form2Example27">Password</label>
                                                </div>
                                                <div className="pt-1 mb-4">
                                                    <button onClick={(e) => logIn(e)} className="btn btn-dark btn-lg btn-block" type="button">Login</button>
                                                </div>
                                                <a className="small text-muted" href="#!">Forgot password?</a>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}