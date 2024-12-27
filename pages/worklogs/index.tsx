import { AtomSelect, Button } from "@/components/atoms";
import { Table } from "@/components/molecules";
import { Layout } from "@/components/templates"
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useWorklogsList } from "./hooks";
import AtomDatePicker from "@/components/atoms/Datepicker";
import { FormProvider, useForm } from "react-hook-form";
import moment from "moment";
import { useProjectList } from "../projects/hooks";
import { useEmployeeList } from "../employees/hooks";

const filterDefaultValues = {
  filter_date: [null, null],
  user_id: null,
  project_id: null
};

const Worklogs = () => {
  const [modal, setModal] = useState({
    type: '',
    open: false,
    title: '',
    confirmButton: '',
  });
  const [employeesOption, setEmployeesOption] = useState([]);
  const [projectsOption, setProjectOption] = useState([]);
  const methods = useForm({
    defaultValues: filterDefaultValues,
  });
  const { control, watch } = methods;

  const params = {
    start_date: watch('filter_date')[0],
    end_date: watch('filter_date')[1]
  };

  const { worklogsData, worklogsRefetch, worklogsIsLoading } = useWorklogsList(params);
  const { projectsData, projectsRefetch, projectsIsLoading } = useProjectList();
  const { employeesData } = useEmployeeList();

  useEffect(() => {
    worklogsRefetch();
  }, [watch('filter_date')]);

  useEffect(() => {
    if(projectsData?.length > 0) {
      const option = projectsData?.map((project: any) => ({
        value: project.id,
        label: project.name
      }));

      setProjectOption(option);
    }
  }, [projectsData]);

  useEffect(() => {
    if(employeesData?.length > 0) {
      const option = employeesData?.map((project: any) => ({
        value: project.id,
        label: project.name
      }));

      setEmployeesOption(option);
    }
  }, [employeesData]);

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
      label: 'Nama Karyawan',
      isShow: true,
      render: (data: any) => {
        return data?.user?.name ?? '-';
      }
    },
    {
      index: 'project',
      label: 'Project',
      isShow: true,
      render: (data: any) => {
        return data?.project?.name ?? '-';
      }
    },
    {
      index: 'createdAt',
      label: 'Tanggal',
      isShow: true,
      render: (data: any) => {
        return moment(data.createdAt).format('DD MMMM YYYY')
      }
    },
    {
      index: 'hoursWorked',
      label: 'Jam Kerja',
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
              className="bg-red-500 text-white p-2 rounded-lg hover:bg-opacity-[90%]"
              onClick={() => {
                handleChangeModal('delete', 'Delete Project', '')
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
            Worklogs List
          </h1>
        </div>
        <Table
          dataSource={worklogsData}
          columns={columns}
          createable={false}
          isLoading={worklogsIsLoading}
          customFilter={(
            <FormProvider {...methods}>
              <div className="flex gap-2 items-center">
                <AtomSelect
                  control={control}
                  controllerName="user_id"
                  options={employeesOption}
                />
                <AtomSelect
                  control={control}
                  controllerName="project_id"
                  options={projectsOption}
                />
                <AtomDatePicker
                  controllerName="filter_date"
                  label={null}
                  placeholder="Select a date"
                  asText={false}
                  format={"yyyy-MM-dd"}
                  isRangeDatePicker={true}
                />
              </div>
            </FormProvider>
          )}
        />
      </div>
    </Layout>
  );
};

export default Worklogs;