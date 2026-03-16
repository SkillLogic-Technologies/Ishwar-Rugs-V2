import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { useLocation } from "wouter";

import "swiper/css";
import "swiper/css/free-mode";

export default function Categories() {

  interface Category {
    slug: string;
    name: string;
    image: string;
  }

  const BASE_URL = "http://localhost:5000/";
  const [categories, setCategories] = useState<Category[]>([]);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(`${BASE_URL}api/category`);
      setCategories(res.data.data);
    };

    fetchCategories();
  }, []);

  const slides = [...categories, ...categories]; // duplicate once

  return (
    <section className="w-full py-10">

      <h2 className="text-center text-4xl mb-12 font-semibold">
        EXPLORE CATEGORIES
      </h2>

      <Swiper
        modules={[Autoplay, FreeMode]}

        loop={true}

        freeMode={{
          enabled: true,
          momentum: false,
        }}

        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}

        speed={8000}

        slidesPerView={"auto"}
        spaceBetween={25}
        grabCursor={false}

        allowTouchMove={false}

      >
        {slides.map((cat, index) => (
          <SwiperSlide key={index} className="!w-auto">
            
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setLocation(`/category/${cat.slug}`)}
            >
              <div className="w-[250px] h-[330px] overflow-hidden rounded-xl shadow-lg">
                <img
                  src={`${BASE_URL}${cat.image}`}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="mt-3 text-lg">{cat.name}</p>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}