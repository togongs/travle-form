import { DownOutlined, MoonFilled, UpOutlined } from "@ant-design/icons";
import { produce } from "immer";
import {
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { DEFAULT_VALUES } from "./config";
import {
  DefaultFormInfo,
  HotelFormInfo,
  PlaceFormInfo,
  ServiceFormInfo,
} from "../../components";
import { ThemeContext } from "../../components/ThemeProvider";

export const FormScreen = () => {
  const methods = useForm({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
  });
  return (
    <FormProvider {...methods}>
      <FormScreenView />
    </FormProvider>
  );
};

export const FormScreenView = () => {
  const { handleSubmit } = useFormContext();
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log("theme", theme);
  const [isOpenSection, setIsOpenSection] = useState<boolean[]>([
    true,
    false,
    false,
    false,
  ]); // 1, 2, 3, 4

  const sectionRefs = useRef([
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ]); // 1, 2, 3, 4

  const toggleSection = (index: number) => {
    setIsOpenSection(
      produce((draft) => {
        draft[index] = !draft[index];
      })
    );
  };

  // ref
  useEffect(() => {
    sectionRefs.current.map((ref, index) => {
      if (ref.current && isOpenSection) {
        ref.current.style.maxHeight = isOpenSection[index]
          ? `${ref.current.scrollHeight}px`
          : "0px";
      }
      return null;
    });
  }, [isOpenSection]);

  return (
    <div className="h-full text-left w-full relative">
      <img
        src="/public/flight_logo.jpg"
        style={{ width: "100%", height: 300 }}
      />
      <div className="fixed bottom-[100px] right-[250px] opacity-100 transition-opacity duration-300">
        <div
          className={`${
            theme === "dark" ? "bg-black" : "border border-white bg-white"
          } rounded-full p-3 cursor-pointer`}
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <MoonFilled style={{ fontSize: 24, color: "#ffd700" }} />
          ) : (
            <MoonFilled style={{ fontSize: 24, color: "gray" }} />
          )}
        </div>
      </div>
      <form
        className="flex flex-col items-center  p-10"
        onSubmit={handleSubmit(async (data) => {
          console.log("data", data);
          alert("제출에 성공했습니다 !");
          return window.open("https://www.naver.com", "_self");
        })}
      >
        <div className="flex flex-col gap-4 w-full sm:w-[570px] bg-white p-7 rounded">
          <DefaultFormInfo
            sectionRefs={sectionRefs}
            isOpenSection={isOpenSection}
            setIsOpenSection={setIsOpenSection}
            toggleSection={toggleSection}
          />
          <hr />
          <PlaceFormInfo
            sectionRefs={sectionRefs}
            isOpenSection={isOpenSection}
            setIsOpenSection={setIsOpenSection}
            toggleSection={toggleSection}
          />
          <hr />
          <HotelFormInfo
            sectionRefs={sectionRefs}
            isOpenSection={isOpenSection}
            setIsOpenSection={setIsOpenSection}
            toggleSection={toggleSection}
          />
          <hr />
          <ServiceFormInfo
            sectionRefs={sectionRefs}
            isOpenSection={isOpenSection}
            setIsOpenSection={setIsOpenSection}
            toggleSection={toggleSection}
          />
        </div>
      </form>
    </div>
  );
};

interface FormTitleViewProps {
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
}: FormTitleViewProps) => {
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
