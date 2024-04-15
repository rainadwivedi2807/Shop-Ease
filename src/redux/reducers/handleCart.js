const cart = [];

const handleCart = (state = cart, action) => {
  const product = action.payload;
  switch (action.type) {
    case "ADDITEM":
      const existingProductIndex = state.findIndex((item) => item.id === product.id);
      if (existingProductIndex !== -1) {
        return state.map((item, index) =>
          index === existingProductIndex ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...state, { ...product, qty: 1 }];
      }

    case "REDUCEITEM":
      const existingProduct = state.find((item) => item.id === product.id);
      if (existingProduct.qty === 1) {
        return state.filter((item) => item.id !== existingProduct.id);
      } else {
        return state.map((item) =>
          item.id === existingProduct.id ? { ...item, qty: item.qty - 1 } : item
        );
      }

    case "DELETEITEM":
      return state.filter((item) => item.id !== product.id);

    default:
      return state;
  }
};

export default handleCart;
