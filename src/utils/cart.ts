import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "./constants";

export const calculateSubtotal = (cart) => {
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export const calculateShippingFee = (subtotal, threshold = FREE_DELIVERY_THRESHOLD, fee = DELIVERY_FEE) => {
  return subtotal >= threshold ? 0 : fee;
};

export const calculateTotalPrice = (subtotal, shippingFee) => {
  return subtotal + shippingFee;
};

export const getAmountNeededForFreeDelivery = (subtotal, threshold = FREE_DELIVERY_THRESHOLD) => {
  return Math.max(threshold - subtotal, 0);
};
