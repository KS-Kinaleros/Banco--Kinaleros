import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CardDeposit } from '../../components/cards/CardDeposit'
import { AddDeposit } from '../../components/adds/AddDeposit'
import './Boton.css'

export const DepositPage = () => {
    const [deposit, setDeposit] = useState([{}])

    const getDeposit = async () => {
        try {
            const { data } = await axios.get('http://localhost:3100/deposit/get')
            if (data.deposits) {
                setDeposit(data.deposits)
                console.log(data.deposits)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => { getDeposit() }, [])

    return (
        <>
            <main>
                <div className="left binding color">
                    Productos
                </div>
                <div className='row g-0 justify-content-center'>
                    {
                        deposit.map(({ _id, date, noAccount, nameAccount, amount}, i) => {
                            return (
                                <CardDeposit
                                    key={i}
                                    _id={_id}
                                    title={nameAccount}
                                    date={date}
                                    noAccount={noAccount}
                                    amount={amount}
                                ></CardDeposit>
                            )
                        })
                    }
                </div>
                <button className='btn btn-success floating-button' data-bs-toggle="modal" data-bs-target="#myModal">Agregar</button>
            </main>
        </>
    )
}
