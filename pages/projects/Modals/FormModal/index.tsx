import { Label, Input, Button } from "@/components/atoms";
import { FormModal } from "@/components/molecules";
import React from "react";
import { useFormContext } from "react-hook-form";

const FormProjectModal: React.FC<TFormModalCreateProjectProps> = ({
  open,
  onClose,
  title,
  handleSubmit,
  isLoading = false,
  positiveConfirm = ''
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
        <div className="w-full">
          <Label htmlFor="project-name">Project Name</Label>
          <Input 
            id="project-name" 
            control={control}
            controllerName="project_name"
          />
        </div>
        <div className="w-full">
          <Label htmlFor="project-name">Total Jam Kerja</Label>
          <Input 
            id="total-hours" 
            type="number"
            control={control}
            controllerName="total_hours"
          />
        </div>
        <div className="w-full">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location" 
            control={control}
            controllerName="location"
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

export default FormProjectModal;