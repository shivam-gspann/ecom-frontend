import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import {
  calculateShippingFee,
  calculateSubtotal,
  calculateTotalPrice,
  getAmountNeededForFreeDelivery,
} from "@/utils/cart";
import { FREE_DELIVERY_THRESHOLD } from "@/utils/constants";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CartPage() {
  const [cart, setCart] = useState([]);

  const subtotal = calculateSubtotal(cart);
  const shippingFee = calculateShippingFee(subtotal, FREE_DELIVERY_THRESHOLD);
  const totalPrice = calculateTotalPrice(subtotal, shippingFee);
  const amountNeededForFreeDelivery = getAmountNeededForFreeDelivery(
    subtotal,
    FREE_DELIVERY_THRESHOLD
  );

  const updateCart = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (index, event) => {
    const updatedCart = [...cart];

    updatedCart[index].quantity = parseInt(event.target.value, 10);

    updateCart(updatedCart);
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);

    updateCart(updatedCart);
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  return (
    <>
      {/* Cart Details  */}
      <div className="my-12 flex">
        <Heading first={"YOUR"} second={"CART"} />
      </div>
      <hr />
      {cart.length === 0 ? (
        <div className="text-center text-xl font-semibold text-red-500 my-12">
          <p> Cart is Empty !!!</p>
          <Button className="mt-4 text-black" variant={"outline"} asChild>
            <Link to={"/collection"}>Continue Shopping </Link>
          </Button>
        </div>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="flex items-center border-b py-4">
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-24 h-24 object-cover mr-4"
              />
              <div className="flex-grow">
                <p className="text-md font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">₹ {item.price}</p>
                <p className="text-xs text-gray-500">
                  Size: {item.selectedSize}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, e)}
                    min="1"
                    className="border px-2 py-1 text-center w-20"
                  />
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div>
                <p className="text-md font-semibold">
                  ₹ {item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cart Summary  */}
      {cart.length > 0 && (
        <>
          <div className="my-12 flex">
            <Heading first={"CART"} second={"SUMMARY"} />
          </div>
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
                  Spend ₹ {amountNeededForFreeDelivery} more to get free
                  delivery!
                </p>
              )}
              <Button className="w-full ml-auto bg-black text-white" asChild>
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CartPage;
