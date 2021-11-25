import React, { lazy, useEffect, useState } from "react";
import { isObject } from "lodash";
const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));

const Dashboard = () => {
  const [allUsersData, setAlluserData] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log(token, "token");
    fetch("http://localhost:4000/users/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setAlluserData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const getItems = () => {
    const token = localStorage.getItem("authToken");
    console.log(token, "token");
    fetch("http://localhost:4000/items/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success Items:", data.response);
        setItems(data.response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <WidgetsDropdown data={isObject(allUsersData) ? allUsersData : []} />
      <button onClick={() => getItems()}>get items</button>

      {items.map((item, index) => {
        return <li key={index}>{item.itemName}</li>;
      })}
    </>
  );
};

export default Dashboard;
