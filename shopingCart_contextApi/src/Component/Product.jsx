import React from "react";


function Product({addtocart, data, handleAdd}) {
  
  return (
    <div className="productsWrapper">
      {data?.map((product) => (
        <div className="card" key={product.id}>
          <img src={product.image} alt="img" />
          <h4>{product.title}</h4>
          <h5>{product.price}</h5>
          <button
            onClick={()=>handleAdd(product)}
            className="btn"
          >
            {addtocart}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Product;
