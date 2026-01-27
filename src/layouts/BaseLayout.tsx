import { Outlet } from 'react-router-dom';

export const BaseLayout = () => {
  return (
    <div className="min-h-screen bg-neutral-100 flex justify-center">
      <div
        id="app-frame"
        className="relative w-full max-w-[393px] min-h-screen bg-[#F8F8F8]"
      >
        <Outlet />
      </div>
    </div>
  );
};

