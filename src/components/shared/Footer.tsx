import logo from "@/assets/logo.png";
import { Facebook, Instagram, X, MapPin, Phone, Mail } from "lucide-react";
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

  const contactInfo = [
    { icon: MapPin, text: "Dhaka, Bangladesh" },
    { icon: Phone, text: "+880 1234-567890" },
    { icon: Mail, text: "info@basafinder.com" },
  ];

  const socialLinks = [
    { href: "#", icon: Facebook, label: "Facebook" },
    { href: "#", icon: Instagram, label: "Instagram" },
    { href: "#", icon: X, label: "X (Twitter)" },
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Image
                src={logo}
                alt="BasaFinder Logo"
                width={160}
                height={70}
                className="hover:scale-105 transition-transform"
              />
            </div>
            <p className="text-gray-600 text-sm max-w-md leading-relaxed">
              Connecting landlords and tenants seamlessly. Discover, rent, and
              manage properties with ease. Your ideal rental journey starts
              here.
            </p>
          </div>

          {/* Navigation Links Section */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Quick Links</h2>
            <nav>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors text-sm hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

         
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Contact Info
            </h2>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-3">
                  <info.icon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{info.text}</span>
                </div>
              ))}
            </div>
          </div>

 
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Connect With Us
            </h2>
            <div className="flex gap-4">
              {socialLinks.map(({ href, icon: Icon, label }, index) => (
                <Link
                  href={href}
                  key={index}
                  className="bg-white shadow-md hover:shadow-lg p-3 rounded-full hover:bg-blue-50 transition-all duration-300 group"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} BASA FINDER. All rights reserved by
            HABIBB2R.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
