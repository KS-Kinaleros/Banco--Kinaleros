import React, { useState, createContext, useEffect } from 'react'
import App from './App'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import { NotFound } from './NotFound'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/dashboard/DashboardPAge'
import { DepositPage } from './pages/vistas/DepositPage'
import { TransferPage } from './pages/vistas/TransferPage'
import { ProductPage } from './pages/vistas/ProductPage'
import { UserPage } from './pages/vistas/UserPage'
import { PrinPage } from './pages/PrinPage'

export const AuthContext = createContext();

export const Index = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [dataUser, setDataUser] = useState({
    name: '',
    username: '',
    role: ''
  })

  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token) setLoggedIn(true)
  }, [])



  const routes = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <NotFound />,
      children: [
        {
          path: '/',
          element: <PrinPage/>
        },
        {
          path: '/home',
          element: <HomePage></HomePage>
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/transfer',
          element: <TransferPage />
        },
        /* Cuenta del usuario */
        {
          path: '/account',
        },

        //dashboard
        {
          path: '/dashboard',
          element: dataUser.role == "ADMIN" || dataUser.role == 'OWNER' ? <DashboardPage /> : <HomePage />,
          children: [
            {
              path: 'users',
              element: <UserPage />
            },
            {
              path: 'products',
              element: <ProductPage />
            },
            {
              path: 'deposits',
              element: <DepositPage />
            },
          ]
        },
      ],
    },
  ]);


  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, dataUser, setDataUser }}>
      <RouterProvider router={routes} />
    </AuthContext.Provider>
  )
}
