"use client";
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import {
  AlertCircle,
  AlertCircleIcon,
  Calendar,
  CheckCircle,
  List,
  MapPin,
  MapPinX,
  MessageCircleMore,
  MousePointerBan,
  Phone,
  ReceiptText,
  RefreshCw,
  Rss,
  Truck,
  User,
  X,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import {
  Button,
  buttonVariants,
} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Order } from '../helper/cardType';
import {
  STATUS_STYLES,
  STATUS_TRANSLATIONS,
} from '../helper/helper';

// Subcomponent: StatusIcon
const StatusIcon = ({ status }: { status: string }) => {
  const icons: Record<string, React.ReactNode> = {
    Pending: <MousePointerBan className="text-primary-foreground h-4 w-4" />,
    InWay: <Truck className="text-primary-foreground h-4 w-4" />,
    Delivered: <CheckCircle className="text-primary-foreground h-4 w-4" />,
    canceled: <X className="text-primary-foreground h-4 w-4" />,
  };
  return icons[status] || <Truck className="text-gray-500 h-4 w-4" />;
};

// Subcomponent: OrderHeader
const OrderHeader = ({
  order,
}: {
  order: Order;

}) => {
  const statusStyle = STATUS_STYLES[order.status] || STATUS_STYLES.Default;

  return (
    <CardHeader className="flex flex-col">
      <div className="flex items-center justify-between">
        <Badge
          className={`flex items-center justify-center gap-2 ${statusStyle.color}`}
        >
          <StatusIcon status={order.status} />
          {STATUS_TRANSLATIONS[order.status as keyof typeof STATUS_TRANSLATIONS] ||
            STATUS_TRANSLATIONS.Default}
        </Badge>
        <CardTitle className="text-lg font-bold text-red-500">
          {order.amount.toFixed(2)} SAR
        </CardTitle>
      </div>
      <div className="text-sm text-muted-foreground flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <p className="text-xs">
            {formatDistanceToNow(new Date(order.createdAt), {
              addSuffix: true,
              locale: ar,
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw className="h-3 w-3 text-muted-foreground" />
          <p className="text-xs">
            {formatDistanceToNow(new Date(order.updatedAt), {
              addSuffix: true,
              locale: ar,
            })}
          </p>
        </div>
      </div>
    </CardHeader>
  );
};

const CustmerCardAction = ({ phone, address, latitude, longitude, orderNo }: { phone: string, address: string, latitude: string, longitude: string, orderNo: string }) => {
  return (<div className="flex items-center gap-4 self-end">
    <Button
      variant={"secondary"}
      size={"icon"}
      title={phone || "غير موجود"}
      className="text-sm flex items-center gap-2"
    >
      <Phone className="h-4 w-4 text-muted-foreground" />
    </Button>
    <Button
      variant={"secondary"}
      size={"icon"}
      title={address || " الاحداثيات متوفرة ولكن العنوان غير متوفر"}
      className="text-sm flex items-center gap-2 relative"
      disabled={!latitude}
    >
      {!address && <div className='absolute -top-2 -left-2'><AlertCircleIcon className='w-4 h-4 text-destructive' /></div>}
      {!latitude || !longitude ? (
        <MapPinX className="h-4 w-4 text-destructive" />
      ) : (
        <a href={`https://www.google.com/maps?q=${latitude},${longitude}`} target="_blank" rel="noopener noreferrer">
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </a>
      )}
    </Button>
    <Link
      href={`/dashboard/show-invoice/${orderNo}`}
      className={buttonVariants({
        variant: "secondary",
        size: "icon",
        className:
          "text-sm flex items-center gap-2",
      })}
    >
      <ReceiptText className="h-4 w-4 text-muted-foreground" />
    </Link>





  </div>)
}

// Subcomponent: OrderContent
const OrderContent = ({ order }: { order: Order }) => (
  <CardContent className="space-y-2 text-foreground">
    <CardTitle className="text-sm flex items-center gap-2">
      <List className="h-4 w-4 text-muted-foreground" />
      {order.orderNumber}
    </CardTitle>
    <div className="flex flex-col justify-between w-full gap-2">
      <CardDescription className="text-sm flex items-center gap-2">
        <User className="h-4 w-4 text-muted-foreground" />
        {order.customer?.name || "Unknown Customer"}
      </CardDescription>
      <CustmerCardAction phone={order.customer.phone} address={order.customer.address} latitude={order.customer.latitude} longitude={order.customer.longitude} orderNo={order.id} />

    </div>
    {order.driver?.name && (
      <CardTitle className="text-xs flex items-center gap-2 justify-end w-full">
        <Truck className="text-sm flex items-center gap-2" size={16} />{" "}
        {order.driver?.name || "Unknown Driver"}
      </CardTitle>
    )}
    {order.status === "canceled" && (
      <div className="text-sm bg-red-50 p-2 rounded flex gap-2 items-center text-wrap flex-wrap">
        <AlertCircle />
        {order.resonOfcancel || "لايوجد سبب"}
      </div>
    )}
  </CardContent>
);


// Subcomponent: OrderFooter
const OrderFooter = ({ order }: { order: Order }) => (
  <CardFooter className="flex flex-col items-end gap-2">
    <div className="flex items-center justify-between gap-2 w-full">
      {order.status === "InWay" && (
        order.isTripStart ? (
          <Link
            href={{ pathname: `/dashboard/track/${order.id}` }}
            className="w-full flex items-center justify-center bg-primary/80 p-2 rounded-md text-white gap-2"
          >
            <MapPin className="h-4 w-4" />
            <p>تتبع الطلبية</p>
          </Link>
        ) : (
          <div className="w-full flex items-center justify-center bg-gray-200 p-2 rounded-md text-gray-600 gap-2">
            <MapPin className="h-4 w-4" />
            <p>الرحلة لم تبدأ بعد</p>
          </div>
        )
      )}
      {order.status === "Pending" && (
        <Link
          href={`/dashboard/ship-order/${order.id}`}
          className="w-full rounded-md gap-2 flex items-center p-2 shadow-md justify-center bg-primary hover:bg-yellow-600 text-white"
        >
          <Truck className="h-4 w-4" />
          <p>شحن الطلبية</p>
        </Link>
      )}
      {order.status === "Delivered" && (
        <Link
          href={`/dashboard/ship-order/${order.id}`}
          className="w-full rounded-md gap-2 flex items-center p-2 justify-center bg-secondary "
        >
          <MessageCircleMore className="h-4 w-4" />
          <p>اطلب تقييم</p>
        </Link>
      )}
      {order.status === "canceled" && (
        <Link
          href={`/dashboard/ship-order/${order.id}`}
          className="w-full rounded-md gap-2 flex items-center p-2 justify-center bg-secondary "
        >
          <Rss className="h-4 w-4" />
          <p>متابعة العميل</p>
        </Link>
      )}
    </div>
  </CardFooter>
);



// Main Component: OrderCard
export default function OrderCard({
  order,
}: {
  order: Order;
}) {
  const statusStyle = STATUS_STYLES[order.status] || STATUS_STYLES.Default;
  console.log(order.customer)

  return (
    <Card className={`shadow-md rounded-lg ${statusStyle.border}`}>
      <OrderHeader order={order} />
      <OrderContent order={order} />
      <OrderFooter order={order} />
    </Card>
  );
}
