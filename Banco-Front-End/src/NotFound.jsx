import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <>
      <section className='page_404'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='col-sm-10 col-sm-offset-1 text-center'>
                <div className='four_zero_four_bg'>
                  <h1 className='text-center' style={{ fontSize: "70px" }}>404</h1>
                  {/* aqui va el gif */}
                  <img src="./img/404.gif" alt="GIF de error 404" />

                </div>
                <div className='content_box_404'>
                  <h3 className='h2' style={{ fontSize: "40px" }}> looks like you're lost</h3>
                  <p style={{ fontSize: "20px" }}>the page you are looking for not available</p>
                  <Link to='/home'>
                    <button className='btn btn-success'>Volver al inicio</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
