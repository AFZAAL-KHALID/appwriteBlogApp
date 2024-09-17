import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../Store/AuthSlice";
import authservice from "../../appwriteServices/Auth_svc";
import { IoIosLogOut } from "react-icons/io"; //icon

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const LogoutHandler = () => {
    authservice.logOut().then(() => {
      dispatch(logOut());
    });
  };
  return (
    <button
      onClick={LogoutHandler}
      className=" flex gap-2 px-4 py-2 hover:bg-red-300 rounded-md bg-red-800 text-white"
    >
      Logout{" "}
      <span className="text-[1.5rem]">
        <IoIosLogOut />
      </span>
    </button>
  );
};

export default LogoutBtn;
