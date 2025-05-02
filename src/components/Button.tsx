import type { ComponentPropsWithRef } from "react";

const Button = ({
  onClick,
  children,
  type = "button",
  ref,
  ...props
}: ComponentPropsWithRef<"button">) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      type={type}
      className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${props.className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
