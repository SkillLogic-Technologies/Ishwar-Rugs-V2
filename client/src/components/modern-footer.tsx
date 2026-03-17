import { Link } from "wouter";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ModernFooter() {
  return (
    <footer className="relative w-full overflow-hidden">
      {/* Background image and overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/dzufohihn/image/upload/v1767769114/Chat-GPT-Image-Jul-1-2025-01-07-00-AM_i0zmos.png"
          alt="Heritage background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/60 dark:bg-[#1b150e]/80 backdrop-blur-sm backdrop-brightness-95 dark:backdrop-brightness-110 backdrop-contrast-100" />
      </div>

      {/* Content over background */}
      <div className="relative ">
        <div className="max-w-7xl mx-auto px-4 py-20">
          {/* Newsletter */}
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-premium-gold mb-6">
              Stay Connected
            </h2>
            <p className="text-neutral-800 dark:text-white/90 text-xl mb-8 max-w-2xl mx-auto">
              Be the first to discover our latest collections and exclusive designs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/40 dark:bg-white/10 border border-white/50 text-black dark:text-white placeholder-black/40 dark:placeholder-white/80"
              />
              <Button className="bg-premium-gold text-primary-brown hover:bg-warm-gold font-semibold px-8">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Footer Grid */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="mb-8">
                <div className="mb-4">
                  <img
                    src="https://res.cloudinary.com/dzufohihn/image/upload/v1767769166/Chat-GPT-Image-Jul-10-2025-02-12-10-PM_hzqpxx.png"
                    alt="Ishwar Rugs Logo"
                    className="h-20 w-auto"
                  />
                </div>
                <p className="text-neutral-800 dark:text-white/90 leading-relaxed">
                  Fine handcrafted carpets since 1925. Creating timeless pieces that
                  transform spaces with elegance and sophistication.
                </p>
              </div>
              <div className="flex space-x-4">
                {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-neutral-600 dark:text-white/70 hover:text-premium-gold transition-colors p-2 rounded-lg hover:bg-white/10"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Collections */}
            <div>
              <h4 className="font-serif text-xl font-bold text-neutral-800 dark:text-white mb-6">
                Collections
              </h4>
              <ul className="space-y-4">
                {["contemporary", "modern", "traditional"].map((cat) => (
                  <li key={cat}>
                    <Link
                      href={`/collections?category=${cat}`}
                      className="text-neutral-700 dark:text-white/90 hover:text-premium-gold transition-colors group flex items-center"
                    >
                      <span className="capitalize">{cat}</span>
                      <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/collections"
                    className="text-premium-gold font-semibold hover:text-warm-gold transition-colors group flex items-center"
                  >
                    <span>View All Collections</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-serif text-xl font-bold text-neutral-800 dark:text-white mb-6">
                Company
              </h4>
              <ul className="space-y-4">
                {["Our Heritage", "Craftsmanship", "Bespoke Design", "Sustainability", "Careers"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-neutral-700 dark:text-white/90 hover:text-premium-gold transition-colors group flex items-center"
                    >
                      <span>{item}</span>
                      <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-serif text-xl font-bold text-neutral-800 dark:text-white mb-6">
                Get in Touch
              </h4>
              <div className="space-y-4 text-neutral-700 dark:text-white/90 text-sm">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-premium-gold mt-1 flex-shrink-0" />
                  <div>
                    Civil Lines, Power House Road<br />
                    Bhadohi – 221401 (U.P), India
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-premium-gold flex-shrink-0" />
                  <a href="tel:+915414224518" className="hover:text-premium-gold transition-colors">
                    05414 224518
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-premium-gold flex-shrink-0" />
                  <a href="mailto:info@ishwarrugs.com" className="hover:text-premium-gold transition-colors">
                    info@ishwarrugs.com
                  </a>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="w-full border-premium-gold text-premium-gold hover:bg-premium-gold hover:text-primary-brown"
                  >
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-white/80 dark:bg-[#1b150e] border-t border-black/10 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-700 dark:text-white/80 text-sm mb-4 md:mb-0">
              © 2024 Ishwar Rugs. All rights reserved. • Crafted with passion since 1925.
            </p>
            <div className="flex space-x-6 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((text) => (
                <a
                  href="#"
                  key={text}
                  className="text-neutral-700 dark:text-white/80 hover:text-premium-gold transition-colors"
                >
                  {text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}