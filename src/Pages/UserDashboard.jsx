import { Outlet } from "react-router-dom";
import Sidebar from ".././components/User/Sidebar";

export default function UserDashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-4 w-full">
   
        <Outlet></Outlet>
      </div>
    </div>
  );
}
