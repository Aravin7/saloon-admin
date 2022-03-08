import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

// sidebar nav config
import { admin_nav, emp_nav } from "./_nav";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);
  const role = localStorage.getItem("role");
  //console.log("role", role);

  if (role === "admin") {
    return (
      <CSidebar
        show={show}
        onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
      >
        <CSidebarBrand className="d-md-down-none" to="/">
          <CIcon
            className="c-sidebar-brand-full"
            name="logo-negative"
            height={35}
          />
          <CIcon
            className="c-sidebar-brand-minimized"
            name="sygnet"
            height={35}
          />
        </CSidebarBrand>
        {/*chk user role
        if  user is admin load _nav navigations
        else load those _nav1 navigation*/}
        <CSidebarNav>
          <CCreateElement
            items={admin_nav}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle,
            }}
          />
        </CSidebarNav>
        <CSidebarMinimizer className="c-d-md-down-none" />
      </CSidebar>
    );
  }
  if (role === "emp") {
    return (
      <CSidebar
        show={show}
        onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
      >
        <CSidebarBrand className="d-md-down-none" to="/">
          <CIcon
            className="c-sidebar-brand-full"
            name="logo-negative"
            height={35}
          />
          <CIcon
            className="c-sidebar-brand-minimized"
            name="sygnet"
            height={35}
          />
        </CSidebarBrand>
        {/*chk user role
        if  user is admin load _nav navigations
        else load those _nav1 navigation*/}
        <CSidebarNav>
          <CCreateElement
            items={emp_nav}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle,
            }}
          />
        </CSidebarNav>
        <CSidebarMinimizer className="c-d-md-down-none" />
      </CSidebar>
    );
  }
  // if (role === "customer") {
  //   return alert("you havent privilages to login to the system");
  // return (
  //   <CSidebar
  //     show={show}
  //     onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
  //   >
  //     <CSidebarBrand className="d-md-down-none" to="/">
  //       <CIcon
  //         className="c-sidebar-brand-full"
  //         name="logo-negative"
  //         height={35}
  //       />
  //       <CIcon
  //         className="c-sidebar-brand-minimized"
  //         name="sygnet"
  //         height={35}
  //       />
  //     </CSidebarBrand>
  //     {/*chk user role
  //     if  user is admin load _nav navigations
  //     else load those _nav1 navigation*/}
  //     <CSidebarNav>
  //       <CCreateElement
  //         items={emp_nav}
  //         components={{
  //           CSidebarNavDivider,
  //           CSidebarNavDropdown,
  //           CSidebarNavItem,
  //           CSidebarNavTitle,
  //         }}
  //       />
  //     </CSidebarNav>
  //     <CSidebarMinimizer className="c-d-md-down-none" />
  //   </CSidebar>
  //   ) ;
  // }
}; //end of sidebar
export default React.memo(TheSidebar);
