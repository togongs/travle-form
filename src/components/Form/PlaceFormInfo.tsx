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

export const PlaceFormInfo = ({
  sectionRefs,
  isOpenSection,
  setIsOpenSection,
  toggleSection,
}: FormInfo) => {
  const { register, watch } = useFormContext();
  return (
    <>
      <FormTitleView
        index={1}
        number={2}
        label={"핫플레이스 (선택)"}
        isOpenSection={isOpenSection}
        toggleSection={() => toggleSection(1)}
      />
      <div
        ref={sectionRefs.current[1]}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          !isOpenSection[1] && "hidden"
        }`}
      >
        {isOpenSection && isOpenSection[1] && (
          <div className="h-full">
            <div className="mt-4">
              <span>1. 가고싶은 장소가 있다면 입력해주세요.</span>
              <Input {...register("place")} />
            </div>
            <div className="mt-4">
              <span>2. 요구사항</span>
              <TextArea {...register("place_request")} />
            </div>
            <Button
              type="light"
              style={{ margin: "12px 0" }}
              onClick={() => {
                setIsOpenSection(
                  produce((draft: Draft<boolean[]>) => {
                    draft[1] = false;
                    draft[2] = true;
                  })
                );
              }}
            >
              추가사항(숙박시설) 입력하기
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
