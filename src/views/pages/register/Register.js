import React, { useState } from "react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router";
import { isEmpty } from "lodash";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory();

  const createAccount = () => {
    /* Chk whether method works or not */
    //console.log("method clicked");
    //const token = localStorage.getItem("authToken");

    /* Try to register the user
    if successfully register the user,redirect to the login page
    else show the relevant error msg */
    const data = { username: username, password: password, email: email };
    console.log(isEmpty(data, true));

    if (isEmpty(data)) {
      fetch("http://localhost:4000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          setResponseData(data);
          setShowAlert(true);
          setUsername("");
          setPassword("");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      alert("please fill the form");
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <div className="mt-2">
          <CAlert
            show={showAlert}
            onClick={() => {
              if (responseData.status === 200) history.push("/login");
              setShowAlert(false);
            }}
            color={responseData.status === 400 ? "primary" : "info"}
            closeButton
          >
            {responseData.msg}
          </CAlert>
        </div>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      //autoComplete="username"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Email"
                      //autoComplete="current-email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      //autoComplete="password"
                    />
                  </CInputGroup>
                  {/* <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup> */}
                  <CButton onClick={createAccount} color="success" block>
                    Create Account
                  </CButton>
                </CForm>
              </CCardBody>
              {/* <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block>
                      <span>facebook</span>
                    </CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block>
                      <span>twitter</span>
                    </CButton>
                  </CCol>
                </CRow>
              </CCardFooter> */}
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
