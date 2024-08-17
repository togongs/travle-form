import { Draft, produce } from "immer";
import React, { MutableRefObject, RefObject } from "react";
import { FormTitleView } from "../../pages/form/FormScreen";
import { useFormContext } from "react-hook-form";
import { Input, TextArea } from "../Input";
import Button from "../Button";

interface FormInfo {
  sectionRefs: MutableRefObject<RefObject<HTMLDivElement>[]>;
  isOpenSection: boolean[];
  setIsOpenSection: React.Dispatch<React.SetStateAction<boolean[]>>;
  toggleSection: (index: number) => void;
}
export const HotelFormInfo = ({
  sectionRefs,
  isOpenSection,
  setIsOpenSection,
  toggleSection,
}: FormInfo) => {
  const { register } = useFormContext();

  return (
    <>
      <FormTitleView
        index={2}
        number={3}
        label={"숙박 시설 (선택)"}
        isOpenSection={isOpenSection}
        toggleSection={() => toggleSection(2)}
      />
      <div
        ref={sectionRefs.current[2]}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          !isOpenSection[2] && "hidden"
        }`}
      >
        {isOpenSection && isOpenSection[2] && (
          <>
            <div className="mt-4">
              <span>1. 숙박을 원하시는 호텔이 있다면 입력해주세요.</span>
              <Input {...register("hotel")} />
            </div>
            <div className="mt-4">
              <span>2. 요구사항</span>
              <TextArea {...register("hotel_request")} />
            </div>
            <Button
              type="default"
              style={{ margin: "12px 0" }}
              onClick={() => {
                setIsOpenSection(
                  produce((draft: Draft<boolean[]>) => {
                    draft[2] = false;
                    draft[3] = true;
                  })
                );
              }}
            >
              다음으로
            </Button>
          </>
        )}
      </div>
    </>
  );
};
