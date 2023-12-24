import React, { useState } from 'react';
import EditItemPage from './EditItemPage';

const Vegetables = ({ name, imagePath, price, onEdit, onDelete, isAdmin }) => {
    const [ isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
    }

    if (isEditing) {
        // Render the EditItemPage component for editing
        return (
          <EditItemPage
            item={{ name, price, image: imagePath }}
            onEditItem={(updatedItem) => {
              onEdit(updatedItem);
              handleCancelEdit();
            }}
            onCancelEdit={handleCancelEdit}
          />
        );
      }

  return (
    <div className="col-md-4 mb-4">
    <div className="card">
      <img src={imagePath} className="card-img-top" alt={name} style={{ height: '200px', objectFit: 'contain' }} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Price: {price} L.L</p>
        {isAdmin && (
            <>
                <button type="button" onClick={handleEditClick} className="btn btn-warning">
                    Edit
                </button>
                <button type="button" onClick={() => onDelete(name)} className="btn btn-danger ml-2">
                    Delete
                </button>
            </>
        )}
      </div>
    </div>
  </div>
)};

export default Vegetables;
