import { Routes, Route } from "react-router";
import DefaultLayout from "../layout/DefaultLayout";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import ProductPage from "../Pages/ProductPage/ProductPage";
import { WebCart } from "../Pages/Cart/WebCart";

function WebRouter() {
  return(

    <Routes>
      <Route element={<DefaultLayout/>}>
        {/* Elementos com o Layour Padrão */}
        <Route path="/" element={ <Home/> }/>
        <Route path="/produtos" element={ <Home/> }/>
        {/* <Route path="/profile" element={ <Profile/> }/> */}
        <Route path="/cart" element={ <WebCart/> }/>
        <Route path="/product/:id" element={ <ProductPage/> }/>

      </Route>
        {/* Elementos sem o Layout Padrão */}
        <Route path="/login" element={ <Login/> }/>

    </Routes>
  
  );
}

export default WebRouter;