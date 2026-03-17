import { ReactNode, useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { useLocation } from "wouter";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [, navigate] = useLocation(); 
  
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        await axios.get(
          "http://localhost:5000/api/admin/profile",
          { withCredentials: true }
        );
      } catch (error) {
        navigate("/admin/login"); // 🚀 redirect if not admin
      }
    };

    checkAdmin();
  }, []);
  return (
    <div className="flex bg-gray-50 dark:bg-neutral-950 w-full text-primary-brown dark:text-white">
      
      <aside>
        <AdminSidebar setIsOpen={setIsOpen} isOpen={isOpen} />
      </aside>

      
      <main
        className="lg:ml-64 flex-1 pt-[0px] overflow-auto"
      >
        <AdminNavbar setIsOpen={setIsOpen} isOpen={isOpen} />
        <div className="p-6">
        {children}
      </div>
      </main>
    </div>
  );
}
