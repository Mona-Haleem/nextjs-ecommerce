import { Order } from "@/lib/types";

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails = ({ order }: OrderDetailsProps) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
      <p>
        <strong>Order ID:</strong> {order?.id}
      </p>
      <p>
        <strong>Order Date:</strong>{" "}
        {new Date(order?.date).toLocaleDateString()}
      </p>
      <p>
        <strong>Expected Delivery:</strong>{" "}
        {new Date(order?.expectedDeliveryDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Status:</strong> {order?.status}
      </p>
      <p>
        <strong>Shipping Address:</strong> {order?.address}
      </p>
    </div>
  );
};

export default OrderDetails;
