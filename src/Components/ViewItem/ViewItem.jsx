import React, { useState } from 'react';
import defaultImage from '../../Images/no-image-found.png';
import { db } from '../../firebase-config';
import { deleteDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import UpdateDataLayout from '../UpdateDataLayout/UpdateDataLayout';
import { motion } from 'framer-motion';
import './viewItem.css';
import { Delete, Edit, Cancel } from '@mui/icons-material'

const ViewItem = (props) => {

    const [openUpdateLayout, setOpenUpdateLayout] = useState(false);
    const [isNameHovered, setIsNameHovered] = useState(false);
    const [isDescriptionHovered, setIsDescriptionHovered] = useState(false);

    const deleteItem = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const userDoc = doc(db, "items", id);
                await deleteDoc(userDoc);
                props.closeLayout(false)
                Swal.fire(
                    'Deleted!',
                    'Your item has been deleted.',
                    'success'
                )
            }
        });
    };

    return (
        <div className='viewItem'>
            {openUpdateLayout && <UpdateDataLayout closeUpdateLayout={setOpenUpdateLayout} updateId={props.itemId} updateName={props.itemName} updatePrice={props.itemPrice} updateDescription={props.itemDescription} updateCategory={props.itemCategory} updateImage={props.itemImage} updateBrand={props.itemBrand} updateStock={props.itemStock} />}
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ type: "spring", duration: 1 }} className="viewItemContainer">
                {props.itemImage ? <img className="fetchedImage noselect" src={props.itemImage} alt="#" /> : <img className="fetchedImage noselect" src={defaultImage} alt="#" />}<br />
                <div className='textData noselect'>
                    <h1 className='detailsHeading'>Product Details</h1>
                    <div className='singleData'><h1 className='attribute'>Name:</h1><h1 onMouseOver={() => { setIsNameHovered(true) }} className='overflowHeaders'>{props.itemName}</h1><br /></div>
                    {isNameHovered && <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ type: "spring", duration: 1 }} className='nameHovered' onMouseOut={() => { setIsNameHovered(false) }} onMouseOver={() => { setIsNameHovered(true) }}><h1 className='headerAttributeHover'>Name:</h1><br /><h1 className='headersHover'>{props.itemName}</h1></motion.div>}
                    <div className='singleData'><h1 className='attribute'>Brand:</h1><h1 className='headers'>{props.itemBrand}</h1><br /></div>
                    <div className='singleData'><h1 className='attribute'>Price:</h1><h1 className='priceHeader'>₹{props.itemPrice} /-</h1><br /></div>
                    <div className='singleData'><h1 className='attribute'>Stock:</h1><h1 className='headers'>{props.itemStock}{props.itemStock === "0" ? <h1 className='out'>Out of stock</h1> : <h1 className='in'>In stock</h1>}</h1><br /></div>
                    <div className='singleData'><h1 className='attribute'>Description:</h1><h1 className='overflowHeaders' onMouseOver={() => { setIsDescriptionHovered(true) }}>{props.itemDescription}</h1><br /></div>
                    {isDescriptionHovered && <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ type: "spring", duration: 1 }} className='descriptionHovered' onMouseOut={() => { setIsDescriptionHovered(false) }} onMouseOver={() => { setIsDescriptionHovered(true) }}><h1 className='descriptionAttributeHover'>Description:</h1><br /><h1 className='descriptionHeadersHover'>{props.itemDescription}</h1></motion.div>}
                    <div className='singleData'><h1 className='attribute'>Category:</h1><h1 className='headers'>{props.itemCategory}</h1><br /></div>
                </div>
                <div className='buttonAlignment'>
                    <div className='deleteIconLayout' onClick={() => { deleteItem(props.itemId) }}><Delete className='deleteIcon'>Delete</Delete></div>
                    <div className='updateIconLayout' onClick={() => { setOpenUpdateLayout(true) }}><Edit className='updateIcon'>Update</Edit></div>
                </div>
                <div className='cancelViewAlignment' onClick={() => props.closeLayout(false)}><Cancel className='cancelViewIcon'>Cancel</Cancel></div>
            </motion.div>
        </div>
    )
};

export default ViewItem;