import React from "react";
import { getItems, KEY_ACCESS_TOKEN } from "../utils/localStorageManager";
import { Navigate, Outlet } from "react-router-dom";

function UserIfNotLoggedIn() {
  const user = getItems(KEY_ACCESS_TOKEN);
  return user ? <Navigate to="/" /> : <Outlet />;
}

export default UserIfNotLoggedIn;
