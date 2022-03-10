import {
  CBadge,
  CButton,
  CCardBody,
  CCollapse,
  CDataTable,
} from "@coreui/react";
import { values } from "lodash";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Blog = () => {
  const history = useHistory();
  const [details, setDetails] = useState([]);
  const [usersData, setUserData] = useState([]);
  const [didUpdate, setDidUpdate] = useState(true);

  // const [items, setItems] = useState(usersData)

  //update list
  const updateList = () => {
    const token = localStorage.getItem("authToken");
    console.log(token, "token");
    fetch("http://localhost:4000/blogs/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const arr = values(data);
        setUserData(arr);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //Re render the component
  useEffect(() => {
    updateList();
  }, [didUpdate]);

  //Delete blog
  const deleteBlog = (id) => {
    console.log(id);
    const token = localStorage.getItem("authToken");
    fetch("http://localhost:4000/blogs?id=" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        alert(data.msg);
        setDidUpdate(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const fields = [
    { key: "title", _style: { width: "18%" } },
    { key: "content", _style: { width: "40%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  const getBadge = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "secondary";
      case "Pending":
        return "warning";
      case "Banned":
        return "danger";
      default:
        return "primary";
    }
  };

  /*     useEffect(() => {
    deleteBlog();
  }, [deleteBlog]); */

  /*  const edit = (arrivedId) => {
    alert(arrivedId);
  }; */

  return (
    <div>
      <h1>Blog lists</h1>
      <button onClick={() => history.push("/blogs/add")}>Add</button>
      <CDataTable
        items={usersData}
        fields={fields}
        /* columnFilter
        tableFilter
        footer */
        itemsPerPageSelect
        itemsPerPage={5}
        hover
        sorter
        pagination
        scopedSlots={{
          status: (item) => (
            <td>
              <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
            </td>
          ),
          show_details: (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(index);
                  }}
                >
                  {details.includes(index) ? "Hide" : "Actions"}
                </CButton>
              </td>
            );
          },
          details: (item, index) => {
            return (
              <CCollapse show={details.includes(index)}>
                <CCardBody>
                  {/*                 <h4>{item.username}</h4>
                  <p className="text-muted">User since: {item.registered}</p> */}
                  <CButton
                    size="sm"
                    color="info"
                    onClick={() => history.push(`/blogs/edit/${item.id}`)}
                  >
                    Edit Blog
                  </CButton>
                  <CButton
                    size="sm"
                    color="danger"
                    className="ml-1"
                    onClick={() => {
                      deleteBlog(item.id);
                    }}
                  >
                    Delete
                  </CButton>
                </CCardBody>
              </CCollapse>
            );
          },
        }}
      />
    </div>
  );
};

export default Blog;
