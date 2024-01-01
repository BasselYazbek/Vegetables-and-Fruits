// DiscountsMenu.js
import React, { useState } from 'react';
import AddItemForm from './AddItemForm';
import Discounts from './Discounts';

const DiscountsMenu = ({ isAdmin }) => {
  const initialMenuItems = [
    {
      name: 'أناناس',
      imagePath: '/MenuPic/Fruits/pineapple.jpg',
      price: 180000,
      discountedPrice: 150000, // Example of setting a discounted price
      isOutOfStock: false,
      hidden: false,
    },
  ];

  const [discountsMenu, setDiscountsMenu] = useState(() => {
    const storedItems = JSON.parse(localStorage.getItem('discountsItems'));
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
    localStorage.setItem('discountsItems', JSON.stringify(items));
  };

  const handleAddItem = (newItem) => {
    const newItemWithStock = { ...newItem, isOutOfStock: false };
    setDiscountsMenu((prevItems) => [...prevItems, newItemWithStock]);
    saveItemsToLocalStorage([...discountsMenu, newItemWithStock]);
  };

  const handleEditItem = (updatedItem) => {
    setDiscountsMenu((prevItems) =>
      prevItems.map((item) => (item.name === updatedItem.name ? updatedItem : item))
    );

    // Save the updated items to local storage
    saveItemsToLocalStorage(discountsMenu.map((item) => (item.name === updatedItem.name ? updatedItem : item)));
  };

  const handleDeleteItem = (itemName) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete ${itemName}?`);

    if (shouldDelete) {
      setDiscountsMenu((prevItems) => prevItems.filter((item) => item.name !== itemName));
      saveItemsToLocalStorage([...discountsMenu.filter((item) => item.name !== itemName)]);
    }
  };

  const toggleStock = (itemName) => {
    const itemIndex = discountsMenu.findIndex((item) => item.name === itemName);
    const currentItem = discountsMenu[itemIndex];

    // Ask for confirmation
    const confirmMessage = currentItem.isOutOfStock
      ? `Restore ${itemName} to regular stock?`
      : `Mark ${itemName} as Out of Stock?`;

    const shouldToggleStock = window.confirm(confirmMessage);

    if (shouldToggleStock) {
      // Toggle the 'isOutOfStock' property
      const updatedItem = { ...currentItem, isOutOfStock: !currentItem.isOutOfStock };

      // Update the state
      setDiscountsMenu((prevItems) => [
        ...prevItems.slice(0, itemIndex),
        updatedItem,
        ...prevItems.slice(itemIndex + 1),
      ]);

      // Update local storage
      saveItemsToLocalStorage([
        ...discountsMenu.slice(0, itemIndex),
        updatedItem,
        ...discountsMenu.slice(itemIndex + 1),
      ]);
    }
  };

  return (
    <>
      <div style={{ backgroundColor: '#FDF5E6' }}>
        <div className="container">
          <div className="row">
            {discountsMenu.map((item, index) => (
              <Discounts
                key={index}
                {...item}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
                isAdmin={isAdmin}
                onToggleStock={toggleStock}
                isOutOfStock={item.isOutOfStock || false}
                discountsMenu={discountsMenu}
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

export default DiscountsMenu;
