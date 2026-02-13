import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { Link } from "wouter"


const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const { setCartCount } = useCart();


    const BASE_URL = "http://localhost:5000/"

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        const res = await axios.get(`${BASE_URL}api/user/cart`,{withCredentials:true});
        setCartItems(res.data.items);
        setCartTotal(res.data.cartTotal);

        const count = res.data.items.reduce(
          (acc: number, item: any) =>
            acc + item.quantity,
          0
        );

        setCartCount(count);
        
    };

    const updateQuantity = async ( itemId: string, action: "inc" | "dec" ) => {
      const res = await axios.put(
        `${BASE_URL}api/user/cart/update-quantity`,
        { itemId, action },
        { withCredentials: true }
      );
    toast.success("Quantity updated successfully")

    setCartItems(res.data.items);
    setCartTotal(res.data.cartTotal);

    const count = res.data.items.reduce(
  (acc: number, item: any) =>
    acc + item.quantity,
  0
);

setCartCount(count);
    };

    const removeItem = async (itemId: string) => {
      const res = await axios.delete(
    `${BASE_URL}api/user/cart/remove-item`,
    {
      data: { itemId },          
      withCredentials: true,
    }
  );

  toast.success("Removed from cart")
  setCartItems(res.data.items);
  setCartTotal(res.data.cartTotal);

  const count = res.data.items.reduce(
  (acc: number, item: any) =>
    acc + item.quantity,
  0
);

setCartCount(count);
    };



  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white transition-colors">
      
      <div className="max-w-7xl mx-auto px-4 py-10 my-20">
        
        <h1 className="text-4xl font-bold text-premium-gold mb-8 text-center">
          Your Cart
        </h1>
        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            {cartItems.length === 0 && (
              <p className="text-gray-500">
                Your cart is empty
              </p>
            )}

            {cartItems.map((item: any) => (
            <Link key={item._id} href={`/product/${item.product.slug}`}>
            <div
              key={item._id}
              className="
                group flex flex-row mb-6 items-start gap-4 sm:gap-6
                rounded-2xl p-5
                bg-white dark:bg-black border
                shadow-sm
                transition-all duration-300 ease-in-out
                hover:shadow-xl hover:-translate-y-1
                hover:border-gray-300 dark:hover:border-gray-800">

    
    <div className="overflow-hidden rounded-xl">
      <img
        src={`${BASE_URL}${item.product?.thumbnail}`}
        alt={item.product?.title}
        className="
           w-24 h-24
  sm:w-32 sm:h-32
  object-cover
  flex-shrink-0
  transition-transform duration-300
  group-hover:scale-110
        "
      />
    </div>

  
    <div className="flex-1 min-w-0">

      <h2 className="font-medium text-lg">
        {item.product?.title}
      </h2>

      <p className="text-gray-500 text-sm mt-1">
        {item.product?.category?.name} | {item.product?.style}
      </p>

      
      <div className="flex items-center gap-3 mt-4">

        <button onClick={(e) =>{ e.stopPropagation();
                  e.preventDefault();  updateQuantity(item._id, "dec")}
          
        } className="w-8 h-8 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          -
        </button>

        <span>{item.quantity}</span>

        <button onClick={(e) =>
          { e.stopPropagation();
                  e.preventDefault();  updateQuantity(item._id, "inc")}
        }
        className="w-8 h-8 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          +
        </button>

      </div>

    </div>

    <div className="flex flex-col items-end justify-between
min-w-[90px] sm:min-w-[120px]
">

      {/* Price */}
      <p className="font-semibold text-lg">
        ₹{item.price}
      </p>

      {/* Item Total */}
      <p className="text-sm text-gray-500">
        Total: ₹{item.total}
      </p>

      {/* Remove */}
      <button
      onClick={(e) => {  e.stopPropagation();
                  e.preventDefault();  removeItem(item._id)}}
        className="
          flex items-center gap-1
          text-sm font-medium
          text-red-500
          px-3 py-1.5
          rounded-lg
          transition-all duration-200

          hover:bg-red-50
          hover:text-red-600

          dark:hover:bg-red-900/20
        "
      >
        🗑 Remove
      </button>


    </div>

  </div>
  </Link>
))}

          </div>

          <div
  className="
    border border-gray-200 dark:border-gray-800
    rounded-2xl
    p-8
    h-fit

    bg-white dark:bg-[#0a0a0a]

    shadow-sm
    hover:shadow-lg
    transition
  "
>

  <h2 className="text-2xl font-semibold mb-8 tracking-wide">
    Order Summary
  </h2>

  <div className="flex justify-between text-sm mb-4">
    <span className="text-gray-600 dark:text-gray-400">
      Subtotal
    </span>
    <span className="font-medium">
      ₹{cartTotal}
    </span>
  </div>

  <div className="flex justify-between text-sm mb-4">
    <span className="text-gray-600 dark:text-gray-400">
      Shipping
    </span>
    <span className="text-green-600 font-medium">
      Free
    </span>
  </div>

  <div className="border-t border-dashed border-gray-300 dark:border-gray-700 my-6"></div>

  <div className="flex justify-between items-center mb-8">

    <span className="text-lg font-semibold">
      Total
    </span>

    <span className="text-2xl font-bold text-premium-gold">
      ₹{cartTotal}
    </span>

  </div>

  <button
    className="
      w-full
      py-4
      rounded-xl

      bg-black
      text-white

      dark:bg-white
      dark:text-black

      font-medium
      tracking-wide

      hover:opacity-90
      hover:scale-[1.01]

      transition-all duration-200
    "
  >
    Proceed to Checkout
  </button>

  <p className="text-xs text-gray-500 text-center mt-4">
    🔒 Secure Checkout • SSL Encrypted
  </p>

</div>


        </div>
      </div>
    </div>
  );
};

export default CartPage;