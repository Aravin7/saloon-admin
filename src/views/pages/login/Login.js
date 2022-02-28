import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CAlert,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useDispatch } from "react-redux";
import { isObject } from "lodash";
import { useHistory } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  //const [showAlert, setShowAlert] = useState(false);

  const [message, setMessage] = useState("");

  const authenticateUser = () => {
    const data = { email: email, password: password };
    /* console.log("typeof(data)", typeof data);
    console.log("typeof(email)", email); */

    /*  if (email === "" || password === "" || (email === "" && password === "")) {
      setMessage(
        "You have forgot to enter the credentials,Please fill it and try again !"
      );
    } */

    fetch("http://localhost:4000/users/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("Success:", data.token);
        if (isObject(data)) {
          let role = String(data.role);
          //console.log("role", role);
          //console.log("data", data);

          //Set localStorage variables
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("role", data.role);
          dispatch({ type: "auth", authData: data });

          //Redirect to dashboard
          if (role === "admin" || role === "emp") {
            if (role === "admin") {
              localStorage.setItem("name", data.admin_name);
            } else {
              localStorage.setItem("name", data.emp_name);
            }
            history.push("/dashboard");
          }
          // alert popup when try to log in the non-user of the system
          else
            setMessage(
              "You haven't had any credentials to have log into the System"
            );
        } else {
          //alert popup when username or password is wrong.
          // alert(data);
          setMessage(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    //  }  else {
    //   setMessage(
    //     "You have forgot to enter the credentials,Please fill it and try again !"
    //   );
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                {/* Error message */}
                <CAlert>
                  <small>{message}</small>
                </CAlert>
                {/*  <h1 className="msg-error">{message}</h1> */}

                <CCardBody className="login-card">
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="current-email"
                      />
                      {/*   <CFormText className="help-block">
                        Please enter your email
                      </CFormText> */}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                      />
                      {/*  <CFormText className="help-block">
                        Please enter your password
                      </CFormText> */}
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          onClick={() => authenticateUser()}
                          color="primary"
                          className="px-4"
                        >
                          Login
                        </CButton>
                      </CCol>
                      {/* <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
