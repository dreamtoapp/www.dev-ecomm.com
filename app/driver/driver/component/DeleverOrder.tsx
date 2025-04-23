import React from "react";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../../components/ui/dialog";
import { useRouter } from "next/navigation";
import { deleverOrder } from "../action/actions";

interface DeleverOrderProps {
  orderId: string;
  orderNumber: string;
  driverId: string;
  driverName: string;
}

function DeleverOrder({
  orderId,
  orderNumber,
  driverId,
  driverName,
}: DeleverOrderProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleConfirm = async () => {
    // Add your delivery confirmation logic here
    const cancelJobOrder = await deleverOrder(orderId);
    router.push(
      `/driver-trip/driver?driverId=${driverId}&status=InWay&name=${driverName}`
    );
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">تسليم الطلبية</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>تأكيد التسليم</DialogTitle>
          <DialogDescription>
            هل أنت متأكد أنك تريد تسليم هذه الطلبية؟
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col items-center gap-8 w-full">
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleConfirm}
          >
            تأكيد التسليم
          </Button>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="w-full"
          >
            إلغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleverOrder;
