import React from 'react'
import '../styles/Cart.css'

export default function Cart() {
    const [cartItems, setCartItems] = React.useState(() => localStorage.getItem("cartProds") ? JSON.parse(localStorage.getItem("cartProds")) : [])  
    const [count, setCount] = React.useState(0)

    function removeFromCart(id) {
        setCount(oldCount => oldCount + 1)
        setCartItems(oldItems => {
            for (let i = 0; i < oldItems.length; i++) {
                if (oldItems[i].identifier === id) {
                    oldItems.splice(i, 1)
                }
            }
            localStorage.setItem("cartProds", JSON.stringify(oldItems))
            return oldItems
        })
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

    const itemsArr = cartItems.map((item, index) => 
        <div key={index} className="prod-cont">
            <div className="padder">
                <img className="image" src={item.picture.large} alt="imagen" />
            </div>
            <div className='prod-info'>
                <p className="name">{item.name.first}</p>
                <p className="cellphone"><span className="icon">📞</span> {item.phone}</p>
                <p><span className="icon">🌎</span> {item.location.country}</p>
                <p><span className="icon">{getAgeEmoji(item.dob.age, item.gender)}</span>{`Edad ${item.dob.age}`}</p> 
                <br />
                <button onClick={() => removeFromCart(item.identifier)}  className="remove-but">Remove from cart</button>
            </div>
        </div>
    )
    return (
        <div className="cart-items">
            {itemsArr}
        </div>
    )
}