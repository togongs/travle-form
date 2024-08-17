import { Modal } from "antd";
import Button from "../Button";

interface ModalProps {
  open: boolean;
  onCancel: () => void;
}
interface SubmitModalProps extends ModalProps {
  toggleSection?: (startIndex: number, endIndex: number) => void;
  type?: string;
}

export const SubmitModal = ({
  toggleSection,
  onCancel,
  ...props
}: SubmitModalProps) => {
  return (
    <Modal
      {...props}
      onCancel={onCancel}
      onOk={() => {
        onCancel();
      }}
      footer={null}
      width={300}
      closable={false}
      centered
    >
      <div className="text-center mb-4">
        <p>자세히 진단을 남긴 분들은 50% 더 올바른</p>
        <p>가능성과 방향성을 제시받았습니다.</p>
      </div>
      <div className="flex gap-3">
        <Button
          type="light"
          onClick={() => toggleSection && toggleSection(0, 1)}
        >
          계속 작성
        </Button>
        <Button
          type="default"
          onClick={() => toggleSection && toggleSection(0, 3)}
        >
          즉시 제출
        </Button>
      </div>
    </Modal>
  );
};

export const ServiceModal = ({
  type,
  onCancel,
  ...props
}: SubmitModalProps) => {
  return (
    <Modal
      {...props}
      onCancel={onCancel}
      onOk={() => {
        onCancel();
      }}
      footer={null}
      width={300}
      closable={false}
      centered
    >
      <div className="text-center">준비중!</div>
    </Modal>
  );
};
