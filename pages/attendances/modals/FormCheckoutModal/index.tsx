import { Label, Input, Button, AtomSelect } from "@/components/atoms";
import { FormModal } from "@/components/molecules";
import React, { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useProjectList } from "@/pages/projects/hooks";

const FormCheckoutModal: React.FC<TFormModalCreateProjectProps> = ({
  open,
  onClose,
  title,
  handleSubmit,
  isLoading = false,
  positiveConfirm = ''
}) => {
  const [projectOption, setProjectOption] = useState([]);
  const methods = useFormContext();
  const { control } = methods;
  const { 
    fields: fieldsProject,
    append: appendProject,
    remove: removeProject
  } = useFieldArray({
    control,
    name: 'projects'
  });

  const { projectsData, projectsRefetch, projectsIsLoading } = useProjectList();

  useEffect(() => {
    if(projectsData.length > 0 && open) {
      const option = projectsData?.map((project: any) => ({
        value: project.id,
        label: project.name
      }))
      setProjectOption(option);
    } 
  }, [open, projectsData]);

  return (
    <FormModal
      open={open}
      onClose={onClose}
      title={title}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 my-4 w-full">
          <div className="flex items-center gap-2">
            <Label htmlFor="reason">Project</Label>
            <Button
              classnames="text-white p-2 rounded-lg hover:bg-opacity-[90%]"
              theme="primary"
              onClick={() => appendProject({ hours_worked: 0, project_id: '' })}
            >
              <IoMdAdd />
            </Button>
          </div>
          <div className="flex flex-col gap-2 w-full">
            {fieldsProject.map((el, key) => (
              <div key={'field-project-' + key} className="flex justify-between gap-2 w-full">
                <AtomSelect
                  control={control}
                  controllerName={`projects.${key}.project_id`}
                  options={projectOption}
                />
                <Input
                  control={control}
                  controllerName={`projects.${key}.hours_worked`}
                  type="number"
                />
                <Button
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-opacity-[90%]"  
                  onClick={() => removeProject(key)}
                >
                  <MdDelete />
                </Button>
              </div>
            ))}
          </div>
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

export default FormCheckoutModal;