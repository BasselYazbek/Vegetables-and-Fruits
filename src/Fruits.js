/* import React, { useState } from 'react';
import EditItemPage from './EditItemPage';

const Fruits = ({ name, imagePath, price, onEdit, onDelete, isAdmin, onToggleStock, isOutOfStock }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
    }

    return (
        <div className="col-md-4 mb-4">
            <div className="card">
                {isOutOfStock && (
                    <div className="sold-out-label">Sold Out</div>
                )}
                <img src={imagePath} className="card-img-top" alt={name} style={{ height: '200px', objectFit: 'contain' }} />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">Price: {price} L.L</p>
                    {isOutOfStock ? (
                        <p className="text-danger">Out of Stock</p>
                    ) : (
                        <>
                            {isAdmin && (
                                <>
                                    <button type="button" onClick={handleEditClick} className="btn btn-warning">
                                        Edit
                                    </button>
                                    <button type="button" onClick={() => onDelete(name)} className="btn btn-danger ml-2">
                                        Delete
                                    </button>
                                    <button type="button" onClick={() => onToggleStock(name)} className="btn btn-secondary ml-2">
                                        Out of Stock
                                    </button>
                                </>
                            )}
                        </>
                    )}
                    {isOutOfStock && isAdmin && (
                        <button type="button" onClick={() => onToggleStock(name)} className="btn btn-success ml-2">
                            Restore Stock
                        </button>
                    )}
                </div>
            </div>
            {isEditing && (
                <EditItemPage
                    item={{ name, price, image: imagePath }}
                    onEditItem={(updatedItem) => {
                        onEdit(updatedItem);
                        handleCancelEdit();
                    }}
                    onCancelEdit={handleCancelEdit}
                />
            )}
        </div>
    );
};

export default Fruits; */

// Fruits.js
// Fruits.js

import React, { useState } from 'react';

const Fruits = ({ name, imagePath, price, onEdit, onDelete, isAdmin, onToggleStock, isOutOfStock, fruitsMenu }) => {
    const [isEditingPrice, setIsEditingPrice] = useState(false);
    const [newPrice, setNewPrice] = useState(price);

    const handleEditPriceClick = () => {
        const shouldEditPrice = window.confirm(`Are you sure you want to change the price of ${name}?`);
    
        if (shouldEditPrice) {
          setIsEditingPrice(true);
        }
      };


      const handleSavePrice = () => {
        // Validate the new price
        if (!newPrice || isNaN(newPrice)) {
          alert('Please enter a valid price.');
          return;
        }
      
        // Call the onEdit function to update the item's price
        onEdit({ name, price: parseFloat(newPrice), imagePath });
      
        // Exit the editing mode
        setIsEditingPrice(false);
      };

    const handleCancelEditPrice = () => {
        // Exit the editing mode without saving changes
        setIsEditingPrice(false);
        localStorage.removeItem(`editing_${name}`);
    };

    return (
        <div className="col-md-4 mb-4">
            <div className="card">
                {isOutOfStock && (
                    <div className="sold-out-label">Sold Out</div>
                )}
                <img src={imagePath} className="card-img-top" alt={name} style={{ height: '200px', objectFit: 'contain' }} />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    {isEditingPrice ? (
                        <div>
                            <label>New Price:</label>
                            <input
                                type="number"
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                            />
                            <button type="button" onClick={handleSavePrice} className="btn btn-success ml-2">
                                Save Price
                            </button>
                            <button type="button" onClick={handleCancelEditPrice} className="btn btn-secondary ml-2">
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <>
                            <p className="card-text">Price: {price} L.L</p>
                            {isOutOfStock ? (
                                <p className="text-danger">Out of Stock</p>
                            ) : (
                                <>
                                    {isAdmin && (
                                        <>
                                            <button type="button" onClick={handleEditPriceClick} className="btn btn-info ml-2">
                                                Edit Price
                                            </button>
                                            <button type="button" onClick={() => onDelete(name)} className="btn btn-danger ml-2">
                                                Delete
                                            </button>
                                            <button type="button" onClick={() => onToggleStock(name)} className="btn btn-secondary ml-2">
                                                Out of Stock
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                    {isOutOfStock && isAdmin && (
                        <button type="button" onClick={() => onToggleStock(name)} className="btn btn-success ml-2">
                            Restore Stock
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Fruits;
