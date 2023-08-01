import React, { useEffect, useState } from "react";
import db from "./db"; // Assuming you have the db service in a separate file

const SearchPage = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        await db.connect(); // Connect to the MongoDB database
        const result = await db.menuitem(); // Retrieve menu items
        setMenuItems(result);
      } catch (error) {
        console.log(error.message);
        // Handle error
      }
    }

    fetchMenuItems();
  }, []);

  return (
    <div>
      <h1>Menu Items</h1>
      <ul>
        {menuItems.map((item) => (
          <li key={item._id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Category: {item.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
