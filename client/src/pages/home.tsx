import { useQuery } from "@tanstack/react-query";
import { Play } from "lucide-react";
import { Link } from "wouter";
import { api } from "@/lib/api";
import HeroCarousel from "@/components/hero-carousel";
import { useState } from "react"; 
import CollectionGrid from "@/components/collection-grid";
import { Button } from "@/components/ui/button";
import Carousel3D from "@/components/Carousel3D";
import Categories from "@/components/categories";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  // ✅ This MUST be declared before any JSX using isPlaying
  const [isPlaying, setIsPlaying] = useState(false);

  const { data: featuredCollections, isLoading: collectionsLoading } = useQuery(
    {
      queryKey: ["/api/collections/featured"],
      queryFn: api.collections.getFeatured,
    }
  );

  const { data: contemporaryCollections, isLoading: contemporaryLoading } =
    useQuery({
      queryKey: ["/api/collections/category/contemporary"],
      queryFn: () => api.collections.getByCategory("contemporary"),
    });

  const { data: modernCollections, isLoading: modernLoading } = useQuery({
    queryKey: ["/api/collections/category/modern"],
    queryFn: () => api.collections.getByCategory("modern"),
  });

  const { data: traditionalCollections, isLoading: traditionalLoading } =
    useQuery({
      queryKey: ["/api/collections/category/traditional"],
      queryFn: () => api.collections.getByCategory("traditional"),
    });

  return (
    <div className="min-h-screen w-full">
      {/* Hero Carousel */}
      <HeroCarousel />
      <Categories/>

      {/* Brand Introduction */}
      <section className="py-10 md:py-16 px-4 bg-gradient-to-b from-background via-luxury-brown to-background">
  
  <div className="max-w-7xl mx-auto text-center">
    
    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-premium-gold leading-relaxed mb-6 md:mb-8 font-light">
      Fine handcrafted carpets since 1925
    </h2>

    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/80 leading-relaxed max-w-4xl mx-auto font-light px-2">
      An exclusive collection - designed to stir emotion, brought to life
      unlike any other. The hand knotted carpet, woven inch by inch. And
      the hand tufted carpet, crafted with care and technique.
    </p>

  </div>

  {/* Image Section */}
  <div className="w-full mt-10 md:mt-16  lg:mt-20">
    
    <div className="w-full lg:px-6 mx-auto overflow-hidden rounded-2xl md:rounded-3xl">
      
      <img
        src="/Carpet.png"
        alt="Intro placeholder"
        className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[650px] object-cover transition-transform duration-700 hover:scale-105"
        loading="eager"
        decoding="async"
      />

    </div>

  </div>

      </section>

      {/* EXPLORE OUR RUGS */}
     <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-luxury-brown">
  <div className=" mx-auto px-4 lg:px-8">

    {/* Heading */}
    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-premium-gold mb-12 md:mb-20">
      EXPLORE OUR RUGS
    </h2>

    <div className="space-y-20 md:space-y-28 lg:space-y-32">

      {/* Contemporary */}
      <div className="grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-center">

        <div className="order-2 lg:order-1 text-center lg:text-left">
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-premium-gold mb-6 md:mb-8">
            CONTEMPORARY
          </h3>

          <p className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed mb-8 md:mb-10 font-light max-w-xl mx-auto lg:mx-0">
            The bridge between past and present, these home carpets combine
            traditional carpet design elements with contemporary stylistics
            and colours, evoking sensations that are familiar yet altogether new.
          </p>

          <Link href="/collections?category=contemporary">
            <Button className="bg-premium-gold text-primary-brown hover:bg-warm-gold font-bold px-8 md:px-12 py-4 md:py-6 text-base md:text-lg rounded-lg transition-all duration-300 hover:scale-105 premium-shadow">
              EXPLORE THE COLLECTION
            </Button>
          </Link>
        </div>

        <div className="order-1 lg:order-2 grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {[
            "/explore-our-rugs/contemporary/contemporary-01.png",
            "/explore-our-rugs/contemporary/contemporary-02.png",
            "/explore-our-rugs/contemporary/contemporary-03.png",
            "/explore-our-rugs/contemporary/contemporary-04.png",
          ].map((src, i) => (
            <Link
              key={i}
              href="/collections?category=contemporary"
              className="relative group overflow-hidden rounded-xl md:rounded-2xl lg:rounded-3xl premium-shadow block"
            >
              <img
                src={src}
                alt="Contemporary Rug"
                className="w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] xl:h-[340px] object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Modern */}
      <div className="grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-center">

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {[
            "/explore-our-rugs/modern/modern-01.png",
            "/explore-our-rugs/modern/modern-02.png",
            "/explore-our-rugs/modern/modern-03.png",
            "/explore-our-rugs/modern/modern-04.png",
          ].map((src, i) => (
            <Link
              key={i}
              href="/collections?category=modern"
              className="relative group overflow-hidden rounded-xl md:rounded-2xl lg:rounded-3xl premium-shadow block"
            >
              <img
                src={src}
                alt="Modern Rug"
                className="w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] xl:h-[340px] object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
            </Link>
          ))}
        </div>

        <div className="text-center lg:text-left">
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-premium-gold mb-6 md:mb-8">
            MODERN
          </h3>

          <p className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed mb-8 md:mb-10 font-light max-w-xl mx-auto lg:mx-0">
            Contemporary carpet designs that are current and modern,
            reflecting new and diverse thematic, stylistic and colour
            orientation. The contemporary rugs reflect geometrics,
            organics, abstract art, pop art.
          </p>

          <Link href="/collections?category=modern">
            <Button className="bg-premium-gold text-primary-brown hover:bg-warm-gold font-bold px-8 md:px-12 py-4 md:py-6 text-base md:text-lg rounded-lg transition-all duration-300 hover:scale-105 premium-shadow">
              EXPLORE THE COLLECTION
            </Button>
          </Link>
        </div>
      </div>

      {/* Traditional */}
      <div className="grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-center">

        <div className="order-2 lg:order-1 text-center lg:text-left">
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-premium-gold mb-6 md:mb-8">
            TRADITIONAL
          </h3>

          <p className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed mb-8 md:mb-10 font-light max-w-xl mx-auto lg:mx-0">
            Heralding age-old design themes, these are handmade Indian carpets
            with classic patterns, telling stories with traditional symbolism,
            motifs and cohesive colour.
          </p>

          <Link href="/collections?category=traditional">
            <Button className="bg-premium-gold text-primary-brown hover:bg-warm-gold font-bold px-8 md:px-12 py-4 md:py-6 text-base md:text-lg rounded-lg transition-all duration-300 hover:scale-105 premium-shadow">
              EXPLORE THE COLLECTION
            </Button>
          </Link>
        </div>

        <div className="order-1 lg:order-2 grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {[
            "/explore-our-rugs/traditional/traditional-01.png",
            "/explore-our-rugs/traditional/traditional-02.png",
            "/explore-our-rugs/traditional/traditional-03.png",
            "/explore-our-rugs/traditional/traditional-04.png",
          ].map((src, i) => (
            <Link
              key={i}
              href="/collections?category=traditional"
              className="relative group overflow-hidden rounded-xl md:rounded-2xl lg:rounded-3xl premium-shadow block"
            >
              <img
                src={src}
                alt="Traditional Rug"
                className="w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] xl:h-[340px] object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
            </Link>
          ))}
        </div>

      </div>

    </div>
  </div>
      </section>

      {/* Featured Collections */}
      <section className="py-6 md:py-24 lg:py-32 bg-gradient-to-b from-background to-luxury-brown">
  <div className="w-full px-4">

    <Link href="/collections">
      <div className="text-center mb-12 md:mb-16 lg:mb-20 cursor-pointer hover:opacity-90 transition-opacity duration-300">

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-premium-gold mb-4 md:mb-6">
          FEATURED COLLECTIONS
        </h2>

        <h3 className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-foreground/90 font-light">
          OUR PREMIUM HANDCRAFTS
        </h3>

      </div>
    </Link>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10  max-w-screen-2xl mx-auto">

      {[
        {
          main: "/featured-collections/featured-01-main.png",
          hover: "/featured-collections/featured-01-hover.png",
        },
        {
          main: "/featured-collections/featured-02-main.png",
          hover: "/featured-collections/featured-02-hover.png",
        },
        {
          main: "/featured-collections/featured-03-main.png",
          hover: "/featured-collections/featured-03-hover.png",
        },
        {
          main: "/featured-collections/featured-04-main.png",
          hover: "/featured-collections/featured-04-hover.png",
        },
      ].map((img, i) => (
        <Link
          key={i}
          href="/collections"
          className="group relative overflow-hidden rounded-xl md:rounded-2xl lg:rounded-3xl premium-shadow aspect-[3/4] w-full max-w-xs sm:max-w-sm mx-auto block"
        >
          <img
            src={img.main}
            alt={`Featured ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            loading="lazy"
            decoding="async"
          />

          <img
            src={img.hover}
            alt={`Featured Hover ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            loading="lazy"
            decoding="async"
          />
        </Link>
      ))}

    </div>
  </div>
      </section>
    

      {/* Design Emotion Video Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-luxury-brown to-deep-charcoal">
  <div className=" mx-auto px-4 sm:px-6 lg:px-8">

    {/* Heading */}
    <div className="text-center mb-12 md:mb-16">
      <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-premium-gold mb-4 md:mb-6">
        DESIGN EMOTION
      </h2>

      <h3 className="font-serif text-lg sm:text-xl md:text-3xl lg:text-4xl text-foreground/90 font-light">
        ISHWAR AND THE BIRTH OF THE BEAUTIFUL
      </h3>
    </div>

    {/* Video Section */}
    <div className="relative bg-black rounded-2xl md:rounded-3xl overflow-hidden premium-shadow">

      {isPlaying ? (
        <iframe
          className="w-full h-[220px] sm:h-[320px] md:h-[420px] lg:h-[520px]"
          src="https://www.youtube.com/embed/lKfV5nuxSDY?autoplay=1"
          title="Luxury Carpet Studio: Your Italian Masterpiece"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      ) : (
        <div
          className="relative cursor-pointer"
          onClick={() => setIsPlaying(true)}
        >
          <img
            src="https://img.youtube.com/vi/lKfV5nuxSDY/maxresdefault.jpg"
            alt="Carpet weaving process showing artisan craftsmanship"
            className="w-full h-[220px] sm:h-[320px] md:h-[420px] lg:h-[520px] object-cover"
            loading="eager"
            decoding="async"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-center justify-center">

            <Button
              variant="ghost"
              size="icon"
              className="bg-premium-gold text-primary-brown w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full hover:bg-warm-gold transition-all duration-300 hover:scale-110 premium-shadow"
            >
              <Play className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 ml-1" />
            </Button>

          </div>
        </div>
      )}
    </div>

    {/* Description */}
    <p className="text-center text-foreground/80 text-sm sm:text-base md:text-lg lg:text-xl mt-8 md:mt-10 leading-relaxed max-w-4xl lg:max-w-5xl mx-auto font-light px-2">
      Watch our series of exclusive interviews with distinguished figures
      from the world of art, architecture, and design. Where we explore
      the unique synergy between Art and Luxury and how the two concepts
      intricately intertwine within the realm of interior design.
    </p>

  </div>
      </section>

      {/* ✅ Crafted Portraits Carousel Section */}
      <Carousel3D />

      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background">
  <div className="max-w-7xl xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Heading */}
    <div className="text-center mb-12 md:mb-16 lg:mb-20">
      <h2 className="font-serif 
      text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
      font-bold text-foreground mb-3 md:mb-4">
        DESIGN YOUR OWN RUG
      </h2>

      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/80">
        From concept to creation, we bring your vision to life
      </p>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">

      {[
        {
          title: "Conceptualization",
          desc: "Our in-house studio helps shape original bespoke ideas.",
          img: "/design-your-rug/step-01-concept.png",
        },
        {
          title: "Development",
          desc: "Careful planning and selection of finest materials.",
          img: "/design-your-rug/step-02-development.png",
        },
        {
          title: "Creation",
          desc: "Craftsmanship in knotted, tufted, and woven forms.",
          img: "/design-your-rug/step-03-creation.png",
        },
        {
          title: "Installation",
          desc: "Professional fitting for the perfect finish.",
          img: "/design-your-rug/step-04-installation.png",
        },
      ].map((item) => (
        <div key={item.title} className="text-center group">

          {/* Image */}
          <div className="relative mb-4 md:mb-6 overflow-hidden rounded-2xl md:rounded-3xl aspect-[3/4] shadow-lg">
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover 
              transition-transform duration-500 
              group-hover:scale-105"
            />
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-2 md:mb-3">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-sm sm:text-base text-foreground/80 leading-relaxed px-2">
            {item.desc}
          </p>

        </div>
      ))}

    </div>

    {/* Button */}
    <div className="text-center mt-12 md:mt-16">
      <Link href="/contact">
        <Button className="btn-primary text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-4 md:py-6">
          START YOUR CUSTOM DESIGN
        </Button>
      </Link>
    </div>

  </div>
      </section>

      {/* Our Heritage */}
      <section className="py-16 md:py-20 bg-background w-full">
  <div className="w-full px-4 md:px-8  max-w-[1400px] mx-auto">
    
    <div className="grid lg:grid-cols-2 gap-12 items-center">

      {/* LEFT CONTENT */}
      <div className="text-center lg:text-left">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          Our Heritage
        </h2>

        <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-6">
          Since 1925, Ishwar Rugs has been synonymous with the finest
          handcrafted carpets, carrying forward a legacy of traditional
          artisanship combined with contemporary design sensibilities.
          Each piece tells a story of generations of skilled craftsmen who
          have perfected the art of carpet making.
        </p>

        <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-8">
          Our commitment to excellence extends beyond mere aesthetics. We
          believe in preserving ancient techniques while embracing
          innovation, ensuring that every carpet not only beautifies
          spaces but also stands as a testament to timeless craftsmanship.
        </p>

        <Link href="/about">
          <Button className="bg-premium-gold text-primary-brown font-bold px-8 py-3 md:py-4 text-base md:text-lg rounded-md transition-all duration-300 hover:scale-105">
            LEARN MORE ABOUT US
          </Button>
        </Link>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative group overflow-hidden rounded-xl w-full h-[350px] md:h-[450px] lg:h-[520px]">

        <img
          src="/heritage/heritage-main.png"
          alt="Heritage Default"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />

        <img
          src="/heritage/heritage-hover.png"
          alt="Heritage Hover"
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          loading="lazy"
          decoding="async"
        />

        {/* YEARS BOX */}
        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-premium-gold text-primary-brown px-5 py-3 md:px-6 md:py-4 rounded-xl shadow-xl">
          <div className="text-center">
            <div className="font-serif text-2xl md:text-3xl font-bold">
              100+
            </div>
            <div className="text-xs md:text-sm font-semibold">
              Years of Heritage
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</section>
    </div>
  );
}