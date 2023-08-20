"use client";
import { sidebarLinks } from "@/constants";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function Bottombar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="bottombar xs:px-7">
      <div className="bottombar_container xs:gap-5">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link ${isActive && "bg-[#dee2e6]"}`}
            >
              <Image src={link.imgURL} alt="" width={25} height={25} />
              <p className="max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bottombar;
