import React, { useState } from 'react';

const AddItemPage = ({ onAddItem }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleAddItem = () => {
    // Validate input
    if (!name || !price || !image) {
      alert('Please fill in all fields.');
      return;
    }

      // Create a new item object with the base64-encoded image
      const newItem = {
        name,
        price: parseFloat(price),
        image,
      };

      // Call the onAddItem function passed from the parent component
      onAddItem(newItem);

      // Clear the input fields
      setName('');
      setPrice('');
      setImage(''); // Reset image to null after adding the item
    };

  /* const handleImageChange = (e) => {
    // Handle the selected image file
    const selectedImage = e.target.files[0];
  
    // Check if an image is selected and it's a valid file
    if (selectedImage && selectedImage.type.startsWith('image/')) {
      // Preview the image
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      // Clear the image if no valid file is selected
      setImage(null);
    }
  }; */
  
  return (
    <div className="container">
      <h2>Add New Item</h2>
      <form>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="form-control" />
          {image && (
            <img
              src={image}
              alt="Selected"
              style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }}
            />
          )}
        </div>
        <button type="button" onClick={handleAddItem} className="btn btn-primary">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItemPage;
