import React from "react";
import "../../styles/Products.css";
import { Link } from 'react-router-dom'

export default function Products() {
  const prodArr = [
    {
      prodImg:
        "https://refrigeracionescobar.com.ar/wp-content/uploads/2018/08/IMG_2212.jpg",
      prodTitle: "Repuestos",
      link: "/catalogo",
    },
    {
      prodImg:
        "https://refrigeracionescobar.com.ar/wp-content/uploads/2018/08/IMG_1083-11.jpg",
      prodTitle: "Instrumentos y Herramientas",
      link: "/catalogo",
    },
    {
      prodImg:
        "https://refrigeracionescobar.com.ar/wp-content/uploads/2017/12/pisotecho.png",
      prodTitle: "Aires Acondicionados",
      link: "/catalogo",
    },
  ];
  const showProd = prodArr.map((prod, index) => (
    <Product img={prod.prodImg} title={prod.prodTitle} link={prod.link} key={index} />
  ));
  return <div className="prod-container">{showProd}</div>;
}

function Product({ img, title, link }) {
  const style = {
    backgroundImage: `url("${img}")`,
  };
  return (
      <div className="prod-wraper" style={style}>
        <Link to={link}>
          <div className="prod">
            <h2>{title}</h2>
          </div>
        </Link>
      </div>
  );
}
