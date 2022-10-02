import React, { useEffect, useState } from 'react';
import './addItem.css';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../../firebase-config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import defaultImage from '../../Images/image-upload.png';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { Cancel } from '@mui/icons-material';

const AddItem = ({ closeModal }) => {

  const initialState = {
    name: "",
    price: "",
    description: "",
    category: "",
    brand: "",
    stock: "",
  };

  const [data, setData] = useState(initialState);
  const { name, price, description, category, brand, stock } = data;
  const [imageUpload, setImageUpload] = useState(null);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + imageUpload.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, imageUpload);
      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            break;

          case "running":
            break;

          default:
            break;
        }
      }, (error) => {
        const swalWithBootstrapButtons = Swal.mixin({
          buttonsStyling: true
        })
        swalWithBootstrapButtons.fire(
          'Upload failed!',
          'Unknown error occured',
          'error'
        )
      },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, image: downloadURL }));
          });
        });
    };
    imageUpload && uploadFile()
  }, [imageUpload]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "items"), {
      ...data,
      date: serverTimestamp()
    });
    closeModal(false);
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true
    })
    swalWithBootstrapButtons.fire(
      'Item added!',
      'Added item successfully in database',
      'success'
    )
  };

  return (
    <div className="addItem">
      <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ type: "spring", duration: 1 }} className="container noselect">
        <form method='post' onSubmit={handleSubmitClick}>
          <label htmlFor="file">
            <input type="file" id="file" hidden onChange={(event) => { setImageUpload(event.target.files[0]) }} />
            {imageUpload ? <img className="uploadedImage noselect" src={URL.createObjectURL(imageUpload)} alt="abc" /> : <div className='imageUploadLayout noselect'><img className="uploadIcon" src={defaultImage} alt="#" /></div>}
          </label>
          <div className='inputs'>
            <h1 className="inputHeading noselect">Enter Details of product</h1>
            <input className='inputField' required type="text" name="name" placeholder="Enter heading here..." onChange={handleChange} value={name} /><br />
            <input className='inputField' required type="text" name="brand" placeholder="Enter brand name here..." onChange={handleChange} value={brand} /><br />
            <input className='inputField' required type="number" name="price" placeholder="Enter Price here.." onChange={handleChange} value={price} /><br />
            <input className='inputField' required type="number" name="stock" placeholder="Enter stock here..." onChange={handleChange} value={stock} /><br />
            <input className='inputField' required type="text" name="description" placeholder="Enter description here..." onChange={handleChange} value={description} /><br />
            <input className='inputField' required type="text" name="category" placeholder="Enter category here..." onChange={handleChange} value={category} /><br />
          </div>
          <div className='submitAlignment noselect'><input className='submitButton' type="submit" value="Add Item" disabled={progress !== null && progress < 100} /></div>
          <div className='cancelAlignment noselect' onClick={() => closeModal(false)} ><Cancel className="cancelIcon" /></div>
        </form>
      </motion.div>
    </div>
  )
};

export default AddItem;