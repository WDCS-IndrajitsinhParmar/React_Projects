export default function ProductReducer(state, action) {
  let newData;
  switch (action.type) {
    case "add": {
      let flg = true;
      newData = state.map((product) => {
        if (product.id === action.product.id) {
          flg = false;
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        } else {
          return {
            ...product,
          };
        }
      });
      if (flg) {
        newData = [action.product, ...state];
      }
      localStorage.setItem("cartData", JSON.stringify(newData));
      return JSON.parse(localStorage.getItem("cartData"));
    }
    case "remove": {
      newData = state.filter((p) => p.id !== action.id);
      localStorage.setItem("cartData", JSON.stringify(newData));
      return JSON.parse(localStorage.getItem("cartData"));
    }
    case "increment": {
      newData = state.map((curElem, index) => {
        if (curElem.id === action.id) {
          return {
            ...curElem,
            quantity: curElem.quantity + 1,
          };
        } else {
          return curElem;
        }
      });
      localStorage.setItem("cartData", JSON.stringify(newData));
      return JSON.parse(localStorage.getItem("cartData"));
    }
    case "decrement": {
      if (action.qty > 1) {
        newData = state.map((curElem, index) => {
          if (curElem.id === action.id) {
            return {
              ...curElem,
              quantity: curElem.quantity - 1,
            };
          } else {
            return curElem;
          }
        });
        localStorage.setItem("cartData", JSON.stringify(newData));
        return JSON.parse(localStorage.getItem("cartData"));
      } else {
        newData = state.filter((p) => p.id !== action.id);
        localStorage.setItem("cartData", JSON.stringify(newData));
        return JSON.parse(localStorage.getItem("cartData"));
      }
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
