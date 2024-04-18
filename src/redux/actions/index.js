// For adding items to Cart

export const addItem = (product) => {
    return {
        type: "ADDITEM",
        payload : product
    }
}

//Delete items from cart
export const removeItem  = (product) => {
    return {
        type: "REDUCEITEM",
        payload : product
    }
}

export const deleteItem  = (product) => {
    return {
        type: "DELETEITEM",
        payload : product
    }
}

export const clearCart  = () => {
    return {
        type: "CLEARCART",
        
    }
}