import { Button } from "@/components/atoms";
import { Table } from "@/components/molecules";
import { Layout } from "@/components/templates"
import moment from "moment";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import FormAbsentModal from "./modals/FormAbsentModal";
import FormCheckoutModal from "./modals/FormCheckoutModal";
import { useMutation } from "@tanstack/react-query";
import { checkinService, checkoutService } from "@/services";
import { useSnackbar } from "notistack";
import { AttendanceStatus } from "@prisma/client";
import { useAttendanceDetail, useAttendancesList } from "./hooks";
import { useIsMounted } from "@/utils/helpers";

const DefaultValuesCheckout = {
  id: null,
  projects: [],
  checkout_date: null,
  user_id: null,
};

type TDefaultValuesCheckout = {
  id: number | null;
  projects: { hours_worked: number; project_id: number }[];
  status: string;
  checkout_date: string | null,
  user_id: number | null
}

const Attendances = () => {
  const [modal, setModal] = useState({
    type: '',
    open: false,
    title: '',
    confirmButton: '',
  });
  const [time, setTime] = useState<Date | null>(null);
  const [status, setStatus] = useState<AttendanceStatus>(
    AttendanceStatus.Present
  );
  const { data } = useSession();

  const { enqueueSnackbar } = useSnackbar();
  const absentMethods = useForm();
  const checkoutMethods = useForm<TDefaultValuesCheckout>({
    defaultValues: DefaultValuesCheckout
  });

  const paramsList = useMemo(() => {
    if(Boolean(data?.user?.role === "user")) {
      return { 
        user_id: data?.user?.id, 
        start_date: moment().startOf('day').subtract((moment().day() || 7) - 1, 'days').format("YYYY-MM-DD"),
        end_date: moment(new Date()).format("YYYY-MM-DD"),
      }
    } else {
      return {};
    }
  }, [data]);

  const paramsDetail = useMemo(() => {
    return { 
      user_id: data?.user?.id, 
      date: moment(new Date()).format("YYYY-MM-DD")
    }
  }, [data?.user?.id, status]);

  const { attendanceDetailData, attendanceDetailRefetch } = useAttendanceDetail(
    paramsDetail,
    Boolean(data?.user?.role === "user")
  );
  const { attendancesData, attendancesRefetch } = useAttendancesList(
    paramsList
  );
  
  const statusBadgeHandler = (status: string) => {
    switch(status) {
      case 'Present':
        return <span className="text-[#26f055]">Hadir</span>;
      case 'Absent':
        return <span className="text-[#26f055]">Absen</span>;
      case 'OnLeave':
        return <span className="text-[#26f055]">Pulang</span>;
      default:
        return <span className="text-red-500">Belum Hadir</span>;
    }
  };

  useEffect(() => {
    setTime(new Date());
    var timer = setInterval(() => setTime(new Date()), 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if(attendanceDetailData) {
      checkoutMethods.reset({
        id: attendanceDetailData?.id,
        user_id: attendanceDetailData?.userId,
        checkout_date: moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
        projects: []
      });
    }
  }, [attendanceDetailData]);

  const handleChangeModal = (type: string, title: string, confirmButton: string) => {
    setModal(curr => ({
      ...curr,
      type: type,
      open: !curr.open,
      title: title,
      confirmButton: confirmButton,
    }));
  };

  const checkinMutation = useMutation({
    mutationKey: [],
    mutationFn: checkinService,
    onSuccess: (res) => {
      setStatus(AttendanceStatus.OnLeave);
      enqueueSnackbar(res.data.message, {
        variant: 'success'
      });
      attendanceDetailRefetch();
      attendancesRefetch();
    }
  });

  const checkoutMutation = useMutation({
    mutationKey: [],
    mutationFn: checkoutService,
    onSuccess: (res) => {
      enqueueSnackbar(res.data.message, {
        variant: 'success'
      });
      handleChangeModal('', '', '');
      attendanceDetailRefetch();
      attendancesRefetch();
    }
  });

  const handleSubmitCheckin = () => {
    let payload = {
      user_id: data?.user?.id,
      checkin_date: moment(time).format("YYYY-MM-DD hh:mm:ss")
    }
    
    checkinMutation.mutate(payload);
  };

  const handleSubmitCheckout = (payload: any) => {
    checkoutMutation.mutate(payload);
  }


  const columns = [
    {
      index: 'name',
      label: 'Nama Karyawan',
      isShow: Boolean(data?.user?.role === "admin"),
      render: (data: any) => {
        return data?.user?.name ?? '-';
      }
    },
    {
      index: 'createdAt',
      label: 'Tanggal',
      isShow: true,
      render: (data: any) => {
        return moment(data?.createdAt).format("DD-MM-YYYY hh:mm:ss")
      }
    },
    {
      index: 'status',
      label: 'Status Kehadiran',
      isShow: true,
      render: (data: any) => {
        return statusBadgeHandler(data?.status);
      }
    },
    {
      index: 'reason',
      label: 'Alasan tidak hadir',
      isShow: true,
      render: (data: any) => {
        return data?.reason ? data?.season : '-';
      }
    },
    {
      index: '',
      label: 'Aksi',
      isShow: Boolean(data?.user?.role === "admin"),
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
      {data?.user?.role === "user" && (
        <div className="flex justify-center items-center m-4 bg-white p-4 rounded-lg shadow-lg">
          <div className="flex flex-col gap-4 w-1/2 mx-auto rounded-lg shadow-lg p-4 border border-slate-200">
            <h1 className="text-lg font-semibold text-[#585858]">
              Date : {moment().format('DD MMMM YYYY')}
            </h1>
            {attendanceDetailData?.status === "Present" ? (
              <h1 className="text-lg font-semibold text-[#585858]">
                Check in: {moment(attendanceDetailData?.createdAt).format("YYYY-MM-DD hh:mm:ss")}
              </h1>
            ) : (
              <h1 className="text-lg font-semibold text-[#585858]">
                Time : {time?.toLocaleTimeString()}
              </h1>
            )}
            <h1 className="text-lg font-semibold text-[#585858]">
              Status : {statusBadgeHandler(attendanceDetailData?.status)}
            </h1>
            {!attendanceDetailData ? (
              <div className="flex gap-2">
                <Button
                  theme="warning"
                  textColor="primary"
                  classnames="flex w-full text-center justify-center items-center"
                  onClick={() => handleChangeModal('absent', 'Izin tidak hadir kerja', '')}
                >
                  Permit
                </Button>
                <Button
                  theme="primary"
                  textColor="primary"
                  classnames="flex w-full text-center justify-center items-center"
                  onClick={handleSubmitCheckin}
                  isLoading={checkinMutation.isPending}
                >
                  Check-In
                </Button>
              </div>
            ) : attendanceDetailData?.status === "Present" ? (
              <div className="flex gap-2">
                <Button
                  theme="primary"
                  textColor="primary"
                  classnames="flex w-full text-center justify-center items-center"
                  onClick={() => handleChangeModal('on-leave', 'Check-out', 'Check-out')}
                >
                  Check-Out
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      )}
      <div className="m-4 bg-white p-4 rounded-lg shadow-lg">
        <div>
          <h1 className="font-semibold text-xl text-gray-600">
            Attendances List
          </h1>
        </div>
        <Table
          dataSource={attendancesData}
          columns={columns}
          createable={false}
        />
      </div>
      <FormProvider {...absentMethods}>
        <FormAbsentModal
          open={Boolean(modal.open && modal.type === 'absent')}
          title={modal.title}
          positiveConfirm={modal.confirmButton}
          handleSubmit={() => {}}
          onClose={() => handleChangeModal('', '', '')}
        />
      </FormProvider>
      <FormProvider {...checkoutMethods}>
        <FormCheckoutModal
          open={Boolean(modal.open && modal.type === 'on-leave')}
          title={modal.title}
          positiveConfirm={modal.confirmButton}
          handleSubmit={() => checkoutMethods.handleSubmit(handleSubmitCheckout)()}
          onClose={() => handleChangeModal('', '', '')}
          isLoading={checkoutMutation.isPending}
        />
      </FormProvider>
    </Layout>
  );
};

export default Attendances;