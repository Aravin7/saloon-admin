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
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import CancelBtn from "src/compoents/buttons/CancelBtn";

const EditItem = (props) => {
  const { id } = props.match.params;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [contactNo, setContactNo] = useState("");

  const history = useHistory();

  /* const phoneRegExp = /^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/; */
  const phoneRegExp = /^([+]?\d{10}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;

  const formik = useFormik({
    initialValues: {
      name: name,
      description: description,
      quantity: quantity,
      manufacturer: manufacturer,
      contactNo: contactNo,
    },
    enableReinitialize: true,
    //validateOnChange:false,
    //validateOnBlur:false,
    onSubmit: (userInputData) => {
      //submitItems(userInputData);
      //console.log(userInputData);
      updateInventory(userInputData);
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required").strict().trim(),
      description: yup.string().required("Description is required").trim(),
      quantity: yup
        .number()
        .integer()
        .required("Quantity is required")
        .positive()
        .default(0),
      manufacturer: yup.string().strict().trim(),
      contactNo: yup
        .string()
        .matches(phoneRegExp, "Phone number is contains 10 digits"),
    }),
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log(token, "inventory token");
    console.log("Edit inventory");
    fetch("http://localhost:4000/inventory/inventory?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        /* console.log("data", data);
        console.log("data from editBlog", data.[0].manufacturedBy);
        console.log("data from editBlog", data.[0].itemName);
        console.log("data from editBlog", data.[0].itemDescription);*/
        setName(data[0].itemName);
        setDescription(data[0].itemDescription);
        setQuantity(data[0].quantity);
        setManufacturer(data[0].manufacturedBy);
        setContactNo(data[0].contactNo);
        console.log("name", name);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id, name]);

  const updateInventory = (userInputData) => {
    console.log(userInputData);
    const token = localStorage.getItem("authToken");
    //console.log(token);
    const data = userInputData;
    console.log(token);
    //console.log("title is empty", title === "");

    fetch("http://localhost:4000/inventory/edit?id=" + id, {
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
          alert("Inventory updated successfully");
        } else {
          alert("Inventory is not updated");
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
  };

  const resetField = () => {
    setName("");
    setDescription("");
    setQuantity("");
    setManufacturer("");
    setContactNo("");
  };

  return (
    <div>
      <CRow>
        <CCol xs="12" md="8">
          <CCard>
            <CCardHeader>
              <b>Edit Inventory Item form</b>
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
                      defaultValue={name}
                      //value={formik.values.name}
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
                      type="text"
                      id="description"
                      name="description"
                      placeholder="Item description"
                      //value={formik.values.description}
                      defaultValue={description}
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
                      defaultValue={quantity}
                      //value={formik.values.quantity}
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
                    <CLabel htmlFor="manufacturer-input">Manufacturer</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="text"
                      id="manufacturer"
                      name="manufacturer"
                      placeholder="Manufacturer Name"
                      defaultValue={manufacturer}
                      //value={formik.values.manufacturer}
                      onChange={formik.handleChange}
                    />
                    {/* error message */}
                    {formik.errors.manufacturer ? (
                      <CFormText className="help-block">
                        {formik.errors.manufacturer}
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
                      type="tel"
                      id="contactNo"
                      name="contactNo"
                      placeholder="Contact Number"
                      defaultValue={contactNo}
                      //value={formik.values.contactNo}
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
                onClick={() => resetField()}
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

export default EditItem;
