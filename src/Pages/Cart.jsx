
import {useData, useMethods } from "../Store/ProductContext.js";

function Cart() {
  const items = useData();
  const dispatch = useMethods();
  return (
    <div>
      {items?.length < 1 ? (
        <h3>Empty Cart</h3>
      ) : (
        <div className="cartWrapper">
          {items?.map((product) => (
            <div className="cartCard" key={product.id}>
              <img src={product.image} alt="" />
              <h5>{product.title}</h5>
              <div className="price">
                <h5>{product.price * product.quantity}</h5>
                <div className="quantity">
                  <button
                    onClick={() =>
                      dispatch({ type: "add", product })
                    }
                  >
                    +
                  </button>
                  <p>{product.quantity}</p>
                  <button
                    onClick={() =>
                      dispatch({
                        type: "decrement",
                        qty: product.quantity,
                        id: product.id,
                      })
                    }
                  >
                    -
                  </button>
                </div>
              </div>
              <button
                className="btn"
                onClick={() => {
                  dispatch({
                    type: "remove",
                    id: product.id,
                  });
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
