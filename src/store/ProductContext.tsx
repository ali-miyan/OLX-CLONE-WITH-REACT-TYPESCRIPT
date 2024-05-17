import React, { createContext, useState } from "react";

export const ProductDetails = createContext<any>(null)


export const Details = ({children}:{children:React.ReactNode}) => {
    const [product,setProduct] = useState<object[] | any>('');
    return (
        <ProductDetails.Provider value={{product,setProduct}}>
            {children}
        </ProductDetails.Provider>
    )
}

