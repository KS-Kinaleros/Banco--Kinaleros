import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Index'
import { Outlet, Link } from 'react-router-dom'
import './DashboardStyle.css'


export const DashboardPage = () => {
  const { setLoggedIn, dataUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const logOut = () => {
    localStorage.clear()
    setLoggedIn(false)
    navigate('/')
  }

  return (
    <><div className='dashboard'>
      <div id='body'>
        <section id='sidebar'>
          <ul className='side-menu top'>

            <a className='d-flex text-decoration-none mt-1 aling-items-center text-white'>
              <span className='fs-4 d-none d-sm-inline'> KS Banks</span>
            </a>

            <li className='nav-item'>
              <Link to='products'>
                <i className='fs-5 fa fa-guage'></i><span className='fs-4 d-none d-sm-inline'>Productos</span>
              </Link>
            </li>

            <li className='nav-item'>
              <Link to='transfers'>

                <i className='fs-5 fa fa-guage'></i><span className='fs-4 d-none d-sm-inline'>Transferencias</span>

              </Link>
            </li>

            <li className='nav-item'>
              <Link to='deposits'>

                <i className='fs-5 fa fa-guage'></i><span className='fs-4 d-none d-sm-inline'>Depositos</span>

              </Link>
            </li>

            <li className='nav-item'>
              <Link to='users'>

                <i className='fs-5 fa fa-guage'></i><span className='fs-4 d-none d-sm-inline'>Usuarios</span>

              </Link>
            </li>

            {/* boton */}
            <button onClick={logOut} type="button" className="btn btn-danger btn-lg ">Cerrar sesión</button>
          </ul>
        </section>

        <section id='content'>
          <nav>
            <a></a>
          </nav>
          <Outlet></Outlet>
        </section>

      </div>
    </div>
    </>
  )
}
