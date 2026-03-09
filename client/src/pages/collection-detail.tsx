// import { useParams } from "wouter";
// import { useQuery } from "@tanstack/react-query";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useState } from "react";
// import { Link } from "wouter";
// import { api } from "@/lib/api";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import CollectionInquiryModal from "@/components/CollectionInquiryModal";

// export default function CollectionDetail() {
//   const { slug } = useParams<{ slug: string }>();
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [inquirySubject, setInquirySubject] = useState("");

//   const { data: collection, isLoading: collectionLoading, error } = useQuery({
//     queryKey: [`/api/collections/${slug}`],
//     queryFn: () => api.collections.getBySlug(slug!),
//     enabled: !!slug,
//   });

//   const { data: products, isLoading: productsLoading } = useQuery({
//     queryKey: [`/api/products/collection/${collection?.id}`],
//     queryFn: () => api.products.getByCollection(collection!.id),
//     enabled: !!collection?.id,
//   });

//   if (collectionLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-brown"></div>
//       </div>
//     );
//   }

//   if (error || !collection) {
//     return (
//       <div className="min-h-screen flex items-center justify-center pt-20">
//         <div className="text-center">
//           <h1 className="font-serif text-4xl text-primary-brown mb-4">Collection Not Found</h1>
//           <p className="text-primary-brown opacity-80 mb-8">
//             The collection you're looking for doesn't exist or has been moved.
//           </p>
//           <Link href="/collections">
//             <Button className="btn-primary">VIEW ALL COLLECTIONS</Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const galleryImages: string[] = collection.galleryImages?.length ? collection.galleryImages : [collection.heroImage];

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
//   };

//   const previousImage = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
//   };

//   const openInquiryModal = (subject: string) => {
//     setInquirySubject(subject);
//     setModalOpen(true);
//   };

//   return (
//     <div className="min-h-screen pt-20 text-primary-brown dark:text-neutral-100">
//       <CollectionInquiryModal open={modalOpen} onClose={() => setModalOpen(false)} defaultSubject={inquirySubject} />

//       {/* Breadcrumb */}
//       <div className="bg-soft-gray dark:bg-[#1c1c1c] py-4">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center space-x-2 text-sm text-primary-brown dark:text-neutral-300">
//             <Link href="/" className="hover:text-warm-gold transition-colors">Home</Link>
//             <span className="opacity-50">/</span>
//             <Link href="/collections" className="hover:text-warm-gold transition-colors">Collections</Link>
//             <span className="opacity-50">/</span>
//             <span className="font-semibold">{collection.name || "Collection"}</span>
//           </div>
//         </div>
//       </div>

//       {/* Hero Section */}
//       <section className="py-20 bg-white dark:bg-black transition-colors">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Image Gallery */}
//             <div className="relative">
//               <div className="relative overflow-hidden rounded-lg shadow-xl bg-neutral-200 dark:bg-neutral-800">
//                 {galleryImages[currentImageIndex] ? (
//                   <img
//                     src={galleryImages[currentImageIndex]}
//                     alt={`${collection.name} - Image ${currentImageIndex + 1}`}
//                     loading={currentImageIndex === 0 ? "eager" : "lazy"}
//                     decoding="async"
//                     className="w-full h-96 lg:h-[500px] object-cover"
//                   />
//                 ) : (
//                   <div className="flex items-center justify-center w-full h-96 lg:h-[500px] text-neutral-500 dark:text-neutral-400 text-xl">
//                     Image Not Available
//                   </div>
//                 )}
//                 {galleryImages.length > 1 && (
//                   <>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="absolute left-4 top-1/2 transform -translate-y-1/2"
//                       onClick={previousImage}
//                     >
//                       <ChevronLeft className="h-6 w-6" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="absolute right-4 top-1/2 transform -translate-y-1/2"
//                       onClick={nextImage}
//                     >
//                       <ChevronRight className="h-6 w-6" />
//                     </Button>
//                   </>
//                 )}
//               </div>

//               {/* Thumbnails */}
//               {galleryImages.length > 1 && (
//                 <div className="flex space-x-2 mt-4 overflow-x-auto">
//                   {galleryImages.map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setCurrentImageIndex(index)}
//                       className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
//                         index === currentImageIndex
//                           ? "border-warm-gold"
//                           : "border-transparent hover:border-primary-brown dark:hover:border-neutral-400"
//                       }`}
//                     >
//                       <img 
//                         src={image} 
//                         alt={`Thumbnail ${index + 1}`} 
//                         loading="lazy"
//                         decoding="async"
//                         className="w-full h-full object-cover" />
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Details */}
//             <div>
//               {collection.category && (
//                 <Badge variant="secondary" className="mb-4 capitalize">
//                   {collection.category}
//                 </Badge>
//               )}
//               <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
//                 {collection.name?.toUpperCase() || "Untitled Collection"}
//               </h1>

//               {collection.shortDescription && (
//                 <p className="text-xl text-warm-gold font-semibold mb-6">{collection.shortDescription}</p>
//               )}

//               <p className="text-lg leading-relaxed mb-8">{collection.description}</p>

//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Button
//                   className="btn-primary w-full sm:w-auto"
//                   onClick={() => openInquiryModal(`Inquiry about ${collection.name}`)}
//                 >
//                   INQUIRE ABOUT COLLECTION
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="w-full sm:w-auto"
//                   onClick={() => openInquiryModal(`Custom design request for ${collection.name}`)}
//                 >
//                   CUSTOM DESIGN REQUEST
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Product Section */}
//       {products && products.length > 0 && (
//         <section className="py-20 bg-soft-gray dark:bg-[#1a1a1a] transition-colors">
//           <div className="max-w-7xl mx-auto px-4">
//             <h2 className="font-serif text-4xl font-bold text-center mb-16">PRODUCTS IN THIS COLLECTION</h2>
//             {productsLoading ? (
//               <div className="flex justify-center py-12">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-brown"></div>
//               </div>
//             ) : (
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {products.map((product) => (
//                   <div key={product.id} className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden group">
//                     <div className="relative overflow-hidden">
//                       <img
//                         src={product.images?.[0] || collection.heroImage}
//                         alt={product.name}
//                         className="w-full h-64 object-cover"
//                         loading="lazy"
//                       />
//                     </div>
//                     <div className="p-6">
//                       <h3 className="font-serif text-xl font-semibold mb-2">{product.name}</h3>
//                       <p className="opacity-80 text-sm mb-4">{product.description}</p>
//                       {product.material && <p className="text-sm mb-2 font-medium">Material: {product.material}</p>}
//                       {product.dimensions && <p className="text-sm mb-2 font-medium">Dimensions: {product.dimensions}</p>}
//                       <p className="text-sm font-semibold mb-2">Price: ₹ {product.price.toFixed(2)}</p>
//                       {product.colors?.length > 0 && (
//                         <div className="flex flex-wrap gap-1 mb-4">
//                           {product.colors.map((color: string, index: number) => (
//                             <Badge key={index} variant="outline" className="text-xs">
//                               {color}
//                             </Badge>
//                           ))}
//                         </div>
//                       )}
//                       <Button
//                         className="w-full btn-primary"
//                         onClick={() => openInquiryModal(`Inquiry about product: ${product.name}`)}
//                       >
//                         INQUIRE ABOUT PRODUCT
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </section>
//       )}

//       {/* Explore More */}
//       <section className="py-20 bg-white dark:bg-black transition-colors">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <h2 className="font-serif text-4xl font-bold mb-10">EXPLORE MORE COLLECTIONS</h2>
//           <Link href="/collections">
//             <Button className="btn-secondary">VIEW ALL COLLECTIONS</Button>
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";

interface Product {
  _id: string;
  slug: string;
  title: string;
  price: number;
  images: string[];
}

const BASE_URL = "http://127.0.0.1:5000/";

export default function CollectionDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!slug) return;

    fetch(`${BASE_URL}api/product/collection/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setProducts(data.data);
      });
  }, [slug]);

  return (
    <section className="mt-32 mb-40 px-6 md:px-12 max-w-7xl mx-auto">

      <h1 className="text-4xl md:text-5xl font-serif font-bold uppercase mb-20 text-center tracking-wider text-premium-gold">
        {slug} Collection
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">

        {products.map((product, index) => (
          <Link key={product._id} href={`/product/${product.slug}`}>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -12 }}
              className="cursor-pointer group relative rounded-2xl overflow-hidden 
              bg-white dark:bg-neutral-950 
              border border-gray-200 dark:border-white/10 
              shadow-lg"         
                 >

              <div className="relative overflow-hidden">
                <img
                  src={`${BASE_URL}${product.images?.[0]}`}
                  alt={product.title}
                  className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {product.title}
                </h2>

               <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                  ₹ {product.price}
                </p>
              </div>

            </motion.div>

          </Link>
        ))}

      </div>
    </section>
  );
}