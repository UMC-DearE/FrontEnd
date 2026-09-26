import { Outlet } from 'react-router-dom';
import { usePageView } from '@/hooks/usePageView';

export const BaseLayout = () => {
  usePageView();

  return (
    <div className="min-h-screen bg-neutral-100 flex justify-center">
      <div id="app-frame" className="relative w-full min-h-full max-w-[440px] bg-[#F7F8F9]">
        <Outlet />
      </div>
    </div>
  );
};
