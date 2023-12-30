
import React, { useState, useEffect } from 'react';
import Vegetables from './Vegetables'
import AddItemForm from './AddItemForm';

const VegetablesMenu = ({ isAdmin }) => {
  const initialMenuItems = [
    {
        name: 'خيار',
        imagePath: '/MenuPic/Vegetables/5iar.jpg',
        price: 160000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'قرنبيط',
        imagePath: '/MenuPic/Vegetables/9arnabit.jpg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'بندورة معلقق',
        imagePath: '/MenuPic/Vegetables/banadoura m3ala2a.jpg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'بندورة',
        imagePath: '/MenuPic/Vegetables/banadoura.jpg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'بندورة كرزية',
        imagePath: '/MenuPic/Vegetables/banadoura_karazeie.jpeg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'بروكلي',
        imagePath: '/MenuPic/Vegetables/brocolli.jpg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'ملفوف',
        imagePath: '/MenuPic/Vegetables/malfouf.jpg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'ملفوف أحمر',
        imagePath: '/MenuPic/Vegetables/malfouf_ahmar.jpg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'Iceberg',
        imagePath: '/MenuPic/Vegetables/iceberg.jpg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'خس',
        imagePath: '/MenuPic/Vegetables/5as.jpg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'باذنجان مدعبل',
        imagePath: '/MenuPic/Vegetables/baitenjen_mda3bal.jpg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'با',
        imagePath: '/MenuPic/Vegetables/baitenjen_mtawal.jpeg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name:  'فليفلة حرة',
        imagePath: '/MenuPic/Vegetables/flaifli_7ara.jpg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'فليفلة خضراء',
        imagePath: '/MenuPic/Vegetables/flaifli_5adra.jpg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'فليفلة حمرا',
        imagePath: '/MenuPic/Vegetables/flaifli_7amra.jpg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'كوسا',
        imagePath: '/MenuPic/Vegetables/kousa.jpeg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'لوبية',
        imagePath: '/MenuPic/Vegetables/loubie.jpg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'ثوم فلت',
        imagePath: '/MenuPic/Vegetables/toum_falet.jpg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'ثوم كيس',
        imagePath: '/MenuPic/Vegetables/toum_kees.jpg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'شمندر',
        imagePath: '/MenuPic/Vegetables/shamandar.png',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'لفت',
        imagePath: '/MenuPic/Vegetables/lefit.jpg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'قلقاس',
        imagePath: '/MenuPic/Vegetables/9el9es.jpg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'بصل',
        imagePath: '/MenuPic/Vegetables/basal.jpg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'بصل هندي',
        imagePath: '/MenuPic/Vegetables/basal_hendi.jpg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'بصل هندي',
        imagePath: '/MenuPic/Vegetables/basal_abyad.jpg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
    {
        name: 'بطاطا',
        imagePath: '/MenuPic/Vegetables/batata.jpg',
        price: 180000,
        isOutOfStock: false,
        hidden: false,
    },
  ];

  const [vegetablesMenu, setVegetablesItems] = useState(() => {
    const storedItems = JSON.parse(localStorage.getItem('vegetablesItems'));
    console.log('Stored Items:', storedItems);


    return (
      storedItems ||
      initialMenuItems.map((item) => ({
        ...item,
        isEditing: localStorage.getItem(`editing_${item.name}`) === 'true',
      }))
    );
  });

  const saveItemsToLocalStorage = (items) => {
    localStorage.setItem('vegetablesItems', JSON.stringify(items));
  };

  const handleAddItem = (newItem) => {
    const newItemWithStock = { ...newItem, isOutOfStock: false };
    setVegetablesItems((prevItems) => [...prevItems, newItemWithStock]);
    saveItemsToLocalStorage([...vegetablesMenu, newItemWithStock]);
  };

  const handleEditItem = (updatedItem) => {
    setVegetablesItems((prevItems) =>
      prevItems.map((item) => (item.name === updatedItem.name ? updatedItem : item))
    );
  
    // Save the updated items to local storage
    saveItemsToLocalStorage(vegetablesMenu.map((item) => (item.name === updatedItem.name ? updatedItem : item)));
  };


  const handleDeleteItem = (itemName) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete ${itemName}?`);

    if (shouldDelete) {
      setVegetablesItems((prevItems) => prevItems.filter((item) => item.name !== itemName));
      saveItemsToLocalStorage([...vegetablesMenu.filter((item) => item.name !== itemName)]);
    }
  };

  const toggleStock = (itemName) => {
    const itemIndex = vegetablesMenu.findIndex((item) => item.name === itemName);
    const currentItem = vegetablesMenu[itemIndex];
  
    // Ask for confirmation
    const confirmMessage = currentItem.isOutOfStock
      ? `Restore ${itemName} to regular stock?`
      : `Mark ${itemName} as Out of Stock?`;
  
    const shouldToggleStock = window.confirm(confirmMessage);
  
    if (shouldToggleStock) {
      // Toggle the 'isOutOfStock' property
      const updatedItem = { ...currentItem, isOutOfStock: !currentItem.isOutOfStock };
  
      // Update the state
      setVegetablesItems((prevItems) => [
        ...prevItems.slice(0, itemIndex),
        updatedItem,
        ...prevItems.slice(itemIndex + 1),
      ]);

      // Update local storage
    saveItemsToLocalStorage([
      ...vegetablesMenu.slice(0, itemIndex),
      updatedItem,
      ...vegetablesMenu.slice(itemIndex + 1),
    ]);
  }
};

  return (
    <>
    <div style={{backgroundColor: '#87CEEB'}}>
      <div className="container">
          <div className="row">
            {vegetablesMenu.map((item, index) => (
              <Vegetables
                key={index}
                {...item}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
                isAdmin={isAdmin}
                onToggleStock={toggleStock}
                isOutOfStock={item.isOutOfStock || false}
                vegetablesMenu={vegetablesMenu}
              />
            ))}
          </div>
        </div>
      </div>

      {isAdmin && (
        <div className="container mt-4">
          <AddItemForm onAddItem={handleAddItem} />
        </div>
      )}
    </>
  );
};

export default VegetablesMenu;