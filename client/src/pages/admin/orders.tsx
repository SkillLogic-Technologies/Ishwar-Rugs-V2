import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const BASE_URL = "http://localhost:5000/";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}api/order/all`,
        { withCredentials: true }
      );
      setOrders(res.data.orders);
    } catch (error) {
      console.log("Failed to fetch orders");
    }
  };

  const updateStatus = async (orderId: string, status: string) => {
    try {
      await axios.put(
        `${BASE_URL}api/admin/order/${orderId}/status`,
        { status },
        { withCredentials: true }
      );

      toast.success("Status updated");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500";
      case "Processing":
        return "text-blue-500";
      case "Shipped":
        return "text-purple-500";
      case "Delivered":
        return "text-green-600";
      case "Cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white dark:bg-black rounded-xl shadow p-6 mb-8 border"
        >
          {/* Order Header */}
          <div className="flex justify-between mb-4">
            <div>
              <p className="font-semibold">
                Order ID: {order._id}
              </p>
              <p className="text-sm text-gray-500">
                {order.user?.name} ({order.user?.email})
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold">
                ₹{order.totalAmount}
              </p>
              <p className={`font-medium ${getStatusColor(order.orderStatus)}`}>
                {order.orderStatus}
              </p>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="space-y-4">
            {order.items.map((item: any) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border rounded-lg p-3"
              >
                <img
                  src={`${BASE_URL}${item.image}`}
                  className="w-16 h-16 object-cover rounded"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <div className="font-semibold">
                  ₹{item.subtotal}
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Address */}
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.addressLine}</p>
            <p>
              {order.shippingAddress.city},{" "}
              {order.shippingAddress.state}
            </p>
            <p>{order.shippingAddress.pincode}</p>
            <p>{order.shippingAddress.phone}</p>
          </div>

          {/* Status Dropdown */}
          <div className="mt-6">
            <select
              value={order.orderStatus}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
              className="border p-2 rounded"
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;