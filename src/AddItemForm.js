/* import React, { useState } from 'react';

const AddItemForm = ({ onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemImage, setItemImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input fields
    if (!itemName || !itemPrice || !itemImage) {
      alert('Please fill in all fields.');
      return;
    }

    // Convert item price to a number
    const price = parseFloat(itemPrice);

    // Create a new item object
    const newItem = {
      name: itemName,
      price,
      imagePath: itemImage,
      isOutOfStock: false,
      hidden: false,
    };

    // Call the onAddItem function to add the new item to the list
    onAddItem(newItem);

    // Clear the form fields
    setItemName('');
    setItemPrice('');
    setItemImage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="itemName">Item Name:</label>
      <input type="text" id="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} required />

      <label htmlFor="itemPrice">Item Price:</label>
      <input type="number" id="itemPrice" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} required />

      <label htmlFor="itemImage">Item Image (URL):</label>
      <input type="text" id="itemImage" value={itemImage} onChange={(e) => setItemImage(e.target.value)} required />

      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
 */

import React, { useState } from 'react';
import { firestore } from './firebase'; // Import your Firestore instance

const AddItemForm = ({ onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemImage, setItemImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!itemName || !itemPrice || !itemImage) {
      alert('Please fill in all fields.');
      return;
    }

    // Convert item price to a number
    const price = parseFloat(itemPrice);

    try {
      // Add the new item to Firestore
      const fruitsCollection = firestore.collection('fruits'); // Replace 'fruits' with your collection name
      const docRef = await fruitsCollection.add({
        name: itemName,
        price,
        imagePath: itemImage,
        isOutOfStock: false,
        hidden: false,
      });

      // Call the onAddItem function to add the new item to the list
      onAddItem({ ...docRef.data(), id: docRef.id });

      // Clear the form fields
      setItemName('');
      setItemPrice('');
      setItemImage('');
    } catch (error) {
      console.error('Error adding item to Firestore:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="itemName">Item Name:</label>
      <input type="text" id="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} required />

      <label htmlFor="itemPrice">Item Price:</label>
      <input type="number" id="itemPrice" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} required />

      <label htmlFor="itemImage">Item Image (URL):</label>
      <input type="text" id="itemImage" value={itemImage} onChange={(e) => setItemImage(e.target.value)} required />

      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
