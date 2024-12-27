import { Label, Input, Button } from "@/components/atoms";
import { ConfirmationModal, FormModal } from "@/components/molecules";
import React from "react";
import { useFormContext } from "react-hook-form";

const ConfirmDeleteEmployeeModal: React.FC<TModalEmployeeProps> = ({
  open,
  onClose,
  title,
  handleSubmit,
  isLoading = false,
}) => {
  return (
    <ConfirmationModal
      open={open}
      onClose={onClose}
      title={title}
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      <p className="text-gray-800 font-semibold">Apakah anda yakin mau menghapus data karyawan ini?</p>
    </ConfirmationModal>
  );
};

export default ConfirmDeleteEmployeeModal;