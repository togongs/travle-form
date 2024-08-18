import { produce } from "immer";
import { useContext, useEffect, useRef, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { DEFAULT_VALUES } from "./config";
import {
  DefaultFormInfo,
  HotelFormInfo,
  PlaceFormInfo,
  ServiceFormInfo,
  ThemeContext,
} from "../../components";
import { FLIGHT } from "../../assets/images";

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
      <img src={FLIGHT} style={{ width: "100%", height: 300 }} />
      <div className="fixed bottom-[100px] right-[250px] opacity-100 transition-opacity duration-300">
        <div
          className={`${
            theme === "dark" ? "bg-black" : "border border-white bg-white"
          } rounded-full p-3 cursor-pointer`}
          onClick={toggleTheme}
        >
          {
            {
              light: (
                <svg
                  className="h-8 w-8 text-yellow-300"
                  viewBox="0 0 24 24"
                  fill="#fde047"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ),
              dark: (
                <svg
                  className="h-8 w-8 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="#6b7280"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ),
            }[theme]
          }
        </div>
      </div>
      <form
        className="flex flex-col items-center p-10"
        onSubmit={handleSubmit(async (data) => {
          console.log("data", data);
          alert("제출에 성공했습니다!");
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
