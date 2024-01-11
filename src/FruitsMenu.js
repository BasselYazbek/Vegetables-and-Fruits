/* import React, { useState, useEffect } from 'react';
import Fruits from './Fruits';
import AddItemForm from './AddItemForm';
import { firestore } from './firebase'; */

/* const FruitsMenu = ({ isAdmin }) => {
  const initialMenuItems = [
    {
      name: 'قشطة',
      imagePath: '/MenuPic/Fruits/9ashta.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      name: 'أناناس',
      imagePath: '/MenuPic/Fruits/pineapple.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      name: 'أفوكادو',
      imagePath: '/MenuPic/Fruits/avocado.png',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      name: 'كيوي',
      imagePath: '/MenuPic/Fruits/kiwi.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      name: 'مانغو',
      imagePath: '/MenuPic/Fruits/mango.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      name: 'اجاص',
      imagePath: '/MenuPic/Fruits/njas.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      name: 'رمان',
      imagePath: '/MenuPic/Fruits/pomegranate.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      name: 'جزر',
      imagePath: '/MenuPic/Fruits/carrot.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      name: 'تفاح أحمر',
      imagePath: '/MenuPic/Fruits/red_apple.png',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      name: 'موز',
      imagePath: '/MenuPic/Fruits/banana.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      name: 'تفاح أبيض',
      imagePath: '/MenuPic/Fruits/white_apple.png',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      name: 'فريز',
      imagePath: '/MenuPic/Fruits/strawberry.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      name: 'جوز الهند',
      imagePath: '/MenuPic/Fruits/coconut.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      name: 'Dragon Fruit',
      imagePath: '/MenuPic/Fruits/dragon_fruit.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      name: 'برتقال أبو صرة',
      imagePath: '/MenuPic/Fruits/abu_sorra.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      name: 'بوملي',
      imagePath: '/MenuPic/Fruits/boumali.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      name: 'كريفن',
      imagePath: '/MenuPic/Fruits/krifon.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      name: 'كلمنتين حبة صغيرة',
      imagePath: '/MenuPic/Fruits/kalamantine_big.jpeg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
  {
      name: 'كلمنتين حبة كبيرة',
      imagePath: '/MenuPic/Fruits/kalamantine_small.jpg',
      price: 180000,
      isOutOfStock: false,
      hidden: false,
  },
];


  const [fruitsMenu, setMenuItems] = useState(() => {
    const storedItems = JSON.parse(localStorage.getItem('menuItems'));
    console.log('Stored Items:', storedItems);

    return (
      storedItems ||
      initialMenuItems.map((item) => ({
        ...item,
        isEditing: localStorage.getItem(`editing_${item.name}`) === 'true',
      }))
    );
  }); */

  /*

  const FruitsMenu = ({ isAdmin }) => {
    const [fruitsMenu, setMenuItems] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const fruitsCollection = firestore.collection('fruits');
          const snapshot = await fruitsCollection.get();
          const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          console.log('Fetched Data:', data);
          setMenuItems(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

  const saveItemsToLocalStorage = (items) => {
    localStorage.setItem('menuItems', JSON.stringify(items));
  };

  const handleAddItem = (newItem) => {
    const newItemWithStock = { ...newItem, isOutOfStock: false };
    setMenuItems((prevItems) => [...prevItems, newItemWithStock]);
    saveItemsToLocalStorage([...fruitsMenu, newItemWithStock]);
  };

  const handleEditItem = (updatedItem) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) => (item.name === updatedItem.name ? updatedItem : item))
    );
  
    // Save the updated items to local storage
    saveItemsToLocalStorage(fruitsMenu.map((item) => (item.name === updatedItem.name ? updatedItem : item)));
  };

  const handleDeleteItem = (itemName) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete ${itemName}?`);

    if (shouldDelete) {
      setMenuItems((prevItems) => prevItems.filter((item) => item.name !== itemName));
      saveItemsToLocalStorage([...fruitsMenu.filter((item) => item.name !== itemName)]);
    }
  };

  const toggleStock = (itemName) => {
    const itemIndex = fruitsMenu.findIndex((item) => item.name === itemName);
    const currentItem = fruitsMenu[itemIndex];
  
    // Ask for confirmation
    const confirmMessage = currentItem.isOutOfStock
      ? `Restore ${itemName} to regular stock?`
      : `Mark ${itemName} as Out of Stock?`;
  
    const shouldToggleStock = window.confirm(confirmMessage);
  
    if (shouldToggleStock) {
      // Toggle the 'isOutOfStock' property
      const updatedItem = { ...currentItem, isOutOfStock: !currentItem.isOutOfStock };
  
      // Update the state
      setMenuItems((prevItems) => [
        ...prevItems.slice(0, itemIndex),
        updatedItem,
        ...prevItems.slice(itemIndex + 1),
      ]);

      // Update local storage
    saveItemsToLocalStorage([
      ...fruitsMenu.slice(0, itemIndex),
      updatedItem,
      ...fruitsMenu.slice(itemIndex + 1),
    ]);
  }
};

  return (
    <>
    <div style={{backgroundColor: '#FDF5E6'}}>
      <div className="container">
          <div className="row">
            {fruitsMenu.map((item, index) => (
              <Fruits
                key={index}
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

export default FruitsMenu; */

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
        const snapshot = await fruitsCollection.get();
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
        await fruitsCollection.doc(itemId).delete();

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
