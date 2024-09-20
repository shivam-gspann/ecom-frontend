import { useEffect} from "react";
import { useStore } from "@/store/context";


function Cart() {
  const {cart,setCart}=useStore();
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
    <>
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
  </>
  )
}

export default Cart