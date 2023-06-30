import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CardUser } from '../../components/cards/CardUser'
import { AddUser } from '../../components/adds/AddUser'

export const UserPage = () => {
  const [user, setUser] = useState([{}])

  const getUser = async () => {
    try {
      const { data } = await axios.get('http://localhost:3100/user/get')
      if (data.users) {
        setUser(data.users)
        console.log(data.users)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => { getUser() }, [])

  return (
    <>
      <AddUser />
      <main>
        <div className="left binding color">
          Usuarios
        </div>
        <div className='row g-0 justify-content-center'>
          {
            user.map(({ _id, noAccount, DPI, name, surname, email, money }, i) => {
              return (
                <CardUser
                  key={i}
                  _id={_id}
                  title={name}
                  surname={surname}
                  DPI={DPI}
                  description={noAccount}
                  email={email}
                  money={money}
                ></CardUser>
              )
            })
          }
        </div>
        <button className='btn btn-success floating-button' data-bs-toggle="modal" data-bs-target="#myModal">Agregar</button>
      </main>
    </>
  )
}
