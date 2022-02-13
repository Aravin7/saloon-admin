import React from "react";
import { useHistory } from "react-router-dom";

const Employee = () => {
  const history = useHistory();
  return (
    <div>
      <p>Employee Details</p>
      <button onClick={() => history.push("/employee/add")}>Add</button>
    </div>
  );
};

export default Employee;
