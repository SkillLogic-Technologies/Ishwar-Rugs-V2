import { Link } from "wouter";
import { Users, Award, Globe, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-[#f3efe9] to-[#e7ded3] dark:from-[#2f2727] dark:to-[#1c1816] text-primary-brown dark:text-warm-gold transition-colors">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">
            OUR HERITAGE
          </h1>
          <p className="text-xl text-inherit opacity-80 leading-relaxed max-w-4xl mx-auto">
            Since 1925, Ishwar Rugs has been synonymous with the finest
            handcrafted carpets, carrying forward a legacy of traditional
            artisanship combined with contemporary design sensibilities.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-background text-foreground transition-colors">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl font-bold mb-6">
                A Legacy of Excellence
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                Our journey began in 1925 when master artisan Ishwar Singh
                established our first workshop in the heart of India's
                carpet-making region...
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                For over 100 years, we have been creating carpets that are not
                merely floor coverings, but works of art...
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Today, while we embrace modern design sensibilities...
              </p>
            </div>
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dzufohihn/image/upload/v1767611004/ChatGPT_Image_Jun_20__2025__11_23_59_PM_fgi7nv.png"
                alt="Historical carpet workshop"
                className="rounded-lg shadow-xl w-full"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-6 bg-warm-gold text-primary-brown p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="font-serif text-3xl font-bold">1925</div>
                  <div className="text-sm font-semibold">Founded</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-primary-brown dark:bg-[#1f1a1a] transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { Icon: Clock, value: "100+", label: "Years of Heritage" },
              { Icon: Users, value: "500+", label: "Master Artisans" },
              { Icon: Globe, value: "50+", label: "Countries Served" },
              { Icon: Award, value: "25+", label: "Design Awards" },
            ].map(({ Icon, value, label }, i) => (
              <Card
                key={i}
                className="bg-transparent border-warm-gold text-center"
              >
                <CardContent className="p-8">
                  <Icon className="h-12 w-12 text-warm-gold mx-auto mb-4" />
                  <div className="font-serif text-4xl font-bold text-warm-gold mb-2">
                    {value}
                  </div>
                  <div className="text-cream dark:text-cream/90 font-semibold">
                    {label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-20 text-foreground bg-background transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              THE ART OF CRAFTSMANSHIP
            </h2>
            <p className="text-xl text-foreground/80 max-w-4xl mx-auto">
              Our commitment to excellence is reflected in every aspect of our
              craft...
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Hand Knotting",
                desc: "Each carpet is meticulously hand-knotted by master artisans...",
                img: "https://res.cloudinary.com/dzufohihn/image/upload/v1767769565/ChatGPT_Image_Jun_30__2025__10_17_39_PM_wpjif5.png",
              },
              {
                title: "Premium Materials",
                desc: "We source only the finest materials - from hand-spun wool and silk...",
                img: "https://res.cloudinary.com/dzufohihn/image/upload/v1767769603/image_n6dsly.png",
              },
              {
                title: "Design Innovation",
                desc: "Our in-house design studio constantly pushes creative boundaries...",
                img: "https://res.cloudinary.com/dzufohihn/image/upload/v1767610633/image_k7m2fk.png",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-64 object-cover image-hover-scale"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-4">
                  {item.title}
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-background text-foreground transition-colors">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              OUR MISSION & VALUES
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="font-serif text-3xl font-bold mb-6">
                Our Mission
              </h3>
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                To create exceptional handcrafted carpets that honor traditional
                artisanship...
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                We believe that a carpet is more than a functional object — it's
                art...
              </p>
            </div>

            <div>
              <h3 className="font-serif text-3xl font-bold mb-6">Our Values</h3>
              <ul className="space-y-4">
                {[
                  {
                    title: "Excellence",
                    text: "Uncompromising quality in every aspect of our craft",
                  },
                  {
                    title: "Heritage",
                    text: "Preserving traditional techniques while embracing innovation",
                  },
                  {
                    title: "Sustainability",
                    text: "Responsible sourcing and ethical manufacturing",
                  },
                  {
                    title: "Innovation",
                    text: "Continuously pushing creative boundaries in design",
                  },
                ].map((val, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-warm-gold rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold mb-1">{val.title}</h4>
                      <p className="text-foreground/80">{val.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary-brown dark:bg-[#1f1a1a] transition-colors">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-warm-gold mb-6">
            Experience the Ishwar Difference
          </h2>
          <p className="text-xl text-cream mb-8 leading-relaxed max-w-4xl mx-auto">
            Discover our collections or work with our design team to create a
            custom carpet that perfectly reflects your vision and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/collections">
              <Button className="btn-secondary text-lg px-8 py-4">
                EXPLORE COLLECTIONS
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-primary-brown text-primary-brown hover:bg-primary-brown hover:text-white 
             dark:border-cream dark:text-cream dark:hover:bg-cream dark:hover:text-primary-brown
             text-lg px-8 py-4 transition-colors"
              >
                START CUSTOM DESIGN
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
