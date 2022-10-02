import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../../firebase-config';
import defaultImage from '../../Images/no-image-found.png';
import Swal from 'sweetalert2';
import './updateDataLayout.css';
import { motion } from 'framer-motion';
import { Cancel } from '@mui/icons-material';

const UpdateDataLayout = (props) => {

    const [updateItem, setUpdateItem] = useState({ name: props.updateName, brand: props.updateBrand, price: props.updatePrice, stock: props.updateStock, description: props.updateDescription, category: props.updateCategory });

    const handleUpdateSubmit = async (id, updates) => {
        try {
            const itemDoc = doc(db, "items", id);
            const newFields = updates;
            await updateDoc(itemDoc, newFields);
            props.closeUpdateLayout(false);
            const swalWithBootstrapButtons = Swal.mixin({
                buttonsStyling: true
            })
            swalWithBootstrapButtons.fire(
                'Item updated!',
                'Updated item successfully in database',
                'success'
            )
            window.location.reload();

        } catch (error) {
            const swalWithBootstrapButtons = Swal.mixin({
                buttonsStyling: true
            })
            swalWithBootstrapButtons.fire(
                'Update failed!',
                'Unknown error occured',
                'error'
            )
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        let item = e.target.name;
        let value = e.target.value;
        setUpdateItem({ ...updateItem, [item]: value });
    };

    return (
        <div className='updateDataLayout'>
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ type: "spring", duration: 1 }} className='updateDataContainer' >
                <form>
                    {props.updateImage ? <img className='updateImage noselect' src={props.updateImage} alt="#" /> : <img className='updateImage noselect' src={defaultImage} alt="#" />}
                    <div className='inputsUpdate'>
                        <h1 className="inputHeadingUpdate noselect">Update Details of product</h1>
                        <input className='inputFieldUpdate' type="text" placeholder="Enter product name..." name="name" defaultValue={props.updateName} onChange={handleChange} />
                        <input className='inputFieldUpdate' type="text" placeholder="Enter brand name..." name="brand" defaultValue={props.updateBrand} onChange={handleChange} />
                        <input className='inputFieldUpdate' type="number" placeholder="Enter product price..." name="price" defaultValue={props.updatePrice} onChange={handleChange} />
                        <input className='inputFieldUpdate' type="number" placeholder="Enter stock remaining..." name="stock" defaultValue={props.updateStock} onChange={handleChange} />
                        <input className='inputFieldUpdate' type="text" placeholder="Enter description..." name="description" defaultValue={props.updateDescription} onChange={handleChange} />
                        <input className='inputFieldUpdate' type="text" placeholder="Enter category..." name="category" defaultValue={props.updateCategory} onChange={handleChange} />
                    </div>
                    <div className='submitAlignmentUpdate noselect'><input className='submitButtonUpdate' type="button" onClick={() => { handleUpdateSubmit(props.updateId, { name: updateItem.name, stock: updateItem.stock, brand: updateItem.brand, price: updateItem.price, description: updateItem.description, category: updateItem.category }) }} value="Update Data" /></div>
                </form>
                <div className='cancelAlignmentUpdate noselect' onClick={() => { props.closeUpdateLayout(false) }}><Cancel className="cancelIconUpdate" /></div>
            </motion.div>
        </div>
    )
};

export default UpdateDataLayout;