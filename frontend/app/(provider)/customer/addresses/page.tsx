import { allAddress } from "@/action/address";
import CartAddress from "@/components/cart-address";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Address = async () => {
  const response = await allAddress();
  const address = response.data;
  return (
    <div>
      <CartAddress cartAddress={address} />
      <div className="fixed bottom-10 right-10">
        <Link href="/customer/createaddress">
          <Button>Add Address</Button>
        </Link>
      </div>
    </div>
  );
};

export default Address;
