import React from "react";
import Button from "./Button";

type ConfirmationModalProps = {
  isOpen: boolean;
  modalTitle: string;
  modalDescription?: string;

  onCancelClick?: React.MouseEventHandler<HTMLButtonElement>;
  onConfirmClick?: React.MouseEventHandler<HTMLButtonElement>;
  confirmBtnText?: string;
  confirmBtnType?: "primary" | "secondary" | "destructive";
  confirmBtnDisabled?: boolean;
  cancelBtnDisabled?: boolean;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  modalTitle,
  modalDescription,
  onCancelClick,
  onConfirmClick,
  confirmBtnText,
  confirmBtnType,
  cancelBtnDisabled,
  confirmBtnDisabled,
}) => {
  return (
    <div
      className={`fixed inset-0 z-[1000] ${
        isOpen
          ? "flex items-center justify-center bg-black bg-opacity-50"
          : "hidden"
      } `}
    >
      <div className="bg-background p-6 shadow-lg space-y-6 w-full sm:w-fit sm:rounded-lg">
        <div className="space-y-3">
          <h1 className="text-lg font-semibold">{modalTitle}</h1>
          {modalDescription && <p>{modalDescription}</p>}
        </div>

        <div className="flex items-center justify-end gap-3">
          {onCancelClick && (
            <Button
              variant="outlined"
              onClick={onCancelClick}
              disabled={cancelBtnDisabled}
            >
              Cancel
            </Button>
          )}

          {onConfirmClick && (
            <Button
              variant={confirmBtnType ?? "primary"}
              onClick={onConfirmClick}
              disabled={confirmBtnDisabled}
            >
              {confirmBtnText ?? "Continue"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
