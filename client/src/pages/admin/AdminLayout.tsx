import { ReactNode, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
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
