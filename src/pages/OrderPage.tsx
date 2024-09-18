import Heading from "@/components/Heading";
import { useEffect, useState } from "react";

function OrderPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(storedOrders);
  }, []);

  return (
    <>
      <div className="my-12 flex">
        <Heading first={"YOUR"} second={"ORDERS"} />
      </div>
      {orders.length === 0 ? (
        <div className="text-center text-xl font-semibold text-red-500">
          No Orders Yet !!!
        </div>
      ) : (
        <div className="flex flex-col gap-12 my-12">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="flex flex-col gap-2 border rounded-lg p-4 shadow-sm"
            >
              <div className="text-lg font-semibold">
                Order ID: {order.orderId}
              </div>
              <div className="text-sm text-gray-600">
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center border-b py-2">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div className="flex-grow">
                    <p className="text-md font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">₹ {item.price}</p>
                    <p className="text-xs text-gray-500">
                      Size: {item.selectedSize}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div>
                    <p className="text-md font-semibold">
                      ₹ {item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex justify-between text-md font-medium">
                <p>Subtotal:</p>
                <p>₹ {order.subtotal}</p>
              </div>
              <div className="flex justify-between text-md font-medium">
                <p>Shipping Fee:</p>
                <p>₹ {order.shippingFee}</p>
              </div>
              <div className="flex justify-between text-xl font-semibold">
                <p>Total Price:</p>
                <p>₹ {order.totalPrice}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default OrderPage;
