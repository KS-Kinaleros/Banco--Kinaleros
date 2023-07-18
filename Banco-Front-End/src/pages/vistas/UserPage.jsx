import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CardUser } from '../../components/cards/CardUser'
import { AddUser } from '../../components/adds/AddUser'
import { AddAdmin } from '../../components/adds/AddAdmin'
import { UpwardMoves } from '../../components/Movements/UpwardMoves'
import { DescendingMoves } from '../../components/Movements/DescendingMoves'

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
      <AddAdmin />
      <UpwardMoves />
      <DescendingMoves />
      
      <main>
        <div className="left binding color" style={{ display: 'flex', alignItems: 'center' }}>
          Usuarios
          <button className='btn btn-primary align-text-bottom btn-ver' data-bs-toggle="modal" data-bs-target="#myMovesUpward" style={{ marginLeft: 'auto' }}> asc </button>
          <button className='btn btn-primary align-text-bottom btn-ver mx-2' data-bs-toggle="modal" data-bs-target="#myMovesDescending"> des </button>
          <button className='btn btn-success align-text-bottom btn-adm' data-bs-toggle="modal" data-bs-target="#mySaveAdmin">Agregar Admin</button>
        </div>


        <div className='row g-0 justify-content-center'>
          {
            user.map(({ _id, noAccount, DPI, name, surname, email, money, movements, role }, i) => {
              return (
                <CardUser
                  key={i}
                  _id={_id}
                  title={name}
                  surname={surname}
                  DPI={DPI}
                  noAccount={noAccount}
                  email={email}
                  money={money}
                  movements={movements}
                  role={role}
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
