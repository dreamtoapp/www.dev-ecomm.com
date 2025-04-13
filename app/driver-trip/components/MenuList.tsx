"use client";
import { CheckCircle, Timer, X, ChevronDown } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface dataType {
  inWayOrders: number;
  canceledOrders: number;
  deliveredOrders: number;
  driverId: string;
}

const MenuList = ({
  inWayOrders,
  canceledOrders,
  deliveredOrders,
  driverId,
}: dataType) => {
  const router = useRouter();

  const menuOptions = [
    {
      label: "في الانتظار",
      count: inWayOrders,
      icon: <Timer className="h-5 w-5 text-yellow-600" />,
      bgColor: "bg-yellow-100 hover:bg-yellow-200",
      route: `/driver-trip/driver/showdata?status=InWay&driverId=${driverId}`,
    },
    {
      label: "سلمت",
      count: deliveredOrders,
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      bgColor: "bg-green-100 hover:bg-green-200",
      route: `/driver-trip/driver/showdata?status=Delivered&driverId=${driverId}`,
    },
    {
      label: "الغيت",
      count: canceledOrders,
      icon: <X className="h-5 w-5 text-red-600" />,
      bgColor: "bg-red-100 hover:bg-red-200",
      route: `/driver-trip/driver/showdata?status=canceled&driverId=${driverId}`,
    },
  ];
  const totalOrders = inWayOrders + deliveredOrders + canceledOrders;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-full h-14 bg-white text-gray-800 border border-gray-300 shadow-sm flex justify-between items-center px-4">
          <span className="font-semibold"> الطلبات</span>
          {totalOrders}
          <ChevronDown className="h-5 w-5 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-full max-w-[90vw] bg-white shadow-lg rounded-md p-2 space-y-2">
        {menuOptions.map((option) => (
          <DropdownMenuItem
            key={option.label}
            className={`flex justify-between items-center p-3 rounded-md cursor-pointer ${option.bgColor} transition-colors`}
            onClick={() => router.push(option.route)}
          >
            <div className="flex items-center gap-2">
              {option.icon}
              <span className="text-gray-800">{option.label}</span>
            </div>
            <span
              className={`text-white p-1 h-7 w-7 text-base rounded-full flex justify-center items-center ${
                option.label === "في الانتظار"
                  ? "bg-yellow-600"
                  : option.label === "سلمت"
                  ? "bg-green-700"
                  : "bg-red-600"
              }`}
            >
              {option.count}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuList;
