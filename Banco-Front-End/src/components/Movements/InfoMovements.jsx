import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const InfoMovements = ({ _id, showInfo, setShowInfo, handleInfoClose }) => {
    const title = 'Ultimos Movimientos'
    const [movements, setMovements] = useState([{}])

    const getLast = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3100/user/getLastMoves/${_id}`)
            if (data.latestData) {
                console.log(data.latestData)
                setMovements(data.latestData)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getMovementType = (movement) => {
        if (movement.amount) {
            return 'Transferencia';
        } else if (movement.product) {
            return 'Compra';
        } else if (movement.amounts) {
            return 'Depósito';
        }
        return 'Desconocido';
    };

    useEffect(() => {
        if (_id) {
            getLast();
        }
    }, [_id]);

    /* useEffect(() => { getLast() }, []) */

    return (
        <>
            <div className="modal" tabIndex="-1" id="myInfoMove" style={{ display: showInfo ? 'block' : 'none' }}>
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className='modal-header' style={{ backgroundColor: '#BADD7C', color: '#fff' }}>
                            <h1 className="modal-title">{title}</h1>
                        </div>

                        <div className="modal-body">
                            <div className="container-fluid">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Fecha</th>
                                            <th scope="col">Tipo de Movimiento</th>
                                            <th scope="col">Usuario</th>
                                            <th scope="col">No. Cuenta/Producto</th>
                                            <th scope="col">Receptor/Total</th>
                                            <th scope="col">Monto</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {movements.map((movement, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{movement.date1}</td>
                                                <td>{getMovementType(movement)}</td>
                                                <td>{movement.sender?.name || movement.user?.name}</td>
                                                <td>{movement.noAccount || movement.product?.name}</td>
                                                <td>{movement.receiver?.name || movement.total}</td>
                                                <td>{movement.amount || movement.amounts}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary btn-common" onClick={handleInfoClose}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
