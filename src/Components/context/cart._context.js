import { createContext, useContext, useReducer } from "react";


const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, { id: action.id, category: action.category, price: action.price,image: action.image,rating: action.rating,title: action.title,description:action.description }];
     
      
    case "REMOVE":
     
      const newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
    
    case "CLEAR":
    return [];

    default:
      console.log("Error in reducer: unknown action", action);
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Hooks to use context
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
