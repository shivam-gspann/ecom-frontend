import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  calculateShippingFee,
  calculateSubtotal,
  calculateTotalPrice,
  getAmountNeededForFreeDelivery,
} from "@/utils/cart";
import { FREE_DELIVERY_THRESHOLD } from "@/utils/constants";
import Heading from "@/components/Heading";

function CheckoutPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const subtotal = calculateSubtotal(cart);
  const shippingFee = calculateShippingFee(subtotal, FREE_DELIVERY_THRESHOLD);
  const totalPrice = calculateTotalPrice(subtotal, shippingFee);
  const amountNeededForFreeDelivery = getAmountNeededForFreeDelivery(
    subtotal,
    FREE_DELIVERY_THRESHOLD
  );

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!!!");
      return;
    }

    const newOrderId = uuidv4();

    const orderData = {
      orderId: newOrderId,
      items: cart,
      subtotal,
      shippingFee,
      totalPrice,
      date: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    existingOrders.push(orderData);

    localStorage.setItem("orders", JSON.stringify(existingOrders));

    localStorage.removeItem("cart");
    setCart([]);

    toast.success("Order Placed Successfully!!!");

    navigate("/");
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Delievery Information  */}
        <div>
          <div className="flex">
            <Heading first={"DELIEVERY"} second={"INFORMATION"} />
          </div>
          <div className="flex flex-col justify-start items-center gap-4 my-12">
            <div className="flex gap-4 w-full">
              <Input type="text" placeholder="First Name" />
              <Input type="text" placeholder="Last Name" />
            </div>
            <Input type="email" placeholder="Email Address" />
            <Input type="text" placeholder="Street" />
            <div className="flex justify-between gap-4 w-full">
              <Input type="text" placeholder="City" />
              <Input type="text" placeholder="State" />
            </div>
            <div className="flex justify-between gap-4 w-full">
              <Input type="number" placeholder="Zip Code" />
              <Input type="text" placeholder="Country" />
            </div>
            <Input type="number" placeholder="Phone" />
          </div>
        </div>

        {/* Cart Summary  */}
        <div>
          <div className="flex">
            <Heading first={"CART"} second={"SUMMARY"} />
          </div>
          <div className="border rounded-lg p-4 my-12">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-md font-medium">
                <p>Subtotal:</p>
                <p>₹ {subtotal}</p>
              </div>
              <div className="flex justify-between text-md font-medium">
                <p>Shipping Fee:</p>
                <p>₹ {shippingFee}</p>
              </div>
              <div className="flex justify-between text-xl font-semibold">
                <p>Total Price:</p>
                <p>₹ {totalPrice}</p>
              </div>
              {amountNeededForFreeDelivery > 0 && (
                <p className="text-yellow-700 text-center">
                  Spend ₹ {amountNeededForFreeDelivery} more to get free
                  delivery!
                </p>
              )}
              <Button
                className="w-full ml-auto bg-black text-white"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
