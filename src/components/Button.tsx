import React from "react";
import { Spin } from "antd";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  type?: "default" | "black" | "light";
  loading?: boolean;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  size?: "small" | "medium" | "large";
}
const backgroundColors = {
  default: "bg-[#199aaf] text-white hover:opacity-85",
  black: "bg-black text-white hover:opacity-85",
  light: "bg-[#f5f5f5] text-[#333] hover:opacity-60 border border-[#999]",
};

export default function Button({
  type,
  children,
  className,
  loading,
  disabled,
  htmlType,
  size,
  style,
  ...props
}: ButtonProps): React.ReactElement<ButtonProps> {
  return (
    <button
      className={`${
        backgroundColors[type || "default"]
      } w-full h-[48px] rounded font-semibold
       transition-opacity duration-200`}
      type={htmlType || "button"}
      disabled={disabled || loading}
      style={style}
      {...props}
    >
      {loading ? <Spin /> : children}
    </button>
  );
}
