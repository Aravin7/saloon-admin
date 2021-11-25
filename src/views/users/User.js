import React, { Fragment, useEffect, useState } from "react";
import {
  CAlert,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import { values } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CIcon from "@coreui/icons-react";

const User = (props) => {
  const { id } = props.match.params;
  const [userData, setUserData] = useState([]);
  const [displayEditForm, setdisplayEditForm] = useState("none");
  const [showAlert, setShowAlert] = useState(false);
  const [responseData, setResponseData] = useState([]);
  // const [test, setTest] = useState("ABCD");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    fetch("http://localhost:4000/users/user?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data !== "No Data") {
          const arr = values(data);
          setUserData(arr);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  const updateUserName = (value) => {
    const newData = { ...userData[0], username: value };
    setUserData([newData]);
  };

  const updateUserEmail = (value) => {
    const newData = { ...userData[0], email: value };
    setUserData([newData]);
  };

  const updateData = () => {
    const token = localStorage.getItem("authToken");
    fetch("http://localhost:4000/users/user?id=" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(userData[0]),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponseData(data);
        setShowAlert(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const formTextBox = (value, func) => {
    return (
      <input type="text" value={value} onChange={(e) => func(e.target.value)} />
    );
  };

  // controlled component
  return (
    <CRow>
      <CCol lg={12}>
        <div className="mt-2">
          <CAlert
            onClick={() => {
              setShowAlert(false);
            }}
            show={showAlert}
            color={responseData.status === 400 ? "primary" : "info"}
            closeButton
          >
            {responseData.msg}
          </CAlert>
        </div>
        <CCard>
          <CCardHeader>User id: {userData.length > 0 ? id : ""}</CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <thead>
                {/* <tr>
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>Action</th>
                </tr> */}
              </thead>
              <tbody>
                {userData.length > 0 ? (
                  <Fragment>
                    <tr
                      style={{
                        display: displayEditForm === "block" ? "none" : "block",
                      }}
                    >
                      <td>{`${userData[0].username}`}</td>
                      <td>
                        <strong>{userData[0].email}</strong>
                      </td>
                      <td>
                        <input
                          type="button"
                          onClick={() => {
                            setdisplayEditForm("block");
                          }}
                          value="Edit"
                        />
                      </td>
                    </tr>
                    <tr style={{ display: displayEditForm }}>
                      <td>
                        {formTextBox(userData[0].username, updateUserName)}
                      </td>
                      <td>{formTextBox(userData[0].email, updateUserEmail)}</td>
                      <td>
                        <input
                          type="button"
                          onClick={() => {
                            setdisplayEditForm("none");
                            updateData();
                          }}
                          value="Update"
                        />
                      </td>
                    </tr>
                  </Fragment>
                ) : (
                  <span> Not found</span>
                )}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default User;
