// import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Link } from "wouter";

// interface CarouselSlide {
//   id: number;
//   title: string;
//   subtitle?: string;
//   description?: string;
//   image: string;
//   link: string;
//   buttonText: string;
// }

// const slides: CarouselSlide[] = [
//   {
//     id: 1,
//     title: "Velura",
//     description: "Step into softness with our signature collection.",
//     // image: "https://i.postimg.cc/1Xmm1g6H/Chat-GPT-Image-Jul-10-2025-02-58-06-PM.png",
//     image: "/hero-section/hero-2.png",
//     link: "/collections",
//     buttonText: "EXPLORE COLLECTION",
//   },
//   {
//     id: 2,
//     title: "Jungle Weave",
//     description: "Nature-inspired textures for modern living.",
//     // image: "https://i.postimg.cc/W3Q9Y81k/Jungle-carpet.png",
//     image: "/hero-section/Jungle-carpet.png",
//     link: "/collections",
//     buttonText: "EXPLORE COLLECTION",
//   },
//   {
//     id: 3,
//     title: "Medows",
//     description: "Subtle elegance in every thread.",
//     // image: "https://i.postimg.cc/vTf0Jn4S/Medows-carpet.png",
//      image: "/hero-section/Medows-carpet.png",
//     link: "/collections",
//     buttonText: "EXPLORE COLLECTION",
//   },
//   {
//     id: 4,
//     title: "Obscure",
//     description: "A bold statement in color and form.",
//     // image: "https://i.postimg.cc/y6ZpgMLX/Roxy-carpet.png",
//     image: "/hero-section/Roxy-carpet.png",
//     link: "/collections",
//     buttonText: "EXPLORE COLLECTION",
//   },
//   {
//     id: 5,
//     title: "EchoFade",
//     description: "Raw beauty meets refined craftsmanship.",
//     // image: "https://i.postimg.cc/MGnmkB4b/Rugged-carpet.png",
//     image: "/hero-section/Rugged-carpet.png",
//     link: "/collections",
//     buttonText: "EXPLORE COLLECTION",
//   },
//   {
//     id: 6,
//     title: "Spaceship",
//     description: "Explore the cosmos of comfort with our Spaceeship collection.",
//     // image: "https://i.postimg.cc/9Mjc7v64/Chat-GPT-Image-Jul-9-2025-06-29-21-PM.png",
//     image: "/hero-section/hero-1.png",
//     link: "/collections",
//     buttonText: "EXPLORE COLLECTION",
//   },
// ];

// export default function HeroCarousel() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Adil-dev
//   useEffect(() => {
//   const img = new Image();
//   img.src = slides[0].image;
// }, []);


//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const goToSlide = (index: number) => {
//     setCurrentSlide(index);
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//   };

//   const previousSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   return (
//     // Adil-dev
//     // <section className="relative mt-20 h-screen overflow-hidden">
//     <section className="relative mt-20 h-screen overflow-hidden will-change-transform">
//       <div className="absolute inset-0">
//         {slides.map((slide, index) => (
//           <div
//             key={slide.id}
//           // Adil-dev
//             className={`absolute inset-0 transition-opacity duration-1000 ${
//               index === currentSlide ? "opacity-100" : "opacity-0"
//             }`}
//             style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
//           >
//             <img
//               src={slide.image}
//               alt={slide.title}
//               className="w-full h-full object-cover"
//               loading={index === 0 ? "eager" : "lazy"}
//               //Adil-dev
//               decoding="async"
//               // fetchpriority={index === 0 ? "high" : "auto"}
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

//             {/* TEXT + CTA */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="text-center max-w-6xl px-4">
//                 <h2 className="font-serif text-7xl md:text-9xl lg:text-[10rem] font-bold mb-8 leading-none bg-gradient-to-br from-yellow-400 to-amber-600 text-transparent bg-clip-text drop-shadow-xl">
//                   {slide.title}
//                 </h2>

//                 {slide.description && (
//                   <p className="text-xl md:text-2xl mb-12 font-light leading-relaxed text-yellow-300/90 backdrop-blur-sm">
//                     {slide.description}
//                   </p>
//                 )}

//                 <Link href={slide.link}>
//                   <button className="px-8 py-4 text-white border border-white rounded-full text-lg font-semibold transition-all duration-300 backdrop-blur bg-white/10 hover:bg-white/20">
//                     {slide.buttonText}
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Arrows */}
//       <Button
//         variant="ghost"
//         size="icon"
//         className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-300 hover:bg-white/10 w-12 h-12"
//         onClick={previousSlide}
//       >
//         <ChevronLeft className="h-8 w-8" />
//       </Button>
//       <Button
//         variant="ghost"
//         size="icon"
//         className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-300 hover:bg-white/10 w-12 h-12"
//         onClick={nextSlide}
//       >
//         <ChevronRight className="h-8 w-8" />
//       </Button>

//       {/* Dots */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`w-3 h-3 rounded-full transition-opacity ${
//               index === currentSlide ? "bg-white" : "bg-white/50"
//             } hover:bg-white`}
//             onClick={() => goToSlide(index)}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }





//new code 

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface CarouselSlide {
  id: string;
  title: string;
  description?: string;
  image: string;
  link: string;
  buttonText: string;
}

export default function HeroCarousel() {
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 🔹 FETCH FROM DATABASE
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/collection")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSlides(
            data.data.map((item: any) => ({
              id: item._id,
              title: item.name,
              description: item.description,
              image: `http://127.0.0.1:5000/${item.image}`,
              link: `/collections/${item.slug}`,
              buttonText: "EXPLORE COLLECTION",
            }))
          );
        }
      });
  }, []);

  // 🔹 AUTO SLIDE
  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  if (!slides.length) return null;

  return (
    <section className="relative mt-20 h-screen overflow-hidden">

      {/* SLIDES */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          {/* TEXT */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 max-w-6xl">
              <h2 className="font-serif text-7xl md:text-9xl lg:text-[10rem] font-bold mb-8 bg-gradient-to-br from-yellow-400 to-amber-600 text-transparent bg-clip-text drop-shadow-xl">
                {slide.title}
              </h2>

              {slide.description && (
                <p className="text-xl md:text-2xl text-yellow-300 mb-12 font-light leading-relaxed text-yellow-300/90 backdrop-blur-sm">
                  {slide.description}
                </p>
              )}

              <Link href={slide.link}>
                <Button className="px-10 py-8 text-white border border-white rounded-full text-lg font-semibold transition-all duration-300 backdrop-blur bg-white/10 hover:bg-white/20">
                  {slide.buttonText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* LEFT ARROW */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() =>
          setCurrentSlide(
            currentSlide === 0 ? slides.length - 1 : currentSlide - 1
          )
        }
        className="absolute left-6 top-1/2 -translate-y-1/2 text-white z-20"
      >
        <ChevronLeft size={36} />
      </Button>

      {/* RIGHT ARROW */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() =>
          setCurrentSlide((currentSlide + 1) % slides.length)
        }
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white z-20"
      >
        <ChevronRight size={36} />
      </Button>

      {/* DOTS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
