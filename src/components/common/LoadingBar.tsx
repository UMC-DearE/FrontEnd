import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  containerClassName?: string;
  barClassName?: string;
}

export default function LoadingBar({
  containerClassName = "w-[135px] h-[15px] bg-[#F4F5F6] rounded-[20px] overflow-hidden p-[2px] flex flex-col",
  barClassName = "h-full loading-grow",
  ...rest
}: Props) {
  return (
    <div className={containerClassName} {...rest}>
      <div className={barClassName} />
    </div>
  );
}
