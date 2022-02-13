import React from "react";
import { useHistory } from "react-router-dom";

const Store = () => {
  const history = useHistory();
  return (
    <div>
      <p>Store</p>
      <button onClick={() => history.push("/store/add")}>Add</button>
    </div>
  );
};

export default Store;
