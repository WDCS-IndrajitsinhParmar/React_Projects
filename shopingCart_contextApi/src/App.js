import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Component/Navbar";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import { Provider } from "./Store/ProductContext.js";
import Practice from "./Practice.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </Provider>
        <Routes>
          <Route path="/practice" element={<Practice />}>s</Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
