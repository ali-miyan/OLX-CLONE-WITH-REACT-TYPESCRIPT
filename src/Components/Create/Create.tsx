import React, { Fragment, useContext, useState, } from "react";
import "./Create.css";
import Header from "../Header/Header";
import Card from "react-bootstrap/Card";
import { authContext } from "../../store/FirebaseContext";
import { Storage, firestore } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { notifySuccess, notifyError } from '../../Pages/Toast';
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const navigate = useNavigate()
  
  const { user } = useContext(authContext);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) return;

    try {
      const storageRef = Storage.ref(`/image/${imageFile.name}`);
      await storageRef.put(imageFile, { contentType: "image/jpeg" });
      const url = await storageRef.getDownloadURL();
      await addDoc(collection(firestore, "products"), {
        name,
        category,
        price,
        url,
        userId:user.uid,
      });

      navigate('/');
    notifySuccess('Successfully added!');


    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // const handleSuccess = () => {
  //   notifySuccess('Operation successful!');
  // };

  return (
    <Fragment>
      <Header />
      <Card>
        <div className="centerDiv">

          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="border w-full p-2"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="border w-full p-2"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="fname"
            name="category"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="border w-full p-2"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="fname"
            name="Price"
          />
          <br />

          <br />
          {imageUrl && (
            <img
              className="m-auto"
              src={imageUrl}
              alt="Selected"
              width="200px"
              height="200px"
            />
          )}

          <br />
          <input type="file" onChange={handleFileChange} />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            upload and Submit
          </button>
        </div>
      </Card>
    </Fragment>
  );
};

export default Create;
