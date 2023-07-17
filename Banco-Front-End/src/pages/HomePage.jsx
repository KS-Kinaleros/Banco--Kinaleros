import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import axios from 'axios'
import { TransferPage } from './vistas/TransferPage'

export const HomePage = () => {
  const [saludo, setSaludo] = useState('')
  const [user, setUser] = useState([{}])
  const [divisas, setDivisas] = useState({})

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }


  const obtenerSaludo = () => {
    try {
      const date = new Date()
      const hour = date.getHours();
      let saludo;

      if (hour < 12) {
        saludo = 'Buenos días';
      } else if (hour < 18) {
        saludo = 'Buenas tardes';
      } else {
        saludo = 'Buenas noches';
      }
      setSaludo(saludo)
    } catch (err) {
      console.log(err)
    }
  }

  const getUser = async () => {
    try {
      const { data } = await axios.get('http://localhost:3100/user/getToken', { headers: headers })
      if (data.user) {
        setUser(data.user)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getApi = async () => {
    try {
      const { data } = await axios.get('https://api.fastforex.io/fetch-multi?from=GTQ&to=USD,EUR,JPY&api_key=44fb526733-ae9806d28d-rxxfjj')
      setDivisas(data.results)
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => { obtenerSaludo(), getUser(), getApi() }, [])

  return (
    <>
      <Navbar />
      <TransferPage />

      <div className='container mt-4'> <h1>{saludo} {user.name} {user.surname}, ¿Como podemos ayudarte?</h1></div>


      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6'>
            <div className="card" style={{ height: '26.5rem' }}>
              <div className="card-body">
                <h5 className="card-title">No.{user.noAccount}</h5>
                <h5> {user.name} {user.surname} </h5>
                <h5 style={{ color: 'gray' }}> Cuenta de ahorro </h5>
                <h5> Saldo disponible:</h5>
                <h3 style={{ color: '#BADD7C' }}>Q.{user.money}</h3>
                {divisas && (
                  <div>
                    <h5>Saldo disponible en Dolares:</h5>
                    <h3 style={{ color: '#BADD7C' }}>$.{(user.money * divisas.USD).toFixed(2)}</h3>
                    <h5>Saldo disponible en Euros:</h5>
                    <h3 style={{ color: '#BADD7C' }}>£.{(user.money * divisas.EUR).toFixed(2)}</h3>
                    <h5>Saldo disponible en Yenes:</h5>
                    <h3 style={{ color: '#BADD7C' }}>¥.{(user.money * divisas.JPY).toFixed(2)}</h3>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='col-md-6'>
            <div className="card text-center mb-3 " style={{ height: '10rem' }}>
              <div className="card-body">
                <h5 className="card-title">Transferencia Rapida</h5>
                <p className="card-text">Realice una transferencia rápida a otro usuario en solo unos segundos.</p>
                <button className='btn btn-primary col-4' data-bs-toggle="modal" data-bs-target="#myTransferUser">Transferir</button>
              </div>
            </div>


            <div className="card text-center mb-3 mt-4" style={{ height: '15rem' }}>
              <div className="card-body">
                <h5 className="card-title">Divisas</h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Moneda</th>
                      <th>Valor</th>
                      {/* Otros encabezados de columna */}
                    </tr>
                  </thead>
                  <tbody>
                    {divisas && (
                      Object.entries(divisas).map(([currency, value], i) => (
                        <tr key={i}>
                          <td>{currency}</td>
                          <td>{value}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

