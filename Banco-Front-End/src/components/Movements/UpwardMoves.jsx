import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const UpwardMoves = () => {
    const title = 'Movimientos De Usuarios Ascendentes'
    const [usersUpw, setUsersUpw] = useState([{}])

    const getUsersUpw = async () => {
        try {
            const { data } = await axios.get('http://localhost:3100/user/getUpward')
            if (data.usersUpw) {
                console.log(data.usersUpw)
                setUsersUpw(data.usersUpw)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => { getUsersUpw() }, [])

    return (
        <>
            <div className="modal" tabIndex="-1" id="myMovesUpward">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        {/* titulo */}
                        <div className='modal-header' style={{ backgroundColor: '#BADD7C', color: '#fff' }}>
                            <h1 className="modal-title">{title}</h1>
                        </div>

                        <div className="modal-body">
                            <div className="container-fluid">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">No.Cuenta</th>
                                            <th scope="col">Usuario</th>
                                            <th scope="col">No de movimientos</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* aqui van los datos */}
                                        {
                                            usersUpw.map(({ _id, noAccount, name, movements }, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <th scope="row">{i + 1}</th>
                                                        <td>{noAccount}</td>
                                                        <td>{name}</td>
                                                        <td>{movements}</td>
                                                    </tr>
                                                )

                                            })
                                        }
                                    </tbody>
                                </table>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
