import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import Aside from "./Components/Aside";
import Products from "./Components/Products";
import Login from "./Components/Login";

function App() {

  return (<>

  <Header />

  <main className="flex gap-4 my-6">
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<><Aside/> <Products/></>} /> 
    <Route path="/login" element={<Login />} />
  </Routes>
  </BrowserRouter>
   
  </main>
  </>
   
  );
}

export default App;
