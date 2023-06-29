import React, { useState } from 'react'
import { Navbar } from '../../components/Navbar'
import axios from 'axios'

export const TransferPage = () => {

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const [form, setForm] = useState({
    noAccount: '',
    DPI: '',
    amount: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }


  const transfersave = async (e) => {
    try {
      e.preventDefault()
      const { data } = await axios.post('http://localhost:3100/transfer/save', form, { headers: headers })
      alert(data.message)
    } catch (err) {
      console.log(err)
      alert(err.response?.data.message)
    }
  }


  return (
    <>
      <Navbar />
      <div>TransferPage</div>

      <div className="container py-5 h-100">
        <form>

          <div className="form-outline mb-4">
            <label className="form-label">Numero De Cuenta</label>
            <input onChange={handleChange} name='noAccount' type="number" className="form-control form-control-lg" />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label">DPI</label>
            <input onChange={handleChange} name='DPI' type="number" className="form-control form-control-lg" />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label">Monto</label>
            <input onChange={handleChange} name='amount' type="number" className="form-control form-control-lg" />
          </div>

          <button onClick={(e) => transfersave(e)} type="submit" className="btn btn-primary">Enviar</button>

        </form>
      </div>
    </>
  )
}
