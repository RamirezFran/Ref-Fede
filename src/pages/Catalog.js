import "../styles/Catalog.css";
import React from "react";
import Controles from '../components/Catalogo/Controles'

export default function Catalog({ data, search, clFn }) {
  const [categ, setCateg] = React.useState({
      gender: "",
      serBy: "name",
      country: "",
      minAge: 0,
      maxAge: 120,
  })
  const [pageNumber, setPageNumber] = React.useState(1)
  const [countryArr, setCountryArr] = React.useState([])

  function getCateg(cat) {
    setCateg(cat)
    setPageNumber(oldVal => {
      if (oldVal !== 1 && oldVal > Math.ceil(itemArr.length / 9)) {
        return Math.ceil(itemArr.length / 9) === 0 ? 1 : Math.ceil(itemArr.length / 9)
      }else {
        return oldVal
      }
    })
  }

// Clears search bar on exit catalog
  React.useEffect(() => {
    return clFn
  }, [clFn])

  React.useEffect(() => {
    setCountryArr([])
    for (let val of data) {
      getCountryArr(val.location.country)
    } 
  }, [data])

  function getCountryArr(country) {
    setCountryArr(oldArr => {
      if (oldArr.length === 0) {
        oldArr.push(country)
        return oldArr
      }else {
        for (let i = 0; i < oldArr.length; i++) {
          if (oldArr[i] === country) {
             return oldArr
          }
          if (i === oldArr.length - 1 && oldArr[i] !== country) {
            oldArr.push(country)
            return oldArr
          }
        }
      }
    })
  }
  
  const itemArr = data.filter(val => {
    if (categ.maxAge >= val.dob.age && categ.minAge <= val.dob.age) {
      if (search === "") {
        if (categ.gender === "" ) {
          if (categ.country === "" || categ.country === val.location.country) {
            return val
          }
        }else if (val.gender === categ.gender) {
          if (categ.country === "" || categ.country === val.location.country) {
            return val
          }
        }
      }else if (categ.gender !== "") {
        if ((categ.serBy === "name" ? val.name.first.toLowerCase().includes(search.toLowerCase()) : val.location.country.toLowerCase().includes(search.toLowerCase())) && val.gender === categ.gender) {
          if (categ.country === "" || categ.country === val.location.country) {
            return val
          }
        }
      }else if (categ.serBy === "name" ? val.name.first.toLowerCase().includes(search.toLowerCase()) : val.location.country.toLowerCase().includes(search.toLowerCase()) ) {
        if (categ.country === "" || categ.country === val.location.country) {
          return val
        }
      }
    }
  }).map((item, index) => (
    <CatalogItem
      item={item}     
      image={item.picture.large}
      name={item.name.first}
      phone={item.phone}
      country={item.location.country}
      age={item.dob.age}
      gender={item.gender}
      identifier={index}
      key={index}
    />
  ));

  function pageSelectBar() {
    const pageSelect = [] 
    for (let i = 1; i < (Math.ceil(itemArr.length / 9) -1 ); i++) {
      pageSelect.push(<button className={itemArr.length !== 0 && pageNumber === i+1 ? "active-page-sel" : "page-sel" }  key={i} onClick={() => setPageNumber(i +1)}>{i +1}</button>)
    }
    return pageSelect.slice((pageNumber -1) -3 < 0 ? 0 : (pageNumber -1) -3, (pageNumber -1) + 2 > itemArr.length -1 ? itemArr.length -1 : (pageNumber -1) + 2)
  }
  return (
    <article className="catalog-layout">
      <Controles countries={countryArr} fn={getCateg}/>
      <div className="cat-wrapp">
        <div className="page-select">
          {itemArr && <button className={itemArr.length !== 0 && pageNumber === 1 ? "active-page-sel" : "page-sel" } onClick={() => setPageNumber(1)}>{itemArr.length && 1}</button>}
          <hr className="hr"/>
          {pageSelectBar()}
          <hr className="hr"/>
          {itemArr && <button className={itemArr.length !== 0 && pageNumber === Math.ceil(itemArr.length / 9) ? "active-page-sel" : "page-sel" } onClick={() => setPageNumber(Math.ceil(itemArr.length / 9) === 0 ? 1 : Math.ceil(itemArr.length / 9))}>{Math.ceil(itemArr.length / 9)}</button>}
        </div>
        <div className="catalogo">
          {itemArr.slice(pageNumber * 9 - 9, pageNumber * 9).length !== 0 ? itemArr.slice(pageNumber * 9 - 9, pageNumber * 9) : <p>No se encontraron Coincidencias</p>}
        </div>
        <div className="page-select">
          {itemArr && <button className={itemArr.length !== 0 && pageNumber === 1 ? "active-page-sel" : "page-sel" } onClick={() => setPageNumber(1)}>{itemArr.length && 1}</button>}
          <hr className="hr"/>
          {pageSelectBar()}
          <hr className="hr"/>
          {itemArr && <button className={itemArr.length !== 0 && pageNumber === Math.ceil(itemArr.length / 9) ? "active-page-sel" : "page-sel" } onClick={() => setPageNumber(Math.ceil(itemArr.length / 9) === 0 ? 1 : Math.ceil(itemArr.length / 9))}>{Math.ceil(itemArr.length / 9)}</button>}
        </div>
      </div>
    </article>
  );
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

function CatalogItem({ image, name, phone, country, age, gender, item, identifier }) {

  function addToCart(item) {
    const identItem = {...item, identifier: identifier}
    const oldArr = localStorage.getItem("cartProds") ? JSON.parse(localStorage.getItem("cartProds")) : []
    oldArr.push(identItem)
    localStorage.setItem("cartProds", JSON.stringify(oldArr))
  }

  return (
    <div className="prod-cont">
      <div onClick={() => addToCart(item)} className="padder">
        <img className="image" src={image} alt="imagen" />
      </div>
      <p className="name">{name}</p>
      <p className="cellphone"><span className="icon">📞</span> {phone}</p>
      <p><span className="icon">🌎</span> {country}</p>
      <p><span className="icon">{getAgeEmoji(age, gender)}</span>{`Edad ${age}`}</p>
    </div>
  )
}
