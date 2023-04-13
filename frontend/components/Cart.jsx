import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

function CartItem({ data }) {
  const { addItem, removeItem } = useAuth();
  const { quantity, attributes } = data;
  return (
    <div className="p-6 flex flex-wrap justify-between border-b border-blueGray-800">
      <div className="w-2/4">
        <div className="flex flex-col h-full">
          <h6 className="font-bold text-white mb-1">{attributes.name}</h6>
          <span className="block pb-4 mb-auto font-medium text-gray-400">
            {quantity} x ${attributes.price.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="w-1/4">
        <div className="flex flex-col items-end h-full">
          <div className="flex justify-between">
            <button
              className="mr-2 inline-block mb-auto font-medium text-sm text-gray-400 hover:text-gray-200"
              onClick={() => removeItem(data)}
            >
              Remove
            </button>
            <button
              className="inline-block mb-auto font-medium text-sm text-gray-400 hover:text-gray-200"
              onClick={() => addItem(data)}
            >
              Add
            </button>
          </div>
          <span className="block mt-2 text-sm font-bold text-white">
            ${(attributes.price * quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  const { user, cart } = useAuth();
  const total = cart.total.toFixed(2);
  const displayTotal = Math.abs(total);

  return (
    <section className="relative ">
      <div className="rounded-2xl bg-gray-800">
        <div className="max-w-lg pt-6 pb-8 px-8 mx-auto bg-blueGray-900">
          <div className="flex mb-10 items-center justify-between">
            <h6 className="font-bold text-2xl text-white mb-0">Your Cart</h6>
          </div>

          <div>
            {cart.items
              ? cart.items.map((item, index) => {
                  if (item.quantity > 0) {
                    return <CartItem key={index} data={item} />;
                  }
                })
              : null}
          </div>
          <div className="p-6">
            <div className="flex mb-6 content-center justify-between">
              <span className="font-bold text-white">Order total</span>
              <span className="text-sm font-bold text-white">
                ${displayTotal}
              </span>
            </div>
            <Link
              href={user ? "/pay" : "/login"}
              className="inline-block w-full px-6 py-3 text-center font-bold text-white bg-green-500 hover:bg-green-600 transition duration-200 rounded-full"
            >
              {user ? "Continue To Pay" : "Login to Order"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}