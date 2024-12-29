"use client"

import { Button } from "@/components/atoms";
import { Layout } from "@/components/templates";
import moment from "moment";
import { useEffect, useState } from "react";

const Absences = () => {
  const [time, setTime] = useState<Date | null>(null);

  const statusBadgeHandler = (status: string) => {
    switch(status) {
      case 'Present':
        return <span className="text-[#26f055]">Present</span>;
      default:
        return;
    }
  };

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[70%] m-4 bg-white p-4 rounded-lg shadow-lg">
        <div className="flex flex-col gap-4 w-1/2 mx-auto rounded-lg shadow-lg p-4 border border-slate-200">
          <h1 className="text-lg font-semibold text-[#585858]">
            Date : {moment().format('DD MMMM YYYY')}
          </h1>
          <h1 className="text-lg font-semibold text-[#585858]">
            Time : {time?.toLocaleTimeString()}
          </h1>
          <h1 className="text-lg font-semibold text-[#585858]">
            Status : {statusBadgeHandler('Present')}
          </h1>
          <Button
            theme="primary"
            textColor="primary"
            classnames="flex w-full text-center justify-center items-center"
          >
            Check-In
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Absences;