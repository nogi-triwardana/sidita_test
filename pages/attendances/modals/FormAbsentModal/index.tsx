import { Label, Input, Button } from "@/components/atoms";
import { FormModal } from "@/components/molecules";
import React from "react";
import { useFormContext } from "react-hook-form";

const FormAbsentModal: React.FC<TFormModalCreateProjectProps> = ({
  open,
  onClose,
  title,
  handleSubmit,
  isLoading = false,
  positiveConfirm = 'Submit'
}) => {
  const methods = useFormContext();
  const { control } = methods;

  return (
    <FormModal
      open={open}
      onClose={onClose}
      title={title}
    >
      <div className="flex flex-col gap-4">
        <div className="w-full py-4">
          <Label htmlFor="reason">Reason</Label>
          <Input 
            id="reason" 
            control={control}
            controllerName="reason"
          />
        </div>
        <Button
          theme="primary"
          textColor="primary"
          classnames="text-center justify-center w-full"
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          {positiveConfirm}
        </Button>
      </div>
    </FormModal>
  );
};

export default FormAbsentModal;