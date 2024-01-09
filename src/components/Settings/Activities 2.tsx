import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { PiDesktop, PiDeviceMobileCamera } from "react-icons/pi";
import { DataTable } from "../custom/DataTable";

export type Payment = {
  id: string;
  device: string;
  deviceType: "Mobile" | "PC";
  date: string;
  time: string;
  action: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "device",
    header: "Device",
    cell: ({ row }) => {
      return (
        <div className="flex items-start gap-1 text-sm">
          <div className="mt-1 text-subtle_text">
            {row.original.deviceType === "Mobile" ? (
              <PiDeviceMobileCamera />
            ) : (
              <PiDesktop />
            )}
          </div>
          <div className="font-light">
            <p className="uppercase text-[#414141] p-0 m-0 ">
              {row.original.deviceType}
            </p>
            <p className="text-[#8F8F8F] ">{row.original.device}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => {
      return (
        <div className="font-light">
          <p className="uppercase text-[#414141] p-0 m-0 ">
            {row.original.date}
          </p>
          <p className="text-[#8F8F8F] ">{row.original.time}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
  },
];

export default function Activities() {
  const [tableData, setTableData] = useState<Payment[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getData();
      setTableData(data);
    })();
  }, []);
  return (
    <div>
      <DataTable columns={columns} data={tableData} />
    </div>
  );
}

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      deviceType: "Mobile",
      device: "iPhone 13 Pro",
      date: "Jan 1st, 2022",
      time: "12:55 AM",
      action: "User login",
    },
    {
      id: "123ub8u1",
      deviceType: "PC",
      device: "Apple Mac",
      date: "Jan 1st, 2022",
      time: "12:55 AM",
      action: "User logout",
    },
    {
      id: "nw901",
      deviceType: "Mobile",
      device: "iPhone 13 Pro",
      date: "Jan 1st, 2022",
      time: "12:55 AM",
      action: "User login",
    },
    {
      id: "12dcu1",
      deviceType: "PC",
      device: "Apple Mac",
      date: "Jan 1st, 2022",
      time: "12:55 AM",
      action: "User logout",
    },
    {
      id: "xn180h2",
      deviceType: "Mobile",
      device: "iPhone 13 Pro",
      date: "Jan 1st, 2022",
      time: "12:55 AM",
      action: "User login",
    },
  ];
}
