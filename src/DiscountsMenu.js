import React, { useState, useEffect } from 'react';
import Discounts from './Discounts';
import AddItemForm from './AddItemForm';
import { firestore } from './firebase';

const DiscountsMenu = ({ isAdmin }) => {
  const [DiscountsMenu, setDiscountsMenu] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const discountsCollection = firestore.collection('discounts');
        const snapshot = await discountsCollection.where('hidden', '==', false).get();
        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log('Fetched Data:', data);
        setDiscountsMenu(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddItem = async (newItem) => {
    try {
      const discountsCollection = firestore.collection('discounts');
      const docRef = await discountsCollection.add({
        ...newItem,
        isOutOfStock: false,
        hidden: false,
      });

      setDiscountsMenu((prevItems) => [...prevItems, { ...newItem, id: docRef.id }]);
    } catch (error) {
      console.error('Error adding item to Firestore:', error);
    }
  };

  const handleEditItem = async (updatedItem) => {
    try {
      const discountsCollection = firestore.collection('discounts');
      await discountsCollection.doc(updatedItem.id).update(updatedItem);

      setDiscountsMenu((prevItems) =>
        prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
    } catch (error) {
      console.error('Error updating item in Firestore:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete this item?`);

    if (shouldDelete) {
      try {
        const discountsCollection = firestore.collection('discounts');
        await discountsCollection.doc(itemId).update({ hidden: true }); // Set hidden to true instead of deleting

        setDiscountsMenu((prevItems) => prevItems.filter((item) => item.id !== itemId));
      } catch (error) {
        console.error('Error deleting item from Firestore:', error);
      }
    }
  };

  const toggleStock = async (itemId) => {
    const itemIndex = DiscountsMenu.findIndex((item) => item.id === itemId);
    const currentItem = DiscountsMenu[itemIndex];

    const updatedItem = { ...currentItem, isOutOfStock: !currentItem.isOutOfStock };

    try {
      const discountsCollection = firestore.collection('discounts');
      await discountsCollection.doc(itemId).update(updatedItem);

      setDiscountsMenu((prevItems) => [
        ...prevItems.slice(0, itemIndex),
        updatedItem,
        ...prevItems.slice(itemIndex + 1),
      ]);
    } catch (error) {
      console.error('Error updating item in Firestore:', error);
    }
  };

  return (
    <>
      <div style={{ backgroundColor: '#FDF5E6' }}>
        <div className="container">
          <div className="row">
            {DiscountsMenu.map((item) => (
              <Discounts
                key={item.id}
                {...item}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
                isAdmin={isAdmin}
                onToggleStock={toggleStock}
                isOutOfStock={item.isOutOfStock || false}
                DiscountsMenu={DiscountsMenu}
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
