import React, { useState, useEffect } from 'react';
import Fruits from './Fruits';
import AddItemForm from './AddItemForm';
import { firestore } from './firebase';

const FruitsMenu = ({ isAdmin }) => {
  const [fruitsMenu, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fruitsCollection = firestore.collection('fruits');
        const snapshot = await fruitsCollection.where('hidden', '==', false).get();
        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log('Fetched Data:', data);
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddItem = async (newItem) => {
    try {
      const fruitsCollection = firestore.collection('fruits');
      const docRef = await fruitsCollection.add({
        ...newItem,
        isOutOfStock: false,
        hidden: false,
      });

      setMenuItems((prevItems) => [...prevItems, { ...newItem, id: docRef.id }]);
    } catch (error) {
      console.error('Error adding item to Firestore:', error);
    }
  };

  const handleEditItem = async (updatedItem) => {
    try {
      const fruitsCollection = firestore.collection('fruits');
      await fruitsCollection.doc(updatedItem.id).update(updatedItem);

      setMenuItems((prevItems) =>
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
        const fruitsCollection = firestore.collection('fruits');
        await fruitsCollection.doc(itemId).update({ hidden: true }); // Set hidden to true instead of deleting

        setMenuItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      } catch (error) {
        console.error('Error deleting item from Firestore:', error);
      }
    }
  };

  const toggleStock = async (itemId) => {
    const itemIndex = fruitsMenu.findIndex((item) => item.id === itemId);
    const currentItem = fruitsMenu[itemIndex];

    const updatedItem = { ...currentItem, isOutOfStock: !currentItem.isOutOfStock };

    try {
      const fruitsCollection = firestore.collection('fruits');
      await fruitsCollection.doc(itemId).update(updatedItem);

      setMenuItems((prevItems) => [
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
            {fruitsMenu.map((item) => (
              <Fruits
                key={item.id}
                {...item}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
                isAdmin={isAdmin}
                onToggleStock={toggleStock}
                isOutOfStock={item.isOutOfStock || false}
                fruitsMenu={fruitsMenu}
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

export default FruitsMenu;