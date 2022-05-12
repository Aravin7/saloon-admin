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
  CLabel,
  CRow,
} from "@coreui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import CancelBtn from "src/compoents/buttons/CancelBtn";

const AddStoreItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      quantity: "",
      manufacturer: "",
      contactNo: "",
      supplier: "",
    },
    onSubmit: (userInputData) => {
      submitItems(userInputData);
      console.log(userInputData);
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required").strict().trim(),
      description: yup
        .string()
        .required("Description is required")
        .strict()
        .trim(),
      quantity: yup
        .number()
        .integer()
        .required("Quantity is required")
        .positive()
        .default(0),
      manufacturer: yup
        .string()
        .required("Manufacturer is required")
        .strict()
        .trim(),
      contactNo: yup
        .number()
        .integer()
        .required("Quantity is required")
        .positive()
        .default(0),
      supplier: yup
        .string()
        .required("Supplier Name is required")
        .strict()
        .trim(),
    }),
  });

  /*   const submitItems = (userInputData) => {
    const token = localStorage.getItem("authToken");
    console.log(userInputData);
  }; */

  const submitItems = (userInputData) => {
    const token = localStorage.getItem("authToken");
    //console.log(token);
    const data = userInputData;
    //console.log("title is empty", title === "");

    fetch("http://localhost:4000/inventory", {
      method: "POST",
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
          alert("Inventory Items added successfully");
        } else {
          alert("Inventory Items is not added");
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

  return (
    <div>
      <CRow>
        <CCol xs="12" md="8">
          <CCard>
            <CCardHeader>
              <b>Add New Inventory Item</b>
            </CCardHeader>
            <CCardBody>
              <CForm
                onSubmit={formik.handleSubmit}
                //action=""
                // method="post"
                encType="multipart/form-data"
                className="form-horizontal"
              >
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="name-input">Item Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter Item Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                    {/* error message */}
                    {formik.errors.name ? (
                      <CFormText className="help-block">
                        {formik.errors.name}
                      </CFormText>
                    ) : null}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="description-input">
                      Item Description
                    </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="description"
                      name="description"
                      placeholder="Item description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    />
                    {/* error message */}
                    {formik.errors.description ? (
                      <CFormText className="help-block">
                        {formik.errors.description}
                      </CFormText>
                    ) : null}
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="quantity-input">Quantity</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="number"
                      id="quantity"
                      name="quantity"
                      placeholder="quantity"
                      value={formik.values.quantity}
                      onChange={formik.handleChange}
                    />
                    {/* error message */}
                    {formik.errors.quantity ? (
                      <CFormText className="help-block">
                        {formik.errors.quantity}
                      </CFormText>
                    ) : null}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="supplier-input">Supplier Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="text"
                      id="supplier"
                      name="supplier"
                      placeholder="Supplier Name"
                      value={formik.values.supplier}
                      onChange={formik.handleChange}
                    />
                    {/* error message */}
                    {formik.errors.supplier ? (
                      <CFormText className="help-block">
                        {formik.errors.supplier}
                      </CFormText>
                    ) : null}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="contactNo-input">Contact Number</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="telephone"
                      id="contactNo"
                      name="contactNo"
                      placeholder="Contact Number"
                      value={formik.values.contactNo}
                      onChange={formik.handleChange}
                    />
                    {/* error message */}
                    {formik.errors.contactNo ? (
                      <CFormText className="help-block">
                        {formik.errors.contactNo}
                      </CFormText>
                    ) : null}
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton
                type="submit"
                size="sm"
                color="primary"
                onClick={formik.handleSubmit}
              >
                <CIcon name="cil-scrubber" /> Submit
              </CButton>{" "}
              <CButton
                type="reset"
                size="sm"
                color="danger"
                value="Reset"
                onClick={formik.handleReset}
              >
                <CIcon name="cil-ban" /> Reset
              </CButton>{" "}
              <CancelBtn to={"."} />
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default AddStoreItem;
