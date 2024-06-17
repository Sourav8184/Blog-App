import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "../../components/dashboardSidebare/DashboardSidebar";
import DashProfile from "../../components/dashprofile/DashProfile";
import DashPosts from "../../components/dashPosts/DashPosts";
import DashUsers from "../../components/dashUsers/DashUsers";
import DashComment from "../../components/dashComment.jsx/DashComment";
import DashBoardComp from "../../components/dashBoard/DashBoardComp";

function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashboardSidebar />
      </div>
      {tab === "profile" && <DashProfile />}
      {tab === "posts" && <DashPosts />}
      {tab === "users" && <DashUsers />}
      {tab === "comments" && <DashComment />}
      {tab === "dash" && <DashBoardComp />}
    </div>
  );
}

export default Dashboard;
