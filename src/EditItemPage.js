import React, { useState, useEffect } from 'react';

const EditItemPage = ({ item, onEditItem, onCancelEdit }) => {
  const [editedName, setEditedName] = useState(item.name);
  const [editedPrice, setEditedPrice] = useState(item.price);
  const [editedImage, setEditedImage] = useState(item.image);

  const handleEditItem = () => {
    // Validate input
    if (!editedName || !editedPrice || !editedImage) {
      alert('Please fill in all fields.');
      return;
    }

    // Create an updated item object
    const updatedItem = {
      ...item,
      name: editedName,
      price: parseFloat(editedPrice),
      image: editedImage,
    };

    // Call the onEditItem function passed from the parent component
    onEditItem(updatedItem);
  };

  return (
    <div className="container">
      <h2>Edit Item</h2>
      <form>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            value={editedPrice}
            onChange={(e) => setEditedPrice(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            value={editedImage}
            onChange={(e) => setEditedImage(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="button" onClick={handleEditItem} className="btn btn-success">
          Save Changes
        </button>
        <button type="button" onClick={onCancelEdit} className="btn btn-secondary ml-2">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditItemPage;
