import React from "react";
import Product from "../Component/Product";
import data from "../data.js";
import { useMethods } from "../Store/ProductContext.js";

function Home() {
  const dispatch = useMethods();
  const handleAdd = (product)=>{
    dispatch({ 
      type:"add",
      product });
  }
  return (
    <div>
      <h2 className="heading">Welcome to the Product store</h2>
      <section>
        <h3>Products</h3>
        <Product addtocart={"Add to Cart"} data={data} handleAdd={handleAdd} />
      </section>
    </div>
  );
}

export default Home;
