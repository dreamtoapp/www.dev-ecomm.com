import { getDriver, getOrder } from "../action/action";
import { OrderDetails } from "../component/OrderDetails";

type Params = Promise<{ id: string }>;

export default async function shipOrder({ params }: { params: Params }) {
  const { id } = await params;

  const order = await getOrder(id);
  const drivers = await getDriver();
  if (!order) {
    return <div className="container mx-auto p-4">Order not found</div>;
  }
  return (
    <div className="container mx-auto p-4">
      <OrderDetails order={order} driver={drivers} />
    </div>
  );
}
