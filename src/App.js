import React from "react";
import Header from "./components/Header";
import Main from "./pages/Main";
import Footer from "./components/Footer";
import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Catalog from "./pages/Catalog";
import LogIn from "./components/LogIn"
import ScrollReset from './components/ScrollReset'
import Cart from './pages/Cart'

export const IsLoged = React.createContext(false)

export default function App() {
  const [catalogData, setCatalogData] = React.useState();
  const [searchData, setSearchData] = React.useState("")
  const [clear, setClear] = React.useState(false)
  const [formOpen, setFormOpen] = React.useState(false)
  const [logedUser, setLogedUser] = React.useState(false)

  React.useEffect(() => {
    async function getData() {
      const res = await fetch("https://randomuser.me/api/?results=200");
      const data = await res.json();
      setCatalogData(data);
    }
    getData();
  }, []);
  function toggleForm() {
    setFormOpen(!formOpen)
  }
  function toggleLogIn() {
    setLogedUser(!logedUser)
    console.log("toggled loged in " + logedUser)
  }
  function transfer(data) {
    setSearchData(data)
  }
  function clearSearch() {
    setClear(true)
  }
  function resetClear() {
    setClear(false)
  }
  return (
    <main className="main">
      <IsLoged.Provider value={logedUser}>
        <BrowserRouter>
          <ScrollReset>
            {formOpen && <LogIn toggleLogIn={toggleLogIn} logFn={toggleForm}/>}
            <Header fn={transfer} fnResetClear={resetClear} toggleLogIn={toggleLogIn} clear={clear} logFn={toggleForm} />
            <Routes>
              <Route path="/" element={<Main  />} />
              <Route
                path="/catalogo"
                element={<Catalog clFn={clearSearch} search={searchData} data={catalogData ? catalogData.results : []} />}
              />
              <Route
                path="/cutulugu"
                element={
                  <img
                    className="cutulu-img"
                    src="https://refrigeracionescobar.com.ar/wp-content/uploads/2019/02/Untitled-1.jpg"
                    alt="compra gamer"
                  />
                }
              />
              <Route path="/carro" element={<Cart />} />
              <Route path="/*" element={<p>404</p>} />
            </Routes>
            <Footer />
          </ScrollReset>
        </BrowserRouter>
      </IsLoged.Provider>
    </main>
  );
}
