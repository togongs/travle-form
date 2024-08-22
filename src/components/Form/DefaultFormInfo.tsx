import { Draft, produce } from "immer";

import React, { MutableRefObject, RefObject, useState } from "react";
import { FieldError, useFormContext } from "react-hook-form";
import { Input, Radio } from "../Input";
import { SubmitModal } from "../modal";
import Button from "../Button";
import FormTitleView from "./FormTitleView";

interface FormInfo {
  sectionRefs: MutableRefObject<RefObject<HTMLDivElement>[]>;
  isOpenSection: boolean[];
  setIsOpenSection: React.Dispatch<React.SetStateAction<boolean[]>>;
  toggleSection: (index: number) => void;
}
export const DefaultFormInfo = ({
  sectionRefs,
  isOpenSection,
  setIsOpenSection,
  toggleSection,
}: FormInfo) => {
  const {
    register,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const national = watch("national");
  const name = watch("name");
  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const phone = watch("phone");
  const contact = watch("contact");

  return (
    <>
      <FormTitleView
        index={0}
        number={1}
        label={"기본정보 (필수)"}
        isOpenSection={isOpenSection}
        toggleSection={() => toggleSection(0)}
      />
      <div
        ref={sectionRefs.current[0]}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          !isOpenSection[0] && "hidden"
        }`}
      >
        {isOpenSection && isOpenSection[0] && (
          <div className="h-full">
            <div className="mt-4">
              <span>1. (필수) 여행지</span>
              <Input
                {...register("national", {
                  required: "여행지를 입력해주세요.",
                })}
                error={errors.national as FieldError}
                value={national}
                placeholder="ex) 스페인"
                type="text"
              />
            </div>

            <div className="mt-4">
              <span>1. (필수) 출발일</span>
              <Input
                {...register("startDate", {
                  onChange: (event) => {
                    const result = event.target.value.replace(/[^0-9]/g, "");
                    setValue("startDate", result);
                  },
                  required: "출발일을 입력해주세요.",
                })}
                placeholder="ex) 20240703"
                type="text"
                maxLength={8}
                value={startDate?.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")}
                error={errors.startDate as FieldError}
              />
            </div>
            <div className="mt-4">
              <span>2. (필수) 도착일</span>
              <Input
                {...register("endDate", {
                  onChange: (event) => {
                    const result = event.target.value.replace(/[^0-9]/g, "");
                    setValue("endDate", result);
                  },
                  required: "도착일을 입력해주세요.",
                  validate: (value) => {
                    if (value < startDate) {
                      return "도착일이 출발일 보다 빠를 수 없어요!";
                    }
                  },
                })}
                placeholder="ex) 20240703"
                type="text"
                maxLength={8}
                value={endDate?.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")}
                error={errors.endDate as FieldError}
              />
            </div>

            <div className="mt-4">
              <span>3. (필수) 이름</span>
              <Input
                {...register("name", {
                  required: "이름을 입력해주세요.",
                })}
                error={errors.name as FieldError}
                value={name}
                placeholder="ex) 홍길동"
                type="text"
              />
            </div>
            <div className="mt-4">
              <span>4. (필수) 연락처</span>
              <div className="flex flex-col gap-1 mt-2">
                <Radio
                  label="휴대폰"
                  name="contact"
                  onChange={() => setValue("contact", 1)}
                  checked={contact == 1 ? true : false}
                />
                <Radio
                  onChange={async () => {
                    setValue("contact", 2);
                    if (contact === 2) {
                      setValue("phone", "");
                    }
                  }}
                  label="카카오톡ID"
                  name="contact"
                />
              </div>
              <Input
                {...register("phone", {
                  onChange: async (event) => {
                    if (contact === 1) {
                      const result = event.target.value
                        .replace(/[^0-9]/g, "")
                        .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, "$1-$2-$3");
                      setValue("phone", result);
                    }
                  },
                  required: "연락처를 입력해주세요.",
                  validate: (value) => {
                    if (contact === 1) {
                      return (
                        /^010-\d{4}-\d{4}$/.test(value) ||
                        "알맞은 형식을 입력해주세요."
                      );
                    }
                  },
                })}
                error={errors.phone as FieldError}
                value={phone}
                placeholder={`${
                  contact === 1 ? "ex) 010-1234-5678" : "ex) kakao1234"
                }`}
                maxLength={13}
              />
            </div>
            <br />
            <Button
              type="default"
              onClick={async () => {
                const isValid = await trigger();
                console.log("isValid", isValid);
                if (isValid) {
                  setIsOpenModal(true);
                }
              }}
            >
              빠른신청
            </Button>
            {isOpenModal && (
              <SubmitModal
                open={isOpenModal}
                onCancel={() => setIsOpenModal(false)}
                toggleSection={(startIndex, endIndex) => {
                  setIsOpenSection(
                    produce((draft: Draft<boolean[]>) => {
                      draft[startIndex] = false;
                      draft[endIndex] = true;
                    })
                  );
                  setIsOpenModal(false);
                }}
              />
            )}
            <div className="h-full">
              <br />
              <Button
                type="light"
                onClick={() => {
                  setIsOpenSection(
                    produce((draft: Draft<boolean[]>) => {
                      draft[0] = false;
                      draft[1] = true;
                    })
                  );
                }}
              >
                추가사항(핫플레이스) 입력하기
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
