import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { MouseEventHandler } from "react";

interface CommonTitleViewProps {
  index: number;
  number: number;
  label: string;
  isOpenSection: boolean[];
  toggleSection: MouseEventHandler<HTMLDivElement>;
}
export const FormTitleView = ({
  index,
  number,
  label,
  isOpenSection,
  toggleSection,
}: CommonTitleViewProps) => {
  return (
    <div className="flex cursor-pointer h-[40px]" onClick={toggleSection}>
      <div className="flex items-center flex-1">
        <div
          className="flex items-center justify-center text-center w-[24px] h-[24px] 
    bg-blue-500 rounded-full text-white text-sm mr-3"
        >
          {number}
        </div>
        <span>{label}</span>
      </div>
      {isOpenSection && isOpenSection[index] ? (
        <UpOutlined />
      ) : (
        <DownOutlined />
      )}
    </div>
  );
};
