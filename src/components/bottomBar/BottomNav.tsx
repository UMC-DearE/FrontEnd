import { NavLink } from "react-router-dom";
import type { JSX } from "react";
import HomeIcon from "../icons/HomeIcon";
import LetterIcon from "../icons/LetterIcon";
import ReportIcon from "../icons/ReportIcon";
import MyIcon from "../icons/MyIcon";

type NavItemProps = {
  to: string;
  label: string;
  Icon: ({
    className,
    active,
  }: {
    className?: string;
    active?: boolean;
  }) => JSX.Element;
};

function NavItem({ to, label, Icon }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex-1 flex flex-col items-center gap-2 ${
          isActive ? "text-primary" : "text-[#C2C4C7]"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon active={isActive} />
          <span
            className={`text-xs ${
              isActive ? "font-medium text-primary" : "text-[#C2C4C7]"
            }`}
          >
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
}

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 flex justify-center">
      <div className="w-full max-w-[393px] h-[95px] bg-white">
        <div className="flex h-full items-start pt-4 px-5 justify-between">
          <NavItem to="/" label="홈" Icon={HomeIcon} />
          <NavItem to="/letter" label="편지함" Icon={LetterIcon} />
          <NavItem to="/report" label="리포트" Icon={ReportIcon} />
          <NavItem to="/my" label="MY" Icon={MyIcon} />
        </div>
      </div>
    </nav>
  );
}
