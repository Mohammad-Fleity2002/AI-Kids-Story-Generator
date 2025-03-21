import React from "react";
import DashboardHeader from "./_components/DashboardHeader";
import UserStoryList from "./_components/UserStoryList";

function page() {
  return <div className="p-20 md:px-20 lg:px-40 min-h-screen">
    <DashboardHeader />
    <UserStoryList />
  </div>;
}

export default page;
