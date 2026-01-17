import { Outlet } from "react-router-dom";
import BottomNav from "../components/bottomNav/BottomNav";
import HeaderBar from "../components/header/Header";

export const AppLayout = () => {
  return (
    <>
      <HeaderBar />
      <main className="px-4 pt-4 pb-[95px]">
        <Outlet />
      </main>
      <BottomNav />
    </>
  );
};
