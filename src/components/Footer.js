import React from 'react'
import '../styles/Footer.css'

export default function Footer() {
    const branchesData = [{
        name: "SUCURSAL SAN MIGUEL",
        address: "Av. Pte. Perón 2921, CP 1663, San Miguel",
        phone: "4451-5740",
        whatsApp: "11 5302-1339",
        email: "sanmiguel@escobarsrl.com.ar",
    }, 
    {
        name: "INTERIOR DEL PAIS, GBA",
        address: "",
        phone: "011 4451-5740",
        whatsApp: "11-6036-1105",
        email: "expediciones@escobarsrl.com.ar",
    }, 
    {
        name: "EMPRESAS",
        address: "",
        phone: "011-4451-5740",
        whatsApp: "11-5713-3552",
        email: "axt.raul@escobarsrl.com.ar",
    }, 
    {
        name: "SUCURSAL ESCOBAR",
        address: "H. Irigoyen 324, CP 1625, Escobar",
        phone: "0348-4421012",
        whatsApp: "11-5302-1343",
        email: "escobar@escobarsrl.com.ar",
    }]
    const branchesArr = branchesData.map((branch, index) => <div key={index} className='branch'>
        <h4>{branch.name}</h4>
        <p>{branch.address && "Dirección: " + branch.address}</p>
        <p>Teléfono: {branch.phone}</p>
        <p>WhatsApp: {branch.whatsApp}</p>
        <p>Email: {branch.email}</p>
    </div>)
    return (
        <footer  className='footer'>
            <div className="branches">
               {branchesArr}
            </div>
            <p className='tradeMark'>© 2022 Refrigeracion Escobar. Marca registrada</p>
        </footer>
    )
}