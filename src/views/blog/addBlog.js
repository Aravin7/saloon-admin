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

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const history = useHistory();

  const submitBlogs = (e) => {
    const token = localStorage.getItem("authToken");
    //console.log(token);
    const data = { title: title, content: content };
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
    e.preventDefault();
  };

  const resetField = () => {
    setTitle("");
    setContent("");
  };

  //const history = useHistory();
  return (
    <div>
      <CRow>
        <CCol xs="12" md="8">
          <h4>Add New Blog</h4>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" md="10">
          <CForm>
            <CFormGroup>
              <CLabel htmlFor="title-input">Title</CLabel>
              <CInput
                type="text"
                id="title-input"
                name="title-input"
                placeholder="Enter title.."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <CFormText className="help-block">Please enter title</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="content-input">Content</CLabel>
              <CTextarea
                name="content-input"
                id="content-input"
                rows="9"
                placeholder="Content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </CFormGroup>
            <CButton
              type="button"
              size="sm"
              color="primary"
              onClick={(e) => {
                submitBlogs(e);
              }}
            >
              <CIcon name="cil-scrubber" /> Submit
            </CButton>{" "}
            <CButton
              type="reset"
              size="sm"
              color="danger"
              value="Reset"
              onClick={(e) => {
                resetField(e);
              }}
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
