import React, { EffectCallback, useContext, useEffect, useState } from "react";
import Heart from "../../assets/Heart";
import "./Post.css";
import { firestore } from "../../firebase/config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { ProductDetails } from "../../store/ProductContext";
import { useNavigate } from "react-router-dom";


function Posts() {
  const [product, setProductData] = useState<any[]>();
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {

    try {
      const query = await getDocs(collection(firestore,'products'));
      const fetchedData = query.docs.map(val => ({
        id:val.id,
        ...val.data()
      }))
      setProductData(fetchedData??[])      
    } catch (error) {
      console.log(error);
    }
  }

  fetchData();

  
});
const {setProduct} = useContext(ProductDetails)


  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          { product?.map((val)=>(
          <>
          <div className="card"
            onClick={()=>{
              setProduct(val)
              navigate('/view')
            }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={val.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {val.price}</p>
              <span className="kilometer">{val.category}</span>
              <p className="name">{val.name}</p>
            </div>
            <div className="date">
              <span>Tue May 04 2021</span>
            </div>
          </div>
          </>
          ))
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
