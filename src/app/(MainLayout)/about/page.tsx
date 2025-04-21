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

const teamMembers = [
  {
    name: "Rakesh Biswas",
    role: "Founder & CEO",
    image: "https://i.postimg.cc/zfPD32Jy/15507337785.jpg",
    bio: "Real estate visionary with 10+ years of experience in property management and tech innovation.",
  },
  {
    name: "Sarah Rahman",
    role: "Chief Technology Officer",
    image: "https://i.postimg.cc/XNBqBWB4/woman.jpg",
    bio: "Tech expert specializing in creating user-friendly real estate platforms and innovative solutions.",
  },
  {
    name: "Tanzil Islam",
    role: "Head of Customer Success",
    image: "https://i.postimg.cc/XJpJ8S2K/man.jpg",
    bio: "Passionate about connecting people with their ideal living spaces and exceptional customer experiences.",
  },
];

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen w-full">
      {/* Mission Statement Section */}
      <section className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-16 text-center max-w-4xl">
          <div className="flex justify-center mb-6">
            <Target className="text-blue-600 w-12 h-12 md:w-16 md:h-16" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
            Our Mission at BasaFinder
          </h1>
          <p className="text-base md:text-xl text-gray-600 leading-relaxed px-2 md:px-0">
            BasaFinder is revolutionizing the rental experience in Bangladesh by
            bridging the gap between landlords and tenants. We aim to simplify
            property discovery, streamline rental processes, and create
            transparent, trustworthy connections that transform how people find
            their perfect home.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 ">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 md:mb-12">
            Meet Our Team
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 ">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-300 to-cyan-200 rounded-xl shadow-md p-4 md:p-6 text-center transform transition hover:scale-105 hover:shadow-lg"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={128} // Adjust width as needed
                  height={128} // Adjust height as needed
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-3 md:mb-4 object-cover"
                />
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium text-sm md:text-base mb-2 md:mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 text-xs md:text-base">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="bg-gradient-to-r from-blue-300 to-cyan-200 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-black">
            Contact Us
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gradient-to-r from-blue-400 to-cyan-200 p-4 md:p-6 rounded-xl text-center">
              <Mail className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">Email</h3>
              {/* <p className="text-sm md:text-base">support@basafinder.com</p> */}
              <p className="text-xs md:text-sm lg:text-base text-black">
                help@basafinder.com
              </p>
              <p className="text-xs md:text-sm lg:text-base text-black">
                support@basafinder.com
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-cyan-200 p-4 md:p-6 rounded-xl text-center">
              <Phone className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">Phone</h3>
              <p className="text-sm md:text-base text-black">+880 1234 567 890</p>
              <p className="text-sm md:text-base text-black">+880 9876 543 210</p>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-cyan-200 p-4 md:p-6 rounded-xl text-center">
              <div className="flex justify-center space-x-4 md:space-x-6 mb-3 md:mb-4">
                <Facebook className="w-6 h-6 md:w-10 md:h-10 hover:text-gray-200 transition" />
                <Linkedin className="w-6 h-6 md:w-10 md:h-10 hover:text-gray-200 transition" />
                <Twitter className="w-6 h-6 md:w-10 md:h-10 hover:text-gray-200 transition" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mt-2 mb-2 ">
                Follow Us
              </h3>
              <p className="text-sm md:text-base text-black">@BasaFinder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="flex justify-center mb-6">
            <Building className="text-blue-600 w-10 h-10 md:w-16 md:h-16" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
            Why Choose BasaFinder?
          </h2>
          <p className="text-base md:text-xl text-gray-600 leading-relaxed px-2 md:px-0">
            We believe in making rental experiences seamless, transparent, and
            empowering. Our platform combines cutting-edge technology with deep
            local market understanding to help you find not just a house, but a
            home.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
