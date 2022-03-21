import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";
import React from "react";
import { Link } from "react-router-dom";

const CancelBtn = (props) => {
  return (
    <>
      <CButton type="cancel" size="sm" color="secondary" value="cancel">
        <CIcon name="cil-x-circle" />{" "}
        <Link className="btn-cancel" to={props.to}>
          Cancel
        </Link>
      </CButton>
    </>
  );
};

export default CancelBtn;
