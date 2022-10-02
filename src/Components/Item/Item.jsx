import React from 'react';
import './item.css';
import img from '../../Images/no-image-found.png';
import { motion } from 'framer-motion';

const Item = (props) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", duration: 1 }}>
      <div className="card border-gradient border-gradient-purple noselect">
        <div className="image_preview_container noselect"><img className="image-preview" style={{ borderTopRightRadius: "7px", borderTopLeftRadius: "7px", marginLeft: "-0.5px" }} src={props.itemImage ? props.itemImage : img} height="150px" width="201px" alt="#" /></div>
        <h1 className="heading noselect">{props.itemName}</h1>
        <h1 className="brandDisplay noselect">{props.itemBrand}</h1>
        {props.itemStock==="0" ? <h1 className="oos noselect">Out of stock</h1> : <h1 className="is noselect">In stock</h1>}
        <h1 className="price noselect">₹{props.itemPrice} /-</h1>
      </div>
    </motion.div>
  )
};

export default Item