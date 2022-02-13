import React from "react";
import { useHistory } from "react-router-dom";

const Customer = () => {
  const history = useHistory();
  return (
    <div>
      <p>Customer</p>
      <button onClick={() => history.push("/customer/add")}>Add</button>
    </div>
  );
};

export default Customer;
