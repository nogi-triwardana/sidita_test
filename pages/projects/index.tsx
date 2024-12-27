import { Table } from "@/components/molecules";
import { Layout } from "@/components/templates";
import FormProjectModal from "./Modals/FormModal";
import { useEffect, useState } from "react";
import { projectCreateService, projectDeleteService, projectUpdateService } from "@/services";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useProjectList } from "./hooks";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/atoms";
import ConfirmDeleteProjectModal from "./Modals/ConfirmModal";


type TDefaultValues = {
  id?: number | null,
  project_name: string;
  total_hours: number;
  location: string;
}

const defaultValues = {
  id: null,
  project_name: '',
  total_hours: 0,
  location: '',
};

const validationSchema = yup.object({
  project_name: yup.string().required(),
  total_hours: yup.number().required(),
  location: yup.string().required()
});

export const getServerSideProps = (async (context) => {
  const session = await getSession(context);
  return { 
    props: { 
      data: null 
    } 
  };
}) satisfies GetServerSideProps<any>;

const Projects = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
  const { projectsData, projectsRefetch, projectsIsLoading } = useProjectList();
  const { enqueueSnackbar } = useSnackbar();
  const { control } = methods;

  const handleChangeModal = (type: string, title: string, confirmButton: string) => {
    setModal(curr => ({
      ...curr,
      type: type,
      open: !curr.open,
      title: title,
      confirmButton: confirmButton,
    }));
  };

  const submitProjectMutation = useMutation({
    mutationFn: projectCreateService,
    onSuccess: (res) => {
      enqueueSnackbar(res.data.message, {
        variant: 'success'
      });
      handleChangeModal('', '', '');
      projectsRefetch();
    }
  })

  const editProjectMutation = useMutation({
    mutationFn: projectUpdateService,
    onSuccess: (res) => {
      enqueueSnackbar(res.data.message, {
        variant: 'success'
      });
      handleChangeModal('', '', '');
      projectsRefetch();
    }
  });

  const deleteProjectMutation = useMutation({
    mutationFn: projectDeleteService,
    onSuccess: (res) => {
      enqueueSnackbar(res.data.message, {
        variant: 'success'
      });
      handleChangeModal('', '', '');
      projectsRefetch();
    }
  });

  const handleCreateProject = (payload: TDefaultValues) => {
    submitProjectMutation.mutate(payload);
  };

  const handleEditProject = (payload: TDefaultValues) => {
    const data = {
      project_name: payload.project_name,
      location: payload.location
    } 
    editProjectMutation.mutate({ data: data, id: payload?.id });
  };

  const handleDeleteProject = (payload: TDefaultValues) => {
    deleteProjectMutation.mutate(payload.id);
  }

  const handleSubmitModal = () => {
    if(modal.type === 'create') {
      methods.handleSubmit(handleCreateProject)();
    } else if(modal.type === 'edit') {
      methods.handleSubmit(handleEditProject)();
    } else {
      methods.handleSubmit(handleDeleteProject)();
    }
  };

  useEffect(() => {
    if(modal.open && modal.type === 'create') {
      methods.reset(defaultValues);
    }
  }, [modal.open]);

  const columns = [
    {
      index: 'name',
      label: 'Nama',
      isShow: true,
    },
    {
      index: 'location',
      label: 'Lokasi',
      isShow: true,
    },
    {
      index: 'totalHours',
      label: 'Total jam kerja',
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
            Projects List
          </h1>
        </div>
        <Table 
          dataSource={projectsData}
          columns={columns}
          isLoading={projectsIsLoading}
          onCreate={() => handleChangeModal('create', 'Create Project', 'Create')}
        />
      </div>
      <FormProvider {...methods}>
        <FormProjectModal 
          open={Boolean(modal.open && (modal.type === 'create' || modal.type === 'edit'))}
          onClose={() => handleChangeModal('', '', '')}
          title={modal.title}
          handleSubmit={handleSubmitModal}
          isLoading={submitProjectMutation.isPending}
          positiveConfirm={modal.confirmButton}
        />
        <ConfirmDeleteProjectModal
          open={Boolean(modal.open && modal.type === 'delete')}
          handleSubmit={handleSubmitModal}
          onClose={() => handleChangeModal('', '', '')}
          title={modal.title}
          isLoading={deleteProjectMutation.isPending}
        />
      </FormProvider>
    </Layout>
  );
};

export default Projects;