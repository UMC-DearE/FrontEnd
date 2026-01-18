import React from "react";
import searchIcon from "@/assets/header/Search.svg";

type Props = {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function SearchButton({ className = "", onClick }: Props) {
  return (
    <button
      type="button"
      aria-label="검색"
      onClick={onClick}
      className={"w-6 h-6 p-0 rounded-md flex items-center justify-center cursor-pointer" + className}
    >
      <img src={searchIcon} alt="검색" className="w-5 h-5" />
    </button>
  );
}
