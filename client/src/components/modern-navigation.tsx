import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  Menu,
  Sun,
  Moon,
  Search,
  Heart,
  ShoppingBag,
  User,
} from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import Login from "@/pages/login";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function ModernNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const { theme, setTheme } = useTheme();
  const { wishlistCount } = useWishlist();
  const { cartCount, setCartCount } = useCart(); // ✅ FIXED
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [location, navigate] = useLocation();
  
  const isVerifyPage = location === "/verify";

  type VerifiedUser = {
    username: string;
    email?: string;
  };

  const [verifiedUser, setVerifiedUser] =
    useState<VerifiedUser | null>(null);

  // ✅ Load verified user
  useEffect(() => {
  const loadUser = () => {
    const user = localStorage.getItem("verifiedUser");
    setVerifiedUser(user ? JSON.parse(user) : null);
  };

  loadUser();

  window.addEventListener("userVerified", loadUser);

  return () => {
    window.removeEventListener("userVerified", loadUser);
  };
}, []);
  // ✅ CART AUTO SYNC (page change + payment success)
  useEffect(() => {
    const refreshCart = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/user/cart",
          { withCredentials: true }
        );

        const items = res.data.items || [];

        const count = items.reduce(
          (acc: number, item: any) => acc + item.quantity,
          0
        );

        setCartCount(count);
      } catch {
        setCartCount(0);
      }
    };

    refreshCart(); // page load or route change

    window.addEventListener("cartUpdated", refreshCart);

    return () => {
      window.removeEventListener("cartUpdated", refreshCart);
    };
  }, [location]);

 const handleLogout = async () => {
  try {
    await fetch("http://127.0.0.1:5000/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    console.error("Logout error", err);
  }

 localStorage.removeItem("token");
localStorage.removeItem("verifiedUser");

setVerifiedUser(null);
setToken(null);

navigate("/");
};

  return (
    <nav className="fixed w-full top-0 z-50 glass-effect border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link href="/">
            <img
              src="/logo/Logo.png"
              alt="Ishwar Rugs Logo"
              className="h-20 w-auto cursor-pointer"
            />
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-semibold">
                    COLLECTIONS
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-96 p-6">
                      <NavigationMenuLink asChild>
                        <Link href="/collections">
                          View All Collections →
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link href="/about">HERITAGE</Link>
            <Link href="/stories">STORIES</Link>
            <Link href="/contact">CONTACT</Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">

            {/* Theme */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Wishlist */}
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </Button>
            </Link>

            {/* User */}
            <div className="relative group">
              <Button variant="ghost" size="icon">
                {verifiedUser?.username ? (
                  <div className="h-8 w-8 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold">
                    {verifiedUser.username.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <User className="h-5 w-5" />
                )}
              </Button>

              <div className="absolute right-0 top-full  w-44 bg-white dark:bg-black border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">

                {!isVerifyPage && token && (
                  <>
                    <button
                      onClick={() => navigate("/orders")}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      My Orders
                    </button>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Logout
                    </button>
                  </>
                )}

                {!token && (
                  <button
                    onClick={() => setShowLogin(true)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-6 mt-8">
                  <Link href="/">HOME</Link>
                  <Link href="/collections">COLLECTIONS</Link>
                  <Link href="/about">HERITAGE</Link>
                  <Link href="/stories">STORIES</Link>
                  <Link href="/contact">CONTACT</Link>
                </div>
              </SheetContent>
            </Sheet>

          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div
          className="my-24 flex items-center justify-center"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="w-[90%] max-w-md p-8 rounded-2xl bg-[#020617] border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-3 right-3 text-white"
            >
              ✖
            </button>

            <Login />
          </div>
        </div>
      )}
    </nav>
  );
}