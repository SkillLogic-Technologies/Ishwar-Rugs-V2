// src/components/ScrollToTop.tsx
// import { useEffect } from "react";
// import { useLocation } from "wouter";

// export default function ScrollToTop() {
//   const [location] = useLocation();

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [location]);

//   return null;
// }


import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
  const [location] = useLocation();

  // route change hone par scroll top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);

  // same route par click hone par bhi scroll top
  useEffect(() => {
    const handleClick = (e: any) => {
      const target = e.target.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");

      if (href === location) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [location]);

  return null;
}