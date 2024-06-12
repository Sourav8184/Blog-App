import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function AdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.data.user.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" />
  );
}

export default AdminPrivateRoute;
