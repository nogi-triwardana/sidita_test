import { Button } from "@/components/atoms";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";


const Table: React.FC<TTableProps> = ({
  dataSource = [],
  columns,
  createable = true,
  isLoading = false,
  customFilter = <></>,
  onCreate = () => {}
}) => {
  const [cols, setCols] = useState<{
    index: string;
    label: string;
    isShow?: boolean;
  }[]>([]);
  
  const getValueCell = (data: any, col: any) => {
    if(typeof col?.render === "function") return col?.render(data);
    return data[col.index];
  };

  useEffect(() => {
    if(columns.length > 0) {
      const filteredByisShow = columns.filter(column => column?.isShow === true);
      setCols(filteredByisShow);
    }
  }, [columns]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end w-full">
        {customFilter}
        {createable && (
          <Button
            theme="primary"
            startIcon={<IoMdAdd />}
            textColor="primary"
            onClick={onCreate}
            classnames="w-fit flex justify-center items-center gap-2"
          >
            Create
          </Button>
        )}
      </div>
      <table className="border-collapse w-full border border-slate-500 table-fixed">
        <thead>
          <tr>
            {cols.map((column, key) => (
              <th key={'cols-table-' + key} className="border border-slate-600 text-white bg-[#2a60d4]">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            isLoading ? (
              <tr>
                <td
                  className="border border-slate-600 text-gray-600 font-medium p-1 text-center text-sm p-2"
                  colSpan={cols.length}
                >
                  Loading...
                </td>
              </tr>
            ) : (
              dataSource?.length > 0 ? (
                dataSource?.map((data, key) => {
                  return (
                    <tr key={'row-table-' + key}>
                      {cols
                        .map((column) => {
                          return (
                            <td key={'column-table-' + key} className="border border-slate-600 text-gray-600 font-medium p-1">
                              {getValueCell(data, column)}
                            </td>
                          );
                        })
                      }
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td  
                    className="border border-slate-600 text-gray-600 font-medium p-1 text-center text-sm p-2" 
                    colSpan={cols.length}
                  >
                    Data is not available
                  </td>
                </tr>
              )
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default Table;