import { MouseEventHandler } from "react";

interface CommonTitleViewProps {
  index: number;
  number: number;
  label: string;
  isOpenSection: boolean[];
  toggleSection: MouseEventHandler<HTMLDivElement>;
}
const FormTitleView = ({
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
        <svg
          className="h-8 w-8 text-slate-500"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <path stroke="none" d="M0 0h24v24H0z" />{" "}
          <polyline points="6 15 12 9 18 15" />
        </svg>
      ) : (
        <svg
          className="h-8 w-8 text-slate-500"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <path stroke="none" d="M0 0h24v24H0z" />{" "}
          <polyline points="6 9 12 15 18 9" />
        </svg>
      )}
    </div>
  );
};

export default FormTitleView;
