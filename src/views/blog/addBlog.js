import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow,
  CTextarea,
} from "@coreui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: (userInputData) => {
      submitBlogs(userInputData);
      //console.log(userInputData);
    },
    validationSchema: yup.object({
      title: yup.string().required("title is required").strict().trim(),
      content: yup.string().required("content is required").strict().trim(),
    }),
  });

  const submitBlogs = (userInputData) => {
    const token = localStorage.getItem("authToken");
    //console.log(token);
    const data = userInputData;
    //console.log("title is empty", title === "");

    fetch("http://localhost:4000/blogs", {
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
          alert("blog added successfully");
        } else {
          alert("blog is not added");
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

  /* const resetField = () => {
    setTitle("");
    setContent("");
  }; */

  return (
    <div>
      <CRow>
        <CCol xs="12" md="8">
          <h4>Add New Blog</h4>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" md="10">
          <CForm onSubmit={formik.handleSubmit}>
            <CFormGroup>
              <CLabel htmlFor="title">Title</CLabel>
              <CInput
                type="text"
                id="title"
                name="title"
                placeholder="Enter title.."
                value={formik.values.title}
                onChange={formik.handleChange}
              />
              {/* error message */}
              {formik.errors.title ? (
                <CFormText className="help-block">
                  {formik.errors.title}
                </CFormText>
              ) : null}
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="content">Content</CLabel>
              <CTextarea
                name="content"
                id="content"
                rows="9"
                placeholder="Content..."
                value={formik.values.content}
                onChange={formik.handleChange}
              />
              {/* error message */}
              {formik.errors.content ? (
                <CFormText className="help-block">
                  {formik.errors.content}
                </CFormText>
              ) : null}
            </CFormGroup>
            <CButton
              type="button"
              size="sm"
              color="primary"
              /*  onClick={(e) => {
                submitBlogs(e);
              }} */
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
            </CButton>
          </CForm>
        </CCol>
      </CRow>
    </div>
  );
};

export default AddBlog;
