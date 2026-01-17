import type { JSX } from "react";
import logo from "../../assets/logo/main-logo.svg";

export default function HeaderBar(): JSX.Element {
  return (
    <header className="relative w-[393px] h-[105px] bg-white">
      <img
        src={logo}
        alt="main-logo"
        className="absolute px-4 bottom-5"
      />
    </header>
  );
}
