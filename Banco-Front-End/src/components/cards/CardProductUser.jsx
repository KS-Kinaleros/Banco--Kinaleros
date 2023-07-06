import axios from 'axios'
import React from 'react'

export const CardProductUser = ({ _id, name, description, price }) => {

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const buyProduct = async (/* _id */) => {
        try {
            const { data } = await axios.post(`http://localhost:3100/buy/saveBuy/${_id}`, { headers: headers })
            alert(data.message)
        } catch (err) {
            console.log(err)
            alert(err?.response.data.message)
        }
    }


    return (
        <>
            <div className="card text-bg-secondary mb-3" style={{ maxWidth: '540px' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="img/Product.png" className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text" style={{ color: '#FB6540' }}>Precio: {price}</p>
                            <button onClick={() => buyProduct(_id)} type="button" className="btn btn-outline-info">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
