import { forwardRef } from "react";
import { FieldError } from "react-hook-form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  value?: string;
  label?: string;
}
export interface TextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError;
  value?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { value, error, ...props }: InputProps,
  ref
) {
  return (
    <div className="mb-1">
      <input
        ref={ref}
        className="p-1 w-full border-transparent border border-b-[#e2e4e7] outline-none
        focus:border-b-[#199aaf] transition-colors duration-300"
        value={value ?? undefined}
        {...props}
      />
      {error && <p className="text-red-400">{error?.message}</p>}
    </div>
  );
});

export const Radio = forwardRef<HTMLInputElement, InputProps>(function Radio(
  { label, ...props },
  ref
) {
  return (
    <div>
      <label className="cursor-pointer">
        <input ref={ref} type="radio" {...props} />
        <span className="text-[#666] ml-1">{label}</span>
      </label>
    </div>
  );
});

export const CheckBox = forwardRef<HTMLInputElement, InputProps>(
  function CheckBox({ label, ...props }, ref) {
    return (
      <div className="mb-1">
        <label className="cursor-pointer">
          <input ref={ref} type="checkbox" {...props} />
          {label && <span className="ml-1 text-[#666]">{label}</span>}
        </label>
      </div>
    );
  }
);

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ value, error, ...props }, ref) {
    return (
      <div className="mt-1">
        <textarea
          ref={ref}
          className="p-1 pl-2 w-full border border-[#e2e4e7] outline-none
        focus:border-[#199aaf] transition-colors duration-300 resize-none h-[100px]"
          {...props}
        />
        {error && <p className="text-red-400">{error?.message}</p>}
      </div>
    );
  }
);
