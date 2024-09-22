import { Outlet } from "react-router-dom";
import Sidebar from ".././components/Admin/Sidebar";
import Sidebar2 from "../components/Admin/SideBar2";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <Sidebar
      
       />
      <div className="ml-64 p-4 w-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
