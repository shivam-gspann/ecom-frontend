import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useEffect, useState } from "react";


function Cart() {
    const [cart, setCart] = useState([]);
  const FREE_DELIVERY_THRESHOLD = 499;

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateShippingFee = (subtotal) => {
    return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 100;
  };

  const calculateTotalPrice = (subtotal, shippingFee) => {
    return subtotal + shippingFee;
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const subtotal = calculateSubtotal();
  const shippingFee = calculateShippingFee(subtotal);
  const totalPrice = calculateTotalPrice(subtotal, shippingFee);

  const amountNeededForFreeDelivery = Math.max(
    FREE_DELIVERY_THRESHOLD - subtotal,
    0
  );
  return (
    <div className="border rounded-lg p-4">
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
        <p className=" text-yellow-700 text-center">
          Spend ₹ {amountNeededForFreeDelivery} more to get free delivery!
        </p>
      )}
      <Button className="w-full ml-auto bg-black text-white" asChild>
        <Link to="/checkout">Proceed to Checkout</Link>
      </Button>
    </div>
  </div>
  )
}

export default Cart