import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../Store/Authslice";
import authservice from "../../appwriteServices/Auth_svc";

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const LogoutHandler = () => {
    authservice.logOut().then(() => {
      dispatch(logOut());
    });
  };
  return (
    <button className="px-4 py-2 hover:bg-red-300 rounded-md bg-red-800 text-white">
      Logout
    </button>
  );
};

export default LogoutBtn;
