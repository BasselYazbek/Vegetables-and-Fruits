/* import React, { useState, useEffect } from 'react';
import Herbs from './Herbs';
import AddItemForm from './AddItemForm';
import { firestore } from './firebase';

const HerbsMenu = ({ isAdmin }) => {
  const [herbsMenu, setHerbsItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const herbsCollection = firestore.collection('herbs');
        const snapshot = await herbsCollection.get();
        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log('Fetched Data:', data);
        setHerbsItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddItem = async (newItem) => {
    try {
      const herbsCollection = firestore.collection('herbs');
      const docRef = await herbsCollection.add({
        ...newItem,
        isOutOfStock: false,
        hidden: false,
      });

      setHerbsItems((prevItems) => [...prevItems, { ...newItem, id: docRef.id }]);
    } catch (error) {
      console.error('Error adding item to Firestore:', error);
    }
  };

  const handleEditItem = async (updatedItem) => {
    try {
      const herbsCollection = firestore.collection('herbs');
      await herbsCollection.doc(updatedItem.id).update(updatedItem);

      setHerbsItems((prevItems) =>
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
        const herbsCollection = firestore.collection('herbs');
        await herbsCollection.doc(itemId).delete();

        setHerbsItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      } catch (error) {
        console.error('Error deleting item from Firestore:', error);
      }
    }
  };

  const toggleStock = async (itemId) => {
    const itemIndex = herbsMenu.findIndex((item) => item.id === itemId);
    const currentItem = herbsMenu[itemIndex];

    const updatedItem = { ...currentItem, isOutOfStock: !currentItem.isOutOfStock };

    try {
      const herbsCollection = firestore.collection('herbs');
      await herbsCollection.doc(itemId).update(updatedItem);

      setHerbsItems((prevItems) => [
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
            {herbsMenu.map((item) => (
              <Herbs
                key={item.id}
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
 */

import React, { useState, useEffect } from 'react';
import Herbs from './Herbs';
import AddItemForm from './AddItemForm';
import { firestore } from './firebase';

const HerbsMenu = ({ isAdmin }) => {
  const [herbsMenu, setHerbsItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const herbsCollection = firestore.collection('herbs');
        const snapshot = await herbsCollection.where('hidden', '==', false).get();
        const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log('Fetched Data:', data);
        setHerbsItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddItem = async (newItem) => {
    try {
      const herbsCollection = firestore.collection('herbs');
      const docRef = await herbsCollection.add({
        ...newItem,
        isOutOfStock: false,
        hidden: false,
      });

      setHerbsItems((prevItems) => [...prevItems, { ...newItem, id: docRef.id }]);
    } catch (error) {
      console.error('Error adding item to Firestore:', error);
    }
  };

  const handleEditItem = async (updatedItem) => {
    try {
      const herbsCollection = firestore.collection('herbs');
      await herbsCollection.doc(updatedItem.id).update(updatedItem);

      setHerbsItems((prevItems) =>
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
        const herbsCollection = firestore.collection('herbs');
        await herbsCollection.doc(itemId).update({ hidden: true }); // Set hidden to true instead of deleting

        setHerbsItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      } catch (error) {
        console.error('Error deleting item from Firestore:', error);
      }
    }
  };

  const toggleStock = async (itemId) => {
    const itemIndex = herbsMenu.findIndex((item) => item.id === itemId);
    const currentItem = herbsMenu[itemIndex];

    const updatedItem = { ...currentItem, isOutOfStock: !currentItem.isOutOfStock };

    try {
      const herbsCollection = firestore.collection('herbs');
      await herbsCollection.doc(itemId).update(updatedItem);

      setHerbsItems((prevItems) => [
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
            {herbsMenu.map((item) => (
              <Herbs
                key={item.id}
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
