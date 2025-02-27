// src/components/OrderHistory.tsx
import React, { useState } from "react";
import Button from "./Button";

interface Order {
  orderNumber: string;
  date: string;
  status: string;
  items: string[];
  detailsVisible?: boolean;
}

const initialOrders: Order[] = [
  {
    orderNumber: "12345",
    date: "2025-01-01",
    status: "Delivered",
    items: ["Nutcha Bites", "Matcha Latte"],
  },
  {
    orderNumber: "67890",
    date: "2025-02-15",
    status: "Pending",
    items: ["Nutcha Bites"],
  },
];

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const toggleDetails = (orderNumber: string) => {
    setOrders(
      orders.map((order) =>
        order.orderNumber === orderNumber
          ? { ...order, detailsVisible: !order.detailsVisible }
          : order
      )
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Order History</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.orderNumber}
            className="p-4 border rounded shadow-sm hover:shadow-md transition duration-150"
          >
            <div className="flex justify-between">
              <span>Order #{order.orderNumber}</span>
              <span className="text-sm text-gray-600">{order.date}</span>
            </div>
            <div className="mt-2">
              <span className="text-sm">
                Status: <strong>{order.status}</strong>
              </span>
            </div>
            <div className="mt-2">
              <span className="text-sm">Items: {order.items.join(", ")}</span>
            </div>
            <div className="mt-2">
              <Button
                label={order.detailsVisible ? "Hide Details" : "View Details"}
                className="text-green-600 hover:underline bg-transparent p-0"
                onClick={() => toggleDetails(order.orderNumber)}
                aria-expanded={order.detailsVisible}
                aria-controls={`order-details-${order.orderNumber}`}
              />
            </div>
            {order.detailsVisible && (
              <div
                id={`order-details-${order.orderNumber}`}
                className="mt-2 p-2 bg-gray-100 rounded transition"
              >
                <p className="text-sm">
                  Order details for order #{order.orderNumber} would be shown
                  here.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
