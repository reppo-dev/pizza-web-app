import { getCart } from "@/action/cart";
import CartClient from "@/components/cart-client";

const Cart = async () => {
  const result = await getCart();
  return (
    <div>
      <CartClient initialCart={result.data} />
    </div>
  );
};

export default Cart;
