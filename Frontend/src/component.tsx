import React from "react";

type ToggleProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  size?: "sm" | "default" | "lg";
};

export function Toggle({ children, className = "", ...props }: ToggleProps) {
  return (
    <button
      {...props}
      type={props.type ?? "button"}
      className={
        "inline-flex items-center justify-center rounded-md px-3 py-1.5 bg-gray-100 text-sm " +
        className
      }
    >
      {children}
    </button>
  );
}

export default Toggle;