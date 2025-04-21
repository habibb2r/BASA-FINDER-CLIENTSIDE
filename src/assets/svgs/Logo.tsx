import logo from "@/assets/logo.png";
import Image from "next/image";

export default function Logo() {
  return (
    <div>
      <Image
        src={logo}
        alt="BasaFinder Logo"
        height={50}
        className=""
      />
    </div>
  );
}
