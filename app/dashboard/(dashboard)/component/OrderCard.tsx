"use client";
import React, { useMemo } from 'react';

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
import dynamic from 'next/dynamic';

import Link from '@/components/link';
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
import { Order } from '@/types/cardType';

import {
  STATUS_STYLES,
  STATUS_TRANSLATIONS,
} from '../helper/helper';

// Lazy load heavy components
const LazyTruckIcon = dynamic(() => import("lucide-react").then((mod) => mod.Truck), { ssr: false });

// Memoized StatusIcon
const StatusIcon = React.memo(({ status }: { status: string }) => {
  const icons: Record<string, React.ReactNode> = {
    Pending: <MousePointerBan className="text-primary-foreground h-4 w-4" />,
    InWay: <LazyTruckIcon className="text-primary-foreground h-4 w-4" />,
    Delivered: <CheckCircle className="text-primary-foreground h-4 w-4" />,
    canceled: <X className="text-primary-foreground h-4 w-4" />,
  };
  return icons[status] || <Truck className="text-gray-500 h-4 w-4" />;
});

// Memoized OrderHeader
const OrderHeader = React.memo(({ order }: { order: Order }) => {
  const statusStyle = useMemo(() => STATUS_STYLES[order.status] || STATUS_STYLES.Default, [order.status]);
  const createdAt = useMemo(() => formatDistanceToNow(new Date(order.createdAt), { addSuffix: true, locale: ar }), [order.createdAt]);
  const updatedAt = useMemo(() => formatDistanceToNow(new Date(order.updatedAt), { addSuffix: true, locale: ar }), [order.updatedAt]);

  return (
    <CardHeader className="flex flex-col">
      <div className="flex items-center justify-between">
        <Badge className={`flex items-center justify-center gap-2 ${statusStyle.color}`}>
          <StatusIcon status={order.status} />
          {STATUS_TRANSLATIONS[order.status as keyof typeof STATUS_TRANSLATIONS] || STATUS_TRANSLATIONS.Default}
        </Badge>
        <CardTitle className="text-lg font-bold text-red-500">{order.amount.toFixed(2)} SAR</CardTitle>
      </div>
      <div className="text-sm text-muted-foreground flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <p className="text-xs">{createdAt}</p>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw className="h-3 w-3 text-muted-foreground" />
          <p className="text-xs">{updatedAt}</p>
        </div>
      </div>
    </CardHeader>
  );
});

// Memoized CustmerCardAction
const CustmerCardAction = React.memo(({ phone, address, latitude, longitude, orderNo }: { phone: string; address: string; latitude: string; longitude: string; orderNo: string }) => (
  <div className="flex items-center gap-4 self-end">
    <Button variant="secondary" size="icon" title={phone || "غير موجود"} className="text-sm flex items-center gap-2">
      <Phone className="h-4 w-4 text-muted-foreground" />
    </Button>
    <Button
      variant="secondary"
      size="icon"
      title={address || " الاحداثيات متوفرة ولكن العنوان غير متوفر"}
      className="text-sm flex items-center gap-2 relative"
      disabled={!latitude}
    >
      {!address && <div className="absolute -top-2 -left-2"><AlertCircleIcon className="w-4 h-4 text-destructive" /></div>}
      {!latitude || !longitude ? (
        <MapPinX className="h-4 w-4 text-destructive" />
      ) : (
        <a href={`https://www.google.com/maps?q=${latitude},${longitude}`} target="_blank" rel="noopener noreferrer">
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </a>
      )}
    </Button>

  </div>
));

// Memoized OrderContent
const OrderContent = React.memo(({ order }: { order: Order }) => (
  <CardContent className="space-y-2 text-foreground">

    <div className='flex items-center justify-between w-full'>
      <CardTitle className="text-sm flex items-center gap-2">
        <List className="h-4 w-4 text-muted-foreground" />
        {order.orderNumber}
      </CardTitle>
      <Link
        href={`/dashboard/show-invoice/${order.id}`}
        prefetch={false}
        className={buttonVariants({ variant: "secondary", size: "icon", className: "text-sm flex items-center gap-2" })}
      >
        <ReceiptText className="h-4 w-4 text-muted-foreground" />
      </Link>

    </div>

    <div className='flex items-center justify-between w-full flex-wrap'>
      <CardDescription className="text-sm flex items-center gap-2">
        <User className="h-4 w-4 text-muted-foreground" />
        {order.customer?.name || "Unknown Customer"}
      </CardDescription>

      <CustmerCardAction
        phone={order.customer.phone}
        address={order?.customer?.address || ""}
        latitude={order.customer.latitude}
        longitude={order.customer.longitude}
        orderNo={order.id}
      />

    </div>


    {order.driver?.name && (
      <CardTitle className="text-xs flex items-center gap-2 justify-end w-full">
        <Truck className="text-sm flex items-center gap-2" size={16} /> {order.driver?.name || "Unknown Driver"}
      </CardTitle>
    )}
    {order.status === "canceled" && (
      <div className="text-sm bg-red-50 p-2 rounded flex gap-2 items-center text-wrap flex-wrap">
        <AlertCircle />
        {order.resonOfcancel || "لايوجد سبب"}
      </div>
    )}
  </CardContent>
));

// Memoized OrderFooter
const OrderFooter = React.memo(({ order }: { order: Order }) => (
  <CardFooter className="flex  items-end gap-2">

    <div className="flex items-center justify-between gap-2 w-full">
      {order.status === "InWay" && (
        order.isTripStart ? (
          <Link
            href={`/dashboard/track/${order.id}`}
            prefetch={false}
            className="w-full flex items-center justify-center bg-primary/80 p-2 rounded-md text-white gap-2"
          >
            <MapPin className="h-4 w-4" />
            <p>تتبع الطلبية</p>
          </Link>
        ) : (
          <div className="w-full flex items-center justify-center bg-gray-200 p-2 rounded-md text-gray-600 gap-2">
            <MapPin className="h-4 w-4" />
            <p> لم تبدأ بعد</p>
          </div>
        )
      )}
      {order.status === "Pending" && (
        <Link
          // href={`/dashboard/ship-order/${order.id}`}
          href={`/dashboard/show-invoice/${order.id}?status=ship`}
          // href={`/dashboard/track/${order.id}?status=ship`}
          prefetch={false}
          className="w-full rounded-md gap-2 flex items-center p-2 shadow-md justify-center bg-primary hover:bg-yellow-600 text-white"
        >
          <Truck className="h-4 w-4" />
          <p>شحن الطلبية</p>
        </Link>
      )}
      {/* {order.status === "Delivered" && (
        <Link
          href={`/dashboard/ship-order/${order.id}`}
          prefetch={false}
          className="w-full rounded-md gap-2 flex items-center p-2 justify-center bg-secondary "
        >
          <MessageCircleMore className="h-4 w-4" />
          <p>اطلب تقييم</p>
        </Link>
      )} */}
      {/* {order.status === "canceled" && (
        <Link
          href={`/dashboard/ship-order/${order.id}`}
          prefetch={false}
          className="w-full rounded-md gap-2 flex items-center p-2 justify-center bg-secondary "
        >
          <Rss className="h-4 w-4" />
          <p>متابعة العميل</p>
        </Link>
      )} */}
    </div>

  </CardFooter>
));

// Main Component: OrderCard
const OrderCard = React.memo(({ order }: { order: Order }) => {
  const statusStyle = useMemo(() => STATUS_STYLES[order.status] || STATUS_STYLES.Default, [order.status]);

  return (
    <Card className={`shadow-md rounded-lg ${statusStyle.border}`}>
      <OrderHeader order={order} />
      <OrderContent order={order} />
      <OrderFooter order={order} />
    </Card>
  );
});

export default OrderCard;
