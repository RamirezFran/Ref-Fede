import React from "react";
import '../../styles/Controles.css'

export default function Controles({ fn, countries }) {
  const [filter, setFilter] = React.useState({
    gender: "",
    serBy: "name",
    country: "",
    minAge: 0,
    maxAge: 120,
  });
  React.useEffect(() => {
    fn(filter);
  }, [filter, fn]);
  const countriesOptions = countries.sort().map((country, index) => <option className="count-opt" key={index} value={country}>{country}</option>)
  return (
    <div className="controls-bar">
      <p className="categ-title">Categorias</p>
      <ul className="categ-list">
        <li
          onClick={() =>
            setFilter((oldFilter) => ({
              ...oldFilter,
              gender:
                oldFilter.gender === ""
                  ? "male"
                  : oldFilter.gender === "male"
                  ? "female"
                  : "",
            }))
          }
          className="categ-list-item"
        >
        Genero <span className="icon">{filter.gender !== "" ? filter.gender === "male" ? "🤠" : "🤢" : ""}</span>
        </li>
        <li
          onClick={() =>
            setFilter((oldFilter) => ({ ...oldFilter, serBy: "name" }))
          }
          className="categ-list-item"
        >
          Nombre {filter.serBy === "name" && <span className="icon"> ✔️</span>}
        </li>
        <li
          onClick={() =>
            setFilter((oldFilter) => ({ ...oldFilter, serBy: "country" }))
          }
          className="categ-list-item"
        >
          Pais {filter.serBy === "country" && <span className="icon"> ✔️</span>}
        </li>
        <li className="categ-list-item">
          <select onChange={(e) => setFilter(oldFilter => ({...oldFilter, country: e.target.value}))} value={filter.country} name="" id="">
            <option value="" >Cualquiera</option>
            {countriesOptions}
          </select>
        </li>
        <li className="categ-list-item slider-wrapper">
          <label htmlFor="min-range">Edad Minima | {filter.minAge}</label>
          <input className="slider" onChange={e => setFilter(oldFilter => ({...oldFilter, minAge: e.target.valueAsNumber > oldFilter.maxAge ? oldFilter.maxAge : e.target.valueAsNumber}))} value={filter.minAge} min={0} max={120} type="range" id="min-range" />
          <label htmlFor="max-range">Edad Maxima | {filter.maxAge}</label>
          <input className="slider" onChange={e => setFilter(oldFilter => ({...oldFilter, maxAge: e.target.valueAsNumber < oldFilter.minAge ? oldFilter.minAge : e.target.valueAsNumber}))} value={filter.maxAge} min={0} max={120}type="range" id="max-range" />
        </li>
      </ul>
    </div>
  );
}
