import logo from "@/assets/logo.png";
import { Facebook, Instagram, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/listings", label: "Listings" },
    { href: "/about", label: "About Us" },
    { href: "", label: "Testimonial" },
    { href: "/terms-of-use", label: "Terms Of Use" },
    { href: "#", label: "Contact Us" },
    { href: "/privacy-policy", label: "Privacy Policy" },
  ];

  const socialLinks = [
    { href: "#", icon: Facebook },
    { href: "#", icon: Instagram },
    { href: "#", icon: X },
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-300">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Logo and Description Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src={logo}
                alt="BasaFinder Logo"
                
                height={70}
                className="hover:scale-105 transition-transform"
              />
              
            </div>
            <p className="text-white/90 text-sm max-w-md">
              Connecting landlords and tenants seamlessly. Discover, rent, and
              manage properties with ease. Your ideal rental journey starts
              here.
            </p>
          </div>

          {/* Navigation Links Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold font-heading text-white">
              Quick Links
            </h2>
            <nav>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social Links and Copyright Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold font-heading text-white">
              Connect With Us
            </h2>
            <div className="flex gap-4">
              {socialLinks.map(({ href, icon: Icon }, index) => (
                <Link
                  href={href}
                  key={index}
                  className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
                >
                  <Icon className="w-5 h-5 text-white" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <p className="text-center text-sm text-white/80">
            © {new Date().getFullYear()} BasaFinder. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
