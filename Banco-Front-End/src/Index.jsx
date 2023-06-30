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
import { FavoritePage } from './pages/vistas/FavoritePage'
import { AccountPage } from './pages/User/AccountPAge'
import { InfoTransfersPage } from './pages/User/InfoTransfersPage'
import { InfoDepositPage } from './pages/User/InfoDepositPage'
import { InfoSellPage } from './pages/User/InfoSellPage'
import { ProductUser } from './pages/User/ProductUser'

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
          element: <PrinPage />
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
        {
          path: '/favorites',
          element: <FavoritePage />
        },
        {
          path: '/productos',
          element: <ProductUser />
        },
        /* Cuenta del usuario */
        {
          path: '/account',
          element: <AccountPage />,
          children: [
            {
              path: 'transfers',
              element: <InfoTransfersPage />
            },
            {
              path: 'depositos',
              element: <InfoDepositPage />
            },
            {
              path: 'sells',
              element: <InfoSellPage />
            }
          ]
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
