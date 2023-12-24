/* import React, { useState } from 'react';
import Fruits from './Fruits';
import AddItemPage from './AddItemPage';

const FruitsMenu = ({ isAdmin }) => {
  const [FruitsMenu, setMenuItems] = useState([
    {
        name: 'قشطة',
        imagePath: '/MenuPic/Fruits/9ashta.jpg',
        price: 180000,
    },
    {
        name: 'أناناس',
        imagePath: '/MenuPic/Fruits/pineapple.jpg',
        price: 180000,
    },
    {
        name: 'أفوكادو',
        imagePath: '/MenuPic/Fruits/avocado.png',
        price: 180000,
    },
    {
        name: 'كيوي',
        imagePath: '/MenuPic/Fruits/kiwi.jpg',
        price: 180000,
    },
    {
        name: 'مانغو',
        imagePath: '/MenuPic/Fruits/mango.jpg',
        price: 180000,
    },
    {
        name: 'اجاص',
        imagePath: '/MenuPic/Fruits/njas.jpg',
        price: 180000,
    },
    {
        name: 'رمان',
        imagePath: '/MenuPic/Fruits/pomegranate.jpg',
        price: 180000,
    },
    {
        name: 'جزر',
        imagePath: '/MenuPic/Fruits/carrot.jpg',
        price: 180000,
    },
    {
        name: 'تفاح أحمر',
        imagePath: '/MenuPic/Fruits/red_apple.png',
        price: 180000,
    },
    {
        name: 'موز',
        imagePath: '/MenuPic/Fruits/banana.jpg',
        price: 180000,
    },
    {
        name: 'تفاح أبيض',
        imagePath: '/MenuPic/Fruits/white_apple.png',
        price: 180000,
    },
    {
        name: 'فريز',
        imagePath: '/MenuPic/Fruits/strawberry.jpg',
        price: 180000,
    },
    {
        name: 'جوز الهند',
        imagePath: '/MenuPic/Fruits/coconut.jpg',
        price: 180000,
    },
    {
        name: 'برتقال أبو صرة',
        imagePath: '/MenuPic/Fruits/abu_sorra.jpg',
        price: 180000,
    },
    {
        name: 'بوملي',
        imagePath: '/MenuPic/Fruits/boumali.jpg',
        price: 180000,
    },
    {
        name: 'كريفن',
        imagePath: '/MenuPic/Fruits/krifon.jpg',
        price: 180000,
    },
    {
        name: 'كلمنتين حبة صغيرة',
        imagePath: '/MenuPic/Fruits/kalamantine_big.jpeg',
        price: 180000,
    },
    {
        name: 'كلمنتين حبة كبيرة',
        imagePath: '/MenuPic/Fruits/kalamantine_small.jpg',
        price: 180000,
    },
  ]);

  // State to track hidden items
  const [hiddenItems, setHiddenItems] = useState([]);

  const handleAddItem = (newItem) => {
    setMenuItems((prevItems) => [...prevItems, newItem]);
  };

  const handleEditItem = (updatedItem) => {
    setMenuItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.name === updatedItem.name ? updatedItem : item
      );
      localStorage.setItem('menuItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleDeleteItem = (itemName) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete ${itemName}?`);

    if (shouldDelete) {
      setMenuItems((prevItems) => {
        const updatedMenuItems = prevItems.filter((item) => item.name !== itemName);
        localStorage.setItem('menuItems', JSON.stringify(updatedMenuItems));
        return updatedMenuItems;
      });
    }
  };

  // Function to toggle the visibility of an item
  const toggleVisibility = (itemName) => {
    setHiddenItems((prevHiddenItems) =>
      prevHiddenItems.includes(itemName)
        ? prevHiddenItems.filter((item) => item !== itemName)
        : [...prevHiddenItems, itemName]
    );
  };

  // Function to check if an item is hidden
  const isHidden = (itemName) => hiddenItems.includes(itemName);

  return (
    <>
      <div className="container">
        <div className="row">
          {FruitsMenu.map((fruitsMenu, index) => (
            <Fruits
              key={index}
              {...fruitsMenu}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
              isAdmin={isAdmin}
              onToggleVisibility={toggleVisibility}
            />
          ))}
        </div>
      </div>

      {isAdmin && (
        <div>
          <AddItemPage onAddItem={handleAddItem} />
        </div>
      )}
    </>
  );
};

export default FruitsMenu;
 */


/* 
import React, { useState, useEffect } from 'react';
import Fruits from './Fruits';
import AddItemPage from './AddItemPage';

const FruitsMenu = ({ isAdmin }) => {
  const initialMenuItems = [
    {
      name: 'قشطة',
      imagePath: '/MenuPic/Fruits/9ashta.jpg',
      price: 180000,
      hidden: false,
  },
  {
      name: 'أناناس',
      imagePath: '/MenuPic/Fruits/pineapple.jpg',
      price: 180000,
      hidden: false,
  },
  {
      name: 'أفوكادو',
      imagePath: '/MenuPic/Fruits/avocado.png',
      price: 180000,
      hidden: false,
  },
  {
      name: 'كيوي',
      imagePath: '/MenuPic/Fruits/kiwi.jpg',
      price: 180000,
      hidden: false,
  },
  {
      name: 'مانغو',
      imagePath: '/MenuPic/Fruits/mango.jpg',
      price: 180000,
      hidden: false,
  },
  {
      name: 'اجاص',
      imagePath: '/MenuPic/Fruits/njas.jpg',
      price: 180000,
      hidden: false,
  },
  {
      name: 'رمان',
      imagePath: '/MenuPic/Fruits/pomegranate.jpg',
      price: 180000,
      hidden: false,
  },
  {
      name: 'جزر',
      imagePath: '/MenuPic/Fruits/carrot.jpg',
      price: 180000,
      hidden: false,
  },
  {
      name: 'تفاح أحمر',
      imagePath: '/MenuPic/Fruits/red_apple.png',
      price: 180000,
      hidden: false,
  },
  {
      name: 'موز',
      imagePath: '/MenuPic/Fruits/banana.jpg',
      price: 180000,
      hidden: false,
  },
  {
      name: 'تفاح أبيض',
      imagePath: '/MenuPic/Fruits/white_apple.png',
      price: 180000,
      hidden: false,
  },
  {
      name: 'فريز',
      imagePath: '/MenuPic/Fruits/strawberry.jpg',
      price: 180000,
      hidden: false,
  },
  {
      name: 'جوز الهند',
      imagePath: '/MenuPic/Fruits/coconut.jpg',
      price: 180000,
      hidden: false,
  },
  {
      name: 'برتقال أبو صرة',
      imagePath: '/MenuPic/Fruits/abu_sorra.jpg',
      price: 180000,
      hidden: false,
  },
  {
      name: 'بوملي',
      imagePath: '/MenuPic/Fruits/boumali.jpg',
      price: 180000,
      hidden: false,
  },
  {
      name: 'كريفن',
      imagePath: '/MenuPic/Fruits/krifon.jpg',
      price: 180000,
      hidden: false,
  },
  {
      name: 'كلمنتين حبة صغيرة',
      imagePath: '/MenuPic/Fruits/kalamantine_big.jpeg',
      price: 180000,
      hidden: false,
  },
  {
      name: 'كلمنتين حبة كبيرة',
      imagePath: '/MenuPic/Fruits/kalamantine_small.jpg',
      price: 180000,
      hidden: false,
  },
  ];

  const [fruitsMenu, setMenuItems] = useState(initialMenuItems);
  const [hiddenItems, setHiddenItems] = useState([]);

  useEffect(() => {
    // Load hidden items from local storage on component mount
    const storedHiddenItems = JSON.parse(localStorage.getItem('hiddenItems')) || [];
    setHiddenItems(storedHiddenItems);
  }, []);
  
  useEffect(() => {
    // Save menu items and hidden items to local storage whenever the state changes
    const menuItemsCopy = JSON.parse(JSON.stringify(fruitsMenu));
    const hiddenItemsCopy = [...hiddenItems];
  
    localStorage.setItem('menuItems', JSON.stringify(menuItemsCopy, null, 2));
    localStorage.setItem('hiddenItems', JSON.stringify(hiddenItemsCopy, null, 2));
  }, [fruitsMenu, hiddenItems]);  

  const handleAddItem = (newItem) => {
    setMenuItems((prevItems) => [...prevItems, newItem]);
  };

  const handleEditItem = (updatedItem) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) => (item.name === updatedItem.name ? updatedItem : item))
    );
  };

  const handleDeleteItem = (itemName) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete ${itemName}?`);

    if (shouldDelete) {
      setMenuItems((prevItems) => prevItems.filter((item) => item.name !== itemName));
    }
  };

  const toggleVisibility = (itemName) => {
    setHiddenItems((prevHiddenItems) =>
      prevHiddenItems.includes(itemName)
        ? prevHiddenItems.filter((item) => item !== itemName)
        : [...prevHiddenItems, itemName]
    );
  };

  const isHidden = (itemName) => hiddenItems.includes(itemName);

  return (
    <>
      <div className="container">
        <div className="row">
          {fruitsMenu.map((item, index) => (
            <Fruits
              key={index}
              {...item}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
              isAdmin={isAdmin}
              onToggleVisibility={toggleVisibility}
              isHidden={isHidden(item.name)}
            />
          ))}
        </div>
      </div>

      {isAdmin && (
        <div>
          <AddItemPage onAddItem={handleAddItem} />
        </div>
      )}
    </>
  );
};

export default FruitsMenu;
 */


// FruitsMenu.js
// FruitsMenu.js
// FruitsMenu.js
import React, { useState, useEffect } from 'react';
import Fruits from './Fruits';
import AddItemPage from './AddItemPage';

const FruitsMenu = ({ isAdmin }) => {
  const initialMenuItems = [
    {
      name: 'قشطة',
      imagePath: '/MenuPic/Fruits/9ashta.jpg',
      price: 180000,
      isOutOfStock: false,
  },
  {
      name: 'أناناس',
      imagePath: '/MenuPic/Fruits/pineapple.jpg',
      price: 180000,
      isOutOfStock: false,
  },
  {
      name: 'أفوكادو',
      imagePath: '/MenuPic/Fruits/avocado.png',
      price: 180000,
      isOutOfStock: false,
  },
  {
      name: 'كيوي',
      imagePath: '/MenuPic/Fruits/kiwi.jpg',
      price: 180000,
      isOutOfStock: false,
  },
  {
      name: 'مانغو',
      imagePath: '/MenuPic/Fruits/mango.jpg',
      price: 180000,
      isOutOfStock: false,
  },
  {
      name: 'اجاص',
      imagePath: '/MenuPic/Fruits/njas.jpg',
      price: 180000,
      isOutOfStock: false,
  },
  {
      name: 'رمان',
      imagePath: '/MenuPic/Fruits/pomegranate.jpg',
      price: 180000,
      isOutOfStock: false,
  },
  {
      name: 'جزر',
      imagePath: '/MenuPic/Fruits/carrot.jpg',
      price: 180000,
      isOutOfStock: false,
  },
  {
      name: 'تفاح أحمر',
      imagePath: '/MenuPic/Fruits/red_apple.png',
      price: 180000,
      isOutOfStock: false,
  },
  {
      name: 'موز',
      imagePath: '/MenuPic/Fruits/banana.jpg',
      price: 180000,
      isOutOfStock: false,
  },
  {
      name: 'تفاح أبيض',
      imagePath: '/MenuPic/Fruits/white_apple.png',
      price: 180000,
      isOutOfStock: false,
  },
  {
      name: 'فريز',
      imagePath: '/MenuPic/Fruits/strawberry.jpg',
      price: 180000,
      isOutOfStock: false,
  },
  {
      name: 'جوز الهند',
      imagePath: '/MenuPic/Fruits/coconut.jpg',
      price: 180000,
      isOutOfStock: false,
  },
  {
      name: 'برتقال أبو صرة',
      imagePath: '/MenuPic/Fruits/abu_sorra.jpg',
      price: 180000,
      isOutOfStock: false,
  },
  {
      name: 'بوملي',
      imagePath: '/MenuPic/Fruits/boumali.jpg',
      price: 180000,
      isOutOfStock: false,
  },
  {
      name: 'كريفن',
      imagePath: '/MenuPic/Fruits/krifon.jpg',
      price: 180000,
      isOutOfStock: false,
  },
  {
      name: 'كلمنتين حبة صغيرة',
      imagePath: '/MenuPic/Fruits/kalamantine_big.jpeg',
      price: 180000,
      isOutOfStock: false,
  },
  {
      name: 'كلمنتين حبة كبيرة',
      imagePath: '/MenuPic/Fruits/kalamantine_small.jpg',
      price: 180000,
      isOutOfStock: false,
  },
  ];

  const [fruitsMenu, setMenuItems] = useState(initialMenuItems);

  useEffect(() => {
    // Load items from local storage on component mount
    const storedItems = JSON.parse(localStorage.getItem('menuItems'));
  
    // Check if storedItems is an array and each item has the required properties
    if (Array.isArray(storedItems) && storedItems.every(item => 'name' in item && 'imagePath' in item && 'price' in item && 'isOutOfStock' in item)) {
      setMenuItems(storedItems);
    } else {
      // If the stored data is not valid, set the initial items
      setMenuItems(initialMenuItems);
    }
  }, []);

  const handleAddItem = (newItem) => {
    const newItemWithStock = { ...newItem, isOutOfStock: false };
    setMenuItems((prevItems) => [...prevItems, newItemWithStock]);
  };

  const handleEditItem = (updatedItem) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) => (item.name === updatedItem.name ? updatedItem : item))
    );
  };

  const handleDeleteItem = (itemName) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete ${itemName}?`);

    if (shouldDelete) {
      setMenuItems((prevItems) => prevItems.filter((item) => item.name !== itemName));
    }
  };

  const toggleStock = (itemName) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.name === itemName ? { ...item, isOutOfStock: !item.isOutOfStock } : item
      )
    );
  };

  return (
    <>
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
            />
          ))}
        </div>
      </div>

      {isAdmin && (
        <div>
          <AddItemPage onAddItem={handleAddItem} />
        </div>
      )}
    </>
  );
};

export default FruitsMenu;
