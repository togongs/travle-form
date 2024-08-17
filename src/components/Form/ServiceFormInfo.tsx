import { Draft, produce } from "immer";
import React, { MutableRefObject, RefObject, useState } from "react";
import { FormTitleView } from "../../pages/form/FormScreen";
import { useFormContext } from "react-hook-form";
import Button from "../Button";
import { Radio } from "../Input";
import { ServiceModal } from "../modal";

interface FormInfo {
  sectionRefs: MutableRefObject<RefObject<HTMLDivElement>[]>;
  isOpenSection: boolean[];
  setIsOpenSection: React.Dispatch<React.SetStateAction<boolean[]>>;
  toggleSection: (index: number) => void;
}
export const ServiceFormInfo = ({
  sectionRefs,
  isOpenSection,
  setIsOpenSection,
  toggleSection,
}: FormInfo) => {
  const { trigger, watch } = useFormContext();
  const [isOpenPrivate, setIsOpenPrivate] = useState(false);
  const [isOpenPrivacy, setIsOpenPrivacy] = useState(false);

  const national = watch("national");
  const startDate = watch("startDate");
  const name = watch("name");
  const endDate = watch("endDate");
  const phone = watch("phone");
  const contact = watch("contact");

  return (
    <>
      <FormTitleView
        index={3}
        number={4}
        label={"서비스 동의 및 제출"}
        isOpenSection={isOpenSection}
        toggleSection={() => toggleSection(3)}
      />
      <div
        ref={sectionRefs.current[3]}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          !isOpenSection[3] && "hidden"
        }`}
      >
        {isOpenSection && isOpenSection[3] && (
          <div className="flex flex-col gap-5">
            <div className="border border-[#199aaf] h-[250px] rounded flex flex-col items-center justify-center">
              <div className="w-full py-5 text-center">
                <p>개인 정보 수집 이용에 대한 동의 (필수)</p>
                <Button
                  type="default"
                  style={{ width: 100, margin: "20px 0" }}
                  onClick={() => setIsOpenPrivate(true)}
                >
                  전문읽기
                </Button>
                {isOpenPrivate && (
                  <ServiceModal
                    open={isOpenPrivate}
                    onCancel={() => setIsOpenPrivate(false)}
                    type={"private"}
                  />
                )}
                <div className="flex justify-around">
                  <Radio label="동의" value="agree" defaultChecked />
                  <Radio label="비동의" value="disagree" disabled />
                </div>
              </div>
            </div>
            <div className="border border-[#199aaf] h-[250px] rounded flex flex-col items-center justify-center">
              <div className="w-full py-5 text-center">
                <p>민감정보 수집 이용에 대한 동의 (필수)</p>
                <Button
                  type="default"
                  style={{ width: 100, margin: "20px 0" }}
                  onClick={() => setIsOpenPrivacy(true)}
                >
                  전문읽기
                </Button>
                {isOpenPrivacy && (
                  <ServiceModal
                    open={isOpenPrivacy}
                    onCancel={() => setIsOpenPrivacy(false)}
                    type={"privacy"}
                  />
                )}
                <div className="flex justify-around">
                  <Radio label="동의" value="agree" defaultChecked />
                  <Radio label="비동의" value="disagree" disabled />
                </div>
              </div>
            </div>
            <Button
              type="default"
              htmlType="submit"
              onClick={async () => {
                if (
                  !national ||
                  !startDate ||
                  !endDate ||
                  !name ||
                  !phone ||
                  !contact
                ) {
                  setIsOpenSection(
                    produce((draft: Draft<boolean[]>) => {
                      draft[0] = true;
                      draft[3] = false;
                    })
                  );
                  const isValid = await trigger();
                  if (isValid) return;
                }
              }}
            >
              제출하기
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
