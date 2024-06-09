import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "../../components/dashboardSidebare/DashboardSidebar";
import DashProfile from "../../components/dashprofile/DashProfile";

function Dashboard() {
  const location = useLocation();
  // console.log("location -> ", location);

  const [tab, setTab] = useState("");
  // console.log("tab -> ", tab);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    // console.log("urlparam -> ", urlParams);

    const tabFromUrl = urlParams.get("tab");
    // console.log("tabFromUrl -> ", tabFromUrl);

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
    </div>
  );
}

export default Dashboard;
