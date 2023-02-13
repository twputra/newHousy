import React from "react";
import Image from "react-bootstrap/Image";
import imgp from "../assets/img/imgp.png";
import { useNavigate } from "react-router-dom";

import { BsPerson, BsCalendar3 } from "react-icons/bs";
import { RiNewspaperLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";

import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";

import Dropdown from "react-bootstrap/Dropdown";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

function DropdwonLogin(props) {
  const [state, dispatch] = useContext(UserContext);
  console.log(state.user.listAsRole);

  let navigate = useNavigate();

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  return (
    <>
      <Dropdown
        align="end"
        style={{ color: "white", backgroundColor: "white", border: "white" }}
        id="dropdown-basic-button"
        title="Dropdown button"
      >
        <DropdownToggle
          className="p-0 rounded-circle"
          style={{ width: "50px", height: "50px" }}
          variant="white"
        >
          <Image roundedCircle className="si" src={imgp} />
        </DropdownToggle>
        <DropdownMenu>
          <Dropdown.Item
            onClick={() => {
              navigate("/profile");
            }}
            className="dropDownNav"
          >
            <BsPerson />
            <span style={{ color: "black" }}> Profile</span>
          </Dropdown.Item>
          {state.user.listAsRole === "Tenant" ? (
            <>
              <Dropdown.Item
                onClick={() => {
                  navigate(`/mybookingtenant`);
                }}
                className="dropDownNav"
              >
                <RiNewspaperLine />
                <span style={{ color: "black" }}> My Booking</span>{" "}
              </Dropdown.Item>{" "}
              <Dropdown.Item
                onClick={() => {
                  navigate(`/history`);
                }}
                className="dropDownNav"
              >
                <BsCalendar3 />
                <span style={{ color: "black" }}> History</span>
              </Dropdown.Item>
              <Dropdown.Divider />
            </>
          ) : (
            <>
              <Dropdown.Item
                onClick={() => {
                  navigate(`/add-property`);
                }}
                className="dropDownNav"
              >
                <RiNewspaperLine />
                <span style={{ color: "black" }}> Add Property</span>{" "}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  navigate(`/invoiceowner`);
                }}
                className="dropDownNav"
              >
                <BsCalendar3 />
                <span style={{ color: "black" }}> History</span>
              </Dropdown.Item>
              <Dropdown.Divider />
            </>
          )}

          <Dropdown.Item onClick={logout} className="dropDownNav">
            <FiLogOut />
            <span style={{ color: "black" }}> Logout </span>
          </Dropdown.Item>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}

export default DropdwonLogin;
// export default VariantsExample;
