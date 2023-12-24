import React, { useState, useEffect } from "react";
import AddItemPage from "./AddItemPage";
import Herbs from "./Herbs";

const HerbsMenu = ({ isAdmin }) => {
    const [HerbsMenu, setMenuItems] = useState ([    
        {
            name: 'بقدونس',
            imagePath: '/MenuPic/Herbs/ba9dounes.jpg',
            price: 180000,
        },
        {
            name: 'بقلة',
            imagePath: '/MenuPic/Herbs/ba9li.jpg',
            price: 180000,
        },
        {
            name: 'بصل أخضر',
            imagePath: '/MenuPic/Herbs/basal_a5dar.jpg',
            price: 180000,
        },
        {
            name: 'هندبة',
            imagePath: '/MenuPic/Herbs/hendbi.jpg',
            price: 180000,
        },
        {
            name: 'كزبرة',
            imagePath: '/MenuPic/Herbs/kozbara.jpg',
            price: 180000,
        },
        {
            name: 'نعنع',
            imagePath: '/MenuPic/Herbs/na3na3.png',
            price: 180000,
        },
        {
            name: 'روكا',
            imagePath: '/MenuPic/Herbs/rocca.jpg',
            price: 180000,
        },
        {
            name: 'سبانخ',
            imagePath: '/MenuPic/Herbs/sbene5.jpg',
            price: 180000,
        },
        {
            name: 'سلق',
            imagePath: '/MenuPic/Herbs/sele9.jpg',
            price: 180000,
        },
        {
            name: 'زعتر',
            imagePath: '/MenuPic/Herbs/zaatar.jpg',
            price: 180000,
        },
        {
            name: 'فجل',
            imagePath: '/MenuPic/Herbs/fejil.jpg',
            price: 180000,
        },
        {
            name: 'كرافس',
            imagePath: '/MenuPic/Herbs/krafs.jpg',
            price: 180000,
        },
    ]);

    const handleAddItem = (newItem) => {
        // Update the menu items state
        setMenuItems((prevItems) => [...prevItems, newItem]);
    };

    const handleEditItem = (updatedItem) => {
        setMenuItems((prevItems) => {
            const updatedItems = prevItems.map((item) =>
                item.name === updatedItem.name ? updatedItem : item
            );
            localStorage.setItem("menuItems", JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    const handleDeleteItem = (itemName) => {
        const shouldDelete = window.confirm(`Are you sure you want to delete ${itemName}?`);

        if (shouldDelete) {
            setMenuItems((prevItems) => {
                const updatedMenuItems = prevItems.filter((item) => item.name !== itemName);
                localStorage.setItem("menuItems", JSON.stringify(updatedMenuItems));
                return updatedMenuItems;
            });
        }
    };

    return(
        <>
        <div className="container">
            <div className="row">
                {HerbsMenu.map((herbsMenu, index) => (
                    <Herbs key={index} {...herbsMenu} onEdit={handleEditItem} onDelete={handleDeleteItem} isAdmin={isAdmin}/>
                ))}
            </div>
        </div>

        {isAdmin && (
        <div>
          <AddItemPage onAddItem={handleAddItem} />
        </div>
        )}
        </>
    )
}

export default HerbsMenu;