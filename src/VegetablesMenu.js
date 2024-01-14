import React, { useState, useEffect } from 'react';
import Vegetables from './Vegetables';
import AddItemForm from './AddItemForm';
import { firestore } from './firebase';

const VegetablesMenu = ({ isAdmin }) => {
  const [VegetablesMenu, setVegetablesItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vegetablesCollection = firestore.collection('vegetables');
        const snapshot = await vegetablesCollection.where('hidden', '==', false).get();
        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log('Fetched Data:', data);
        setVegetablesItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddItem = async (newItem) => {
    try {
      const vegetablesCollection = firestore.collection('vegetables');
      const docRef = await vegetablesCollection.add({
        ...newItem,
        isOutOfStock: false,
        hidden: false,
      });

      setVegetablesItems((prevItems) => [...prevItems, { ...newItem, id: docRef.id }]);
    } catch (error) {
      console.error('Error adding item to Firestore:', error);
    }
  };

  const handleEditItem = async (updatedItem) => {
    try {
      const vegetablesCollection = firestore.collection('vegetables');
      await vegetablesCollection.doc(updatedItem.id).update(updatedItem);

      setVegetablesItems((prevItems) =>
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
        const vegetablesCollection = firestore.collection('vegetables');
        await vegetablesCollection.doc(itemId).update({ hidden: true }); // Set hidden to true instead of deleting

        setVegetablesItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      } catch (error) {
        console.error('Error deleting item from Firestore:', error);
      }
    }
  };

  const toggleStock = async (itemId) => {
    const itemIndex = VegetablesMenu.findIndex((item) => item.id === itemId);
    const currentItem = VegetablesMenu[itemIndex];

    const updatedItem = { ...currentItem, isOutOfStock: !currentItem.isOutOfStock };

    try {
      const vegetablesCollection = firestore.collection('vegetables');
      await vegetablesCollection.doc(itemId).update(updatedItem);

      setVegetablesItems((prevItems) => [
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
            {VegetablesMenu.map((item) => (
              <Vegetables
                key={item.id}
                {...item}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
                isAdmin={isAdmin}
                onToggleStock={toggleStock}
                isOutOfStock={item.isOutOfStock || false}
                VegetablesMenu={VegetablesMenu}
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
