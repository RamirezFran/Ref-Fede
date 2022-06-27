import React from 'react'
import '../styles/Cart.css'
import { Link } from 'react-router-dom'

export default function Cart() {
    const [cartItems, setCartItems] = React.useState(() => localStorage.getItem("cartProds") ? JSON.parse(localStorage.getItem("cartProds")) : [])  
    const [count, setCount] = React.useState(0)

    function removeFromCart(id, cant) {
        setCartItems(oldItems => {
            for (let i = 0; i < oldItems.length; i++) {
                if (oldItems[i].identifier === id) {
                    if (cant === 1) {
                        oldItems.splice(i, 1)
                    }else {
                        oldItems[i].cantidad--
                    }
                }
            }
            localStorage.setItem("cartProds", JSON.stringify(oldItems))
            return oldItems
        })
        setCount(oldCount => oldCount + 1)
    }

    function getAgeEmoji(age, gender) {
        if (age < 7) {
          return "👶"
        }else if (age < 30) {
          return gender === "male" ? "👦" : "👧"
        }else if (age < 65) {
          return gender === "male" ? "👨" : "👩"
        }else {
          return gender === "male" ? "👴" : "👵"
        }
    }

    function singleCartItems() {
        const newItems = []
        const oldItems = JSON.parse(JSON.stringify(cartItems))
        for (let i = 0; i < oldItems.length; i++) {
            console.log(oldItems)
            let count = 1
            for (let indx = i +1; indx < oldItems.length; indx++) {
                try {
                    if (oldItems[indx].phone === oldItems[i].phone) {
                        count++
                        oldItems.splice(indx, 1)
                        indx--
                    }
                } catch {
                    console.log('error en single cart items') 
                }
            }
            if (oldItems.length > i) {
                console.log("entro " + oldItems[i].name.first)
                console.log(oldItems)
                newItems.push({
                    ...oldItems[i],
                    cantidad: oldItems[i].cantidad ? oldItems[i].cantidad + (count > 1 ? count - 1 : 0) : count,
                })
            }
        }
        localStorage.setItem('cartProds', JSON.stringify(newItems))
        return newItems
    }

    React.useEffect(()=> {
        let bool = count === 0 ? false : true
        setCartItems(singleCartItems(bool))
    }, [count])

    const itemsArr = cartItems.map((item, index) => 
    {try {
        return (<div key={index} className="prod-cont">
            <div className="padder">
                <img className="image" src={item.picture.large} alt="imagen" />
            </div>
            <div className='prod-info'>
                <p className="name">{item.name.first}</p>
                <p className="cellphone"><span className="icon">📞</span> {item.phone}</p>
                <p><span className="icon">🌎</span> {item.location.country}</p>
                <p><span className="icon">{getAgeEmoji(item.dob.age, item.gender)}</span>{`Edad ${item.dob.age}`}</p> 
                <p>{item.cantidad}</p>
                <br />
                <button onClick={() => removeFromCart(item.identifier, item.cantidad)}  className="remove-but">Remove from cart</button>
            </div>
        </div>)
    }catch {
        console.log("catch del map")
    }}
    )
    return (
        <div className="cart-items">
            {itemsArr.length > 0 ? itemsArr : 
                <div className='empty-cart-wrapper'>
                    <p className='empty-cart-text'>No hay productos en el carro</p>
                    <Link to={"/catalogo"}><button className='empty-cart-but'>Ver Productos en el Catalogo</button></Link>
                </div> 
            }
        </div>
    )
}