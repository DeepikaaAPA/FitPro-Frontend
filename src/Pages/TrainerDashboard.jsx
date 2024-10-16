import { Outlet } from "react-router-dom";
import Sidebar from ".././components/Trainer/SideBar";

export default function TrainerDashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-20 md:ml-64 p-4 w-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
