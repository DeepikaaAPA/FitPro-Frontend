import { Outlet } from "react-router-dom";
import Sidebar from ".././components/Admin/Sidebar";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-20 md:ml-64 p-4 w-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
