import {
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import React from "react";
//import { useHistory } from 'react-dom';

const AddBlog = () => {
  //const history = useHistory();
  return (
    <div>
      <p>New Blog</p>
      <CContainer fluid>
        <CRow>
          <CCol sm="12">
            <CForm action="" method="post">
              <CFormGroup>
                <CLabel htmlFor="nf-email">Email</CLabel>
                <CInput
                  type="email"
                  id="nf-email"
                  name="nf-email"
                  placeholder="Enter Email.."
                  autoComplete="email"
                />
                <CFormText className="help-block">
                  Please enter your email
                </CFormText>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-password">Password</CLabel>
                <CInput
                  type="password"
                  id="nf-password"
                  name="nf-password"
                  placeholder="Enter Password.."
                  autoComplete="current-password"
                />
                <CFormText className="help-block">
                  Please enter your password
                </CFormText>
              </CFormGroup>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default AddBlog;
