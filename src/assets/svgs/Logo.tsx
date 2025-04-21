import logo from "@/assets/logo.png";
import Image from "next/image";

export default function Logo() {
  return (
    <div>
      <Image
        src={logo}
        alt="BasaFinder Logo"
        width={40}
        height={32}
        className="w-8 h-auto sm:w-10 md:w-12"
      />
    </div>
  );
}
