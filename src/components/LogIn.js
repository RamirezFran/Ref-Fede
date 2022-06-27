import "../styles/LogIn.css"
import React from 'react'

export default function LogIn({logFn, toggleLogIn}) {
    const [newUser, setNewUser] = React.useState(true)
    const [formState, setFormState] = React.useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
        terms: false,
    })
    const [showPass, setShowPass] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState("")
    const [users, setUsers] = React.useState(() => localStorage.getItem("usersArr") ? JSON.parse(localStorage.getItem("usersArr")) : [])
    
    React.useEffect(() => {
        localStorage.setItem("usersArr", JSON.stringify(users))
    }, [users])

    function handleRegister(e) {
        e.preventDefault()
        const valid = validateForm()
        console.log("is valid " + valid)
        if (valid) {
            console.log(formState)
            users.push({name: formState.name, email: formState.email, password: formState.password,})
            localStorage.setItem("usersArr", JSON.stringify(users))
            setUsers(localStorage.getItem("usersArr") ? JSON.parse(localStorage.getItem("usersArr")) : [])
            console.log(users)
            logFn()
            toggleLogIn()
        }
    }
    function handleLogIn(e) {
        e.preventDefault()
        const valid = checkUserData()
        if (valid) {
            logFn()
            toggleLogIn()
        }
    }
    function checkUserData() {
        for (let user of users) {
            if (user.email === formState.email && user.password === formState.password) {
                setErrorMsg("")
                console.log("bienvenido " + user.name)
                return true
            }
        }
        setErrorMsg("Error. Los datos no coinciden")
        return false
    }

    function validateForm() {
        for (let elem in formState) {
            if (!formState[elem]) {
                setErrorMsg("Error. Rellene todos los campos nescesarios")
                return false
            }
        }
        for (let user of users) {
            if (user.email === formState.email) {
                setErrorMsg("Error. Este email ya esta registrado")
                return false
            }
        }
        if (formState.password !== formState.confirm) {
            setErrorMsg("Error. Las contraceñas no coinciden")
            return false
        }
        setErrorMsg("")
        return true
    }

    return (
        <div className="login-wrapper">
            {newUser ? 
            <form onSubmit={(e) => handleRegister(e)} className="login-form" action="">
                <button onClick={() => logFn()} className="close-form-but" type="button">X</button>
                <label htmlFor="name">Nombre</label>
                <input require="true" autoComplete="off" onChange={(e) => setFormState(oldForm => ({...oldForm, name: e.target.value}))} className="form-text-input" type="text" name="name" id="name" value={formState.name} placeholder="Nombre" />
                <label htmlFor="email">Email</label>
                <input require="true" autoComplete="off" onChange={(e) => setFormState(oldForm => ({...oldForm, email: e.target.value}))} className="form-text-input" type="text" name="email" id="email" value={formState.email} placeholder="Email" />
                <label htmlFor="password">Contraceña</label>
                <input require="true" autoComplete="off" onChange={(e) => setFormState(oldForm => ({...oldForm, password: e.target.value}))} className="form-text-input" type={showPass ? "text" : "password"} name="password" id="password" value={formState.password} placeholder="Contraceña" />
                <label htmlFor="confirm">Confirmar Contraceña</label>
                <input require="true" autoComplete="off" onChange={(e) => setFormState(oldForm => ({...oldForm, confirm: e.target.value}))} className="form-text-input" type={showPass ? "text" : "password"} name="confirm" id="confirm" value={formState.confirm} placeholder="Confirmar Contraceña" />
                <div className="check-wrapper">
                    <label htmlFor="terms">¿Acepta los <a href="https://www.youtube.com/watch?v=VT5S9Y49SYs">Terminos y Condiciones</a> de servicio?</label> 
                    <input className="form-check-input" onChange={() => setFormState(oldForm => ({...oldForm, terms: !oldForm.terms}))} type="checkbox" name="terms" id="terms" checked={formState.terms} />
                </div>
                <div className="check-wrapper">
                    <label htmlFor="showPass">Mostrar contraceña</label>
                    <input className="form-check-input" type="checkbox" name="showPass" id="showPass" onChange={() => setShowPass(!showPass)} value={showPass} />
                </div>
                {errorMsg && <p className="error-msg">{errorMsg}</p>}
                <button className="form-subm">REGISTRARSE</button>
                <p className="toggle-newUser" onClick={() => setNewUser(false)}>Ya tienes una cuenta?</p>
            </form>
            :
            <form onSubmit={(e) => handleLogIn(e)} className="login-form" action="">
                <button onClick={() => logFn()} className="close-form-but" type="button">X</button>
                <label htmlFor="email">Email</label>
                <input onChange={(e) => setFormState(oldForm => ({...oldForm, email: e.target.value}))} className="form-text-input" type="text" name="email" id="email" value={formState.email} placeholder="Email" />
                <label htmlFor="password">Contraceña</label>
                <input onChange={(e) => setFormState(oldForm => ({...oldForm, password: e.target.value}))} className="form-text-input" type={showPass ? "text" : "password"} name="password" id="password" value={formState.password} placeholder="Contraceña" />
                <div className="check-wrapper">
                    <label htmlFor="showPass">Mostrar contraceña</label>
                    <input className="form-check-input" type="checkbox" name="showPass" id="showPass" onChange={() => setShowPass(!showPass)} value={showPass} />
                </div>
                {errorMsg && <p className="error-msg">{errorMsg}</p>}
                <button className="form-subm">INGRESAR</button>
                <p className="toggle-newUser" onClick={() => setNewUser(true)}>Registrarse?</p>
            </form>
            }
        </div>
    )
}