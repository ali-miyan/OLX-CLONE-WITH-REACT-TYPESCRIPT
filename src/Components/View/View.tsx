import React, { useContext, useEffect, useState } from "react";
import { ProductDetails } from "../../store/ProductContext";
import "./View.css";
import { authContext } from "../../store/FirebaseContext";

function View() {
  const { product } = useContext(ProductDetails);
  const { user } = useContext(authContext);
  console.log(user,'dssssssssss');
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-5/6 h-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img src={product.url} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="md:w-1/2 p-4">
            <div className="mb-4">
              <p className="text-lg font-bold">&#x20B9; <span className="text-blue-500">{product.price}</span></p>
              <p className="text-xl">{product.name}</p>
              <span className="text-gray-500">Tue May 04 2021</span>
            </div>
  
            {user &&
              <div>
                <span className="text-xl">{user.displayName}</span>
                <p className="text-gray-500">{user.email}</p>
                <span className="text-gray-500">Tue May 04 2021</span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
  
}
export default View;
