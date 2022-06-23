import React from "react";
import Slider from "../components/MainPage/Slider";
import Products from "../components/MainPage/Products";

export default function Main() {
  return (
    <article className="content">
      <Slider />
      <Products />
    </article>
  );
}
