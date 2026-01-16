import type { JSX } from "react";
import logo from "../assets/images/main-logo.svg";

export default function HeaderBar(): JSX.Element {
  return (
    <header className="relative w-full max-w-[393px] h-[105px] bg-white mx-auto">
      <img
        src={logo}
        alt="main-logo"
        className="absolute left-4 bottom-5"
      />
    </header>
  );
}
