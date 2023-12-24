import React, { useState, useEffect } from "react";
import Vegetables from "./Vegetables";
import AddItemPage from "./AddItemPage";

const VegetablesMenu = ({ isAdmin }) => {
    const [VegetablesMenu, setMenuItems] = useState ([    
        {
            name: 'خيار',
            imagePath: '/MenuPic/Vegetables/5iar.jpg',
            price: 180000,
        },
        {
            name: 'قرنبيط',
            imagePath: '/MenuPic/Vegetables/9arnabit.jpg',
            price: 180000,
        },
        {
            name: 'بندورة معلقق',
            imagePath: '/MenuPic/Vegetables/banadoura m3ala2a.jpg',
            price: 180000,
        },
        {
            name: 'بندورة',
            imagePath: '/MenuPic/Vegetables/banadoura.jpg',
            price: 180000,
        },
        {
            name: 'بندورة كرزية',
            imagePath: '/MenuPic/Vegetables/banadoura_karazeie.jpeg',
            price: 180000,
        },
        {
            name: 'بروكلي',
            imagePath: '/MenuPic/Vegetables/brocolli.jpg',
            price: 180000,
        },
        {
            name: 'ملفوف',
            imagePath: '/MenuPic/Vegetables/malfouf.jpg',
            price: 180000,
        },
        {
            name: 'ملفوف أحمر',
            imagePath: '/MenuPic/Vegetables/malfouf_ahmar.jpg',
            price: 180000,
        },
        {
            name: 'Iceberg',
            imagePath: '/MenuPic/Vegetables/iceberg.jpg',
            price: 180000,
        },
        {
            name: 'خس',
            imagePath: '/MenuPic/Vegetables/5as.jpg',
            price: 180000,
        },
        {
            name: 'با',
            imagePath: '/MenuPic/Vegetables/baitenjen_mda3bal.jpg',
            price: 180000,
        },
        {
            name: 'با',
            imagePath: '/MenuPic/Vegetables/baitenjen_mtawal.jpeg',
            price: 180000,
        },
        {
            name:  'فليفلة حرة',
            imagePath: '/MenuPic/Vegetables/flaifli_7ara.jpg',
            price: 180000,
        },
        {
            name: 'فليفلة خضراء',
            imagePath: '/MenuPic/Vegetables/flaifli_5adra.jpg',
            price: 180000,
        },
        {
            name: 'فليفلة حمرا',
            imagePath: '/MenuPic/Vegetables/flaifli_7amra.jpg',
            price: 180000,
        },
        {
            name: 'كوسا',
            imagePath: '/MenuPic/Vegetables/kousa.jpeg',
            price: 180000,
        },
        {
            name: 'لوبية',
            imagePath: '/MenuPic/Vegetables/loubie.jpg',
            price: 180000,
        },
        {
            name: 'ثوم فلت',
            imagePath: '/MenuPic/Vegetables/toum_falet.jpg',
            price: 180000,
        },
        {
            name: 'ثوم كيس',
            imagePath: '/MenuPic/Vegetables/toum_kees.jpg',
            price: 180000,
        },
        {
            name: 'شمندر',
            imagePath: '/MenuPic/Vegetables/shamandar.png',
            price: 180000,
        },
        {
            name: 'لفت',
            imagePath: '/MenuPic/Vegetables/lefit.jpg',
            price: 180000,
        },
        {
            name: 'قلقاس',
            imagePath: '/MenuPic/Vegetables/9el9es.jpg',
            price: 180000,
        },
        {
            name: 'بصل',
            imagePath: '/MenuPic/Vegetables/basal.jpg',
            price: 180000,
        },
        {
            name: 'بصل هندي',
            imagePath: '/MenuPic/Vegetables/basal_hendi.jpg',
            price: 180000,
        },
        {
            name: 'بصل هندي',
            imagePath: '/MenuPic/Vegetables/basal_abyad.jpg',
            price: 180000,
        },
        {
            name: 'بطاطا',
            imagePath: '/MenuPic/Vegetables/batata.jpg',
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
                {VegetablesMenu.map((vegetablesMenu, index) => (
                    <Vegetables key={index} {...vegetablesMenu} onEdit={handleEditItem} onDelete={handleDeleteItem} isAdmin={isAdmin}/>
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

export default VegetablesMenu;