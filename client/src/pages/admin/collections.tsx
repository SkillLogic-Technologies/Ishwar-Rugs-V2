
"use client";

import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

interface Collection {
  _id: string;
  name: string;
  description: string;
  slug: string;
  image: string;
}

export default function AdminCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // FETCH COLLECTIONS
  const fetchCollections = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://127.0.0.1:5000/api/collection?page=${page}&limit=10`
      );

      setCollections(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error("Collection fetch error:", error);
      setCollections([]);
    } finally {
      setLoading(false);
    }
  };

  //  DELETE
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this collection?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://127.0.0.1:5000/api/collection/${id}`);

      // instant UI update
      setCollections((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [page]);

  return (
    <div className="mt-20 bg-white dark:bg-neutral-950 min-h-screen transition-colors">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 px-5">
        <h1 className="text-2xl font-semibold text-warm-gold dark:text-yellow-400">
          All Collections
        </h1>

        <Link href="/admin/add-collection">
          <button className="bg-warm-gold text-white px-5 py-2 rounded-lg shadow hover:bg-premium-gold transition">
            + Add Collection
          </button>
        </Link>
      </div>

      {/* TABLE */}
      <div className="px-5">
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-neutral-700">
          <table className="w-full text-sm">
            
            {/* HEAD */}
            <thead className="bg-gray-50 dark:bg-neutral-800 text-gray-600 dark:text-gray-300">
              <tr>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Slug</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center p-6 text-gray-500 dark:text-gray-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : collections.length > 0 ? (
                collections.map((collection) => (
                  <tr
                    key={collection._id}
                    className="border-t border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
                  >
                    {/* IMAGE */}
                    <td className="p-4">
                      <img
                        src={`http://127.0.0.1:5000/${collection.image}`}
                        alt={collection.name}
                        className="w-14 h-14 object-cover rounded"
                        onError={(e: any) => {
                          e.target.src =
                            "https://via.placeholder.com/60x60?text=No+Image";
                        }}
                      />
                    </td>

                    {/* NAME */}
                    <td className="p-4 font-medium text-gray-900 dark:text-white">
                      {collection.name}
                    </td>

                    {/* DESCRIPTION */}
                    <td className="p-4 max-w-xs truncate text-gray-600 dark:text-gray-300">
                      {collection.description}
                    </td>

                    {/* SLUG */}
                    <td className="p-4 text-gray-600 dark:text-gray-300">
                      {collection.slug}
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4 flex gap-3">
                      <Link href={`/admin/edit-collection/${collection.slug}`}>
                        <button className="text-green-600 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400 transition">
                          <Pencil size={18} />
                        </button>
                      </Link>

                      <button
                        className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 transition"
                        onClick={() => handleDelete(collection._id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center p-6 text-gray-500 dark:text-gray-400"
                  >
                    No collections found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center gap-3 mt-6 px-5 pb-10">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 disabled:opacity-50 bg-gray-200 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 rounded"
        >
          {"<<"}
        </button>

        <button className="px-4 py-1 bg-warm-gold text-white rounded">
          {page}
        </button>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 disabled:opacity-50 bg-gray-200 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 rounded"
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}