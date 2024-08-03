import React from "react";
import { getItems, KEY_ACCESS_TOKEN } from "../utils/localStorageManager";
import { Navigate, Outlet } from "react-router-dom";

function RequireUser() {
  const user = getItems(KEY_ACCESS_TOKEN);
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default RequireUser;
