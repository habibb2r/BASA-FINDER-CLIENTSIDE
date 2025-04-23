import {
  Building,
  Target,
  Mail,
  Phone,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const teamMembers = [
  {
    name: "Mohammad Rahman",
    role: "Founder & CEO",
    image: "https://res.cloudinary.com/dairs3nkn/image/upload/v1745420640/habibb2r/stjknpjpivlxqajuv3ui.jpg",
    bio: "Property tech innovator with extensive experience in Bangladesh's real estate market and digital solutions.",
  },
  {
    name: "Aisha Khan",
    role: "Head of Operations",
    image: "https://res.cloudinary.com/dairs3nkn/image/upload/v1745420627/habibb2r/obblhx76oc2yrioy0biq.jpg",
    bio: "Operations expert focused on creating seamless rental experiences and property management solutions.",
  },
  {
    name: "Kamal Hassan",
    role: "Chief Marketing Officer",
    image: "https://res.cloudinary.com/dairs3nkn/image/upload/v1745420711/habibb2r/v0ngqliesrmhzajh0m7c.jpg",
    bio: "Digital marketing strategist dedicated to connecting property owners with ideal tenants across Bangladesh.",
  },
];

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen w-full">
      {/* Mission Statement Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 opacity-50"></div>
        <div className="container relative mx-auto px-4 py-24 text-center max-w-4xl">
          <div className="animate-bounce-slow flex justify-center mb-8">
            <Target className="text-blue-600 w-16 h-16 md:w-20 md:h-20" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 font-heading">
            Transforming Rental Solutions in Bangladesh
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            At BasaFinder, we&apos;re committed to revolutionizing the rental
            property market in Bangladesh. Our platform brings together
            technology and local expertise to create a seamless, secure, and
            efficient rental experience for both property owners and tenants.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 font-heading">
            Meet Our Team
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 bg-gradient-to-b from-transparent to-white">
                  <h3 className="text-xl font-bold text-gray-800 mb-1 font-heading">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-heading">
            Get in Touch
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Email Card */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl hover:bg-white/20 transition-all duration-300">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center font-heading">
                Email Us
              </h3>
              <div className="space-y-2 text-center">
                <p className="hover:text-blue-100 transition-colors">
                  contact@basafinder.com
                </p>
                <p className="hover:text-blue-100 transition-colors">
                  info@basafinder.com
                </p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl hover:bg-white/20 transition-all duration-300">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center font-heading">
                Call Us
              </h3>
              <div className="space-y-2 text-center">
                <p className="hover:text-blue-100 transition-colors">
                  +880 1712 345 678
                </p>
                <p className="hover:text-blue-100 transition-colors">
                  +880 1898 765 432
                </p>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl hover:bg-white/20 transition-all duration-300">
              <div className="flex justify-center space-x-6 mb-6">
                <Link href="#" className="hover:scale-110 transition-transform">
                  <Facebook className="w-8 h-8" />
                </Link>
                <Link href="#" className="hover:scale-110 transition-transform">
                  <Linkedin className="w-8 h-8" />
                </Link>
                <Link href="#" className="hover:scale-110 transition-transform">
                  <Twitter className="w-8 h-8" />
                </Link>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center font-heading">
                Follow Us
              </h3>
              <p className="text-center hover:text-blue-100 transition-colors">
                @BasaFinderBD
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="mb-8 animate-pulse">
            <Building className="text-blue-600 w-16 h-16 md:w-20 md:h-20 mx-auto" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 font-heading">
            The BasaFinder Advantage
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12">
            We&apos;re more than just a rental platform - we&apos;re your
            trusted partner in finding the perfect home. Our innovative
            technology, combined with deep understanding of local markets,
            ensures a hassle-free rental experience. From virtual tours to
            secure payments, we&apos;ve got everything covered.
          </p>
          <Link href="/listings">
            <Button className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl">
              Explore Listings
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
