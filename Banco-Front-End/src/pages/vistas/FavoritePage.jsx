import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import axios from 'axios'
import { CardFavorites } from '../../components/cards/CardFavorites'

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
      <div className='row g-0 justify-content-center'>
        {
          favorites.map(({ _id, noAccount, DPI, nickname }, i) => {
            return (
              <CardFavorites
                key={i}
                _id={_id}
                title={noAccount}
                DPI={DPI}
                nickname={nickname}
              ></CardFavorites>
            )
          })
        }
      </div>

    </>
  )
}
