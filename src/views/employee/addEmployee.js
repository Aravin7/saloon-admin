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
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CLabel,
  CSelect,
  CRow,
  CSwitch,
} from "@coreui/react";
import React from "react";
//import { useHistory } from 'react-dom';

const AddEmployee = () => {
  //const history = useHistory();
  return (
    <div>
      <CRow>
        <CCol xs="12" md="8">
          <CCard>
            <CCardHeader>
              <b>Employee Details</b>
            </CCardHeader>
            <CCardBody>
              <CForm
                action=""
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
              >
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="name-input">Employee Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="name-input"
                      name="name-input"
                      placeholder="Enter Name"
                    />
                    <CFormText>This is a help text</CFormText>
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
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="NIC-input">NIC :</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="NIC-input"
                      name="NIC-input"
                      placeholder="Enter NIC"
                    />
                    <CFormText>This is a help text</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="tel-input">Telephone Number</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="tel"
                      id="tel-input"
                      name="tel-input"
                      placeholder="Enter Telephone Number"
                    />
                    <CFormText>This is a help text</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="street-input">Street</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="street-input"
                      name="street-input"
                      placeholder="street"
                    />
                    <CFormText className="help-block">
                      Please enter Street
                    </CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="city-input">City</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="city-input"
                      name="city-input"
                      placeholder="city"
                    />
                    <CFormText className="help-block">
                      Please enter a city
                    </CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Gender</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="inline-radio1"
                        name="inline-radios"
                        value="option1"
                      />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio1">
                        Male
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="inline-radio2"
                        name="inline-radios"
                        value="option2"
                      />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio2">
                        Female
                      </CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary">
                <CIcon name="cil-scrubber" /> Submit
              </CButton>
              <CButton type="reset" size="sm" color="danger">
                <CIcon name="cil-ban" /> Reset
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default AddEmployee;
