import { Button } from "@/components/atoms";
import { Table } from "@/components/molecules";
import { Layout } from "@/components/templates";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useEmployeeList } from "./hooks";

type TDefaultValues = {
  id?: number | null,
  project_name: string;
  location: string;
}

const defaultValues = {
  id: null,
  project_name: '',
  location: '',
};

const validationSchema = yup.object({
  project_name: yup.string().required(),
  location: yup.string().required()
});

const Employees = () => {
  const [modal, setModal] = useState({
    type: '',
    open: false,
    title: '',
    confirmButton: '',
  });
  const methods = useForm<TDefaultValues>({
    resolver: yupResolver(validationSchema),
    defaultValues
  });
  const { enqueueSnackbar } = useSnackbar();
  const { employeesData } = useEmployeeList();
  
  const handleChangeModal = (type: string, title: string, confirmButton: string) => {
    setModal(curr => ({
      ...curr,
      type: type,
      open: !curr.open,
      title: title,
      confirmButton: confirmButton,
    }));
  };

  const columns = [
    {
      index: 'name',
      label: 'Nama',
      isShow: true,
    },
    {
      index: 'email',
      label: 'Email',
      isShow: true,
    },
    {
      index: 'department',
      label: 'Departement',
      isShow: true,
    },
    {
      index: '',
      label: 'Aksi',
      isShow: true,
      render: (data: any) => {
        return (
          <div className="flex gap-2 items-center w-full justify-center">
            <Button
              className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-opacity-[90%]"
              onClick={() => {
                handleChangeModal('edit', 'Edit Project', 'Edit')
                methods.reset({
                  id: data?.id,
                  project_name: data?.name,
                  location: data?.location
                });
              }}
            >
              <MdEdit />
            </Button>
            <Button
              className="bg-red-500 text-white p-2 rounded-lg hover:bg-opacity-[90%]"
              onClick={() => {
                handleChangeModal('delete', 'Delete Project', '')
                methods.reset({
                  id: data?.id,
                  project_name: data?.name,
                  location: data?.location
                });
              }}
            >
              <MdDelete />
            </Button>
          </div>
        );
      }
    },
  ];

  return (
    <Layout>
      <div className="m-4 bg-white p-4 rounded-lg shadow-lg">
        <div>
          <h1 className="font-semibold text-xl text-gray-600">
            Employees List
          </h1>
        </div>
        <Table 
          dataSource={employeesData}
          columns={columns}
          isLoading={false}
          onCreate={() => handleChangeModal('create', 'Create Project', 'Create')}
        />
      </div>
      <FormProvider {...methods}>
        <></>
      </FormProvider>
    </Layout>
  );
};

export default Employees;