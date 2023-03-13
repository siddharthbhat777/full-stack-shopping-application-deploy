import React from 'react';
import { useState, useEffect } from 'react';
import Item from '../../Components/Item/Item';
import { db } from '../../firebase-config';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import './home.css';
import { auth } from '../../firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import AddItem from '../../Components/AddItem/AddItem';
import Swal from 'sweetalert2';
import ViewItem from '../../Components/ViewItem/ViewItem';
import { Logout } from '@mui/icons-material';
import shoppingImg from '../../Images/poster-img.png';
import { AnimatePresence } from 'framer-motion';
import useDocumentTitle from '../../Utils/useDocumentTitle';


const Home = () => {
    useDocumentTitle("Home");
    
    const [items, setItems] = useState([]);
    const [itemsForCategory, setItemsForCategory] = useState(items);
    const [user, setUser] = useState({});
    const [openAddItem, setOpenAddItem] = useState(false);
    const [openViewDataLayout, setOpenViewDataLayout] = useState(false);
    const [singleItemId, setSingleItemId] = useState("");
    const [singleItemName, setSingleItemName] = useState("");
    const [singleItemPrice, setSingleItemPrice] = useState("");
    const [singleItemDescription, setSingleItemDescription] = useState("");
    const [singleItemCategory, setSingleItemCategory] = useState("");
    const [singleItemImage, setSingleItemImage] = useState(null);
    const [singleItemBrand, setSingleItemBrand] = useState("");
    const [singleItemStock, setSingleItemStock] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);

    useEffect(() => {
        const itemsCollectionRef = collection(db, "items")
        const data = query(itemsCollectionRef, orderBy("date", "desc"));
        const getItems = onSnapshot(data, (snapshot) =>
            setItems(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        );
        return getItems;
    }, []);

    useEffect(() => {
        const itemsCollectionRef = collection(db, "items")
        const data = query(itemsCollectionRef, orderBy("date", "desc"));
        const getItems = onSnapshot(data, (snapshot) =>
            setItemsForCategory(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        );
        return getItems;
    }, []);

    const handleLogoutClick = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await signOut(auth);
                navigate('/');
                Swal.fire(
                    'Logged out',
                    'You have been logged out successfully.',
                    'success'
                )
            }
        });
    };

    const handleItemClick = (id, name, price, description, category, image, brand, stock) => {
        setOpenViewDataLayout(true);
        setSingleItemId(id);
        setSingleItemName(name);
        setSingleItemPrice(price);
        setSingleItemDescription(description);
        setSingleItemCategory(category);
        setSingleItemImage(image);
        setSingleItemBrand(brand);
        setSingleItemStock(stock);
    };
    const categories = itemsForCategory.map(item => item.category);
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    var uniqueCategories = categories.filter(onlyUnique);

    const filterItem = (categoryItem) => {
        const updatedItems = itemsForCategory.filter((curElement) => {
            return curElement.category === categoryItem;
        });
        setItems(updatedItems);
    };

    return (
        <div className="home noselect">
            {openAddItem && <AddItem closeModal={setOpenAddItem} />}
            {openViewDataLayout && <ViewItem closeLayout={setOpenViewDataLayout} itemId={singleItemId} itemName={singleItemName} itemPrice={singleItemPrice} itemDescription={singleItemDescription} itemCategory={singleItemCategory} itemImage={singleItemImage} itemBrand={singleItemBrand} itemStock={singleItemStock} />}
            <div className="homePoster">
                <p className="emailDisplay">{user.email}</p>
                <div className="logoutIcon"><Logout onClick={handleLogoutClick} /></div>
                <h1 className="headingPoster">Shopify</h1>
                <h1 className="subHeadingPoster">Shopping the way you like it!</h1>
                <img className="posterImage" src={shoppingImg} alt="#" />
                <svg className="svgStyle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#cfebfe" fillOpacity="1" d="M0,0L60,26.7C120,53,240,107,360,144C480,181,600,203,720,181.3C840,160,960,96,1080,80C1200,64,1320,96,1380,112L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
            </div>
            <button className="openAddItem" onClick={() => setOpenAddItem(true)}>Add New Item</button>
            <div>
                <button className="allCategory" onClick={() => { setItems(itemsForCategory) }}>All</button>
                <div className='category-container'>
                    {
                        uniqueCategories.map((singleCategory, key) => {
                            return (
                                <div key={key}>
                                    <button className='single-category' onClick={() => { filterItem(singleCategory) }}>{singleCategory}</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='grid-container'>
                <AnimatePresence>
                    {
                        items.map((item, key) => {
                            return (
                                <div className='grid-item' key={key} onClick={() => handleItemClick(item.id, item.name, item.price, item.description, item.category, item.image, item.brand, item.stock)}>
                                    <Item itemName={item.name} itemPrice={item.price} itemBrand={item.brand} itemStock={item.stock} deleteClick={item.id} itemImage={item.image} />
                                </div>
                            )
                        })
                    }
                </AnimatePresence>
            </div>
        </div>
    )
};
export default Home;