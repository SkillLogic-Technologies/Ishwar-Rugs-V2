import { createContext, useContext, useState, ReactNode } from "react";

type WishlistContextType = {
  wishlistCount: number;
  setWishlistCount: React.Dispatch<
    React.SetStateAction<number>
  >;
};

const WishlistContext =
  createContext<WishlistContextType | null>(null);

type ProviderProps = {
  children: ReactNode;
};

export const WishlistProvider = ({ children }: ProviderProps) => {
  const [wishlistCount, setWishlistCount] = useState<number>(0);

  return (
    <WishlistContext.Provider
      value={{ wishlistCount, setWishlistCount }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used within WishlistProvider"
    );
  }

  return context;
};
