// pages/collections.tsx
import { useEffect, useState } from "react";
import { Link } from "wouter";

interface Collection {
  _id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/collection/");
        const data = await res.json();
        if (data.success) {
          setCollections(data.data);
        }
      } catch (err) {
        console.error("Error fetching collections:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-gray-500 text-lg">Loading collections...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">

      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-premium-gold mb-8 text-center sm:text-left">
        All Collections
      </h1>

      {collections.length === 0 ? (
        <p className="text-gray-500">No collections available.</p>
      ) : (

        <div className="grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        gap-6 sm:gap-8">

          {collections.map((c) => (

            <Link key={c._id} href={`/collections/${c.slug}`} className="group">

              <div className="overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 bg-[#020617]">

                {/* Image Container */}
                <div className="w-full h-52 sm:h-56 md:h-60 lg:h-64 bg-white flex items-center justify-center">

                  <img
                    src={`http://127.0.0.1:5000/${c.image}`}
                    alt={c.name}
                    className="max-h-full max-w-full object-contain"
                  />

                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 text-white">

                  <h2 className="text-base sm:text-lg font-semibold mb-1">
                    {c.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">
                    {c.description}
                  </p>

                </div>

              </div>

            </Link>

          ))}

        </div>

      )}

    </div>
  );
}