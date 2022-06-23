import React from 'react'
import "../styles/Header.css"
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import {IsLoged} from '../App'

export default function Header({fn, clear, fnResetClear, logFn, toggleLogIn}) {
    const logedUser = React.useContext(IsLoged)
    const [inputVal, setInputVal] = React.useState("")
    const nav = useNavigate()
    let location = useLocation()
    function inputHandler(event) {
        if (event.key === "Enter") {
            fn(event.target.value)
            if (event.target.value !== "" && location.pathname !== "/catalogo") {
                nav("/catalogo")
            }
        }
    }
    React.useEffect(() => {
        if (clear) {
            setInputVal("")
            fn("")
        }
        fnResetClear()
    }, [clear, fnResetClear, fn])
    return (
        <header className='header'>
            <Link to="/"><img src="https://refrigeracionescobar.com.ar/wp-content/uploads/2017/12/Refrigeracion-escobar.png" alt="" className="logo" /></Link>
            <div className='header-nav'>
                <input onKeyDown={event => inputHandler(event)} onChange={event => setInputVal(event.target.value)} value={inputVal} placeholder='Buscar productos...' type="search" name="search" id="search-bar" />
                <nav className="pag-nav">
                    <NavLink className={({isActive}) => isActive ? "active" : ""} to="catalogo"><button className="nav-button">Catalogo</button></NavLink>
                    <NavLink className={({isActive}) => isActive ? "active" : ""} to="tocalogo"><button className="nav-button">Tocalogo</button></NavLink>
                    <NavLink className={({isActive}) => isActive ? "active" : ""} to="ogolatac"><button className="nav-button">Ogolatac</button></NavLink>
                    <NavLink className={({isActive}) => isActive ? "active" : ""} to="cutulugu"><button className="nav-button">Cutulugu</button></NavLink>
                </nav>
            </div>
            <div style={{display: "flex", alignItems: "center", margin: "0 -30px 0 25px"}}>
                <nav style={{marginRight: "35px"}} className='tw'>
                    <a className='link' target="blank" href="https://www.facebook.com/AngelDiMariaJM">F</a>
                    <a className='link' target="blank" href="https://twitter.com/aguerosergiokun?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">T</a>
                    <a className='link' target="blank" href="https://www.instagram.com/leomessi/?hl=en">I</a>
                </nav>
                {logedUser ? <NavLink className={({isActive}) => isActive ? "active" : ""} to="carro"><button className="cart-but">🛒</button></NavLink> : <button onClick={() => logFn()} className="log-but">Log In</button>}
                
            </div>        
        </header>
    )
}