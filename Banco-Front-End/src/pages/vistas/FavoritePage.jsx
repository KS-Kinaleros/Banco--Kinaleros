import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import axios from 'axios'
import { CardFavorites } from '../../components/cards/CardFavorites'
import { AddFavorite } from '../../components/adds/AddFavorite'

export const FavoritePage = () => {
  const [favorites, setFavorites] = useState([{}])

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getFavorites = async () => {
    try {
      const { data } = await axios.get('http://localhost:3100/favorite/get', { headers: headers })
      if (data.favorites) {
        setFavorites(data.favorites)
        console.log(data.favorites)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => { getFavorites() }, [])

  return (
    <>
      <Navbar />
      <AddFavorite />
      <main>
        <div className="left binding color" style={{ color: '#fff' }}>
          Favoritos
        </div>




        {favorites.length === 0 ? (
          <div className="row g-0 justify-content-center">
            <div className="col-12 text-center mt-5">
              <h1>Agregamos a nuevos amigos</h1>
            </div>
          </div>
        ) : (
          <div className="row g-0 justify-content-center">
            {favorites.map(({ _id, noAccount, DPI, nickname }, i) => (
              <CardFavorites
                key={_id}
                _id={_id}
                title={noAccount}
                DPI={DPI}
                nickname={nickname}
              />
            ))}
          </div>
        )}

        <button className='btn btn-info floating-button' data-bs-toggle="modal" data-bs-target="#myModal">Agregar Favorito</button>
      </main>


    </>
  )
}
