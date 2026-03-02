import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "wouter";

function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const BASE_URL = "http://localhost:5000/";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}api/order/my-orders`, {
        withCredentials: true,
      });
      setOrders(res.data.orders);
    } catch (error) {
      console.error("Failed to fetch orders");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 px-6">
      <h1 className="text-3xl font-bold mb-10 text-center">My Orders</h1>

      {orders.length === 0 && (
        <p className="text-center text-muted-foreground">No orders found</p>
      )}

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-card rounded-2xl shadow p-6 mb-10 border"
        >
          {/* Order Info */}
          <div className="flex justify-between mb-6">
            <div>
              <p className="font-semibold">Order ID: {order._id}</p>
              <p className="text-sm text-muted-foreground">
                Status: {order.orderStatus}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-lg">₹{order.totalAmount}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="space-y-4">
            {order.items.map((item: any) => (
              <div
                key={item._id}
                className="flex items-center gap-6 border rounded-xl p-4 hover:shadow-md transition"
              >
                {/* ✅ IMAGE CLICK → SLUG */}
                <Link href={`/product/${item.slug}`}>
                  <img
                    src={`${BASE_URL}${item.image}`}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded cursor-pointer"
                  />
                </Link>

                <div className="flex-1">
                  {/* ✅ TITLE CLICK → SLUG */}
                  <Link href={`/product/${item.slug}`}>
                    <h2 className="font-medium cursor-pointer hover:underline">
                      {item.title}
                    </h2>
                  </Link>

                  <p className="text-sm text-muted-foreground mt-1">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="font-semibold text-lg">₹{item.subtotal}</div>
              </div>
            ))}
          </div>

          {/* Shipping Address */}
          <div className="mt-8 border-t pt-6">
            <h3 className="font-semibold mb-3">Shipping Address</h3>
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.addressLine}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}
            </p>
            <p>{order.shippingAddress.pincode}</p>
            <p>{order.shippingAddress.phone}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrdersPage;
