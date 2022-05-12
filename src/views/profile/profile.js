import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CInputRadio,
  CLabel,
  CRow,
} from "@coreui/react";
import { Formik } from "formik";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CancelBtn from "src/compoents/buttons/CancelBtn";
import * as yup from "yup";

//import { useHistory } from "react-router-dom";

const Profile = () => {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  //const userName = localStorage.getItem("name");
  const userEmail = localStorage.getItem("email");
  let f_name = localStorage.getItem("f_name");
  let l_name = localStorage.getItem("l_name");

  /*   const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    enableReinitialize: true,
    onSubmit: (userInputData) => {
      console.log(userInputData);
      updateUserDetails(userInputData);
    },
    validationSchema: yup.object({
      title: yup.string().required("title is required").strict().trim(),
      content: yup.string().required("content is required").strict().trim(),
    }),
  }); */
  /* 
  const updateUserDetails = (userInputData) => {
    //call thee api to update the user profile
    const token = localStorage.getItem("authToken");
    //console.log(token);
    const data = userInputData;
    console.log(token);
    //console.log("title is empty", title === "");

    fetch("http://localhost:4000/user/edit?id=" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        response.json();
        console.log("response", response);
        console.log("response", response.ok);
        if (response.ok) {
          alert("blog updated successfully");
        } else {
          alert("blog is not updated");
        }
        //history.push("/blogs");
        history.go(-1);
      })
      .then((data) => {
        console.log("data", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // e.preventDefault();
  };
 */
  return (
    <div>
      <CRow>
        <CCol xs="12" md="8">
          <CCard>
            <CCardHeader>
              <b>User Profile Details</b>
            </CCardHeader>
            <CCardBody>
              <CForm
                action=""
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
              >
                {/* <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="name">User Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="name"
                      name="name"
                      placeholder="Enter Name"
                      value={userName}
                    />
                    <CFormText> Please enter your Name</CFormText>
                  </CCol>
                </CFormGroup> */}
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="f_name">First Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="f_name"
                      name="f_name"
                      placeholder="Enter Name"
                      defaultValue={f_name}
                    />
                    <CFormText> Please enter your First Name</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="l_name">Last Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="l_name"
                      name="l_name"
                      placeholder="Enter Last Name"
                      defaultValue={l_name}
                    />
                    <CFormText> Please enter your Last Name</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Email Address</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="email"
                      id="email-input"
                      name="email-input"
                      placeholder="Enter Email"
                      autoComplete="email"
                      defaultValue={userEmail}
                    />
                    <CFormText className="help-block">
                      Please enter your email
                    </CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="password-input">Password</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="password"
                      id="password-input"
                      name="password-input"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                    <CFormText className="help-block">
                      Please enter a complex password
                    </CFormText>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CButton
        type="reset"
        size="sm"
        color="danger"
        value="Reset"
        onClick={Formik.handleReset}
      >
        <CIcon name="cil-ban" /> Update
      </CButton>{" "}
      <CancelBtn to={"."} />
    </div>
  );
};

export default Profile;
