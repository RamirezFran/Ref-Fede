import React from 'react'
import '../styles/Account.css'

export default function Account({isLoged, openLogForm, disc}) {
    const activeUser = localStorage.getItem("activeUser") ? JSON.parse(localStorage.getItem("activeUser")) : ""
    return (
        <div className="account-page">
            {isLoged ? 
                <div className='acc-info-wrapp'>
                    <p className='account-info'>Nombre: <span className='acc-name acc-sep'>{activeUser.name}</span></p>
                    <p className='account-info'>Email: <span className='acc-sep'>{activeUser.email}</span></p>
                    <p className='account-info'>Productos en el Carro: <span className='acc-sep'></span>{localStorage.getItem("cartProds") ? JSON.parse(localStorage.getItem("cartProds")).length : "0"}</p>
                    <button className='acc-disc-but' onClick={() => disc()}>Desconectarse</button>
                </div>
            : 
                <div>
                    <button className="acc-page-log" onClick={() => openLogForm()} >Ingresar</button>
                </div>
            }
        </div>
    )
}