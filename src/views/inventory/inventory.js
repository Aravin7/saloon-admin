import React from "react";
import { useHistory } from "react-router-dom";

const Inventory = () => {
  const history = useHistory();
  return (
    <div>
      <p>Inventory</p>
      <button onClick={() => history.push("/inventory/add")}>Add</button>
    </div>
  );
};

export default Inventory;
