import React, { useState, useEffect } from 'react';
import Herbs from './Herbs';
import AddItemForm from './AddItemForm';

const HerbsMenu = ({ isAdmin }) => {
  const initialMenuItems = [
    {
      id: 'بقدونس',
      name: 'بقدونس',
      imagePath: '/MenuPic/Herbs/ba9dounes.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      id: 'بقلة',
      name: 'بقلة',
      imagePath: '/MenuPic/Herbs/ba9li.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      id: 'بصل أخضر',
      name: 'بصل أخضر',
      imagePath: '/MenuPic/Herbs/basal_a5dar.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      id: 'هندبة',
      name: 'هندبة',
      imagePath: '/MenuPic/Herbs/hendbi.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      id: 'كزبرة',
      name: 'كزبرة',
      imagePath: '/MenuPic/Herbs/kozbara.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      id: 'نعنع',
      name: 'نعنع',
      imagePath: '/MenuPic/Herbs/na3na3.png',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      id: 'روكا',
      name: 'روكا',
      imagePath: '/MenuPic/Herbs/rocca.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      id: 'سبانخ',
      name: 'سبانخ',
      imagePath: '/MenuPic/Herbs/sbene5.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      id: 'سلق',
      name: 'سلق',
      imagePath: '/MenuPic/Herbs/sele9.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      id: 'زعتر',
      name: 'زعتر',
      imagePath: '/MenuPic/Herbs/zaatar.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      id: 'فجل',
      name: 'فجل',
      imagePath: '/MenuPic/Herbs/fejil.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      id: 'كرافس',
      name: 'كرافس',
      imagePath: '/MenuPic/Herbs/krafs.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
];

const [herbsMenu, setHerbsMenu] = useState(() => {
  const storedItems = JSON.parse(localStorage.getItem('herbsItems'));
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
  localStorage.setItem('herbsItems', JSON.stringify(items));
};

const handleAddItem = (newItem) => {
  const newItemWithStock = { ...newItem, isOutOfStock: false };
  setHerbsMenu((prevItems) => [...prevItems, newItemWithStock]);
  saveItemsToLocalStorage([...herbsMenu, newItemWithStock]);
};

const handleEditItem = (updatedItem) => {
  setHerbsMenu((prevItems) =>
    prevItems.map((item) => (item.name === updatedItem.name ? updatedItem : item))
  );

  // Save the updated items to local storage
  saveItemsToLocalStorage(herbsMenu.map((item) => (item.name === updatedItem.name ? updatedItem : item)));
};

const handleDeleteItem = (itemName) => {
  const shouldDelete = window.confirm(`Are you sure you want to delete ${itemName}?`);

  if (shouldDelete) {
    setHerbsMenu((prevItems) => prevItems.filter((item) => item.name !== itemName));
    saveItemsToLocalStorage([...herbsMenu.filter((item) => item.name !== itemName)]);
  }
};

const toggleStock = (itemName) => {
  const itemIndex = herbsMenu.findIndex((item) => item.name === itemName);
  const currentItem = herbsMenu[itemIndex];

  // Ask for confirmation
  const confirmMessage = currentItem.isOutOfStock
    ? `Restore ${itemName} to regular stock?`
    : `Mark ${itemName} as Out of Stock?`;

  const shouldToggleStock = window.confirm(confirmMessage);

  if (shouldToggleStock) {
    // Toggle the 'isOutOfStock' property
    const updatedItem = { ...currentItem, isOutOfStock: !currentItem.isOutOfStock };

    // Update the state
    setHerbsMenu((prevItems) => [
      ...prevItems.slice(0, itemIndex),
      updatedItem,
      ...prevItems.slice(itemIndex + 1),
    ]);

    // Update local storage
  saveItemsToLocalStorage([
    ...herbsMenu.slice(0, itemIndex),
    updatedItem,
    ...herbsMenu.slice(itemIndex + 1),
  ]);
}
};

return (
  <>
  <div style={{backgroundColor: '#FDF5E6'}}>
    <div className="container">
        <div className="row">
          {herbsMenu.map((item, index) => (
            <Herbs
              key={index}
              {...item}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
              isAdmin={isAdmin}
              onToggleStock={toggleStock}
              isOutOfStock={item.isOutOfStock || false}
              herbsMenu={herbsMenu}
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

export default HerbsMenu;