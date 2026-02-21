"use client";

import axios from "axios";
import { Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import toast from "react-hot-toast"

export default function InquiriesPage() {
  interface Inquiry {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    inquiryType: string;
    subject: string;
    message: string;
    status: string;
  }

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  const fetchContacts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/contact-us');
      setInquiries(res.data.data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/contact-us/${id}`);
      toast.success("Inuiry deleted successfully")
      fetchContacts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await axios.put(`http://localhost:5000/api/contact-us/${id}`,
        { status: newStatus }
      );

      setInquiries((prev: any[]) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, status: newStatus }
            : item
        )
      );

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);


  return (
    <div className="bg-white text-black dark:bg-black/40 p-2 dark:text-white min-h-screen">
      <div className="flex justify-between items-center mb-6 mt-20">
        <h1 className="text-2xl text-center font-semibold text-warm-gold dark:text-premium-gold">
          All Inquiries
        </h1>
      </div>

      <div className="bg-white dark:bg-black/10 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 dark:bg-black/10 dark:text-gray-200">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Inquiry Type</th>
              <th className="p-4 text-left">Subject</th>
              <th className="p-4 text-left">Message</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry: any) => (
              <tr
                key={inquiry._id}
                className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-black"
              >
                <td className="p-4 font-medium">
                  {inquiry.fullName}
                </td>
                <td className="p-4">
                  {inquiry.email}
                </td>
                <td className="p-4">
                  {inquiry.phone}
                </td>
                <td className="p-4">
                  {inquiry.inquiryType}
                </td>
                <td className="p-4">
                  {inquiry.subject}
                </td>
                <td className="p-4">
                  {inquiry.message}
                </td>
                <td className="p-4">
                  <select
                    value={inquiry.status}
                    onChange={(e) =>
                      handleStatusChange(inquiry._id, e.target.value)
                    }
                    className="
                      px-2 py-1 rounded outline-none
                      bg-white text-black border-gray-300

                      dark:bg-black/40
                      dark:text-white
                      dark:border-gray-600
    "
                  >
                    <option value="new">New</option>
                    <option value="seen">Seen</option>
                    <option value="replied">Replied</option>
                  </select>
                </td>

                <td className="p-4 flex gap-3">
                  <Link href={`/admin/inquiries/${inquiry._id}`}>
                    <button
                      className="
                        p-2 rounded-md transition
                        text-gray-600 hover:text-blue-600 hover:bg-blue-50
                        dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-900/30
                      "
                    >
                      <Eye size={18} />
                    </button>
                  </Link>
                  <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(inquiry._id)} >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}





