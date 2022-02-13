import React from "react";
//import { useHistory } from "react-router-dom";

const Profile = () => {
  //const history = useHistory();

  const updateUserDetails = () => {
    //call thee api to update the user profile
  };

  return (
    <div>
      <h1>User Profile</h1>
      <button onClick={() => updateUserDetails()}>Add</button>
    </div>
  );
};

export default Profile;
